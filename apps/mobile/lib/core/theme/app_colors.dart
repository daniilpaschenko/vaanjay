import 'package:flutter/material.dart';

abstract final class AppColors {
  /// Page background and text on top of [primary]
  static const background = Color(0xFFFFFFFF);
  static const onPrimary = background;

  /// Brand blue — buttons, links, tagline
  static const primary = Color(0xFF2563EB);

  /// Headings and input text
  static const title = Color(0xFF0F172A);

  /// Secondary text (subtitles, descriptions).
  static const subtitle = Color(0xFF475569);

  /// Placeholder text and muted captions.
  static const hint = Color(0xFF94A3B8);

  /// Input fill and other subtle surfaces
  static const fieldBackground = Color(0xFFF8FAFC);

  /// Input borders and dividers
  static const border = Color(0xFFE2E8F0);

  /// Validation errors
  static const error = Color(0xFFDC2626);
}
