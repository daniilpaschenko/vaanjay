import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Outlined / tinted button used for secondary actions.
class SecondaryButton extends StatelessWidget {
  const SecondaryButton({
    super.key,
    required this.text,
    required this.onTap,
    this.padding = const EdgeInsets.all(AppDimens.buttonPadding),
    this.backgroundColor = AppColors.background,
    this.borderColor = AppColors.border,
    this.textColor = AppColors.primary,
    this.radius = AppDimens.buttonRadius,
    this.fontSize = AppDimens.rowTitle,
    this.fontWeight = FontWeight.w600,
  });

  final String text;
  final VoidCallback onTap;
  final EdgeInsetsGeometry padding;
  final Color backgroundColor;
  final Color borderColor;
  final Color textColor;
  final double radius;
  final double fontSize;
  final FontWeight fontWeight;

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
            color: backgroundColor,
            borderRadius: BorderRadius.circular(radius),
            border: Border.all(color: borderColor),
          ),
          child: Text(
            text,
            style: TextStyle(
              color: textColor,
              fontSize: fontSize,
              fontWeight: fontWeight,
            ),
          ),
        ),
      ),
    );
  }
}
