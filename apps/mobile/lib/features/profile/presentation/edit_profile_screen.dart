import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/labeled_field.dart';
import '../../../core/widgets/screen_header.dart';

class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends State<EditProfileScreen> {
  final _fullNameController = TextEditingController();
  final _usernameController = TextEditingController();
  final _bioController = TextEditingController();
  final _websiteController = TextEditingController();
  final _genderController = TextEditingController();

  bool _isPrivate = false;

  @override
  void dispose() {
    _fullNameController.dispose();
    _usernameController.dispose();
    _bioController.dispose();
    _websiteController.dispose();
    _genderController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: Column(
          children: [
            ScreenHeader(
              leading: GestureDetector(
                onTap: () => context.pop(),
                child: const Text(
                  'Cancel',
                  style: TextStyle(
                    color: AppColors.navIconMuted,
                    fontSize: AppDimens.inputText,
                  ),
                ),
              ),
              title: const Center(
                child: Text(
                  'Edit Profile',
                  style: TextStyle(
                    color: AppColors.title,
                    fontSize: 17,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
              trailing: GestureDetector(
                onTap: () => context.pop(),
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppDimens.contentPadding,
                    vertical: AppDimens.fieldGap,
                  ),
                  decoration: BoxDecoration(
                    color: AppColors.primary,
                    borderRadius:
                        BorderRadius.circular(AppDimens.cardRadiusTiny),
                  ),
                  child: const Text(
                    'Save',
                    style: TextStyle(
                      color: AppColors.onPrimary,
                      fontSize: AppDimens.bodyText,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppDimens.contentPadding,
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        vertical: AppDimens.settingsSectionGap,
                      ),
                      child: Column(
                        children: [
                          Container(
                            width: AppDimens.profileAvatar,
                            height: AppDimens.profileAvatar,
                            alignment: Alignment.center,
                            decoration: const BoxDecoration(
                              color: AppColors.border,
                              shape: BoxShape.circle,
                            ),
                            child: Container(
                              width: 78,
                              height: 78,
                              decoration: const BoxDecoration(
                                color: AppColors.dotInactive,
                                shape: BoxShape.circle,
                              ),
                            ),
                          ),
                          const SizedBox(height: AppDimens.listGap),
                          const Text(
                            'Change Profile Photo',
                            style: TextStyle(
                              color: AppColors.primary,
                              fontSize: AppDimens.bodyText,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                    ),
                    LabeledField(
                      label: 'Full Name',
                      child: AppTextField(
                        controller: _fullNameController,
                        hint: 'Your full name',
                        contentPadding:
                            const EdgeInsets.all(AppDimens.searchPadding),
                      ),
                    ),
                    const SizedBox(height: AppDimens.contentPadding),
                    LabeledField(
                      label: 'Username',
                      child: AppTextField(
                        controller: _usernameController,
                        hint: 'username',
                        contentPadding:
                            const EdgeInsets.all(AppDimens.searchPadding),
                      ),
                    ),
                    const SizedBox(height: AppDimens.contentPadding),
                    LabeledField(
                      label: 'Bio',
                      child: AppTextField(
                        controller: _bioController,
                        hint: 'Tell your story...',
                        maxLines: null,
                        minLines: 4,
                        contentPadding:
                            const EdgeInsets.all(AppDimens.searchPadding),
                      ),
                    ),
                    const SizedBox(height: AppDimens.contentPadding),
                    LabeledField(
                      label: 'Website',
                      child: AppTextField(
                        controller: _websiteController,
                        hint: 'https://',
                        contentPadding:
                            const EdgeInsets.all(AppDimens.searchPadding),
                      ),
                    ),
                    const SizedBox(height: AppDimens.contentPadding),
                    LabeledField(
                      label: 'Gender',
                      child: AppTextField(
                        controller: _genderController,
                        hint: 'Prefer not to say',
                        contentPadding:
                            const EdgeInsets.all(AppDimens.searchPadding),
                      ),
                    ),
                    const SizedBox(height: AppDimens.contentPadding),
                    LabeledField(
                      label: 'Language',
                      child: Container(
                        padding:
                            const EdgeInsets.all(AppDimens.searchPadding),
                        decoration: BoxDecoration(
                          color: AppColors.iconBackground,
                          borderRadius: BorderRadius.circular(
                              AppDimens.cardRadiusSmall),
                          border:
                              Border.all(color: AppColors.primaryBorder),
                        ),
                        child: const Text(
                          'Tamil (Tamil)',
                          style: TextStyle(
                            color: AppColors.primary,
                            fontSize: AppDimens.rowTitle,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: AppDimens.contentPadding),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        vertical: AppDimens.listGap,
                      ),
                      child: Row(
                        children: [
                          const Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Private Account',
                                  style: TextStyle(
                                    color: AppColors.title,
                                    fontSize: AppDimens.rowTitle,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                SizedBox(height: 2),
                                Text(
                                  'Only approved followers can see your content',
                                  style: TextStyle(
                                    color: AppColors.navIconMuted,
                                    fontSize: AppDimens.sectionLabel,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          _PrivateSwitch(
                            value: _isPrivate,
                            onChanged: (value) =>
                                setState(() => _isPrivate = value),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 40),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PrivateSwitch extends StatelessWidget {
  const _PrivateSwitch({required this.value, required this.onChanged});

  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => onChanged(!value),
      child: Container(
        width: 50,
        height: 28,
        padding: const EdgeInsets.all(2),
        decoration: BoxDecoration(
          color: value ? AppColors.primary : AppColors.dotInactive,
          borderRadius: BorderRadius.circular(14),
        ),
        child: AnimatedAlign(
          duration: const Duration(milliseconds: 150),
          alignment: value ? Alignment.centerRight : Alignment.centerLeft,
          child: Container(
            width: 24,
            height: 24,
            decoration: const BoxDecoration(
              color: AppColors.onPrimary,
              shape: BoxShape.circle,
            ),
          ),
        ),
      ),
    );
  }
}
