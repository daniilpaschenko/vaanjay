import 'dart:async';

import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

/// Country code used when the user types a local (10-digit) phone number.
const _defaultCountryCode = '+91';

/// Sentinel used by [AuthState.copyWith] to distinguish "not passed" from null.
const _unset = Object();

class AuthState {
  const AuthState({
    this.initializing = true,
    this.user,
    this.pendingPhone,
    this.verificationId,
    this.resendToken,
    this.sendingCode = false,
    this.verifying = false,
    this.error,
  });

  /// True while Firebase restores the persisted session on app start
  final bool initializing;

  /// Signed-in Firebase user, or null for a guest
  final User? user;

  /// Phone the OTP was requested for, in E.164 format (+919876543210)
  final String? pendingPhone;

  /// Verification id returned by the `codeSent` callback
  final String? verificationId;

  /// Token used to force-resend an SMS before the auto-retrieval timeout
  final int? resendToken;

  /// True while the OTP request is in flight
  final bool sendingCode;

  /// True while the SMS code is being verified
  final bool verifying;

  /// Human-readable error for the current operation
  final String? error;

  bool get loggedIn => user != null;

  /// True while any auth request is running (send or verify)
  bool get busy => sendingCode || verifying;

  bool get hasPendingCode => verificationId != null;

  AuthState copyWith({
    bool? initializing,
    Object? user = _unset,
    Object? pendingPhone = _unset,
    Object? verificationId = _unset,
    Object? resendToken = _unset,
    bool? sendingCode,
    bool? verifying,
    Object? error = _unset,
  }) {
    return AuthState(
      initializing: initializing ?? this.initializing,
      user: identical(user, _unset) ? this.user : user as User?,
      pendingPhone: identical(pendingPhone, _unset)
          ? this.pendingPhone
          : pendingPhone as String?,
      verificationId: identical(verificationId, _unset)
          ? this.verificationId
          : verificationId as String?,
      resendToken: identical(resendToken, _unset)
          ? this.resendToken
          : resendToken as int?,
      sendingCode: sendingCode ?? this.sendingCode,
      verifying: verifying ?? this.verifying,
      error: identical(error, _unset) ? this.error : error as String?,
    );
  }
}

class AuthNotifier extends Notifier<AuthState> {
  FirebaseAuth? _auth;

  @override
  AuthState build() {
    final auth = _tryFirebaseAuth();
    _auth = auth;

    // Firebase is not available (e.g. widget tests or a missing config file).
    // Stay in a signed-out state instead of crashing the app.
    if (auth == null) {
      return const AuthState(initializing: false);
    }

    final subscription = auth.authStateChanges().listen(
      (user) {
        // Firebase restored a session or a sign-in just completed.
        state = AuthState(
          initializing: false,
          user: user,
          pendingPhone: user == null ? state.pendingPhone : null,
          verificationId: user == null ? state.verificationId : null,
          resendToken: user == null ? state.resendToken : null,
          sendingCode: false,
          verifying: false,
        );
      },
      onError: (Object _) {
        state = state.copyWith(
          initializing: false,
          error: 'Could not restore your session. Please sign in again.',
        );
      },
    );

    ref.onDispose(subscription.cancel);
    return const AuthState();
  }

  /// Sends an SMS OTP to [rawPhone]
  /// The number may be a local 10-digit Indian number or a full E.164 number
  /// (starting with `+`). Returns true when a code was requested/accepted
  Future<bool> sendOtp(String rawPhone) async {
    final auth = _auth;
    if (auth == null) return _fail('Firebase is not initialized.');

    final phone = _normalizePhone(rawPhone);
    if (phone == null) {
      return _fail('Enter a valid phone number.');
    }

    final samePhone = state.pendingPhone == phone;
    final resendingToken = samePhone ? state.resendToken : null;

    state = state.copyWith(
      sendingCode: true,
      verifying: false,
      error: null,
      pendingPhone: phone,
      verificationId: null,
      resendToken: resendingToken,
    );

    final completer = Completer<bool>();

    void completeOnce(bool value) {
      if (!completer.isCompleted) completer.complete(value);
    }

    try {
      await auth.verifyPhoneNumber(
        phoneNumber: phone,
        timeout: const Duration(seconds: 60),
        forceResendingToken: resendingToken,
        verificationCompleted: (PhoneAuthCredential credential) async {
          // Android can auto-retrieve the SMS and verify it instantly.
          try {
            await auth.signInWithCredential(credential);
            completeOnce(true);
          } on FirebaseAuthException catch (e) {
            state = state.copyWith(
              sendingCode: false,
              verifying: false,
              error: _mapError(e),
            );
            completeOnce(false);
          }
        },
        verificationFailed: (FirebaseAuthException e) {
          state = state.copyWith(
            sendingCode: false,
            verifying: false,
            error: _mapError(e),
          );
          completeOnce(false);
        },
        codeSent: (String verificationId, int? resendToken) {
          state = state.copyWith(
            sendingCode: false,
            verifying: false,
            verificationId: verificationId,
            resendToken: resendToken,
            error: null,
          );
          completeOnce(true);
        },
        codeAutoRetrievalTimeout: (String verificationId) {
          state = state.copyWith(verificationId: verificationId);
        },
      );
    } on FirebaseAuthException catch (e) {
      state = state.copyWith(
        sendingCode: false,
        verifying: false,
        error: _mapError(e),
      );
      completeOnce(false);
    } catch (_) {
      state = state.copyWith(
        sendingCode: false,
        verifying: false,
        error: 'Could not send the code. Check your connection and try again.',
      );
      completeOnce(false);
    }

    return completer.future.timeout(
      const Duration(seconds: 20),
      onTimeout: () {
        if (!completer.isCompleted) {
          state = state.copyWith(
            sendingCode: false,
            verifying: false,
            error: 'The request timed out. Please try again.',
          );
        }
        return false;
      },
    );
  }

