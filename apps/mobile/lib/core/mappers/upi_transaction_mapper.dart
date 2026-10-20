import '../entities/upi_transaction.dart';
import '../models/upi_transaction.dart' as data;
import 'user_mapper.dart';

extension UPITransactionModelMapper on data.UPITransaction {
  UPITransaction toEntity() => UPITransaction(
        id: id,
        senderId: senderId,
        sender: sender?.toEntity(),
        receiverId: receiverId,
        receiver: receiver?.toEntity(),
        amount: amount,
        upiRefId: upiRefId,
        status: status,
        note: note,
        createdAt: createdAt,
      );
}

extension UPITransactionEntityMapper on UPITransaction {
  data.UPITransaction toModel() => data.UPITransaction(
        id: id,
        senderId: senderId,
        sender: sender?.toModel(),
        receiverId: receiverId,
        receiver: receiver?.toModel(),
        amount: amount,
        upiRefId: upiRefId,
        status: status,
        note: note,
        createdAt: createdAt,
      );
}
