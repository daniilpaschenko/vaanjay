import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/secondary_button.dart';
import '../../../core/widgets/segmented_tabs.dart';
import '../providers/profile_provider.dart';
import '../widgets/profile_placeholder_grid.dart';
import '../widgets/stat_column.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  static const _tabs = ['Posts', 'Reels', 'Tagged'];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tabIndex = ref.watch(profileProvider).tab.index;
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const Padding(
              padding: EdgeInsets.only(top: AppDimens.screenTopInset),
            ),
            Padding(
              padding: const EdgeInsets.all(AppDimens.contentPadding),
              child: Row(
                children: [
                  const AvatarCircle(
                    size: AppDimens.profileAvatar,
                    color: AppColors.border,
                  ),
                  const SizedBox(width: AppDimens.settingsSectionGap),
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: const [
                        StatColumn(count: '0', label: 'Posts'),
                        StatColumn(count: '0', label: 'Followers'),
                        StatColumn(count: '0', label: 'Following'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(
                horizontal: AppDimens.contentPadding,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Full Name',
                    style: TextStyle(
                      color: AppColors.title,
                      fontWeight: FontWeight.w600,
                      fontSize: AppDimens.rowTitle,
                    ),
                  ),
                  Text(
                    '@username',
                    style: TextStyle(
                      color: AppColors.navIconMuted,
                      fontSize: AppDimens.sectionLabel,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppDimens.contentPadding),
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: AppDimens.contentPadding,
              ),
              child: SecondaryButton(
                text: 'Edit Profile',
                onTap: () {},
                backgroundColor: AppColors.borderSubtle,
                borderColor: AppColors.border,
                textColor: AppColors.title,
                fontSize: AppDimens.bodyText,
                padding: const EdgeInsets.all(AppDimens.fieldGap),
              ),
            ),
            const SizedBox(height: AppDimens.fieldGap),
            SegmentedTabs(
              labels: _tabs,
              selectedIndex: tabIndex,
              onChanged: (index) => ref
                  .read(profileProvider.notifier)
                  .setTab(ProfileTab.values[index]),
            ),
            const ProfilePlaceholderGrid(),
          ],
        ),
      ),
    );
  }
}
