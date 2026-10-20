import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/back_link.dart';
import '../../../core/widgets/screen_header.dart';
import '../../../core/widgets/segmented_tabs.dart';
import '../providers/other_user_profile_provider.dart';
import '../widgets/profile_placeholder_grid.dart';
import '../widgets/stat_column.dart';

class OtherUserProfileScreen extends ConsumerWidget {
  const OtherUserProfileScreen({super.key, this.username = 'unknown'});

  final String username;

  static const _tabs = ['Posts', 'Reels'];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profileState = ref.watch(otherUserProfileProvider);
    final isFollowing = profileState.isFollowing;
    final tabIndex = profileState.tab.index;
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: Column(
          children: [
            ScreenHeader(
              leading: BackLink(onTap: () => context.pop()),
              title: Center(
                child: Text(
                  '@$username',
                  style: const TextStyle(
                    color: AppColors.title,
                    fontSize: AppDimens.inputText,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              trailing: const SizedBox(width: 40),
            ),
            Expanded(
              child: ListView(
                padding: EdgeInsets.zero,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(AppDimens.contentPadding),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            const AvatarCircle(
                              size: AppDimens.profileAvatar,
                              color: AppColors.border,
                            ),
                            const SizedBox(width: AppDimens.settingsSectionGap),
                            Expanded(
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceAround,
                                children: const [
                                  StatColumn(count: '42', label: 'Posts'),
                                  StatColumn(
                                      count: '1.2K', label: 'Followers'),
                                  StatColumn(
                                      count: '580', label: 'Following'),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: AppDimens.listGap),
                        const Text(
                          'User Full Name',
                          style: TextStyle(
                            color: AppColors.title,
                            fontWeight: FontWeight.w600,
                            fontSize: AppDimens.rowTitle,
                          ),
                        ),
                        Text(
                          '@$username',
                          style: const TextStyle(
                            color: AppColors.navIconMuted,
                            fontSize: AppDimens.sectionLabel,
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Text(
                          'Bio goes here',
                          style: TextStyle(
                            color: AppColors.subtitle,
                            fontSize: AppDimens.bodyText,
                          ),
                        ),
                        const SizedBox(height: AppDimens.contentPadding),
                        Row(
                          children: [
                            Expanded(
                              child: GestureDetector(
                                onTap: () => ref
                                    .read(otherUserProfileProvider.notifier)
                                    .toggleFollow(),
                                child: Container(
                                  padding:
                                      const EdgeInsets.all(AppDimens.listGap),
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: isFollowing
                                        ? AppColors.borderSubtle
                                        : AppColors.primary,
                                    borderRadius: BorderRadius.circular(
                                        AppDimens.editButtonRadius),
                                    border: Border.all(
                                      color: isFollowing
                                          ? AppColors.border
                                          : AppColors.primary,
                                    ),
                                  ),
                                  child: Text(
                                    isFollowing ? 'Following' : 'Follow',
                                    style: TextStyle(
                                      color: isFollowing
                                          ? AppColors.subtitle
                                          : AppColors.onPrimary,
                                      fontSize: AppDimens.bodyText,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: AppDimens.fieldGap),
                            Expanded(
                              child: Container(
                                padding:
                                    const EdgeInsets.all(AppDimens.listGap),
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: AppColors.borderSubtle,
                                  borderRadius: BorderRadius.circular(
                                      AppDimens.editButtonRadius),
                                  border:
                                      Border.all(color: AppColors.border),
                                ),
                                child: const Text(
                                  'Message',
                                  style: TextStyle(
                                    color: AppColors.title,
                                    fontSize: AppDimens.bodyText,
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppDimens.fieldGap),
                  SegmentedTabs(
                    labels: _tabs,
                    selectedIndex: tabIndex,
                    onChanged: (index) => ref
                        .read(otherUserProfileProvider.notifier)
                        .setTab(OtherUserTab.values[index]),
                  ),
                  const ProfilePlaceholderGrid(),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
