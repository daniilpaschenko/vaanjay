import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'comment.freezed.dart';
part 'comment.g.dart';

@freezed
abstract class Comment with _$Comment {
  const factory Comment({
    @Default('') String id,
    @Default('') String targetId,
    @Default('post') String targetType,
    @Default('') String userId,
    @Default('') String content,
    String? parentCommentId,
    @Default(0) int likeCount,
    @Default(false) bool isLiked,
    User? user,
    @Default(<Comment>[]) List<Comment> replies,
    DateTime? createdAt,
  }) = _Comment;

  factory Comment.fromJson(Map<String, Object?> json) =>
      _$CommentFromJson(json);
}
