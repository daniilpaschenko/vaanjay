import '../entities/entities.dart';

abstract class ConversationInterface {
  Future<Paginated<Conversation>> getConversations({int page = 1});

  Future<Conversation> getConversation(String conversationId);

  Future<Conversation> createConversation({
    required List<String> memberIds,
    String? name,
    bool isGroup = false,
  });

  Future<void> leaveConversation(String conversationId);

  Future<void> markAsRead(String conversationId);
}
