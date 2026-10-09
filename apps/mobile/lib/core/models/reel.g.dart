// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'reel.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Reel _$ReelFromJson(Map<String, dynamic> json) => _Reel(
  id: json['id'] as String? ?? '',
  userId: json['user_id'] as String? ?? '',
  videoUrl: json['video_url'] as String? ?? '',
  thumbnailUrl: json['thumbnail_url'] as String?,
  caption: json['caption'] as String?,
  audioId: json['audio_id'] as String?,
  durationSeconds: (json['duration_seconds'] as num?)?.toInt() ?? 0,
  viewCount: (json['view_count'] as num?)?.toInt() ?? 0,
  likeCount: (json['like_count'] as num?)?.toInt() ?? 0,
  dislikeCount: (json['dislike_count'] as num?)?.toInt() ?? 0,
  commentCount: (json['comment_count'] as num?)?.toInt() ?? 0,
  isLiked: json['is_liked'] as bool? ?? false,
  isDisliked: json['is_disliked'] as bool? ?? false,
  isSaved: json['is_saved'] as bool? ?? false,
  hashtags:
      (json['hashtags'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const <String>[],
  user: json['user'] == null
      ? null
      : User.fromJson(json['user'] as Map<String, dynamic>),
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$ReelToJson(_Reel instance) => <String, dynamic>{
  'id': instance.id,
  'user_id': instance.userId,
  'video_url': instance.videoUrl,
  'thumbnail_url': ?instance.thumbnailUrl,
  'caption': ?instance.caption,
  'audio_id': ?instance.audioId,
  'duration_seconds': instance.durationSeconds,
  'view_count': instance.viewCount,
  'like_count': instance.likeCount,
  'dislike_count': instance.dislikeCount,
  'comment_count': instance.commentCount,
  'is_liked': instance.isLiked,
  'is_disliked': instance.isDisliked,
  'is_saved': instance.isSaved,
  'hashtags': instance.hashtags,
  'user': ?instance.user?.toJson(),
  'created_at': ?instance.createdAt?.toIso8601String(),
};
