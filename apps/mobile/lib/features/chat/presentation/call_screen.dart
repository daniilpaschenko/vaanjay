import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';

class CallScreen extends StatefulWidget {
  const CallScreen({
    super.key,
    this.type = 'audio',
    this.callerName = 'User',
  });

  final String type;
  final String callerName;

  @override
  State<CallScreen> createState() => _CallScreenState();
}

class _CallScreenState extends State<CallScreen> {
  Timer? _timer;
  int _duration = 0;
  bool _isMuted = false;
  bool _isSpeaker = false;
  bool _isCameraFront = true;
  bool _isOngoing = true;

  @override
  void initState() {
    super.initState();
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_isOngoing) setState(() => _duration++);
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String get _formattedDuration {
    final minutes = (_duration ~/ 60).toString().padLeft(2, '0');
    final seconds = (_duration % 60).toString().padLeft(2, '0');
    return '$minutes:$seconds';
  }

  void _endCall() {
    setState(() => _isOngoing = false);
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.darkBackground,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.only(
            top: AppDimens.callTopPadding,
            bottom: AppDimens.callBottomPadding,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                children: [
                  AvatarCircle(
                    size: AppDimens.callAvatar,
                    color: AppColors.darkSurface,
                    child: const AvatarCircle(
                      size: AppDimens.callAvatarInner,
                      color: AppColors.darkSurfaceAlt,
                    ),
                  ),
                  const SizedBox(height: AppDimens.contentPadding),
                  Text(
                    widget.callerName,
                    style: const TextStyle(
                      color: AppColors.onPrimary,
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    _isOngoing ? _formattedDuration : 'Connecting...',
                    style: const TextStyle(
                      color: AppColors.darkMuted,
                      fontSize: AppDimens.inputText,
                    ),
                  ),
                ],
              ),
              Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _ControlButton(
                        icon: _isMuted ? 'U' : 'M',
                        label: _isMuted ? 'Unmute' : 'Mute',
                        active: _isMuted,
                        onTap: () => setState(() => _isMuted = !_isMuted),
                      ),
                      const SizedBox(width: AppDimens.settingsSectionGap),
                      _ControlButton(
                        icon: 'SP',
                        label: 'Speaker',
                        active: _isSpeaker,
                        onTap: () => setState(() => _isSpeaker = !_isSpeaker),
                      ),
                      if (widget.type == 'video') ...[
                        const SizedBox(width: AppDimens.settingsSectionGap),
                        _ControlButton(
                          icon: 'CF',
                          label: 'Flip',
                          onTap: () => setState(
                              () => _isCameraFront = !_isCameraFront),
                        ),
                      ],
                    ],
                  ),
                  const SizedBox(height: AppDimens.settingsSectionGap),
                  GestureDetector(
                    onTap: _endCall,
                    child: Container(
                      width: AppDimens.callEndSize,
                      height: AppDimens.callEndSize,
                      alignment: Alignment.center,
                      decoration: const BoxDecoration(
                        color: AppColors.error,
                        shape: BoxShape.circle,
                      ),
                      child: const Text(
                        'End Call',
                        style: TextStyle(
                          color: AppColors.onPrimary,
                          fontSize: AppDimens.caption,
                          fontWeight: FontWeight.w700,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ControlButton extends StatelessWidget {
  const _ControlButton({
    required this.icon,
    required this.label,
    required this.onTap,
    this.active = false,
  });

  final String icon;
  final String label;
  final VoidCallback onTap;
  final bool active;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: AppDimens.callControlSize,
            height: AppDimens.callControlSize,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color:
                  active ? AppColors.overlayPrimary : AppColors.overlayLight,
              shape: BoxShape.circle,
            ),
            child: Text(
              icon,
              style: const TextStyle(
                color: AppColors.onPrimary,
                fontSize: AppDimens.bodyText,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              color: AppColors.darkMuted,
              fontSize: 11,
            ),
          ),
        ],
      ),
    );
  }
}
