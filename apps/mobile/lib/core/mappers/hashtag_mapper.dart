import '../entities/hashtag.dart';
import '../models/hashtag.dart' as data;

extension HashtagModelMapper on data.Hashtag {
  Hashtag toEntity() => Hashtag(
        id: id,
        tag: tag,
        usageCount: usageCount,
        isTrending: isTrending,
        category: category,
        createdAt: createdAt,
      );
}

extension HashtagEntityMapper on Hashtag {
  data.Hashtag toModel() => data.Hashtag(
        id: id,
        tag: tag,
        usageCount: usageCount,
        isTrending: isTrending,
        category: category,
        createdAt: createdAt,
      );
}
