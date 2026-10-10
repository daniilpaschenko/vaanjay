import '../entities/explore_topic.dart';
import '../models/explore_topic.dart' as data;
import 'hashtag_mapper.dart';
import 'post_mapper.dart';
import 'reel_mapper.dart';

extension ExploreTopicModelMapper on data.ExploreTopic {
  ExploreTopic toEntity() => ExploreTopic(
        id: id,
        name: name,
        nameTa: nameTa,
        icon: icon,
        postCount: postCount,
        category: category,
      );
}

extension ExploreTopicEntityMapper on ExploreTopic {
  data.ExploreTopic toModel() => data.ExploreTopic(
        id: id,
        name: name,
        nameTa: nameTa,
        icon: icon,
        postCount: postCount,
        category: category,
      );
}

extension TrendingItemModelMapper on data.TrendingItem {
  TrendingItem toEntity() => TrendingItem(
        type: type,
        id: id,
        tag: tag,
        post: post?.toEntity(),
        reel: reel?.toEntity(),
        hashtag: hashtag?.toEntity(),
        topic: topic?.toEntity(),
        score: score,
      );
}

extension TrendingItemEntityMapper on TrendingItem {
  data.TrendingItem toModel() => data.TrendingItem(
        type: type,
        id: id,
        tag: tag,
        post: post?.toModel(),
        reel: reel?.toModel(),
        hashtag: hashtag?.toModel(),
        topic: topic?.toModel(),
        score: score,
      );
}
