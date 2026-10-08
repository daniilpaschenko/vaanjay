import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/hover_link.dart';

class _Slide {
  const _Slide({
    required this.title,
    required this.titleTa,
    required this.subtitle,
    required this.subtitleTa,
  });

  final String title;
  final String titleTa;
  final String subtitle;
  final String subtitleTa;
}

const _slides = [
  _Slide(
    title: 'Your World',
    titleTa: 'Unga Ulagam',
    subtitle: 'Connect with Tamil Nadu and the global Tamil community.',
    subtitleTa:
        'Tamil Nadu matrum ulaga Tamil samutha thodu inangungal.',
  ),
  _Slide(
    title: 'Multiple Formats',
    titleTa: 'Pala Vakai Pothivugal',
    subtitle: 'Share photos, videos, reels, stories, and text. Express yourself.',
    subtitleTa:
        'Photos, videos, reels, stories matrum text. Ungal mozhiyil velippadungal.',
  ),
  _Slide(
    title: 'All in One',
    titleTa: 'Ellam Oru Idathil',
    subtitle: 'Chat, call, share payments, and build your community in one app.',
    subtitleTa: 'Araattai, azhaithal, payment, matrum ungal samutha oru app-il.',
  ),
];

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  static const _slideTransitionDuration = Duration(milliseconds: 460);

  final _pageController = PageController();
  int _currentIndex = 0;

  bool get _isLast => _currentIndex == _slides.length - 1;

  void _next() {
    _pageController.nextPage(
      duration: _slideTransitionDuration,
      curve: Curves.ease,
    );
  }

  void _finish() => context.go(RoutePaths.languageSelect);

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          Expanded(
            child: PageView.builder(
              controller: _pageController,
              itemCount: _slides.length,
              onPageChanged: (index) => setState(() => _currentIndex = index),
              itemBuilder: (_, index) => _buildSlide(_slides[index]),
            ),
          ),
          _buildFooter(),
        ],
      ),
    );
  }

  Widget _buildSlide(_Slide slide) {
    return Padding(
      padding: const EdgeInsets.all(AppDimens.onboardingSlidePadding),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: AppDimens.onboardingIconSize,
            height: AppDimens.onboardingIconSize,
            margin: const EdgeInsets.only(bottom: AppDimens.onboardingIconGap),
            decoration: const BoxDecoration(
              color: AppColors.iconBackground,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Container(
                width: AppDimens.onboardingIconInnerSize,
                height: AppDimens.onboardingIconInnerSize,
                decoration: const BoxDecoration(
                  color: AppColors.primary,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ),
          Text(
            slide.titleTa,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: AppDimens.onboardingTitleTa,
              fontWeight: FontWeight.w700,
              color: AppColors.primary,
              fontFamily: 'Noto Sans Tamil',
            ),
          ),
          const SizedBox(height: AppDimens.onboardingTitleGap),
          Text(
            slide.title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: AppDimens.onboardingTitle,
              color: AppColors.title,
            ),
          ),
          const SizedBox(height: AppDimens.onboardingTitleBottomGap),
          Text(
            slide.subtitleTa,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: AppDimens.onboardingSubtitleTa,
              height: AppDimens.onboardingSubtitleTaLineHeight /
                  AppDimens.onboardingSubtitleTa,
              color: AppColors.subtitle,
              fontFamily: 'Noto Sans Tamil',
            ),
          ),
          const SizedBox(height: AppDimens.onboardingSubtitleGap),
          Text(
            slide.subtitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: AppDimens.onboardingSubtitle,
              height: AppDimens.onboardingSubtitleLineHeight /
                  AppDimens.onboardingSubtitle,
              color: AppColors.navIconMuted,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFooter() {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppDimens.onboardingFooterHPadding,
        vertical: AppDimens.onboardingFooterVPadding,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (var i = 0; i < _slides.length; i++)
                Container(
                  width: i == _currentIndex
                      ? AppDimens.onboardingDotWidth
                      : AppDimens.onboardingDotHeight,
                  height: AppDimens.onboardingDotHeight,
                  margin: EdgeInsets.only(
                    right: i == _slides.length - 1
                        ? 0
                        : AppDimens.onboardingDotGap,
                  ),
                  decoration: BoxDecoration(
                    color: i == _currentIndex
                        ? AppColors.primary
                        : AppColors.dotInactive,
                    borderRadius:
                        BorderRadius.circular(AppDimens.onboardingDotRadius),
                  ),
                ),
            ],
          ),
          const SizedBox(height: AppDimens.onboardingDotsBottomGap),
          Row(
            children: [
              if (!_isLast) ...[
                HoverLink(
                  text: 'Skip',
                  onTap: _finish,
                  style: const TextStyle(
                    fontSize: AppDimens.buttonText,
                    fontWeight: FontWeight.w500,
                    color: AppColors.navIconMuted,
                  ),
                  padding: const EdgeInsets.symmetric(
                      vertical: AppDimens.onboardingSkipVPadding),
                ),
                const Spacer(),
                MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: GestureDetector(
                    onTap: _next,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: AppDimens.onboardingButtonHPadding,
                        vertical: AppDimens.onboardingButtonPadding,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.primary,
                        borderRadius:
                            BorderRadius.circular(AppDimens.buttonRadius),
                      ),
                      child: const Text(
                        'Next',
                        style: TextStyle(
                          fontSize: AppDimens.buttonText,
                          fontWeight: FontWeight.w600,
                          color: AppColors.onPrimary,
                        ),
                      ),
                    ),
                  ),
                ),
              ] else ...[
                Expanded(
                  child: MouseRegion(
                    cursor: SystemMouseCursors.click,
                    child: GestureDetector(
                      onTap: _finish,
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            vertical: AppDimens.onboardingButtonPadding),
                        alignment: Alignment.center,
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius:
                              BorderRadius.circular(AppDimens.buttonRadius),
                        ),
                        child: const Text(
                          'Get Started',
                          style: TextStyle(
                            fontSize: AppDimens.buttonText,
                            fontWeight: FontWeight.w600,
                            color: AppColors.onPrimary,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    );
  }
}
