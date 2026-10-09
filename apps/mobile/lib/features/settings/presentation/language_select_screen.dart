import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_paths.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/primary_button.dart';

class _Language {
  const _Language(this.code, this.name, this.priority);

  final String code;
  final String name;
  final int priority;
}

const _languages = [
  _Language('ta', 'Tamil', 1),
  _Language('te', 'Telugu', 2),
  _Language('kn', 'Kannada', 3),
  _Language('ml', 'Malayalam', 4),
  _Language('en', 'English', 7),
  _Language('hi', 'Hindi', 99),
  _Language('bn', 'Bengali', 8),
  _Language('mr', 'Marathi', 9),
  _Language('gu', 'Gujarati', 10),
  _Language('or', 'Odia', 11),
  _Language('pa', 'Punjabi', 12),
  _Language('as', 'Assamese', 13),
  _Language('ur', 'Urdu', 14),
  _Language('ar', 'Arabic', 15),
  _Language('fr', 'French', 16),
  _Language('de', 'German', 17),
  _Language('ja', 'Japanese', 18),
  _Language('ko', 'Korean', 19),
  _Language('zh', 'Mandarin', 20),
  _Language('pt', 'Portuguese', 21),
  _Language('ru', 'Russian', 22),
  _Language('es', 'Spanish', 23),
];

class LanguageSelectScreen extends StatefulWidget {
  const LanguageSelectScreen({super.key});

  @override
  State<LanguageSelectScreen> createState() => _LanguageSelectScreenState();
}

class _LanguageSelectScreenState extends State<LanguageSelectScreen> {
  String _selected = 'ta';

  @override
  Widget build(BuildContext context) {
    final sorted = [..._languages]
      ..sort((a, b) => a.priority.compareTo(b.priority));
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: Padding(
          padding: const EdgeInsets.only(
            top: AppDimens.languageTopInset,
            left: AppDimens.languageHPadding,
            right: AppDimens.languageHPadding,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Column(
                children: [
                  Text(
                    'VAANJAY',
                    style: TextStyle(
                      fontSize: AppDimens.displayTitleSmall,
                      fontWeight: FontWeight.w800,
                      color: AppColors.title,
                    ),
                  ),
                  SizedBox(height: AppDimens.titleGap),
                  Text(
                    'Choose your language',
                    style: TextStyle(
                      fontSize: AppDimens.inputText,
                      color: AppColors.primary,
                      fontFamily: 'Noto Sans Tamil',
                    ),
                  ),
                ],
              ),
              const SizedBox(height: AppDimens.settingsSectionGap),
              Expanded(
                child: ListView.builder(
                  itemCount: sorted.length,
                  itemBuilder: (context, index) {
                    final language = sorted[index];
                    return _LanguageTile(
                      language: language,
                      selected: _selected == language.code,
                      onTap: () =>
                          setState(() => _selected = language.code),
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(
                  top: 20,
                  bottom: 40,
                ),
                child: PrimaryButton(
                  text: 'Confirm',
                  onTap: () => context.go(RoutePaths.login),
                  textStyle: const TextStyle(
                    color: AppColors.onPrimary,
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _LanguageTile extends StatelessWidget {
  const _LanguageTile({
    required this.language,
    required this.selected,
    required this.onTap,
  });

  final _Language language;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: AppDimens.fieldGap),
        padding: const EdgeInsets.all(AppDimens.contentPadding),
        decoration: BoxDecoration(
          color: selected ? AppColors.iconBackground : AppColors.background,
          borderRadius: BorderRadius.circular(AppDimens.cardRadiusSmall),
          border: Border.all(
            color: selected ? AppColors.primary : AppColors.border,
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    language.name,
                    style: const TextStyle(
                      color: AppColors.title,
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    language.name,
                    style: const TextStyle(
                      color: AppColors.subtitle,
                      fontSize: AppDimens.bodyText,
                    ),
                  ),
                ],
              ),
            ),
            Container(
              width: AppDimens.radioSize,
              height: AppDimens.radioSize,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color:
                      selected ? AppColors.primary : AppColors.dotInactive,
                  width: 2,
                ),
              ),
              child: selected
                  ? Container(
                      width: AppDimens.radioInner,
                      height: AppDimens.radioInner,
                      decoration: const BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                    )
                  : null,
            ),
          ],
        ),
      ),
    );
  }
}
