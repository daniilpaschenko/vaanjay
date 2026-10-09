import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/screen_header.dart';
import '../../auth/providers/auth_provider.dart';
import '../widgets/section_label.dart';

class _SettingItem {
  const _SettingItem(this.label, {this.value});

  final String label;
  final String? value;
}

class _SettingSection {
  const _SettingSection(this.title, this.items);

  final String title;
  final List<_SettingItem> items;
}

const _sections = [
  _SettingSection('Account', [
    _SettingItem('Account Settings'),
    _SettingItem('Verification Request'),
    _SettingItem('Language', value: 'Tamil'),
  ]),
  _SettingSection('Privacy', [
    _SettingItem('Privacy Settings'),
    _SettingItem('Blocked Users'),
    _SettingItem('Close Friends'),
    _SettingItem('Story Settings'),
  ]),
  _SettingSection('Security', [
    _SettingItem('Change Password'),
    _SettingItem('Two-Factor Authentication'),
    _SettingItem('Login Activity'),
  ]),
  _SettingSection('Payments', [
    _SettingItem('UPI Settings'),
    _SettingItem('Payment History'),
    _SettingItem('Creator Earnings'),
  ]),
  _SettingSection('Support', [
    _SettingItem('Help Center'),
    _SettingItem('About VAANJAY'),
    _SettingItem('Report a Problem'),
  ]),
];

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: Column(
          children: [
            const ScreenHeader(
              title: Text(
                'Settings',
                style: TextStyle(
                  color: AppColors.title,
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                ),
              ),
              paddingBottom: AppDimens.contentPadding,
            ),
            Expanded(
              child: ListView(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppDimens.contentPadding,
                ),
                children: [
                  for (final section in _sections) ...[
                    _Section(
                      section: section,
                      onTap: () {},
                    ),
                  ],
                  GestureDetector(
                    onTap: () => ref.read(authProvider.notifier).signOut(),
                    child: Container(
                      padding: const EdgeInsets.all(AppDimens.contentPadding),
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        color: AppColors.errorBackground,
                        borderRadius:
                            BorderRadius.circular(AppDimens.cardRadius),
                        border: Border.all(color: AppColors.errorBorder),
                      ),
                      child: const Text(
                        'Log Out',
                        style: TextStyle(
                          color: AppColors.error,
                          fontSize: AppDimens.inputText,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: AppDimens.contentPadding),
                  const Padding(
                    padding: EdgeInsets.only(bottom: 40),
                    child: Text(
                      'VAANJAY v1.0.0',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: AppColors.hint,
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
    );
  }
}

class _Section extends StatelessWidget {
  const _Section({required this.section, required this.onTap});

  final _SettingSection section;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: AppDimens.settingsSectionGap),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.only(
              left: 4,
              bottom: AppDimens.fieldGap,
            ),
            child: SectionLabel(section.title),
          ),
          Container(
            decoration: BoxDecoration(
              color: AppColors.background,
              borderRadius: BorderRadius.circular(AppDimens.cardRadius),
              border: Border.all(color: AppColors.border),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(AppDimens.cardRadius),
              child: Column(
                children: [
                  for (final item in section.items)
                    GestureDetector(
                      onTap: onTap,
                      child: Container(
                        padding: const EdgeInsets.all(
                          AppDimens.settingsItemPadding,
                        ),
                        decoration: const BoxDecoration(
                          border: Border(
                            bottom:
                                BorderSide(color: AppColors.borderSubtle),
                          ),
                        ),
                        child: Row(
                          children: [
                            Expanded(
                              child: Text(
                                item.label,
                                style: const TextStyle(
                                  color: AppColors.title,
                                  fontSize: AppDimens.rowTitle,
                                ),
                              ),
                            ),
                            if (item.value != null)
                              Text(
                                item.value!,
                                style: const TextStyle(
                                  color: AppColors.navIconMuted,
                                  fontSize: AppDimens.bodyText,
                                ),
                              ),
                            const SizedBox(width: AppDimens.fieldGap),
                            const Text(
                              '>',
                              style: TextStyle(
                                color: AppColors.hint,
                                fontSize: AppDimens.inputText,
                              ),
                            ),
                          ],
                        ),
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
