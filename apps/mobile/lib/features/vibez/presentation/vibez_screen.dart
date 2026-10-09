import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/widgets/empty_state.dart';
import '../providers/vibez_provider.dart';

class VibezScreen extends ConsumerWidget {
  const VibezScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final reels = ref.watch(vibezProvider).reels;
    if (reels.isEmpty) {
      return const Scaffold(
        backgroundColor: AppColors.background,
        body: EmptyState(
          title: 'No Reels Yet',
          subtitle: 'Create or follow users to see reels',
        ),
      );
    }
    return const Scaffold(backgroundColor: AppColors.background);
  }
}
