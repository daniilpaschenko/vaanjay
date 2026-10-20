import 'user.dart';

class Comment {
  const Comment({
    this.id = '',
    this.targetId = '',
    this.targetType = 'post',
    this.userId = '',
    this.content = '',
    this.parentCommentId,
    this.likeCount = 0,
    this.isLiked = false,
    this.user,
    this.replies = const <Comment>[],
    this.createdAt,
  });

  final String id;
  final String targetId;
  final String targetType;
  final String userId;
  final String content;
  final String? parentCommentId;
  final int likeCount;
  final bool isLiked;
  final User? user;
  final List<Comment> replies;
  final DateTime? createdAt;
}
