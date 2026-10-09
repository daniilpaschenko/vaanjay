import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'story.freezed.dart';
part 'story.g.dart';

@freezed
abstract class Story with _$Story {
  const factory Story({
    @Default('') String id,
    @Default('') String userId,
    @Default('') String mediaUrl,
    String? caption,
    @Default('image') String type,
    DateTime? expiresAt,
    @Default(0) int viewCount,
    @Default(<String>[]) List<String> viewers,
    User? user,
    DateTime? createdAt,
  }) = _Story;

  factory Story.fromJson(Map<String, Object?> json) => _$StoryFromJson(json);
}
