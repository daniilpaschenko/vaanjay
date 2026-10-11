import '../entities/entities.dart';

abstract class LiveStreamInterface {
  Future<Paginated<LiveStream>> getLiveStreams({int page = 1});

  Future<LiveStream> getLiveStream(String liveStreamId);

  Future<LiveStream> startLiveStream({String? title, String? topicTag});

  Future<void> joinLiveStream(String liveStreamId);

  Future<void> leaveLiveStream(String liveStreamId);

  Future<void> endLiveStream(String liveStreamId);
}
