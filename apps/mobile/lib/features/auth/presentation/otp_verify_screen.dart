import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/hover_link.dart';
import '../providers/auth_provider.dart';

class OTPVerifyScreen extends ConsumerStatefulWidget {
  const OTPVerifyScreen({super.key, this.phone = ''});

  final String phone;

  @override
  ConsumerState<OTPVerifyScreen> createState() => _OTPVerifyScreenState();
}

class _OTPVerifyScreenState extends ConsumerState<OTPVerifyScreen> {
  static const _codeLength = 6;
  static const _resendSeconds = 30;

  final _controllers =
      List.generate(_codeLength, (_) => TextEditingController());
  final _focusNodes = List.generate(_codeLength, (_) => FocusNode());

  Timer? _timer;
  int _secondsLeft = _resendSeconds;
  String? _localError;
  bool _submitting = false;

  bool get _canResend => _secondsLeft == 0 && !_submitting;

  String get _phone => ref.read(authProvider).pendingPhone ?? widget.phone;

  String get _subtitle => _phone.isEmpty
      ? 'Enter the 6-digit code sent to your phone'
      : 'Enter the 6-digit code sent to $_phone';

  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    for (final controller in _controllers) {
      controller.dispose();
    }
    for (final focusNode in _focusNodes) {
      focusNode.dispose();
    }
    super.dispose();
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() => _secondsLeft = _resendSeconds);
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_secondsLeft <= 1) {
        timer.cancel();
        setState(() => _secondsLeft = 0);
      } else {
        setState(() => _secondsLeft--);
      }
    });
  }

  void _onDigitChanged(String value, int index) {
    if (value.isNotEmpty && index < _codeLength - 1) {
      _focusNodes[index + 1].requestFocus();
    } else if (value.isEmpty && index > 0) {
      _focusNodes[index - 1].requestFocus();
    }

    final code = _controllers.map((controller) => controller.text).join();
    if (code.length == _codeLength &&
        _controllers.every((controller) => controller.text.isNotEmpty)) {
      _verify(code);
    }
  }

  Future<void> _verify(String code) async {
    if (_submitting) return;
    setState(() {
      _localError = null;
      _submitting = true;
    });

    final ok = await ref.read(authProvider.notifier).verifyOtp(code);
    if (!mounted) return;

    setState(() => _submitting = false);
    if (!ok) {
      for (final controller in _controllers) {
        controller.clear();
      }
      _focusNodes.first.requestFocus();
    }
    // On success Firebase emits a signed-in user and the router redirects home
  }

  Future<void> _resend() async {
    if (!_canResend) return;

    for (final controller in _controllers) {
      controller.clear();
    }
    _focusNodes.first.requestFocus();

    setState(() {
      _localError = null;
      _submitting = true;
    });

    final phone = _phone;
    if (phone.isEmpty) {
      setState(() {
        _submitting = false;
        _localError = 'Phone number is missing. Go back and try again.';
      });
      return;
    }

    final ok = await ref.read(authProvider.notifier).sendOtp(phone);
    if (!mounted) return;

    setState(() => _submitting = false);
    if (ok) _startTimer();
  }

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authProvider);
    final error = _localError ?? auth.error;
    final busy = _submitting || auth.busy;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppDimens.screenPadding),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Verify OTP',
                style: TextStyle(
                  fontSize: AppDimens.otpTitle,
                  fontWeight: FontWeight.w700,
                  color: AppColors.title,
                ),
              ),
              const SizedBox(height: AppDimens.otpTitleGap),
              Text(
                _subtitle,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: AppDimens.bodyText,
                  color: AppColors.subtitle,
                ),
              ),
              const SizedBox(height: AppDimens.otpSubtitleGap),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (var i = 0; i < _codeLength; i++) ...[
                    if (i > 0) const SizedBox(width: AppDimens.otpBoxGap),
                    SizedBox(
                      width: AppDimens.otpBoxWidth,
                      height: AppDimens.otpBoxHeight,
                      child: AppTextField(
                        controller: _controllers[i],
                        focusNode: _focusNodes[i],
                        keyboardType: TextInputType.number,
                        textAlign: TextAlign.center,
                        maxLength: 1,
                        textInputAction: TextInputAction.next,
                        contentPadding: EdgeInsets.zero,
                        borderColor: _controllers[i].text.isEmpty
                            ? AppColors.border
                            : AppColors.primary,
                        textStyle: const TextStyle(
                          fontSize: AppDimens.otpDigit,
                          fontWeight: FontWeight.w600,
                          color: AppColors.title,
                        ),
                        inputFormatters: [
                          FilteringTextInputFormatter.digitsOnly,
                        ],
                        onChanged: (value) => _onDigitChanged(value, i),
                      ),
                    ),
                  ],
                ],
              ),
              const SizedBox(height: AppDimens.otpBoxesBottomGap),
              if (busy) ...[
                const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: AppColors.primary,
                  ),
                ),
                const SizedBox(height: AppDimens.otpErrorBottomGap),
              ],
              if (error != null) ...[
                Text(
                  error,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: AppDimens.bodyText,
                    color: AppColors.error,
                  ),
                ),
                const SizedBox(height: AppDimens.otpErrorBottomGap),
              ],
              HoverLink(
                text: _canResend ? 'Resend OTP' : 'Resend in ${_secondsLeft}s',
                onTap: _canResend ? _resend : () {},
                style: TextStyle(
                  fontSize: AppDimens.bodyText,
                  color: _canResend ? AppColors.primary : AppColors.hint,
                ),
              ),
              const SizedBox(height: AppDimens.formGap),
              HoverLink(
                text: 'Change number',
                onTap: () => context.pop(),
                style: const TextStyle(
                  fontSize: AppDimens.caption,
                  color: AppColors.hint,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
