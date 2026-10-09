import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/screen_header.dart';

class MessagesScreen extends StatelessWidget {
  const MessagesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Column(
        children: [
          const ScreenHeader(
            title: Text(
              'Messages',
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
                  title: 'No conversations yet',
                  subtitle: 'Start chatting with people you follow',
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
