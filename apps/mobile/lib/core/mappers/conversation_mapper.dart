import '../entities/conversation.dart';
import '../models/conversation.dart' as data;
import 'message_mapper.dart';
import 'user_mapper.dart';

extension ConversationMemberModelMapper on data.ConversationMember {
  ConversationMember toEntity() => ConversationMember(
        conversationId: conversationId,
        userId: userId,
        role: role,
        joinedAt: joinedAt,
        user: user?.toEntity(),
      );
}

extension ConversationMemberEntityMapper on ConversationMember {
  data.ConversationMember toModel() => data.ConversationMember(
        conversationId: conversationId,
        userId: userId,
        role: role,
        joinedAt: joinedAt,
        user: user?.toModel(),
      );
}

extension ConversationModelMapper on data.Conversation {
  Conversation toEntity() => Conversation(
        id: id,
        type: type,
        name: name,
        groupPicUrl: groupPicUrl,
        createdBy: createdBy,
        lastMessage: lastMessage?.toEntity(),
        unreadCount: unreadCount,
        members: members.map((e) => e.toEntity()).toList(growable: false),
        createdAt: createdAt,
      );
}

extension ConversationEntityMapper on Conversation {
  data.Conversation toModel() => data.Conversation(
        id: id,
        type: type,
        name: name,
        groupPicUrl: groupPicUrl,
        createdBy: createdBy,
        lastMessage: lastMessage?.toModel(),
        unreadCount: unreadCount,
        members: members.map((e) => e.toModel()).toList(growable: false),
        createdAt: createdAt,
      );
}
