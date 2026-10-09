import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'live_stream.freezed.dart';
part 'live_stream.g.dart';

@freezed
abstract class LiveStream with _$LiveStream {
  const factory LiveStream({
    @Default('') String id,
    @Default('') String userId,
    User? user,
    String? title,
    String? topicTag,
    @Default(0) int viewerCount,
    @Default(false) bool isActive,
    DateTime? startedAt,
    DateTime? endedAt,
    String? coHostId,
    String? replayUrl,
  }) = _LiveStream;

  factory LiveStream.fromJson(Map<String, Object?> json) =>
      _$LiveStreamFromJson(json);
}
