import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
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
    final profile = ref.watch(currentUserProfileProvider).value;

    final fullName = profile?.fullName?.trim() ?? '';
    final username = profile?.username?.trim() ?? '';
    final bio = profile?.bio?.trim() ?? '';
    final initial = fullName.isNotEmpty
        ? fullName.substring(0, 1).toUpperCase()
        : (username.isNotEmpty ? username.substring(0, 1).toUpperCase() : '?');

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
                  AvatarCircle(
                    size: AppDimens.profileAvatar,
                    color: AppColors.border,
                    child: Text(
                      initial,
                      style: const TextStyle(
                        color: AppColors.title,
                        fontSize: 32,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  const SizedBox(width: AppDimens.settingsSectionGap),
                  const Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        StatColumn(count: '0', label: 'Posts'),
                        StatColumn(count: '0', label: 'Followers'),
                        StatColumn(count: '0', label: 'Following'),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: AppDimens.contentPadding,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    fullName.isNotEmpty ? fullName : 'Your name',
                    style: const TextStyle(
                      color: AppColors.title,
                      fontWeight: FontWeight.w600,
                      fontSize: AppDimens.rowTitle,
                    ),
                  ),
                  Text(
                    username.isNotEmpty
                        ? '@$username'
                        : (profile?.phoneNumber ?? ''),
                    style: const TextStyle(
                      color: AppColors.navIconMuted,
                      fontSize: AppDimens.sectionLabel,
                    ),
                  ),
                  if (bio.isNotEmpty) ...[
                    const SizedBox(height: AppDimens.fieldGap),
                    Text(
                      bio,
                      style: const TextStyle(
                        color: AppColors.title,
                        fontSize: AppDimens.bodyText,
                      ),
                    ),
                  ],
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
                onTap: () => context.push(RoutePaths.editProfile),
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
