import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';

/// Three-column placeholder grid used by the profile screens.
class ProfilePlaceholderGrid extends StatelessWidget {
  const ProfilePlaceholderGrid({super.key, this.count = 9});

  final int count;

  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 1,
      crossAxisSpacing: 1,
      children: [
        for (var i = 0; i < count; i++)
          const ColoredBox(color: AppColors.borderSubtle),
      ],
    );
  }
}
