import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_dimens.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/back_link.dart';
import '../../../core/widgets/labeled_field.dart';
import '../../../core/widgets/primary_button.dart';
import '../../../core/widgets/screen_header.dart';
import '../../../core/widgets/secondary_button.dart';
import '../../../core/widgets/segmented_tabs.dart';

class PaymentScreen extends StatefulWidget {
  const PaymentScreen({super.key});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  static const _tabs = ['Send', 'Request', 'History'];

  int _tabIndex = 0;
  final _receiverController = TextEditingController();
  final _amountController = TextEditingController();
  final _noteController = TextEditingController();

  @override
  void dispose() {
    _receiverController.dispose();
    _amountController.dispose();
    _noteController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        top: false,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            ScreenHeader(
              leading: BackLink(onTap: () => context.pop()),
              title: const Center(
                child: Text(
                  'Payments',
                  style: TextStyle(
                    color: AppColors.title,
                    fontSize: 20,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
              trailing: const SizedBox(width: 40),
            ),
            Padding(
              padding: const EdgeInsets.only(
                left: AppDimens.contentPadding,
                right: AppDimens.contentPadding,
                top: AppDimens.contentPadding,
                bottom: 20,
              ),
              child: SegmentedTabs(
                labels: _tabs,
                selectedIndex: _tabIndex,
                onChanged: (index) => setState(() => _tabIndex = index),
                style: SegmentedTabsStyle.pill,
              ),
            ),
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(
                  horizontal: AppDimens.contentPadding,
                ),
                child: switch (_tabIndex) {
                  0 => _buildSend(),
                  1 => _buildRequest(),
                  _ => _buildHistory(),
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSend() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Container(
          padding: const EdgeInsets.all(AppDimens.contentPadding),
          decoration: BoxDecoration(
            color: AppColors.iconBackground,
            borderRadius: BorderRadius.circular(AppDimens.cardRadius),
            border: Border.all(color: AppColors.primaryBorder),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Your UPI ID',
                style: TextStyle(
                  color: AppColors.navIconMuted,
                  fontSize: AppDimens.sectionLabel,
                ),
              ),
              SizedBox(height: 4),
              Text(
                'username@vaanjay',
                style: TextStyle(
                  color: AppColors.primary,
                  fontSize: 18,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppDimens.contentPadding),
        LabeledField(
          label: 'Send to',
          child: AppTextField(
            controller: _receiverController,
            hint: 'Username or phone number',
            contentPadding: const EdgeInsets.all(AppDimens.searchPadding),
          ),
        ),
        const SizedBox(height: AppDimens.contentPadding),
        LabeledField(label: 'Amount', child: _buildAmountField()),
        const SizedBox(height: AppDimens.contentPadding),
        LabeledField(
          label: 'Note (optional)',
          child: AppTextField(
            controller: _noteController,
            hint: 'What is this for?',
            contentPadding: const EdgeInsets.all(AppDimens.searchPadding),
          ),
        ),
        const SizedBox(height: AppDimens.contentPadding),
        PrimaryButton(
          text: 'Pay Rs${_amountController.text.isEmpty ? '0.00' : _amountController.text}',
          onTap: _receiverController.text.isEmpty ||
                  _amountController.text.isEmpty
              ? null
              : () => context.pop(),
          padding: const EdgeInsets.all(AppDimens.buttonPadding),
          textStyle: const TextStyle(
            color: AppColors.onPrimary,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppDimens.listGap),
        SecondaryButton(
          text: 'Scan UPI QR Code',
          onTap: () {},
          padding: const EdgeInsets.all(AppDimens.buttonPadding),
        ),
        const SizedBox(height: AppDimens.settingsSectionGap),
      ],
    );
  }

  Widget _buildRequest() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Padding(
          padding: EdgeInsets.only(top: 40, bottom: AppDimens.contentPadding),
          child: Text(
            'Request money from another VAANJAY user',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: AppColors.navIconMuted,
              fontSize: AppDimens.rowTitle,
            ),
          ),
        ),
        LabeledField(
          label: 'Request from',
          child: AppTextField(
            hint: 'Username or phone number',
            contentPadding: const EdgeInsets.all(AppDimens.searchPadding),
          ),
        ),
        const SizedBox(height: AppDimens.contentPadding),
        LabeledField(label: 'Amount', child: _buildAmountField()),
        const SizedBox(height: AppDimens.contentPadding),
        PrimaryButton(
          text: 'Request Money',
          onTap: () {},
          padding: const EdgeInsets.all(AppDimens.buttonPadding),
          textStyle: const TextStyle(
            color: AppColors.onPrimary,
            fontSize: 18,
            fontWeight: FontWeight.w600,
          ),
        ),
        const SizedBox(height: AppDimens.settingsSectionGap),
      ],
    );
  }

  Widget _buildHistory() {
    return const Padding(
      padding: EdgeInsets.only(top: 40),
      child: Text(
        'No transactions yet',
        textAlign: TextAlign.center,
        style: TextStyle(
          color: AppColors.navIconMuted,
          fontSize: AppDimens.rowTitle,
        ),
      ),
    );
  }

  Widget _buildAmountField() {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        const Text(
          'Rs',
          style: TextStyle(
            color: AppColors.primary,
            fontSize: AppDimens.rupeeSize,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(width: AppDimens.listGap),
        Expanded(
          child: AppTextField(
            controller: _amountController,
            hint: '0.00',
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
            contentPadding: const EdgeInsets.all(AppDimens.searchPadding),
            textStyle: const TextStyle(
              color: AppColors.title,
              fontSize: AppDimens.rupeeSize,
              fontWeight: FontWeight.w700,
            ),
          ),
        ),
      ],
    );
  }
}


