import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Back arrow used at the top of pushed screens.
class BackLink extends StatelessWidget {
  const BackLink({
    super.key,
    required this.onTap,
    this.tooltip = 'Back',
  });

  final VoidCallback onTap;
  final String tooltip;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      widthFactor: 1,
      child: IconButton(
        onPressed: onTap,
        tooltip: tooltip,
        icon: const Icon(Icons.arrow_back_rounded),
        iconSize: AppDimens.headerIconSize,
        color: AppColors.primary,
        padding: EdgeInsets.zero,
        visualDensity: VisualDensity.compact,
        constraints: const BoxConstraints(
          minWidth: AppDimens.headerIconButtonSize,
          minHeight: AppDimens.headerIconButtonSize,
        ),
      ),
    );
  }
}
