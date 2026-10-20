import '../entities/live_stream.dart';
import '../models/live_stream.dart' as data;
import 'user_mapper.dart';

extension LiveStreamModelMapper on data.LiveStream {
  LiveStream toEntity() => LiveStream(
        id: id,
        userId: userId,
        user: user?.toEntity(),
        title: title,
        topicTag: topicTag,
        viewerCount: viewerCount,
        isActive: isActive,
        startedAt: startedAt,
        endedAt: endedAt,
        coHostId: coHostId,
        replayUrl: replayUrl,
      );
}

extension LiveStreamEntityMapper on LiveStream {
  data.LiveStream toModel() => data.LiveStream(
        id: id,
        userId: userId,
        user: user?.toModel(),
        title: title,
        topicTag: topicTag,
        viewerCount: viewerCount,
        isActive: isActive,
        startedAt: startedAt,
        endedAt: endedAt,
        coHostId: coHostId,
        replayUrl: replayUrl,
      );
}
