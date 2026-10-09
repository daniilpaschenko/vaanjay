import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'upi_transaction.freezed.dart';
part 'upi_transaction.g.dart';

@freezed
abstract class UPITransaction with _$UPITransaction {
  const factory UPITransaction({
    @Default('') String id,
    @Default('') String senderId,
    User? sender,
    @Default('') String receiverId,
    User? receiver,
    @Default(0) double amount,
    @Default('') String upiRefId,
    @Default('pending') String status,
    String? note,
    DateTime? createdAt,
  }) = _UPITransaction;

  factory UPITransaction.fromJson(Map<String, Object?> json) =>
      _$UPITransactionFromJson(json);
}
