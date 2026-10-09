import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/screen_header.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          const ScreenHeader(
            title: Text(
              'Notifications',
              style: TextStyle(
                fontSize: AppDimens.screenTitle,
                fontWeight: FontWeight.w700,
                color: AppColors.title,
              ),
            ),
            paddingBottom: AppDimens.fieldGap,
          ),
          Expanded(
            child: ListView(
              children: const [
                EmptyState(
                  title: 'No notifications yet',
                  subtitle: 'Likes, comments and follows show up here',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
