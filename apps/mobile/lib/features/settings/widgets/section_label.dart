import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';

/// Uppercase group label used above settings sections.
class SectionLabel extends StatelessWidget {
  const SectionLabel(this.text, {super.key});

  final String text;

  @override
  Widget build(BuildContext context) {
    return Text(
      text.toUpperCase(),
      style: const TextStyle(
        fontSize: AppDimens.sectionLabel,
        fontWeight: FontWeight.w600,
        color: AppColors.navIconMuted,
        letterSpacing: 1,
      ),
    );
  }
}
