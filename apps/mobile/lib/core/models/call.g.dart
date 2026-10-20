// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'call.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Call _$CallFromJson(Map<String, dynamic> json) => _Call(
  id: json['id'] as String? ?? '',
  callerId: json['caller_id'] as String? ?? '',
  caller: json['caller'] == null
      ? null
      : User.fromJson(json['caller'] as Map<String, dynamic>),
  receiverId: json['receiver_id'] as String?,
  receiver: json['receiver'] == null
      ? null
      : User.fromJson(json['receiver'] as Map<String, dynamic>),
  groupId: json['group_id'] as String?,
  type: json['type'] as String? ?? 'audio',
  status: json['status'] as String? ?? 'initiated',
  startedAt: json['started_at'] == null
      ? null
      : DateTime.parse(json['started_at'] as String),
  endedAt: json['ended_at'] == null
      ? null
      : DateTime.parse(json['ended_at'] as String),
  durationSeconds: (json['duration_seconds'] as num?)?.toInt(),
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$CallToJson(_Call instance) => <String, dynamic>{
  'id': instance.id,
  'caller_id': instance.callerId,
  'caller': ?instance.caller?.toJson(),
  'receiver_id': ?instance.receiverId,
  'receiver': ?instance.receiver?.toJson(),
  'group_id': ?instance.groupId,
  'type': instance.type,
  'status': instance.status,
  'started_at': ?instance.startedAt?.toIso8601String(),
  'ended_at': ?instance.endedAt?.toIso8601String(),
  'duration_seconds': ?instance.durationSeconds,
  'created_at': ?instance.createdAt?.toIso8601String(),
};
