import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

enum SegmentedTabsStyle { underline, pill }

/// Horizontal tab selector used by profile and payment screens.
class SegmentedTabs extends StatelessWidget {
  const SegmentedTabs({
    super.key,
    required this.labels,
    required this.selectedIndex,
    required this.onChanged,
    this.style = SegmentedTabsStyle.underline,
  });

  final List<String> labels;
  final int selectedIndex;
  final ValueChanged<int> onChanged;
  final SegmentedTabsStyle style;

  @override
  Widget build(BuildContext context) {
    return switch (style) {
      SegmentedTabsStyle.underline => _buildUnderline(),
      SegmentedTabsStyle.pill => _buildPill(),
    };
  }

  Widget _buildUnderline() {
    return Container(
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          for (var i = 0; i < labels.length; i++)
            Expanded(
              child: GestureDetector(
                behavior: HitTestBehavior.opaque,
                onTap: () => onChanged(i),
                child: Container(
                  alignment: Alignment.center,
                  padding: const EdgeInsets.symmetric(
                    vertical: AppDimens.tabVPadding,
                  ),
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                        color: i == selectedIndex
                            ? AppColors.primary
                            : Colors.transparent,
                        width: 2,
                      ),
                    ),
                  ),
                  child: Text(
                    labels[i],
                    style: TextStyle(
                      fontSize: AppDimens.bodyText,
                      fontWeight:
                          i == selectedIndex ? FontWeight.w600 : FontWeight.w500,
                      color: i == selectedIndex
                          ? AppColors.primary
                          : AppColors.navIconMuted,
                    ),
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildPill() {
    return Row(
      children: [
        for (var i = 0; i < labels.length; i++) ...[
          if (i > 0) const SizedBox(width: AppDimens.fieldGap),
          Expanded(
            child: GestureDetector(
              behavior: HitTestBehavior.opaque,
              onTap: () => onChanged(i),
              child: Container(
                alignment: Alignment.center,
                padding: const EdgeInsets.symmetric(
                  vertical: AppDimens.tabVPadding,
                ),
                decoration: BoxDecoration(
                  color: i == selectedIndex
                      ? AppColors.primary
                      : AppColors.borderSubtle,
                  borderRadius:
                      BorderRadius.circular(AppDimens.cardRadiusTiny),
                ),
                child: Text(
                  labels[i],
                  style: TextStyle(
                    fontSize: AppDimens.bodyText,
                    fontWeight:
                        i == selectedIndex ? FontWeight.w600 : FontWeight.w500,
                    color: i == selectedIndex
                        ? AppColors.onPrimary
                        : AppColors.navIconMuted,
                  ),
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}
