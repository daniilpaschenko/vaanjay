import 'message.dart';
import 'user.dart';

class ConversationMember {
  const ConversationMember({
    this.conversationId = '',
    this.userId = '',
    this.role = 'member',
    this.joinedAt,
    this.user,
  });

  final String conversationId;
  final String userId;
  final String role;
  final DateTime? joinedAt;
  final User? user;
}

class Conversation {
  const Conversation({
    this.id = '',
    this.type = 'private',
    this.name,
    this.groupPicUrl,
    this.createdBy = '',
    this.lastMessage,
    this.unreadCount = 0,
    this.members = const <ConversationMember>[],
    this.createdAt,
  });

  final String id;
  final String type;
  final String? name;
  final String? groupPicUrl;
  final String createdBy;
  final Message? lastMessage;
  final int unreadCount;
  final List<ConversationMember> members;
  final DateTime? createdAt;
}
