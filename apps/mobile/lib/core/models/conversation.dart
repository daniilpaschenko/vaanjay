import 'package:freezed_annotation/freezed_annotation.dart';

import 'message.dart';
import 'user.dart';

part 'conversation.freezed.dart';
part 'conversation.g.dart';

@freezed
abstract class ConversationMember with _$ConversationMember {
  const factory ConversationMember({
    @Default('') String conversationId,
    @Default('') String userId,
    @Default('member') String role,
    DateTime? joinedAt,
    User? user,
  }) = _ConversationMember;

  factory ConversationMember.fromJson(Map<String, Object?> json) =>
      _$ConversationMemberFromJson(json);
}

@freezed
abstract class Conversation with _$Conversation {
  const factory Conversation({
    @Default('') String id,
    @Default('private') String type,
    String? name,
    String? groupPicUrl,
    @Default('') String createdBy,
    Message? lastMessage,
    @Default(0) int unreadCount,
    @Default(<ConversationMember>[]) List<ConversationMember> members,
    DateTime? createdAt,
  }) = _Conversation;

  factory Conversation.fromJson(Map<String, Object?> json) =>
      _$ConversationFromJson(json);
}
