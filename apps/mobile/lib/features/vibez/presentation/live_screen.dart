import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/primary_button.dart';

class LiveScreen extends StatefulWidget {
  const LiveScreen({super.key, this.viewerId});

  final String? viewerId;

  @override
  State<LiveScreen> createState() => _LiveScreenState();
}

class _LiveScreenState extends State<LiveScreen> {
  final _titleController = TextEditingController();
  final _topicController = TextEditingController();
  final _chatController = TextEditingController();
  final _chatMessages = <({String user, String text})>[];

  bool _isLive = false;

  bool get _isHost => widget.viewerId == null;

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
    setState(() {
      _chatMessages.add((user: 'You', text: text));
      _chatController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      body: _isLive || !_isHost ? _buildLive() : _buildSetup(),
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
              ),
              const SizedBox(height: AppDimens.contentPadding),
              AppTextField(
                controller: _topicController,
                hint: 'Topic tag',
              ),
              const SizedBox(height: AppDimens.fieldGap),
              PrimaryButton(
                text: 'Go Live',
                onTap: () => setState(() => _isLive = true),
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

  Widget _buildLive() {
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
                const Text(
                  '0 watching',
                  style: TextStyle(
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
                _titleController.text.isEmpty
                    ? 'Live Stream'
                    : _titleController.text,
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
                    child: _chatMessages.isEmpty
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
                              for (final message in _chatMessages)
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
