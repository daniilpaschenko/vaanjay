// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'live_stream.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_LiveStream _$LiveStreamFromJson(Map<String, dynamic> json) => _LiveStream(
  id: json['id'] as String? ?? '',
  userId: json['user_id'] as String? ?? '',
  user: json['user'] == null
      ? null
      : User.fromJson(json['user'] as Map<String, dynamic>),
  title: json['title'] as String?,
  topicTag: json['topic_tag'] as String?,
  viewerCount: (json['viewer_count'] as num?)?.toInt() ?? 0,
  isActive: json['is_active'] as bool? ?? false,
  startedAt: json['started_at'] == null
      ? null
      : DateTime.parse(json['started_at'] as String),
  endedAt: json['ended_at'] == null
      ? null
      : DateTime.parse(json['ended_at'] as String),
  coHostId: json['co_host_id'] as String?,
  replayUrl: json['replay_url'] as String?,
);

Map<String, dynamic> _$LiveStreamToJson(_LiveStream instance) =>
    <String, dynamic>{
      'id': instance.id,
      'user_id': instance.userId,
      'user': ?instance.user?.toJson(),
      'title': ?instance.title,
      'topic_tag': ?instance.topicTag,
      'viewer_count': instance.viewerCount,
      'is_active': instance.isActive,
      'started_at': ?instance.startedAt?.toIso8601String(),
      'ended_at': ?instance.endedAt?.toIso8601String(),
      'co_host_id': ?instance.coHostId,
      'replay_url': ?instance.replayUrl,
    };
