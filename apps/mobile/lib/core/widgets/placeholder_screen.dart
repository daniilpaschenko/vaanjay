import 'package:flutter/material.dart';

import '../theme/app_colors.dart';

/// Temporary screen shown until the real RN screen is ported.
class PlaceholderScreen extends StatelessWidget {
  const PlaceholderScreen({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Text(
          title,
          style: const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: AppColors.title,
          ),
        ),
      ),
    );
  }
}
