import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Plain centered empty-state used by list screens.
class EmptyState extends StatelessWidget {
  const EmptyState({
    super.key,
    required this.title,
    this.subtitle,
    this.titleColor = AppColors.title,
    this.subtitleColor = AppColors.subtitle,
  });

  final String title;
  final String? subtitle;
  final Color titleColor;
  final Color subtitleColor;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppDimens.contentPadding,
          vertical: AppDimens.emptyTopGap,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              title,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: AppDimens.sectionTitle,
                fontWeight: FontWeight.w600,
                color: titleColor,
              ),
            ),
            if (subtitle != null) ...[
              const SizedBox(height: AppDimens.fieldGap),
              Text(
                subtitle!,
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: AppDimens.bodyText,
                  color: subtitleColor,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
