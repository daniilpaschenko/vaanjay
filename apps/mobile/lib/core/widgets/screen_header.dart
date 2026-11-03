import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Top bar shared by pushed screens: optional leading slot, flexible title and
/// optional trailing slot, with a bottom divider.
class ScreenHeader extends StatelessWidget {
  const ScreenHeader({
    super.key,
    this.leading,
    this.title,
    this.trailing,
    this.centerTitle = false,
    this.borderColor = AppColors.borderSubtle,
    this.paddingTop = AppDimens.screenTopInset,
    this.paddingBottom = AppDimens.homeHeaderBottomGap,
  });

  final Widget? leading;
  final Widget? title;
  final Widget? trailing;

  /// Centers the title between fixed-width side slots, so it stays in the
  /// middle of the screen regardless of the leading/trailing widget widths.
  final bool centerTitle;

  final Color borderColor;
  final double paddingTop;
  final double paddingBottom;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        top: paddingTop,
        bottom: paddingBottom,
        left: AppDimens.headerHPadding,
        right: AppDimens.headerHPadding,
      ),
      decoration: BoxDecoration(
        color: AppColors.background,
        border: Border(
          bottom: BorderSide(color: borderColor, width: AppDimens.borderWidth),
        ),
      ),
      child: centerTitle ? _buildCenteredRow() : _buildRow(),
    );
  }

  Widget _buildRow() {
    return Row(
      children: [
        ?leading,
        if (title != null) ...[
          if (leading != null) const SizedBox(width: AppDimens.listGap),
          Expanded(child: title!),
        ] else
          const Spacer(),
        ?trailing,
      ],
    );
  }

  Widget _buildCenteredRow() {
    return Row(
      children: [
        SizedBox(
          width: AppDimens.headerIconButtonSize,
          child: leading == null
              ? null
              : Align(alignment: Alignment.centerLeft, child: leading),
        ),
        Expanded(
          child: title == null ? const SizedBox.shrink() : Center(child: title),
        ),
        SizedBox(
          width: AppDimens.headerIconButtonSize,
          child: trailing == null
              ? null
              : Align(alignment: Alignment.centerRight, child: trailing),
        ),
      ],
    );
  }
}
