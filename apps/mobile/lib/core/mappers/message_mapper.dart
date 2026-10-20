import '../entities/message.dart';
import '../models/message.dart' as data;
import 'user_mapper.dart';

extension MessageReactionModelMapper on data.MessageReaction {
  MessageReaction toEntity() => MessageReaction(
        emoji: emoji,
        userId: userId,
      );
}

extension MessageReactionEntityMapper on MessageReaction {
  data.MessageReaction toModel() => data.MessageReaction(
        emoji: emoji,
        userId: userId,
      );
}

extension MessageModelMapper on data.Message {
  Message toEntity() => Message(
        id: id,
        conversationId: conversationId,
        senderId: senderId,
        sender: sender?.toEntity(),
        content: content,
        mediaUrl: mediaUrl,
        messageType: messageType,
        isRead: isRead,
        replyToId: replyToId,
        reactions: reactions.map((e) => e.toEntity()).toList(growable: false),
        createdAt: createdAt,
      );
}

extension MessageEntityMapper on Message {
  data.Message toModel() => data.Message(
        id: id,
        conversationId: conversationId,
        senderId: senderId,
        sender: sender?.toModel(),
        content: content,
        mediaUrl: mediaUrl,
        messageType: messageType,
        isRead: isRead,
        replyToId: replyToId,
        reactions: reactions.map((e) => e.toModel()).toList(growable: false),
        createdAt: createdAt,
      );
}
