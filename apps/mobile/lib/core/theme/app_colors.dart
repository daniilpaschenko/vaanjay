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

  /// Bottom tab bar icons.
  static const navIconBackground = Color(0xFFF1F5F9);
  static const navIconMuted = Color(0xFF64748B);

  /// Onboarding pagination dot, inactive state.
  static const dotInactive = Color(0xFFCBD5E1);

  /// Onboarding icon badge surface.
  static const iconBackground = Color(0xFFEEF2FF);

  /// Softer borders / row separators (lighter than [border]).
  static const borderSubtle = Color(0xFFF1F5F9);

  /// Body copy inside cards and captions.
  static const body = Color(0xFF334155);

  /// Online indicator, success states.
  static const success = Color(0xFF16A34A);

  /// Border of highlighted (primary-tinted) cards.
  static const primaryBorder = Color(0xFFC7D2FE);

  /// Destructive surfaces (log out, end call).
  static const errorBackground = Color(0xFFFEF2F2);
  static const errorBorder = Color(0xFFFECACA);

  /// Dark surfaces used by call, live and reels screens.
  static const darkBackground = Color(0xFF0F172A);
  static const darkSurface = Color(0xFF1E293B);
  static const darkSurfaceAlt = Color(0xFF334155);
  static const darkMuted = Color(0xFF94A3B8);
  static const darkText = Color(0xFFF1F5F9);
  static const linkOnDark = Color(0xFF60A5FA);

  /// Translucent overlays.
  static const overlayLight = Color(0x1AFFFFFF); // white @ 10%
  static const overlayLightStrong = Color(0x26FFFFFF); // white @ 15%
  static const overlayMedium = Color(0x4DFFFFFF); // white @ 30%
  static const overlayPrimary = Color(0x4D2563EB); // primary @ 30%
  static const overlayError = Color(0x33DC2626); // error @ 20%
}
