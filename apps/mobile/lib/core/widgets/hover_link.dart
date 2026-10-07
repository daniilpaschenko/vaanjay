import 'package:flutter/material.dart';

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
    final effectiveStyle =
        style ?? const TextStyle(fontSize: 14, color: Color(0xFF2563EB));
    final tp = TextPainter(
      text: TextSpan(text: text, style: effectiveStyle),
      textDirection: Directionality.of(context),
      textScaler: MediaQuery.textScalerOf(context),
    )..layout();
    return Center(
      child: InkWell(
        borderRadius: BorderRadius.circular(8),
        onTap: onTap,
        child: Padding(
          padding:
              padding.add(EdgeInsets.symmetric(horizontal: tp.width * 0.06)),
          child: Text(text, style: effectiveStyle),
        ),
      ),
    );
  }
}
