import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/primary_button.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  static const _countryCode = '+91';

  final _phoneController = TextEditingController();
  bool _navigating = false;

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  Future<void> _sendOtp() async {
    final digits = _phoneController.text.trim();
    if (digits.length != 10) return;

    final phone = '$_countryCode$digits';
    final ok = await ref.read(authProvider.notifier).sendOtp(phone);
    if (!mounted || !ok) return;

    final auth = ref.read(authProvider);
    // If Firebase auto-verified the device, the router already redirected to home
    // Otherwise move on to the SMS code screen
    if (auth.verificationId != null && !auth.loggedIn) {
      setState(() => _navigating = true);
      await context.push(
        '${RoutePaths.otpVerify}?phone=${Uri.encodeComponent(phone)}',
      );
      if (mounted) setState(() => _navigating = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = ref.watch(authProvider);
    final digits = _phoneController.text.replaceAll(RegExp(r'\D'), '');
    final canSubmit = digits.length == 10 && !auth.busy && !_navigating;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppDimens.screenPadding),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // header
              Column(
                children: const [
                  Text(
                    'VAANJAY',
                    style: TextStyle(
                      fontSize: AppDimens.displayTitle,
                      fontWeight: FontWeight.w800,
                      color: AppColors.title,
                    ),
                  ),
                  SizedBox(height: AppDimens.titleGap),
                  Text(
                    'vaanjay',
                    style: TextStyle(
                      fontSize: AppDimens.taglineLarge,
                      color: AppColors.primary,
                      fontFamily: 'Noto Sans Tamil',
                    ),
                  ),
                  SizedBox(height: AppDimens.subtitleGap),
                  Text(
                    'Sign in with your phone number',
                    style: TextStyle(
                      fontSize: AppDimens.bodyText,
                      color: AppColors.subtitle,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppDimens.sectionGap),

              // phone number field with +91 prefix
              Row(
                children: [
                  Container(
                    height: 52,
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: AppColors.fieldBackground,
                      borderRadius:
                          BorderRadius.circular(AppDimens.inputRadius),
                      border: Border.all(color: AppColors.border),
                    ),
                    child: const Text(
                      _countryCode,
                      style: TextStyle(
                        fontSize: AppDimens.inputText,
                        fontWeight: FontWeight.w600,
                        color: AppColors.title,
                      ),
                    ),
                  ),
                  const SizedBox(width: AppDimens.otpBoxGap),
                  Expanded(
                    child: AppTextField(
                      controller: _phoneController,
                      hint: '98765 43210',
                      keyboardType: TextInputType.phone,
                      textInputAction: TextInputAction.done,
                      autofocus: true,
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly,
                        LengthLimitingTextInputFormatter(10),
                      ],
                      onChanged: (_) => setState(() {}),
                      onSubmitted: (_) => _sendOtp(),
                    ),
                  ),
                ],
              ),

              if (auth.error != null) ...[
                const SizedBox(height: AppDimens.formGap),
                Text(
                  auth.error!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: AppDimens.bodyText,
                    color: AppColors.error,
                  ),
                ),
              ],

              const SizedBox(height: AppDimens.buttonGap),
              PrimaryButton(
                text: auth.sendingCode
                    ? 'Sending code...'
                    : _navigating
                        ? 'Opening...'
                        : 'Send OTP',
                onTap: canSubmit ? _sendOtp : null,
              ),
              const SizedBox(height: AppDimens.formGap),
              const Text(
                'We will send a 6-digit code to this number. '
                'New numbers are registered automatically.',
                textAlign: TextAlign.center,
                style: TextStyle(
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
