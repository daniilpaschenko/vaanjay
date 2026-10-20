import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/primary_button.dart';
import '../providers/live_provider.dart';

class LiveScreen extends ConsumerStatefulWidget {
  const LiveScreen({super.key, this.viewerId});

  final String? viewerId;

  @override
  ConsumerState<LiveScreen> createState() => _LiveScreenState();
}

class _LiveScreenState extends ConsumerState<LiveScreen> {
  final _titleController = TextEditingController();
  final _topicController = TextEditingController();
  final _chatController = TextEditingController();

  bool get _isHost => widget.viewerId == null;

  @override
  void initState() {
    super.initState();
    ref.read(liveProvider.notifier).reset();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _topicController.dispose();
    _chatController.dispose();
    super.dispose();
  }

  void _sendChat() {
    final text = _chatController.text.trim();
    if (text.isEmpty) return;
    ref.read(liveProvider.notifier).sendChat(text);
    _chatController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final live = ref.watch(liveProvider);
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      body: live.isLive || !_isHost ? _buildLive(live) : _buildSetup(),
    );
  }

  Widget _buildSetup() {
    return Container(
      color: AppColors.background,
      child: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(AppDimens.screenPadding),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Go Live',
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: AppColors.title,
                  fontSize: 32,
                  fontWeight: FontWeight.w700,
                ),
              ),
              const SizedBox(height: AppDimens.settingsSectionGap),
              AppTextField(
                controller: _titleController,
                hint: 'Live stream title',
                onChanged: (value) =>
                    ref.read(liveProvider.notifier).setTitle(value),
              ),
              const SizedBox(height: AppDimens.contentPadding),
              AppTextField(
                controller: _topicController,
                hint: 'Topic tag',
                onChanged: (value) =>
                    ref.read(liveProvider.notifier).setTopicTag(value),
              ),
              const SizedBox(height: AppDimens.fieldGap),
              PrimaryButton(
                text: 'Go Live',
                onTap: () => ref.read(liveProvider.notifier).start(),
                textStyle: const TextStyle(
                  color: AppColors.onPrimary,
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLive(LiveState live) {
    return SafeArea(
      top: false,
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(
              top: AppDimens.screenTopInset,
              left: AppDimens.headerHPadding,
              right: AppDimens.headerHPadding,
              bottom: AppDimens.homeHeaderBottomGap,
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppDimens.liveBadgeHPadding,
                    vertical: AppDimens.liveBadgeVPadding,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.error,
                    borderRadius:
                        BorderRadius.circular(AppDimens.bubbleTailRadius + 2),
                  ),
                  child: const Text(
                    'LIVE',
                    style: TextStyle(
                      color: AppColors.onPrimary,
                      fontSize: AppDimens.caption,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
                const Spacer(),
                Text(
                  '${live.viewerCount} watching',
                  style: const TextStyle(
                    color: AppColors.darkMuted,
                    fontSize: AppDimens.bodyText,
                  ),
                ),
                const Spacer(),
                GestureDetector(
                  onTap: () => context.pop(),
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppDimens.contentPadding,
                      vertical: AppDimens.fieldGap,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.overlayError,
                      borderRadius:
                          BorderRadius.circular(AppDimens.cardRadiusTiny),
                    ),
                    child: const Text(
                      'End',
                      style: TextStyle(
                        color: AppColors.error,
                        fontSize: AppDimens.bodyText,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: Container(
              margin: const EdgeInsets.all(AppDimens.contentPadding),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: AppColors.darkSurface,
                borderRadius: BorderRadius.circular(AppDimens.cardRadius),
              ),
              child: Text(
                live.title.isEmpty ? 'Live Stream' : live.title,
                style: const TextStyle(
                  color: AppColors.navIconMuted,
                  fontSize: AppDimens.sectionTitle,
                ),
              ),
            ),
          ),
          SizedBox(
            height: AppDimens.liveChatHeight,
            child: Container(
              decoration: const BoxDecoration(
                border: Border(
                  top: BorderSide(color: AppColors.darkSurfaceAlt),
                ),
              ),
              child: Column(
                children: [
                  Expanded(
                    child: live.chatMessages.isEmpty
                        ? const Padding(
                            padding: EdgeInsets.only(top: 20),
                            child: Text(
                              'No messages yet',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: AppColors.navIconMuted,
                                fontSize: AppDimens.sectionLabel,
                              ),
                            ),
                          )
                        : ListView(
                            padding: const EdgeInsets.all(AppDimens.listGap),
                            children: [
                              for (final message in live.chatMessages)
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 6),
                                  child: Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        '${message.user}: ',
                                        style: const TextStyle(
                                          color: AppColors.linkOnDark,
                                          fontWeight: FontWeight.w600,
                                          fontSize: AppDimens.sectionLabel,
                                        ),
                                      ),
                                      Expanded(
                                        child: Text(
                                          message.text,
                                          style: const TextStyle(
                                            color: AppColors.darkText,
                                            fontSize: AppDimens.sectionLabel,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                            ],
                          ),
                  ),
                  Container(
                    padding: const EdgeInsets.all(AppDimens.listGap),
                    decoration: const BoxDecoration(
                      border: Border(
                        top: BorderSide(color: AppColors.darkSurfaceAlt),
                      ),
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Expanded(
                          child: AppTextField(
                            controller: _chatController,
                            hint: 'Send a message...',
                            fillColor: AppColors.overlayLight,
                            borderColor: AppColors.subtitle,
                            textStyle: const TextStyle(
                              color: AppColors.onPrimary,
                              fontSize: AppDimens.bodyText,
                            ),
                            contentPadding:
                                const EdgeInsets.all(AppDimens.otpBoxGap),
                          ),
                        ),
                        const SizedBox(width: AppDimens.fieldGap),
                        GestureDetector(
                          onTap: _sendChat,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppDimens.contentPadding,
                            ),
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: AppColors.primary,
                              borderRadius: BorderRadius.circular(
                                  AppDimens.cardRadiusSmall),
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
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
