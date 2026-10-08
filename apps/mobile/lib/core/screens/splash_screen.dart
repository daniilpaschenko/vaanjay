import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../router/route_paths.dart';
import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 1500), () {
      if (mounted) context.go(RoutePaths.onboarding);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'VAANJAY',
              style: TextStyle(
                fontSize: AppDimens.splashTitle,
                fontWeight: FontWeight.w800,
                color: AppColors.title,
              ),
            ),
            const SizedBox(height: AppDimens.titleGap),
            const Text(
              'vaanjay',
              style: TextStyle(
                fontSize: AppDimens.splashTagline,
                color: AppColors.primary,
                fontFamily: 'Noto Sans Tamil',
              ),
            ),
            const SizedBox(height: AppDimens.subtitleGap),
            const Text(
              'your world, your voice',
              style: TextStyle(
                fontSize: AppDimens.bodyText,
                color: AppColors.subtitle,
                fontFamily: 'Noto Sans Tamil',
              ),
            ),
            const SizedBox(height: AppDimens.spinnerGap),
            const CircularProgressIndicator(
              color: AppColors.primary,
              strokeWidth: 4,
            ),
          ],
        ),
      ),
    );
  }
}
