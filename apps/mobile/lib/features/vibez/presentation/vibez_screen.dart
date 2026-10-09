import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/empty_state.dart';

class VibezScreen extends StatelessWidget {
  const VibezScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: AppColors.background,
      body: EmptyState(
        title: 'No Reels Yet',
        subtitle: 'Create or follow users to see reels',
      ),
    );
  }
}
