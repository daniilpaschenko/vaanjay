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
  static const _dotInactive = Color(0xFFCBD5E1);
  static const _iconBackground = Color(0xFFEEF2FF);

  static const _slidePadding = 32.0;
  static const _footerHPadding = 32.0;
  static const _footerBPadding = 48.0;
  static const _dotsGap = 8.0;
  static const _dotsBottomGap = 32.0;
  static const _iconContainerGap = 40.0;
  static const _titleGap = 4.0;
  static const _titleBottomGap = 24.0;
  static const _subtitleGap = 8.0;

  final _pageController = PageController();
  int _currentIndex = 0;

  bool get _isLast => _currentIndex == _slides.length - 1;

  void _next() {
    _pageController.nextPage(
      duration: const Duration(milliseconds: 460),
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
      padding: const EdgeInsets.all(_slidePadding),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 120,
            height: 120,
            margin: const EdgeInsets.only(bottom: _iconContainerGap),
            decoration: const BoxDecoration(
              color: _iconBackground,
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Container(
                width: 50,
                height: 50,
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
              fontSize: 28,
              fontWeight: FontWeight.w700,
              color: AppColors.primary,
              fontFamily: 'Noto Sans Tamil',
            ),
          ),
          const SizedBox(height: _titleGap),
          Text(
            slide.title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 18,
              color: AppColors.title,
            ),
          ),
          const SizedBox(height: _titleBottomGap),
          Text(
            slide.subtitleTa,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 15,
              height: 24 / 15,
              color: AppColors.subtitle,
              fontFamily: 'Noto Sans Tamil',
            ),
          ),
          const SizedBox(height: _subtitleGap),
          Text(
            slide.subtitle,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 13,
              height: 20 / 13,
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
        horizontal: _footerHPadding,
        vertical: _footerBPadding / 2,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              for (var i = 0; i < _slides.length; i++)
                Container(
                  width: i == _currentIndex ? 32 : 8,
                  height: 8,
                  margin: EdgeInsets.only(
                    right: i == _slides.length - 1 ? 0 : _dotsGap,
                  ),
                  decoration: BoxDecoration(
                    color: i == _currentIndex
                        ? AppColors.primary
                        : _dotInactive,
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
            ],
          ),
          const SizedBox(height: _dotsBottomGap),
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
                  padding: const EdgeInsets.symmetric(vertical: 8),
                ),
                const Spacer(),
                MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: GestureDetector(
                    onTap: _next,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 32,
                        vertical: 14,
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
                        padding: const EdgeInsets.symmetric(vertical: 14),
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
