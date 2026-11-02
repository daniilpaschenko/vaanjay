import 'package:flutter_test/flutter_test.dart';

import 'package:vaanjay/features/auth/providers/auth_provider.dart';

void main() {
  group('AuthState', () {
    test('starts as an initializing guest', () {
      const state = AuthState();

      expect(state.initializing, isTrue);
      expect(state.loggedIn, isFalse);
      expect(state.busy, isFalse);
      expect(state.hasPendingCode, isFalse);
    });

    test('copyWith updates flags and preserves untouched values', () {
      const state = AuthState();

      final sending = state.copyWith(
        sendingCode: true,
        pendingPhone: '+919876543210',
      );

      expect(sending.sendingCode, isTrue);
      expect(sending.busy, isTrue);
      expect(sending.pendingPhone, '+919876543210');
      expect(sending.initializing, isTrue);

      final sent = sending.copyWith(
        sendingCode: false,
        verificationId: 'verification-id',
        resendToken: 42,
      );

      expect(sent.hasPendingCode, isTrue);
      expect(sent.resendToken, 42);
      expect(sent.pendingPhone, '+919876543210');
    });

    test('copyWith can clear nullable values', () {
      final state = const AuthState().copyWith(
        pendingPhone: '+919876543210',
        verificationId: 'verification-id',
        error: 'oops',
      );

      final cleared = state.copyWith(
        pendingPhone: null,
        verificationId: null,
        error: null,
      );

      expect(cleared.pendingPhone, isNull);
      expect(cleared.verificationId, isNull);
      expect(cleared.error, isNull);
    });
  });
}
