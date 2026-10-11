import '../entities/entities.dart';

abstract class PaymentInterface {
  Future<UPITransaction> initiatePayment({
    required String receiverId,
    required double amount,
    String? note,
  });

  Future<Paginated<UPITransaction>> getTransactions({int page = 1});

  Future<UPITransaction> getTransaction(String transactionId);

  Future<void> cancelTransaction(String transactionId);
}
