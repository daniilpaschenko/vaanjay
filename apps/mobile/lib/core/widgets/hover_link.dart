import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

class HoverLink extends StatelessWidget {
  const HoverLink({
    super.key,
    required this.text,
    required this.onTap,
    this.style,
    this.padding = EdgeInsets.zero,
  });

  final String text;
  final VoidCallback onTap;
  final TextStyle? style;
  final EdgeInsetsGeometry padding;

  @override
  Widget build(BuildContext context) {
    final effectiveStyle = style ??
        const TextStyle(
          fontSize: AppDimens.bodyText,
          color: AppColors.primary,
        );
    final tp = TextPainter(
      text: TextSpan(text: text, style: effectiveStyle),
      textDirection: Directionality.of(context),
      textScaler: MediaQuery.textScalerOf(context),
    )..layout();
    return Center(
      child: InkWell(
        borderRadius: BorderRadius.circular(AppDimens.linkRadius),
        onTap: onTap,
        child: Padding(
          padding: padding.add(EdgeInsets.symmetric(
              horizontal: tp.width * AppDimens.linkWidthFactor)),
          child: Text(text, style: effectiveStyle),
        ),
      ),
    );
  }
}
