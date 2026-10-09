import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'reel.freezed.dart';
part 'reel.g.dart';

@freezed
abstract class Reel with _$Reel {
  const factory Reel({
    @Default('') String id,
    @Default('') String userId,
    @Default('') String videoUrl,
    String? thumbnailUrl,
    String? caption,
    String? audioId,
    @Default(0) int durationSeconds,
    @Default(0) int viewCount,
    @Default(0) int likeCount,
    @Default(0) int dislikeCount,
    @Default(0) int commentCount,
    @Default(false) bool isLiked,
    @Default(false) bool isDisliked,
    @Default(false) bool isSaved,
    @Default(<String>[]) List<String> hashtags,
    User? user,
    DateTime? createdAt,
  }) = _Reel;

  factory Reel.fromJson(Map<String, Object?> json) => _$ReelFromJson(json);
}
