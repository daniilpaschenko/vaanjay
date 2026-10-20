import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/back_link.dart';
import '../../../core/widgets/hover_link.dart';
import '../../../core/widgets/primary_button.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _emailController = TextEditingController();
  bool _sent = false;
  bool _loading = false;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _reset() async {
    setState(() => _loading = true);
    try {
      await Future<void>.delayed(const Duration(seconds: 1));
      if (mounted) setState(() => _sent = true);
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      resizeToAvoidBottomInset: true,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppDimens.screenPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: AppDimens.forgotBackTopGap),
              BackLink(onTap: () => context.go(RoutePaths.login)),
              const SizedBox(height: AppDimens.forgotBackBottomGap),
              if (!_sent) _buildForm() else _buildSent(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildForm() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text(
          'Forgot Password',
          style: TextStyle(
            fontSize: AppDimens.forgotTitle,
            fontWeight: FontWeight.w700,
            color: AppColors.title,
          ),
        ),
        const SizedBox(height: AppDimens.forgotContentGap),
        const Text(
          'Enter your email address and we will send you a reset link.',
          style: TextStyle(
            fontSize: AppDimens.forgotSubtitle,
            height: AppDimens.forgotSubtitleLineHeight / AppDimens.forgotSubtitle,
            color: AppColors.subtitle,
          ),
        ),
        const SizedBox(height: AppDimens.forgotContentGap),
        AppTextField(
          controller: _emailController,
          hint: 'Email address',
          keyboardType: TextInputType.emailAddress,
        ),
        const SizedBox(height: AppDimens.forgotButtonTopGap),
        PrimaryButton(
          text: _loading ? 'Sending...' : 'Send Reset Link',
          onTap: _loading ? null : _reset,
        ),
      ],
    );
  }

  Widget _buildSent() {
    return Column(
      children: [
        const SizedBox(height: AppDimens.sentContainerTopGap),
        Container(
          width: AppDimens.sentIconSize,
          height: AppDimens.sentIconSize,
          decoration: const BoxDecoration(
            color: AppColors.iconBackground,
            shape: BoxShape.circle,
          ),
          alignment: Alignment.center,
          child: const Text(
            'V',
            style: TextStyle(
              fontSize: AppDimens.sentIconText,
              fontWeight: FontWeight.w700,
              color: AppColors.primary,
            ),
          ),
        ),
        const SizedBox(height: AppDimens.sentGap),
        const Text(
          'Email Sent',
          style: TextStyle(
            fontSize: AppDimens.sentTitle,
            fontWeight: FontWeight.w700,
            color: AppColors.title,
          ),
        ),
        const SizedBox(height: AppDimens.sentGap),
        Text(
          'If an account exists with ${_emailController.text}, you will receive '
          'a password reset link shortly.',
          textAlign: TextAlign.center,
          style: const TextStyle(
            fontSize: AppDimens.sentText,
            height: AppDimens.sentTextLineHeight / AppDimens.sentText,
            color: AppColors.subtitle,
          ),
        ),
        const SizedBox(height: AppDimens.loginLinkTopGap),
        HoverLink(
          text: 'Return to Sign In',
          onTap: () => context.go(RoutePaths.login),
          style: const TextStyle(
            fontSize: AppDimens.buttonText,
            fontWeight: FontWeight.w600,
            color: AppColors.primary,
          ),
        ),
      ],
    );
  }
}
