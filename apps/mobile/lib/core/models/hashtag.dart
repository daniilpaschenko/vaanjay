import 'package:freezed_annotation/freezed_annotation.dart';

part 'hashtag.freezed.dart';
part 'hashtag.g.dart';

@freezed
abstract class Hashtag with _$Hashtag {
  const factory Hashtag({
    @Default('') String id,
    @Default('') String tag,
    @Default(0) int usageCount,
    @Default(false) bool isTrending,
    String? category,
    DateTime? createdAt,
  }) = _Hashtag;

  factory Hashtag.fromJson(Map<String, Object?> json) =>
      _$HashtagFromJson(json);
}
