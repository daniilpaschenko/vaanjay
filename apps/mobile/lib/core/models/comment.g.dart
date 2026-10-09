// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'comment.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Comment _$CommentFromJson(Map<String, dynamic> json) => _Comment(
  id: json['id'] as String? ?? '',
  targetId: json['target_id'] as String? ?? '',
  targetType: json['target_type'] as String? ?? 'post',
  userId: json['user_id'] as String? ?? '',
  content: json['content'] as String? ?? '',
  parentCommentId: json['parent_comment_id'] as String?,
  likeCount: (json['like_count'] as num?)?.toInt() ?? 0,
  isLiked: json['is_liked'] as bool? ?? false,
  user: json['user'] == null
      ? null
      : User.fromJson(json['user'] as Map<String, dynamic>),
  replies:
      (json['replies'] as List<dynamic>?)
          ?.map((e) => Comment.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const <Comment>[],
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$CommentToJson(_Comment instance) => <String, dynamic>{
  'id': instance.id,
  'target_id': instance.targetId,
  'target_type': instance.targetType,
  'user_id': instance.userId,
  'content': instance.content,
  'parent_comment_id': ?instance.parentCommentId,
  'like_count': instance.likeCount,
  'is_liked': instance.isLiked,
  'user': ?instance.user?.toJson(),
  'replies': instance.replies.map((e) => e.toJson()).toList(),
  'created_at': ?instance.createdAt?.toIso8601String(),
};