  /// Confirms the SMS code for the current [AuthState.verificationId]
  Future<bool> verifyOtp(String smsCode) async {
    final auth = _auth;
    if (auth == null) return _fail('Firebase is not initialized.');

    final code = smsCode.trim();
    final verificationId = state.verificationId;

    if (verificationId == null) {
      return _fail('Request a code first.');
    }
    if (code.length < 4) {
      return _fail('Enter the code from the SMS.');
    }

    state = state.copyWith(verifying: true, sendingCode: false, error: null);

    try {
      final credential = PhoneAuthProvider.credential(
        verificationId: verificationId,
        smsCode: code,
      );
      await auth.signInWithCredential(credential);
      state = state.copyWith(
        verifying: false,
        verificationId: null,
        resendToken: null,
      );
      return true;
    } on FirebaseAuthException catch (e) {
      state = state.copyWith(verifying: false, error: _mapError(e));
      return false;
    } catch (_) {
      state = state.copyWith(
        verifying: false,
        error: 'Could not verify the code. Please try again.',
      );
      return false;
    }
  }

  /// Re-sends the code to the phone number stored in state
  Future<bool> resendOtp() async {
    final phone = state.pendingPhone;
    if (phone == null) {
      return _fail('Phone number is missing. Go back and try again.');
    }
    return sendOtp(phone);
  }

  Future<void> signOut() async {
    await _auth?.signOut();
    state = const AuthState(initializing: false);
  }

  void clearError() {
    if (state.error != null) state = state.copyWith(error: null);
  }

  FirebaseAuth? _tryFirebaseAuth() {
    try {
      return FirebaseAuth.instance;
    } catch (_) {
      return null;
    }
  }

  bool _fail(String message) {
    state = state.copyWith(
      sendingCode: false,
      verifying: false,
      error: message,
    );
    return false;
  }

  /// Normalizes a user-entered phone into E.164
  ///
  /// Supports `9876543210`, `09876543210`, `919876543210` and `+919876543210`
  String? _normalizePhone(String raw) {
    final trimmed = raw.trim();
    if (trimmed.isEmpty) return null;

    final digits = trimmed.replaceAll(RegExp(r'\D'), '');
    if (digits.isEmpty) return null;

    if (trimmed.startsWith('+')) {
      return digits.length >= 8 ? '+$digits' : null;
    }

    if (digits.startsWith('0')) {
      final local = digits.replaceFirst(RegExp(r'^0+'), '');
      return local.length >= 8 ? '$_defaultCountryCode$local' : null;
    }

    if (digits.length == 10) return '$_defaultCountryCode$digits';

    if (digits.startsWith('91') && digits.length >= 11) return '+$digits';

    return digits.length >= 8 ? '$_defaultCountryCode$digits' : null;
  }

  String _mapError(FirebaseAuthException e) {
    switch (e.code) {
      case 'invalid-phone-number':
        return 'Invalid phone number. Check the country code and digits.';
      case 'invalid-verification-code':
      case 'invalid-verification-id':
        return 'Wrong SMS code. Please try again.';
      case 'session-expired':
      case 'code-expired':
        return 'The code has expired. Request a new one.';
      case 'too-many-requests':
        return 'Too many attempts. Please wait and try again.';
      case 'quota-exceeded':
        return 'SMS quota exceeded. Please try again later.';
      case 'network-request-failed':
        return 'No internet connection.';
      case 'operation-not-allowed':
        return 'Phone sign-in is not enabled in Firebase Console.';
      case 'app-not-authorized':
        return 'This app is not authorized in Firebase. Check google-services.json and the SHA fingerprint.';
      case 'missing-client-identifier':
      case 'captcha-check-failed':
        return 'Could not verify this device. Check the SHA-1/SHA-256 in Firebase Console.';
      case 'invalid-app-credential':
        return 'Device verification failed (iOS). Check your APNs configuration.';
      default:
        return e.message ?? 'Authentication failed. Please try again.';
    }
  }
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(
  AuthNotifier.new,
);
