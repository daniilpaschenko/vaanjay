import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/empty_state.dart';
import '../providers/explore_provider.dart';

class ExploreScreen extends ConsumerStatefulWidget {
  const ExploreScreen({super.key});

  @override
  ConsumerState<ExploreScreen> createState() => _ExploreScreenState();
}

class _ExploreScreenState extends ConsumerState<ExploreScreen> {
  final _searchController = TextEditingController();

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.only(
              top: AppDimens.screenTopInset,
              left: AppDimens.headerHPadding,
              right: AppDimens.headerHPadding,
              bottom: AppDimens.homeHeaderBottomGap,
            ),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: AppColors.borderSubtle),
              ),
            ),
            child: AppTextField(
              controller: _searchController,
              hint: 'Search VAANJAY...',
              onChanged: (value) =>
                  ref.read(exploreProvider.notifier).setSearch(value),
              contentPadding: const EdgeInsets.all(AppDimens.searchPadding),
            ),
          ),
          const Expanded(
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Padding(
                    padding: EdgeInsets.only(
                      left: AppDimens.contentPadding,
                      right: AppDimens.contentPadding,
                      top: AppDimens.contentPadding,
                    ),
                    child: Text(
                      'Explore Topics',
                      style: TextStyle(
                        color: AppColors.title,
                        fontSize: AppDimens.sectionTitle,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                  EmptyState(
                    title: 'Nothing here yet',
                    subtitle: 'Topics will appear as the community grows',
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
