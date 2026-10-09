import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/back_link.dart';
import '../../../core/widgets/screen_header.dart';
import '../../../core/widgets/segmented_tabs.dart';
import '../widgets/profile_placeholder_grid.dart';
import '../widgets/stat_column.dart';

class OtherUserProfileScreen extends StatefulWidget {
  const OtherUserProfileScreen({super.key, this.username = 'unknown'});

  final String username;

  @override
  State<OtherUserProfileScreen> createState() => _OtherUserProfileScreenState();
}

class _OtherUserProfileScreenState extends State<OtherUserProfileScreen> {
  static const _tabs = ['Posts', 'Reels'];

  int _tabIndex = 0;
  bool _isFollowing = false;

  @override
  Widget build(BuildContext context) {
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
                  '@${widget.username}',
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
                          '@${widget.username}',
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
                                onTap: () => setState(
                                    () => _isFollowing = !_isFollowing),
                                child: Container(
                                  padding:
                                      const EdgeInsets.all(AppDimens.listGap),
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: _isFollowing
                                        ? AppColors.borderSubtle
                                        : AppColors.primary,
                                    borderRadius: BorderRadius.circular(
                                        AppDimens.editButtonRadius),
                                    border: Border.all(
                                      color: _isFollowing
                                          ? AppColors.border
                                          : AppColors.primary,
                                    ),
                                  ),
                                  child: Text(
                                    _isFollowing ? 'Following' : 'Follow',
                                    style: TextStyle(
                                      color: _isFollowing
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
                    selectedIndex: _tabIndex,
                    onChanged: (index) =>
                        setState(() => _tabIndex = index),
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
