import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';

/// Count + label pair used in profile headers.
class StatColumn extends StatelessWidget {
  const StatColumn({
    super.key,
    required this.count,
    required this.label,
    this.color = AppColors.title,
  });

  final String count;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          count,
          style: TextStyle(
            fontSize: AppDimens.sectionTitle,
            fontWeight: FontWeight.w700,
            color: color,
          ),
        ),
        Text(
          label,
          style: const TextStyle(
            fontSize: AppDimens.sectionLabel,
            color: AppColors.navIconMuted,
          ),
        ),
      ],
    );
  }
}
