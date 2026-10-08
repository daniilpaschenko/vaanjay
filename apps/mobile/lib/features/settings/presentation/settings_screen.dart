import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../auth/providers/auth_provider.dart';

class SettingsScreen extends ConsumerWidget {
  const SettingsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Settings',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                color: AppColors.title,
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => ref.read(authProvider.notifier).signOut(),
              child: const Text('Sign out'),
            ),
          ],
        ),
      ),
    );
  }
}
