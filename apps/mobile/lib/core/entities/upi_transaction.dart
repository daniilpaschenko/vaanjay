import 'user.dart';

class UPITransaction {
  const UPITransaction({
    this.id = '',
    this.senderId = '',
    this.sender,
    this.receiverId = '',
    this.receiver,
    this.amount = 0,
    this.upiRefId = '',
    this.status = 'pending',
    this.note,
    this.createdAt,
  });

  final String id;
  final String senderId;
  final User? sender;
  final String receiverId;
  final User? receiver;
  final double amount;
  final String upiRefId;
  final String status;
  final String? note;
  final DateTime? createdAt;
}
