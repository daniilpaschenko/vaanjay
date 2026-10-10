import 'user.dart';

class LiveStream {
  const LiveStream({
    this.id = '',
    this.userId = '',
    this.user,
    this.title,
    this.topicTag,
    this.viewerCount = 0,
    this.isActive = false,
    this.startedAt,
    this.endedAt,
    this.coHostId,
    this.replayUrl,
  });

  final String id;
  final String userId;
  final User? user;
  final String? title;
  final String? topicTag;
  final int viewerCount;
  final bool isActive;
  final DateTime? startedAt;
  final DateTime? endedAt;
  final String? coHostId;
  final String? replayUrl;
}
