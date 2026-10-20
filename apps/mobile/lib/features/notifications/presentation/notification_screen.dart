import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/screen_header.dart';
import '../providers/notifications_provider.dart';

class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notifications = ref.watch(notificationsProvider).notifications;
    final groups = _group(notifications);
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          const ScreenHeader(
            title: Text(
              'Notifications',
              style: TextStyle(
                fontSize: AppDimens.screenTitle,
                fontWeight: FontWeight.w700,
                color: AppColors.title,
              ),
            ),
            paddingBottom: AppDimens.fieldGap,
          ),
          Expanded(
            child: notifications.isEmpty
                ? ListView(
                    children: const [
                      EmptyState(
                        title: 'No notifications yet',
                        subtitle: 'Likes, comments and follows show up here',
                      ),
                    ],
                  )
                : ListView(
                    children: [
                      for (final entry in groups.entries) ...[
                        Padding(
                          padding: const EdgeInsets.only(
                            left: AppDimens.contentPadding,
                            right: AppDimens.contentPadding,
                            top: AppDimens.contentPadding,
                            bottom: AppDimens.fieldGap,
                          ),
                          child: Text(
                            entry.key.toUpperCase(),
                            style: const TextStyle(
                              color: AppColors.navIconMuted,
                              fontSize: AppDimens.sectionLabel,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                        for (final item in entry.value)
                          _NotificationTile(notification: item),
                      ],
                    ],
                  ),
          ),
        ],
      ),
    );
  }

  Map<String, List<Map<String, dynamic>>> _group(
    List<Map<String, dynamic>> items,
  ) {
    final result = <String, List<Map<String, dynamic>>>{};
    for (final item in items) {
      final createdAt = DateTime.tryParse('${item['created_at']}');
      final days = createdAt == null
          ? 999
          : DateTime.now().difference(createdAt).inDays;
      final label = days <= 0
          ? 'Today'
          : days == 1
              ? 'Yesterday'
              : days < 7
                  ? 'This Week'
                  : 'Earlier';
      result.putIfAbsent(label, () => []).add(item);
    }
    return result;
  }
}

class _NotificationTile extends StatelessWidget {
  const _NotificationTile({required this.notification});

  final Map<String, dynamic> notification;

  @override
  Widget build(BuildContext context) {
    final isRead = (notification['is_read'] as bool?) ?? false;
    return Container(
      padding: const EdgeInsets.all(AppDimens.contentPadding),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.borderSubtle)),
      ),
      child: Row(
        children: [
          const AvatarCircle(size: AppDimens.avatarSmall),
          const SizedBox(width: AppDimens.listGap),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${notification['message'] ?? ''}',
                  style: const TextStyle(
                    color: AppColors.title,
                    fontSize: AppDimens.rowTitle,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  _formatDate(notification['created_at']),
                  style: const TextStyle(
                    color: AppColors.navIconMuted,
                    fontSize: AppDimens.caption,
                  ),
                ),
              ],
            ),
          ),
          if (!isRead)
            Container(
              width: 10,
              height: 10,
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
            ),
        ],
      ),
    );
  }

  String _formatDate(dynamic value) {
    final date = DateTime.tryParse('$value');
    if (date == null) return '';
    final day = date.day.toString().padLeft(2, '0');
    final month = date.month.toString().padLeft(2, '0');
    return '$day/$month/${date.year}';
  }
}
