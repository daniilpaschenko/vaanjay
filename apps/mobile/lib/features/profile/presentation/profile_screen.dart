import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/secondary_button.dart';
import '../../../core/widgets/segmented_tabs.dart';
import '../widgets/profile_placeholder_grid.dart';
import '../widgets/stat_column.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  static const _tabs = ['Posts', 'Reels', 'Tagged'];

  int _tabIndex = 0;

  @override
  Widget build(BuildContext context) {
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
              selectedIndex: _tabIndex,
              onChanged: (index) => setState(() => _tabIndex = index),
            ),
            const ProfilePlaceholderGrid(),
          ],
        ),
      ),
    );
  }
}
