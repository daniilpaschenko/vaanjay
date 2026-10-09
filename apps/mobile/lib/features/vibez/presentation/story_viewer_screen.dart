import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/avatar_circle.dart';

class StoryViewerScreen extends StatefulWidget {
  const StoryViewerScreen({
    super.key,
    this.storyCount = 1,
    this.initialIndex = 0,
  });

  final int storyCount;
  final int initialIndex;

  @override
  State<StoryViewerScreen> createState() => _StoryViewerScreenState();
}

class _StoryViewerScreenState extends State<StoryViewerScreen>
    with SingleTickerProviderStateMixin {
  static const _storyDuration = Duration(milliseconds: 5000);

  late final AnimationController _progress;
  late int _currentIndex;

  @override
  void initState() {
    super.initState();
    _currentIndex = widget.initialIndex;
    _progress = AnimationController(vsync: this, duration: _storyDuration)
      ..addStatusListener((status) {
        if (status == AnimationStatus.completed) _advance();
      })
      ..forward();
  }

  @override
  void dispose() {
    _progress.dispose();
    super.dispose();
  }

  void _advance() {
    if (_currentIndex < widget.storyCount - 1) {
      setState(() => _currentIndex++);
      _progress.forward(from: 0);
    } else {
      context.pop();
    }
  }

  void _goBackStory() {
    if (_currentIndex > 0) {
      setState(() => _currentIndex--);
      _progress.forward(from: 0);
    }
  }

  void _handleTap(TapUpDetails details, double width) {
    final x = details.localPosition.dx;
    if (x < width * 0.3 && _currentIndex > 0) {
      _goBackStory();
    } else if (x > width * 0.7 && _currentIndex < widget.storyCount - 1) {
      _advance();
    } else if (x > width * 0.7) {
      context.pop();
    }
  }

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.sizeOf(context).width;
    return Scaffold(
      backgroundColor: Colors.black,
      body: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTapUp: (details) => _handleTap(details, width),
        child: Stack(
          children: [
            const Center(
              child: Text(
                'Story',
                style: TextStyle(
                  color: AppColors.onPrimary,
                  fontSize: AppDimens.screenTitle,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
            _buildProgressBar(),
            _buildFooter(),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressBar() {
    return Positioned(
      top: 50,
      left: AppDimens.listGap,
      right: AppDimens.listGap,
      child: Row(
        children: [
          for (var i = 0; i < widget.storyCount; i++) ...[
            if (i > 0) const SizedBox(width: 4),
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(1),
                child: SizedBox(
                  height: 2,
                  child: ColoredBox(
                    color: AppColors.overlayMedium,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: AnimatedBuilder(
                        animation: _progress,
                        builder: (context, _) {
                          final widthFactor = i < _currentIndex
                              ? 1.0
                              : i == _currentIndex
                                  ? _progress.value
                                  : 0.0;
                          return FractionallySizedBox(
                            widthFactor: widthFactor,
                            heightFactor: 1,
                            child: const ColoredBox(
                                color: AppColors.onPrimary),
                          );
                        },
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildFooter() {
    return Positioned(
      bottom: 60,
      left: AppDimens.contentPadding,
      right: AppDimens.contentPadding,
      child: Row(
        children: [
          const AvatarCircle(
            size: AppDimens.avatarSmall,
            color: AppColors.primary,
            child: AvatarCircle(
              size: 32,
              color: AppColors.darkSurface,
            ),
          ),
          const SizedBox(width: 10),
          const Text(
            'username',
            style: TextStyle(
              color: AppColors.onPrimary,
              fontSize: AppDimens.bodyText,
              fontWeight: FontWeight.w600,
            ),
          ),
          const SizedBox(width: AppDimens.fieldGap),
          const Text(
            '2h ago',
            style: TextStyle(
              color: AppColors.darkMuted,
              fontSize: AppDimens.caption,
            ),
          ),
          const Spacer(),
          GestureDetector(
            onTap: () => context.pop(),
            child: Container(
              padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: AppDimens.fieldGap,
              ),
              decoration: BoxDecoration(
                color: AppColors.overlayLightStrong,
                borderRadius: BorderRadius.circular(AppDimens.hashtagRadius),
              ),
              child: const Text(
                'Reply',
                style: TextStyle(
                  color: AppColors.onPrimary,
                  fontSize: AppDimens.bodyText,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
