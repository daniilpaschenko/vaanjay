import 'user.dart';

class Post {
  const Post({
    this.id = '',
    this.userId = '',
    this.mediaUrls = const <String>[],
    this.caption,
    this.location,
    this.type = 'photo',
    this.audience = 'public',
    this.isArchived = false,
    this.likeCount = 0,
    this.dislikeCount = 0,
    this.commentCount = 0,
    this.repostCount = 0,
    this.isLiked = false,
    this.isDisliked = false,
    this.isSaved = false,
    this.isReposted = false,
    this.hashtags = const <String>[],
    this.taggedUsers = const <String>[],
    this.user,
    this.createdAt,
  });

  final String id;
  final String userId;
  final List<String> mediaUrls;
  final String? caption;
  final String? location;
  final String type;
  final String audience;
  final bool isArchived;
  final int likeCount;
  final int dislikeCount;
  final int commentCount;
  final int repostCount;
  final bool isLiked;
  final bool isDisliked;
  final bool isSaved;
  final bool isReposted;
  final List<String> hashtags;
  final List<String> taggedUsers;
  final User? user;
  final DateTime? createdAt;
}
