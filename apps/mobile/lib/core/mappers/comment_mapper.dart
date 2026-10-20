import '../entities/comment.dart';
import '../models/comment.dart' as data;
import 'user_mapper.dart';

extension CommentModelMapper on data.Comment {
  Comment toEntity() => Comment(
        id: id,
        targetId: targetId,
        targetType: targetType,
        userId: userId,
        content: content,
        parentCommentId: parentCommentId,
        likeCount: likeCount,
        isLiked: isLiked,
        user: user?.toEntity(),
        replies: replies.map((e) => e.toEntity()).toList(growable: false),
        createdAt: createdAt,
      );
}

extension CommentEntityMapper on Comment {
  data.Comment toModel() => data.Comment(
        id: id,
        targetId: targetId,
        targetType: targetType,
        userId: userId,
        content: content,
        parentCommentId: parentCommentId,
        likeCount: likeCount,
        isLiked: isLiked,
        user: user?.toModel(),
        replies: replies.map((e) => e.toModel()).toList(growable: false),
        createdAt: createdAt,
      );
}
