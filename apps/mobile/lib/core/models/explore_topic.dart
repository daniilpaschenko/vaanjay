import 'package:freezed_annotation/freezed_annotation.dart';

import 'hashtag.dart';
import 'post.dart';
import 'reel.dart';

part 'explore_topic.freezed.dart';
part 'explore_topic.g.dart';

@freezed
abstract class ExploreTopic with _$ExploreTopic {
  const factory ExploreTopic({
    @Default('') String id,
    @Default('') String name,
    String? nameTa,
    @Default('') String icon,
    @Default(0) int postCount,
    @Default('') String category,
  }) = _ExploreTopic;

  factory ExploreTopic.fromJson(Map<String, Object?> json) =>
      _$ExploreTopicFromJson(json);
}

@freezed
abstract class TrendingItem with _$TrendingItem {
  const factory TrendingItem({
    @Default('') String type,
    String? id,
    String? tag,
    Post? post,
    Reel? reel,
    Hashtag? hashtag,
    ExploreTopic? topic,
    @Default(0) double score,
  }) = _TrendingItem;

  factory TrendingItem.fromJson(Map<String, Object?> json) =>
      _$TrendingItemFromJson(json);
}
