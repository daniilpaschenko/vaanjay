// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'post.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Post _$PostFromJson(Map<String, dynamic> json) => _Post(
  id: json['id'] as String? ?? '',
  userId: json['user_id'] as String? ?? '',
  mediaUrls:
      (json['media_urls'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const <String>[],
  caption: json['caption'] as String?,
  location: json['location'] as String?,
  type: json['type'] as String? ?? 'photo',
  audience: json['audience'] as String? ?? 'public',
  isArchived: json['is_archived'] as bool? ?? false,
  likeCount: (json['like_count'] as num?)?.toInt() ?? 0,
  dislikeCount: (json['dislike_count'] as num?)?.toInt() ?? 0,
  commentCount: (json['comment_count'] as num?)?.toInt() ?? 0,
  repostCount: (json['repost_count'] as num?)?.toInt() ?? 0,
  isLiked: json['is_liked'] as bool? ?? false,
  isDisliked: json['is_disliked'] as bool? ?? false,
  isSaved: json['is_saved'] as bool? ?? false,
  isReposted: json['is_reposted'] as bool? ?? false,
  hashtags:
      (json['hashtags'] as List<dynamic>?)?.map((e) => e as String).toList() ??
      const <String>[],
  taggedUsers:
      (json['tagged_users'] as List<dynamic>?)
          ?.map((e) => e as String)
          .toList() ??
      const <String>[],
  user: json['user'] == null
      ? null
      : User.fromJson(json['user'] as Map<String, dynamic>),
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$PostToJson(_Post instance) => <String, dynamic>{
  'id': instance.id,
  'user_id': instance.userId,
  'media_urls': instance.mediaUrls,
  'caption': ?instance.caption,
  'location': ?instance.location,
  'type': instance.type,
  'audience': instance.audience,
  'is_archived': instance.isArchived,
  'like_count': instance.likeCount,
  'dislike_count': instance.dislikeCount,
  'comment_count': instance.commentCount,
  'repost_count': instance.repostCount,
  'is_liked': instance.isLiked,
  'is_disliked': instance.isDisliked,
  'is_saved': instance.isSaved,
  'is_reposted': instance.isReposted,
  'hashtags': instance.hashtags,
  'tagged_users': instance.taggedUsers,
  'user': ?instance.user?.toJson(),
  'created_at': ?instance.createdAt?.toIso8601String(),
};
