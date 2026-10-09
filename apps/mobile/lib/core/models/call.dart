import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'call.freezed.dart';
part 'call.g.dart';

@freezed
abstract class Call with _$Call {
  const factory Call({
    @Default('') String id,
    @Default('') String callerId,
    User? caller,
    String? receiverId,
    User? receiver,
    String? groupId,
    @Default('audio') String type,
    @Default('initiated') String status,
    DateTime? startedAt,
    DateTime? endedAt,
    int? durationSeconds,
    DateTime? createdAt,
  }) = _Call;

  factory Call.fromJson(Map<String, Object?> json) => _$CallFromJson(json);
}
