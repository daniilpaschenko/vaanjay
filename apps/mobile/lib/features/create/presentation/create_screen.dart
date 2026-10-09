import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';

class CreateScreen extends StatefulWidget {
  const CreateScreen({super.key});

  @override
  State<CreateScreen> createState() => _CreateScreenState();
}

class _CreateScreenState extends State<CreateScreen> {
  static const _options = [
    ('photo', 'Photo'),
    ('reel', 'Reel'),
    ('story', 'Story'),
    ('live', 'Go Live'),
    ('text', 'Text Post'),
  ];

  String? _postType;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: _postType == null ? _buildOptions() : _buildEditor(),
      ),
    );
  }

  Widget _buildOptions() {
    return Padding(
      padding: const EdgeInsets.only(top: AppDimens.screenTopInset),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Padding(
            padding: EdgeInsets.symmetric(
              horizontal: AppDimens.contentPadding,
            ),
            child: Text(
              'Create',
              style: TextStyle(
                fontSize: AppDimens.screenTitle,
                fontWeight: FontWeight.w700,
                color: AppColors.title,
              ),
            ),
          ),
          const SizedBox(height: AppDimens.settingsSectionGap),
          Expanded(
            child: GridView.count(
              crossAxisCount: 2,
              padding: const EdgeInsets.symmetric(
                horizontal: AppDimens.contentPadding,
              ),
              mainAxisSpacing: AppDimens.listGap,
              crossAxisSpacing: AppDimens.listGap,
              children: [
                for (final option in _options)
                  _OptionCard(
                    label: option.$2,
                    onTap: () => setState(() => _postType = option.$1),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEditor() {
    final isText = _postType == 'text';
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.only(
            top: AppDimens.screenTopInset,
            left: AppDimens.contentPadding,
            right: AppDimens.contentPadding,
            bottom: AppDimens.contentPadding,
          ),
          decoration: const BoxDecoration(
            border: Border(bottom: BorderSide(color: AppColors.border)),
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () => setState(() => _postType = null),
                child: const Text(
                  'Cancel',
                  style: TextStyle(
                    color: AppColors.navIconMuted,
                    fontSize: AppDimens.buttonText,
                  ),
                ),
              ),
              Text(
                'New $_postType',
                style: const TextStyle(
                  color: AppColors.title,
                  fontSize: AppDimens.buttonText,
                  fontWeight: FontWeight.w600,
                ),
              ),
              _ShareButton(onTap: () => setState(() => _postType = null)),
            ],
          ),
        ),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(
              horizontal: AppDimens.contentPadding,
              vertical: AppDimens.contentPadding,
            ),
            child: Column(
              children: [
                if (isText) ...[
                  const AppTextField(
                    hint: "What's on your mind?",
                    maxLines: null,
                    minLines: 4,
                    contentPadding: EdgeInsets.all(AppDimens.searchPadding),
                  ),
                  const SizedBox(height: AppDimens.listGap),
                ],
                const AppTextField(
                  hint: 'Write a caption...',
                  maxLines: null,
                  minLines: 4,
                  contentPadding: EdgeInsets.all(AppDimens.searchPadding),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _OptionCard extends StatelessWidget {
  const _OptionCard({required this.label, required this.onTap});

  final String label;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(AppDimens.optionCardRadius),
          border: Border.all(color: AppColors.border),
        ),
        child: Text(
          label,
          style: const TextStyle(
            color: AppColors.title,
            fontSize: AppDimens.inputText,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
    );
  }
}

class _ShareButton extends StatelessWidget {
  const _ShareButton({required this.onTap});

  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppDimens.contentPadding,
          vertical: AppDimens.fieldGap,
        ),
        decoration: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.circular(AppDimens.cardRadiusTiny),
        ),
        child: const Text(
          'Share',
          style: TextStyle(
            color: AppColors.onPrimary,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
    );
  }
}
