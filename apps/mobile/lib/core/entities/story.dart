import 'user.dart';

class Story {
  const Story({
    this.id = '',
    this.userId = '',
    this.mediaUrl = '',
    this.caption,
    this.type = 'image',
    this.expiresAt,
    this.viewCount = 0,
    this.viewers = const <String>[],
    this.user,
    this.createdAt,
  });

  final String id;
  final String userId;
  final String mediaUrl;
  final String? caption;
  final String type;
  final DateTime? expiresAt;
  final int viewCount;
  final List<String> viewers;
  final User? user;
  final DateTime? createdAt;
}
