import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/hover_link.dart';
import '../providers/auth_provider.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});
  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _credentialContoller = TextEditingController();
  final _passwordController = TextEditingController();
  String? _error;
  bool _loading = false;

  Future<void> _login() async {
    setState(() {
      _error = null;
      _loading = true;
    });
    try {} catch (e) {
      setState(() => _error = 'Login failed');
    } finally {
      setState(() => _loading = false);
      ref.read(authProvider.notifier).signIn();
    }
  }

  @override
  Widget build(BuildContext context) {
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
                    'Sign in to continue',
                    style: TextStyle(
                      fontSize: AppDimens.bodyText,
                      color: AppColors.subtitle,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppDimens.sectionGap),

              // form
              TextField(
                controller: _credentialContoller,
                autocorrect: false,
                style: const TextStyle(
                  fontSize: AppDimens.inputText,
                  color: AppColors.title,
                ),
                decoration: InputDecoration(
                  hintText: 'Username, email, or phone',
                  hintStyle: const TextStyle(color: AppColors.hint),
                  filled: true,
                  fillColor: AppColors.fieldBackground,
                  contentPadding:
                      const EdgeInsets.all(AppDimens.fieldPadding),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppDimens.inputRadius),
                    borderSide: const BorderSide(color: AppColors.border),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppDimens.inputRadius),
                    borderSide: const BorderSide(color: AppColors.border),
                  ),
                ),
              ),
              const SizedBox(height: AppDimens.formGap),
              TextField(
                controller: _passwordController,
                obscureText: true,
                style: const TextStyle(
                  fontSize: AppDimens.inputText,
                  color: AppColors.title,
                ),
                decoration: InputDecoration(
                  hintText: 'Password',
                  hintStyle: const TextStyle(color: AppColors.hint),
                  filled: true,
                  fillColor: AppColors.fieldBackground,
                  contentPadding:
                      const EdgeInsets.all(AppDimens.fieldPadding),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppDimens.inputRadius),
                    borderSide: const BorderSide(color: AppColors.border),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(AppDimens.inputRadius),
                    borderSide: const BorderSide(color: AppColors.border),
                  ),
                ),
              ),

              if (_error != null) ...[
                const SizedBox(height: AppDimens.formGap),
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: AppDimens.bodyText,
                    color: AppColors.error,
                  ),
                ),
              ],

              const SizedBox(height: AppDimens.buttonGap),
              GestureDetector(
                onTap: _loading ? null : _login,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(vertical: AppDimens.buttonPadding),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius:
                        BorderRadius.circular(AppDimens.buttonRadius),
                  ),
                  child: Text(
                    _loading ? 'Signing in...' : 'Sign In',
                    style: const TextStyle(
                      fontSize: AppDimens.buttonText,
                      fontWeight: FontWeight.w600,
                      color: AppColors.onPrimary,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: AppDimens.formGap),
                HoverLink(
                  text: 'Use OTP instead',
                  onTap: () => context.go(RoutePaths.otpVerify),
                  padding:
                      const EdgeInsets.symmetric(vertical: AppDimens.linkPadding),
                ),
                const SizedBox(height: AppDimens.formGap),
                HoverLink(
                  text: 'Forgot password?',
                  onTap: () => context.go(RoutePaths.forgotPassword),
                  padding:
                      const EdgeInsets.symmetric(vertical: AppDimens.linkPadding),
                ),

              const SizedBox(height: AppDimens.formGap),
              Padding(
                padding: const EdgeInsets.symmetric(
                    vertical: AppDimens.dividerPadding),
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        height: AppDimens.dividerLineHeight,
                        color: AppColors.border,
                      ),
                    ),
                    const SizedBox(width: AppDimens.dividerPartGap),
                    const Text(
                      'or',
                      style: TextStyle(
                        fontSize: AppDimens.caption,
                        color: AppColors.hint,
                      ),
                    ),
                    const SizedBox(width: AppDimens.dividerPartGap),
                    Expanded(
                      child: Container(
                        height: AppDimens.dividerLineHeight,
                        color: AppColors.border,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: AppDimens.formGap),
              HoverLink(
                text: 'Create new account',
                onTap: () => context.go(RoutePaths.register),
                style: const TextStyle(
                  fontSize: AppDimens.bodyText,
                  fontWeight: FontWeight.w600,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
