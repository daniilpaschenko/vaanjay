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
    this.radius = AppDimens.buttonRadius,
    this.textStyle,
  });

  final String text;
  final VoidCallback? onTap;
  final EdgeInsetsGeometry padding;
  final double radius;
  final TextStyle? textStyle;

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
            borderRadius: BorderRadius.circular(radius),
          ),
          child: Text(
            text,
            style: textStyle ??
                const TextStyle(
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
