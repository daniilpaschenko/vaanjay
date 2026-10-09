// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'story.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Story _$StoryFromJson(Map<String, dynamic> json) => _Story(
  id: json['id'] as String? ?? '',
  userId: json['user_id'] as String? ?? '',
  mediaUrl: json['media_url'] as String? ?? '',
  caption: json['caption'] as String?,
  type: json['type'] as String? ?? 'image',
  expiresAt: json['expires_at'] == null
      ? null
      : DateTime.parse(json['expires_at'] as String),
  viewCount: (json['view_count'] as num?)?.toInt() ?? 0,
  viewers:
      (json['viewers'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const <String>[],
  user: json['user'] == null
      ? null
      : User.fromJson(json['user'] as Map<String, dynamic>),
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$StoryToJson(_Story instance) => <String, dynamic>{
  'id': instance.id,
  'user_id': instance.userId,
  'media_url': instance.mediaUrl,
  'caption': ?instance.caption,
  'type': instance.type,
  'expires_at': ?instance.expiresAt?.toIso8601String(),
  'view_count': instance.viewCount,
  'viewers': instance.viewers,
  'user': ?instance.user?.toJson(),
  'created_at': ?instance.createdAt?.toIso8601String(),
};
