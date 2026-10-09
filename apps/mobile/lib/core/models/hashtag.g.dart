// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hashtag.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_Hashtag _$HashtagFromJson(Map<String, dynamic> json) => _Hashtag(
  id: json['id'] as String? ?? '',
  tag: json['tag'] as String? ?? '',
  usageCount: (json['usage_count'] as num?)?.toInt() ?? 0,
  isTrending: json['is_trending'] as bool? ?? false,
  category: json['category'] as String?,
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$HashtagToJson(_Hashtag instance) => <String, dynamic>{
  'id': instance.id,
  'tag': instance.tag,
  'usage_count': instance.usageCount,
  'is_trending': instance.isTrending,
  'category': ?instance.category,
  'created_at': ?instance.createdAt?.toIso8601String(),
};
