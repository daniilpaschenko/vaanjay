import 'package:flutter/material.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Circular placeholder avatar used throughout the app.
class AvatarCircle extends StatelessWidget {
  const AvatarCircle({
    super.key,
    this.size = AppDimens.avatarSmall,
    this.color = AppColors.border,
    this.child,
  });

  final double size;
  final Color color;
  final Widget? child;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      alignment: Alignment.center,
      decoration: BoxDecoration(color: color, shape: BoxShape.circle),
      child: child,
    );
  }
}
