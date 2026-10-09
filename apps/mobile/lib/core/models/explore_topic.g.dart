// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'explore_topic.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_ExploreTopic _$ExploreTopicFromJson(Map<String, dynamic> json) =>
    _ExploreTopic(
      id: json['id'] as String? ?? '',
      name: json['name'] as String? ?? '',
      nameTa: json['name_ta'] as String?,
      icon: json['icon'] as String? ?? '',
      postCount: (json['post_count'] as num?)?.toInt() ?? 0,
      category: json['category'] as String? ?? '',
    );

Map<String, dynamic> _$ExploreTopicToJson(_ExploreTopic instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'name_ta': ?instance.nameTa,
      'icon': instance.icon,
      'post_count': instance.postCount,
      'category': instance.category,
    };

_TrendingItem _$TrendingItemFromJson(Map<String, dynamic> json) =>
    _TrendingItem(
      type: json['type'] as String? ?? '',
      id: json['id'] as String?,
      tag: json['tag'] as String?,
      post: json['post'] == null
          ? null
          : Post.fromJson(json['post'] as Map<String, dynamic>),
      reel: json['reel'] == null
          ? null
          : Reel.fromJson(json['reel'] as Map<String, dynamic>),
      hashtag: json['hashtag'] == null
          ? null
          : Hashtag.fromJson(json['hashtag'] as Map<String, dynamic>),
      topic: json['topic'] == null
          ? null
          : ExploreTopic.fromJson(json['topic'] as Map<String, dynamic>),
      score: (json['score'] as num?)?.toDouble() ?? 0,
    );

Map<String, dynamic> _$TrendingItemToJson(_TrendingItem instance) =>
    <String, dynamic>{
      'type': instance.type,
      'id': ?instance.id,
      'tag': ?instance.tag,
      'post': ?instance.post?.toJson(),
      'reel': ?instance.reel?.toJson(),
      'hashtag': ?instance.hashtag?.toJson(),
      'topic': ?instance.topic?.toJson(),
      'score': instance.score,
    };
