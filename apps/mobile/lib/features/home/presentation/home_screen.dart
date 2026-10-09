import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/screen_header.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  static const _storyCount = 8;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          ScreenHeader(
            leading: const Text(
              'VAANJAY',
              style: TextStyle(
                fontSize: AppDimens.screenTitle,
                fontWeight: FontWeight.w800,
                color: AppColors.title,
              ),
            ),
            title: const SizedBox.shrink(),
            trailing: GestureDetector(
              onTap: () => context.go(RoutePaths.settings),
              child: Container(
                width: AppDimens.avatarSmall,
                height: AppDimens.avatarSmall,
                alignment: Alignment.center,
                decoration: const BoxDecoration(
                  color: AppColors.iconBackground,
                  shape: BoxShape.circle,
                ),
                child: const Text(
                  'S',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                _StoriesRow(count: _storyCount),
                const EmptyState(
                  title: 'Welcome to VAANJAY',
                  subtitle:
                      'Follow users to see their posts in your feed',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StoriesRow extends StatelessWidget {
  const _StoriesRow({required this.count});

  final int count;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppDimens.listGap,
        vertical: AppDimens.storiesVerticalPadding,
      ),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: AppColors.borderSubtle),
        ),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            for (var i = 0; i < count; i++)
              _StoryItem(label: 'User ${i + 1}'),
          ],
        ),
      ),
    );
  }
}

class _StoryItem extends StatelessWidget {
  const _StoryItem({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: AppDimens.storyItemWidth,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: AppDimens.storyRing,
            height: AppDimens.storyRing,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: AppColors.primary,
                width: AppDimens.storyRingWidth,
              ),
            ),
            child: const AvatarCircle(
              size: AppDimens.storyAvatar,
              color: AppColors.border,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: AppColors.subtitle,
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }
}
