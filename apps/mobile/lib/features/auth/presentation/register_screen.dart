import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/hover_link.dart';
import '../providers/auth_provider.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});
  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _usernameController = TextEditingController();
  final _fullNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  String? _error;
  bool _loading = false;

  Future<void> _register() async {
    setState(() {
      _error = null;
      _loading = true;
    });
    try {} catch (e) {
      setState(() => _error = 'Registration failed');
    } finally {
      setState(() => _loading = false);
      ref.read(authProvider.notifier).signIn();
    }
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _fullNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      resizeToAvoidBottomInset: true,
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
                      fontSize: AppDimens.displayTitleSmall,
                      fontWeight: FontWeight.w800,
                      color: AppColors.title,
                    ),
                  ),
                  SizedBox(height: AppDimens.titleGap),
                  Text(
                    'vaanjay - new account',
                    style: TextStyle(
                      fontSize: AppDimens.tagline,
                      color: AppColors.primary,
                      fontFamily: 'Noto Sans Tamil',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppDimens.headerGap),

              // form
              _Field(
                controller: _usernameController,
                hint: 'Username',
              ),
              const SizedBox(height: AppDimens.registerFormGap),
              _Field(
                controller: _fullNameController,
                hint: 'Full Name',
              ),
              const SizedBox(height: AppDimens.registerFormGap),
              _Field(
                controller: _emailController,
                hint: 'Email',
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: AppDimens.registerFormGap),
              _Field(
                controller: _phoneController,
                hint: 'Phone Number',
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: AppDimens.registerFormGap),
              _Field(
                controller: _passwordController,
                hint: 'Password',
                obscure: true,
              ),

              if (_error != null) ...[
                const SizedBox(height: AppDimens.registerFormGap),
                Text(
                  _error!,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: AppDimens.bodyText,
                    color: AppColors.error,
                  ),
                ),
              ],

              const SizedBox(height: AppDimens.registerButtonGap),
              GestureDetector(
                onTap: _loading ? null : _register,
                child: Container(
                  padding: const EdgeInsets.all(AppDimens.buttonPadding),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius:
                        BorderRadius.circular(AppDimens.buttonRadius),
                  ),
                  child: Text(
                    _loading ? 'Creating...' : 'Create Account',
                    style: const TextStyle(
                      fontSize: AppDimens.buttonText,
                      fontWeight: FontWeight.w600,
                      color: AppColors.onPrimary,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: AppDimens.registerLinkGap),
              HoverLink(
                text: 'Already have an account? Sign in',
                onTap: () => context.go(RoutePaths.login),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Field extends StatelessWidget {
  const _Field({
    required this.controller,
    required this.hint,
    this.keyboardType,
    this.obscure = false,
  });

  final TextEditingController controller;
  final String hint;
  final TextInputType? keyboardType;
  final bool obscure;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscure,
      autocorrect: false,
      style: const TextStyle(
        fontSize: AppDimens.inputText,
        color: AppColors.title,
      ),
      decoration: InputDecoration(
        hintText: hint,
        hintStyle: const TextStyle(color: AppColors.hint),
        filled: true,
        fillColor: AppColors.fieldBackground,
        contentPadding: const EdgeInsets.all(AppDimens.fieldPadding),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppDimens.inputRadius),
          borderSide: const BorderSide(color: AppColors.border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(AppDimens.inputRadius),
          borderSide: const BorderSide(color: AppColors.border),
        ),
      ),
    );
  }
}
