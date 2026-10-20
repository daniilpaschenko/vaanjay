import '../entities/story.dart';
import '../models/story.dart' as data;
import 'user_mapper.dart';

extension StoryModelMapper on data.Story {
  Story toEntity() => Story(
        id: id,
        userId: userId,
        mediaUrl: mediaUrl,
        caption: caption,
        type: type,
        expiresAt: expiresAt,
        viewCount: viewCount,
        viewers: viewers,
        user: user?.toEntity(),
        createdAt: createdAt,
      );
}

extension StoryEntityMapper on Story {
  data.Story toModel() => data.Story(
        id: id,
        userId: userId,
        mediaUrl: mediaUrl,
        caption: caption,
        type: type,
        expiresAt: expiresAt,
        viewCount: viewCount,
        viewers: viewers,
        user: user?.toModel(),
        createdAt: createdAt,
      );
}
