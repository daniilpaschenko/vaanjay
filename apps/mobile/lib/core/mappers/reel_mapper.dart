import '../entities/reel.dart';
import '../models/reel.dart' as data;
import 'user_mapper.dart';

extension ReelModelMapper on data.Reel {
  Reel toEntity() => Reel(
        id: id,
        userId: userId,
        videoUrl: videoUrl,
        thumbnailUrl: thumbnailUrl,
        caption: caption,
        audioId: audioId,
        durationSeconds: durationSeconds,
        viewCount: viewCount,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        commentCount: commentCount,
        isLiked: isLiked,
        isDisliked: isDisliked,
        isSaved: isSaved,
        hashtags: hashtags,
        user: user?.toEntity(),
        createdAt: createdAt,
      );
}

extension ReelEntityMapper on Reel {
  data.Reel toModel() => data.Reel(
        id: id,
        userId: userId,
        videoUrl: videoUrl,
        thumbnailUrl: thumbnailUrl,
        caption: caption,
        audioId: audioId,
        durationSeconds: durationSeconds,
        viewCount: viewCount,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        commentCount: commentCount,
        isLiked: isLiked,
        isDisliked: isDisliked,
        isSaved: isSaved,
        hashtags: hashtags,
        user: user?.toModel(),
        createdAt: createdAt,
      );
}
