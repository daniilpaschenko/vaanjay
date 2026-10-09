import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Small caption above a form input.
class LabeledField extends StatelessWidget {
  const LabeledField({
    super.key,
    required this.label,
    required this.child,
    this.labelColor = AppColors.subtitle,
  });

  final String label;
  final Widget child;
  final Color labelColor;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text(
          label,
          style: TextStyle(
            color: labelColor,
            fontSize: AppDimens.sectionLabel,
            fontWeight: FontWeight.w500,
          ),
        ),
        const SizedBox(height: AppDimens.fieldGap),
        child,
      ],
    );
  }
}
