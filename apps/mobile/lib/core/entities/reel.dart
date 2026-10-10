import 'user.dart';

class Reel {
  const Reel({
    this.id = '',
    this.userId = '',
    this.videoUrl = '',
    this.thumbnailUrl,
    this.caption,
    this.audioId,
    this.durationSeconds = 0,
    this.viewCount = 0,
    this.likeCount = 0,
    this.dislikeCount = 0,
    this.commentCount = 0,
    this.isLiked = false,
    this.isDisliked = false,
    this.isSaved = false,
    this.hashtags = const <String>[],
    this.user,
    this.createdAt,
  });

  final String id;
  final String userId;
  final String videoUrl;
  final String? thumbnailUrl;
  final String? caption;
  final String? audioId;
  final int durationSeconds;
  final int viewCount;
  final int likeCount;
  final int dislikeCount;
  final int commentCount;
  final bool isLiked;
  final bool isDisliked;
  final bool isSaved;
  final List<String> hashtags;
  final User? user;
  final DateTime? createdAt;
}
