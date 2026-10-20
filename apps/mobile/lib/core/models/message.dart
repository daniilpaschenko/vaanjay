import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'message.freezed.dart';
part 'message.g.dart';

@freezed
abstract class MessageReaction with _$MessageReaction {
  const factory MessageReaction({
    @Default('') String emoji,
    @Default('') String userId,
  }) = _MessageReaction;

  factory MessageReaction.fromJson(Map<String, Object?> json) =>
      _$MessageReactionFromJson(json);
}

@freezed
abstract class Message with _$Message {
  const factory Message({
    @Default('') String id,
    @Default('') String conversationId,
    @Default('') String senderId,
    User? sender,
    String? content,
    String? mediaUrl,
    @Default('text') String messageType,
    @Default(false) bool isRead,
    String? replyToId,
    @Default(<MessageReaction>[]) List<MessageReaction> reactions,
    DateTime? createdAt,
  }) = _Message;

  factory Message.fromJson(Map<String, Object?> json) =>
      _$MessageFromJson(json);
}
