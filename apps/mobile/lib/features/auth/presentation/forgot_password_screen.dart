import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Forgot Password',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                color: AppColors.title,
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => context.go(RoutePaths.login),
              child: const Text('Back to Login'),
            ),
          ],
        ),
      ),
    );
  }
}
