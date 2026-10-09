import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Left-aligned "Back" text link used at the top of pushed screens.
class BackLink extends StatelessWidget {
  const BackLink({
    super.key,
    required this.onTap,
    this.text = 'Back',
  });

  final VoidCallback onTap;
  final String text;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      widthFactor: 1,
      child: InkWell(
        borderRadius: BorderRadius.circular(AppDimens.linkRadius),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: AppDimens.linkPadding,
            vertical: AppDimens.linkPadding,
          ),
          child: Text(
            text,
            style: const TextStyle(
              fontSize: AppDimens.buttonText,
              fontWeight: FontWeight.w500,
              color: AppColors.primary,
            ),
          ),
        ),
      ),
    );
  }
}
