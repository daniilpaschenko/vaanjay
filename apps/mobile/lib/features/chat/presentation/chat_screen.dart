import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/avatar_circle.dart';
import '../../../core/widgets/back_link.dart';
import '../../../core/widgets/empty_state.dart';
import '../providers/chat_provider.dart';

class ChatScreen extends ConsumerStatefulWidget {
  const ChatScreen({super.key, this.name = 'User'});

  final String name;

  @override
  ConsumerState<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends ConsumerState<ChatScreen> {
  final _inputController = TextEditingController();

  @override
  void dispose() {
    _inputController.dispose();
    super.dispose();
  }

  void _send() {
    final text = _inputController.text.trim();
    if (text.isEmpty) return;
    ref.read(chatProvider.notifier).send(text);
    _inputController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final messages = ref.watch(chatProvider).messages;
    return Scaffold(
      backgroundColor: AppColors.background,
      resizeToAvoidBottomInset: true,
      body: Column(
        children: [
          _buildHeader(),
          Expanded(
            child: messages.isEmpty
                ? const EmptyState(
                    title: 'No messages yet',
                    subtitle: 'Say hello to start the conversation',
                    titleColor: AppColors.navIconMuted,
                    subtitleColor: AppColors.hint,
                  )
                : ListView(
                    padding: const EdgeInsets.all(AppDimens.contentPadding),
                    children: [
                      for (final message in messages)
                        _MessageBubble(
                          content: message.content,
                          isMine: message.isMine,
                        ),
                    ],
                  ),
          ),
          _buildInputBar(),
        ],
      ),
    );
  }

  Widget _buildHeader() {
    return Container(
      padding: const EdgeInsets.only(
        top: AppDimens.screenTopInset,
        left: AppDimens.contentPadding,
        right: AppDimens.contentPadding,
        bottom: AppDimens.homeHeaderBottomGap,
      ),
      decoration: const BoxDecoration(
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          BackLink(onTap: () => context.pop()),
          const SizedBox(width: AppDimens.contentPadding),
          const AvatarCircle(size: AppDimens.avatarSmall),
          const SizedBox(width: AppDimens.listGap),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.name,
                  style: const TextStyle(
                    color: AppColors.title,
                    fontSize: AppDimens.inputText,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const Text(
                  'Online',
                  style: TextStyle(
                    color: AppColors.success,
                    fontSize: AppDimens.caption,
                  ),
                ),
              ],
            ),
          ),
          _CallChip(label: 'Call'),
          const SizedBox(width: AppDimens.fieldGap),
          _CallChip(label: 'Video'),
        ],
      ),
    );
  }

  Widget _buildInputBar() {
    return Container(
      padding: const EdgeInsets.all(AppDimens.listGap),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Expanded(
            child: AppTextField(
              controller: _inputController,
              hint: 'Type a message...',
              maxLines: null,
              minLines: 1,
              contentPadding: const EdgeInsets.all(AppDimens.listGap),
            ),
          ),
          const SizedBox(width: AppDimens.fieldGap),
          GestureDetector(
            onTap: _send,
            child: Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: 10,
              ),
              decoration: BoxDecoration(
                color: AppColors.primary,
                borderRadius:
                    BorderRadius.circular(AppDimens.cardRadiusSmall),
              ),
              child: const Text(
                'Send',
                style: TextStyle(
                  color: AppColors.onPrimary,
                  fontSize: AppDimens.bodyText,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _CallChip extends StatelessWidget {
  const _CallChip({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppDimens.listGap,
        vertical: 6,
      ),
      decoration: BoxDecoration(
        color: AppColors.iconBackground,
        borderRadius: BorderRadius.circular(AppDimens.cardRadiusTiny),
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: AppColors.primary,
          fontSize: AppDimens.sectionLabel,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }
}

class _MessageBubble extends StatelessWidget {
  const _MessageBubble({required this.content, required this.isMine});

  final String content;
  final bool isMine;

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isMine ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 4),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.sizeOf(context).width *
              AppDimens.bubbleMaxWidthFactor,
        ),
        padding: const EdgeInsets.all(AppDimens.bubblePadding),
        decoration: BoxDecoration(
          color: isMine ? AppColors.primary : AppColors.borderSubtle,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(AppDimens.bubbleRadius),
            topRight: const Radius.circular(AppDimens.bubbleRadius),
            bottomLeft: Radius.circular(
              isMine ? AppDimens.bubbleRadius : AppDimens.bubbleTailRadius,
            ),
            bottomRight: Radius.circular(
              isMine ? AppDimens.bubbleTailRadius : AppDimens.bubbleRadius,
            ),
          ),
        ),
        child: Text(
          content,
          style: TextStyle(
            color: isMine ? AppColors.onPrimary : AppColors.title,
            fontSize: AppDimens.rowTitle,
          ),
        ),
      ),
    );
  }
}
