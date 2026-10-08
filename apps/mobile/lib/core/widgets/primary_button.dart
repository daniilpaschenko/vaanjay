import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.text,
    required this.onTap,
    this.padding = const EdgeInsets.symmetric(
        vertical: AppDimens.buttonPadding),
  });

  final String text;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      cursor: SystemMouseCursors.click,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: padding,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: AppColors.primary,
            borderRadius: BorderRadius.circular(AppDimens.buttonRadius),
          ),
          child: Text(
            text,
            style: const TextStyle(
              fontSize: AppDimens.buttonText,
              fontWeight: FontWeight.w600,
              color: AppColors.onPrimary,
            ),
          ),
        ),
      ),
    );
  }
}
