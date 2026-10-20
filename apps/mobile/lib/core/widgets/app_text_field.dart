import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../theme/app_colors.dart';
import '../theme/app_dimens.dart';

/// Themed single-line text field used across the auth and form screens.
class AppTextField extends StatelessWidget {
  const AppTextField({
    super.key,
    this.controller,
    this.hint,
    this.keyboardType,
    this.obscureText = false,
    this.textAlign = TextAlign.start,
    this.maxLength,
    this.focusNode,
    this.onChanged,
    this.onSubmitted,
    this.autofocus = false,
    this.borderColor = AppColors.border,
    this.fillColor = AppColors.fieldBackground,
    this.textStyle,
    this.contentPadding =
        const EdgeInsets.all(AppDimens.fieldPadding),
    this.inputFormatters,
    this.textInputAction,
    this.maxLines = 1,
    this.minLines,
  });

  final TextEditingController? controller;
  final String? hint;
  final TextInputType? keyboardType;
  final bool obscureText;
  final TextAlign textAlign;
  final int? maxLength;
  final FocusNode? focusNode;
  final ValueChanged<String>? onChanged;
  final ValueChanged<String>? onSubmitted;
  final bool autofocus;
  final Color borderColor;
  final Color fillColor;
  final TextStyle? textStyle;
  final EdgeInsetsGeometry contentPadding;
  final List<TextInputFormatter>? inputFormatters;
  final TextInputAction? textInputAction;
  final int? maxLines;
  final int? minLines;

  @override
  Widget build(BuildContext context) {
    final border = OutlineInputBorder(
      borderRadius: BorderRadius.circular(AppDimens.inputRadius),
      borderSide: BorderSide(color: borderColor),
    );
    return TextField(
      controller: controller,
      keyboardType: keyboardType,
      obscureText: obscureText,
      textAlign: textAlign,
      maxLength: maxLength,
      focusNode: focusNode,
      onChanged: onChanged,
      onSubmitted: onSubmitted,
      autofocus: autofocus,
      inputFormatters: inputFormatters,
      textInputAction: textInputAction,
      maxLines: maxLines,
      minLines: minLines,
      autocorrect: false,
      style: textStyle ??
          const TextStyle(
            fontSize: AppDimens.inputText,
            color: AppColors.title,
          ),
      decoration: InputDecoration(
        counterText: '',
        hintText: hint,
        hintStyle: const TextStyle(color: AppColors.hint),
        filled: true,
        fillColor: fillColor,
        contentPadding: contentPadding,
        border: border,
        enabledBorder: border,
        focusedBorder: border,
      ),
    );
  }
}
