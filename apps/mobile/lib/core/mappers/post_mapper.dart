import '../entities/post.dart';
import '../models/post.dart' as data;
import 'user_mapper.dart';

extension PostModelMapper on data.Post {
  Post toEntity() => Post(
        id: id,
        userId: userId,
        mediaUrls: mediaUrls,
        caption: caption,
        location: location,
        type: type,
        audience: audience,
        isArchived: isArchived,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        commentCount: commentCount,
        repostCount: repostCount,
        isLiked: isLiked,
        isDisliked: isDisliked,
        isSaved: isSaved,
        isReposted: isReposted,
        hashtags: hashtags,
        taggedUsers: taggedUsers,
        user: user?.toEntity(),
        createdAt: createdAt,
      );
}

extension PostEntityMapper on Post {
  data.Post toModel() => data.Post(
        id: id,
        userId: userId,
        mediaUrls: mediaUrls,
        caption: caption,
        location: location,
        type: type,
        audience: audience,
        isArchived: isArchived,
        likeCount: likeCount,
        dislikeCount: dislikeCount,
        commentCount: commentCount,
        repostCount: repostCount,
        isLiked: isLiked,
        isDisliked: isDisliked,
        isSaved: isSaved,
        isReposted: isReposted,
        hashtags: hashtags,
        taggedUsers: taggedUsers,
        user: user?.toModel(),
        createdAt: createdAt,
      );
}
