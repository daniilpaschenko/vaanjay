import 'package:flutter_riverpod/flutter_riverpod.dart';

enum PaymentTab { send, request, history }

class PaymentState {
  const PaymentState({
    this.tab = PaymentTab.send,
    this.receiver = '',
    this.amount = '',
    this.note = '',
  });

  final PaymentTab tab;
  final String receiver;
  final String amount;
  final String note;

  PaymentState copyWith({
    PaymentTab? tab,
    String? receiver,
    String? amount,
    String? note,
  }) {
    return PaymentState(
      tab: tab ?? this.tab,
      receiver: receiver ?? this.receiver,
      amount: amount ?? this.amount,
      note: note ?? this.note,
    );
  }
}

class PaymentNotifier extends Notifier<PaymentState> {
  @override
  PaymentState build() => const PaymentState();

  void setTab(PaymentTab tab) => state = state.copyWith(tab: tab);

  void setReceiver(String value) => state = state.copyWith(receiver: value);

  void setAmount(String value) => state = state.copyWith(amount: value);

  void setNote(String value) => state = state.copyWith(note: value);
}

final paymentProvider = NotifierProvider<PaymentNotifier, PaymentState>(
  PaymentNotifier.new,
);
