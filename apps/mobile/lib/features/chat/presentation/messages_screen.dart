import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/screen_header.dart';
import '../providers/conversations_provider.dart';

class MessagesScreen extends ConsumerWidget {
  const MessagesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final conversations = ref.watch(conversationsProvider).conversations;
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          const ScreenHeader(
            title: Text(
              'Messages',
              style: TextStyle(
                fontSize: AppDimens.screenTitle,
                fontWeight: FontWeight.w700,
                color: AppColors.title,
              ),
            ),
            paddingBottom: AppDimens.fieldGap,
          ),
          Expanded(
            child: conversations.isEmpty
                ? ListView(
                    children: const [
                      EmptyState(
                        title: 'No conversations yet',
                        subtitle: 'Start chatting with people you follow',
                      ),
                    ],
                  )
                : ListView.builder(
                    itemCount: conversations.length,
                    itemBuilder: (context, index) => _ConversationTile(
                      conversation: conversations[index],
                    ),
                  ),
          ),
        ],
      ),
    );
  }
}

class _ConversationTile extends StatelessWidget {
  const _ConversationTile({required this.conversation});

  final Map<String, dynamic> conversation;

  @override
  Widget build(BuildContext context) {
    final name = (conversation['name'] as String?) ?? 'User';
    final lastMessage =
        (conversation['last_message'] as Map<String, dynamic>?)?['content']
                as String? ??
            'Start a conversation';
    final unread = (conversation['unread_count'] as int?) ?? 0;
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      name,
                      style: const TextStyle(
                        color: AppColors.title,
                        fontWeight: FontWeight.w600,
                        fontSize: AppDimens.rowTitle,
                      ),
                    ),
                    const Text(
                      'now',
                      style: TextStyle(
                        color: AppColors.navIconMuted,
                        fontSize: AppDimens.caption,
                      ),
                    ),
                  ],
                ),
                Text(
                  lastMessage,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    color: AppColors.navIconMuted,
                    fontSize: AppDimens.sectionLabel,
                  ),
                ),
              ],
            ),
          ),
          if (unread > 0) ...[
            const SizedBox(width: AppDimens.listGap),
            Container(
              constraints: const BoxConstraints(minWidth: 20),
              height: 20,
              alignment: Alignment.center,
              padding: const EdgeInsets.symmetric(horizontal: 6),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Text(
                '$unread',
                style: const TextStyle(
                  color: AppColors.onPrimary,
                  fontSize: AppDimens.captionSmall,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}
