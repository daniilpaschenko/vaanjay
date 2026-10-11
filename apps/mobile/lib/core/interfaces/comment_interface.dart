import '../entities/entities.dart';

abstract class CommentInterface {
  Future<Paginated<Comment>> getComments(
    String targetId, {
    String targetType = 'post',
    int page = 1,
    int limit = 20,
  });

  Future<Paginated<Comment>> getReplies(String commentId, {int page = 1});

  Future<Comment> addComment({
    required String targetId,
    required String content,
    String targetType = 'post',
    String? parentCommentId,
  });

  Future<void> deleteComment(String commentId);

  Future<void> likeComment(String commentId);

  Future<void> unlikeComment(String commentId);
}
