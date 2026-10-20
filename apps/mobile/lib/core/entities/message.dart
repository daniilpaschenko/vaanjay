import 'user.dart';

class MessageReaction {
  const MessageReaction({
    this.emoji = '',
    this.userId = '',
  });

  final String emoji;
  final String userId;
}

class Message {
  const Message({
    this.id = '',
    this.conversationId = '',
    this.senderId = '',
    this.sender,
    this.content,
    this.mediaUrl,
    this.messageType = 'text',
    this.isRead = false,
    this.replyToId,
    this.reactions = const <MessageReaction>[],
    this.createdAt,
  });

  final String id;
  final String conversationId;
  final String senderId;
  final User? sender;
  final String? content;
  final String? mediaUrl;
  final String messageType;
  final bool isRead;
  final String? replyToId;
  final List<MessageReaction> reactions;
  final DateTime? createdAt;
}
