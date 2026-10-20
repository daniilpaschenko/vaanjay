// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'message.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_MessageReaction _$MessageReactionFromJson(Map<String, dynamic> json) =>
    _MessageReaction(
      emoji: json['emoji'] as String? ?? '',
      userId: json['user_id'] as String? ?? '',
    );

Map<String, dynamic> _$MessageReactionToJson(_MessageReaction instance) =>
    <String, dynamic>{'emoji': instance.emoji, 'user_id': instance.userId};

_Message _$MessageFromJson(Map<String, dynamic> json) => _Message(
  id: json['id'] as String? ?? '',
  conversationId: json['conversation_id'] as String? ?? '',
  senderId: json['sender_id'] as String? ?? '',
  sender: json['sender'] == null
      ? null
      : User.fromJson(json['sender'] as Map<String, dynamic>),
  content: json['content'] as String?,
  mediaUrl: json['media_url'] as String?,
  messageType: json['message_type'] as String? ?? 'text',
  isRead: json['is_read'] as bool? ?? false,
  replyToId: json['reply_to_id'] as String?,
  reactions:
      (json['reactions'] as List<dynamic>?)
          ?.map((e) => MessageReaction.fromJson(e as Map<String, dynamic>))
          .toList() ??
      const <MessageReaction>[],
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
);

Map<String, dynamic> _$MessageToJson(_Message instance) => <String, dynamic>{
  'id': instance.id,
  'conversation_id': instance.conversationId,
  'sender_id': instance.senderId,
  'sender': ?instance.sender?.toJson(),
  'content': ?instance.content,
  'media_url': ?instance.mediaUrl,
  'message_type': instance.messageType,
  'is_read': instance.isRead,
  'reply_to_id': ?instance.replyToId,
  'reactions': instance.reactions.map((e) => e.toJson()).toList(),
  'created_at': ?instance.createdAt?.toIso8601String(),
};
