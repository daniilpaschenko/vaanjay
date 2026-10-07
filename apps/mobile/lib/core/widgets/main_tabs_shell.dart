import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Bottom tab shell from RN `RootNavigator`
class MainTabsShell extends StatelessWidget {
  const MainTabsShell({super.key, required this.shell});

  final StatefulNavigationShell shell;

  /// First letters of the tab labels, same order as the shell branches
  static const _tabIcons = ['H', 'V', 'C', 'E', 'N', 'M'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: shell,
      bottomNavigationBar: Container(
        height: AppDimens.tabBarHeight,
        padding: const EdgeInsets.symmetric(vertical: AppDimens.tabBarPadding),
        decoration: const BoxDecoration(
          color: AppColors.background,
          border: Border(
            top: BorderSide(
              color: AppColors.border,
              width: AppDimens.tabBorderWidth,
            ),
          ),
        ),
        child: Row(
          children: [
            for (var i = 0; i < _tabIcons.length; i++)
              Expanded(
                child: GestureDetector(
                  behavior: HitTestBehavior.opaque,
                  onTap: () => shell.goBranch(
                    i,
                    initialLocation: i == shell.currentIndex,
                  ),
                  child: Center(
                    child: _TabIcon(
                      letter: _tabIcons[i],
                      active: shell.currentIndex == i,
                    ),
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class _TabIcon extends StatelessWidget {
  const _TabIcon({required this.letter, required this.active});

  final String letter;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: AppDimens.tabIconSize,
      height: AppDimens.tabIconSize,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: active ? AppColors.primary : AppColors.navIconBackground,
        borderRadius: BorderRadius.circular(AppDimens.tabIconRadius),
      ),
      child: Text(
        letter,
        style: TextStyle(
          fontSize: AppDimens.bodyText,
          fontWeight: FontWeight.w700,
          color: active ? AppColors.onPrimary : AppColors.navIconMuted,
        ),
      ),
    );
  }
}
