// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'upi_transaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_UPITransaction _$UPITransactionFromJson(Map<String, dynamic> json) =>
    _UPITransaction(
      id: json['id'] as String? ?? '',
      senderId: json['sender_id'] as String? ?? '',
      sender: json['sender'] == null
          ? null
          : User.fromJson(json['sender'] as Map<String, dynamic>),
      receiverId: json['receiver_id'] as String? ?? '',
      receiver: json['receiver'] == null
          ? null
          : User.fromJson(json['receiver'] as Map<String, dynamic>),
      amount: (json['amount'] as num?)?.toDouble() ?? 0,
      upiRefId: json['upi_ref_id'] as String? ?? '',
      status: json['status'] as String? ?? 'pending',
      note: json['note'] as String?,
      createdAt: json['created_at'] == null
          ? null
          : DateTime.parse(json['created_at'] as String),
    );

Map<String, dynamic> _$UPITransactionToJson(_UPITransaction instance) =>
    <String, dynamic>{
      'id': instance.id,
      'sender_id': instance.senderId,
      'sender': ?instance.sender?.toJson(),
      'receiver_id': instance.receiverId,
      'receiver': ?instance.receiver?.toJson(),
      'amount': instance.amount,
      'upi_ref_id': instance.upiRefId,
      'status': instance.status,
      'note': ?instance.note,
      'created_at': ?instance.createdAt?.toIso8601String(),
    };
