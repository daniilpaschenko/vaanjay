import '../entities/entities.dart';

abstract class MessageInterface {
  Future<Paginated<Message>> getMessages(
    String conversationId, {
    int page = 1,
    int limit = 20,
  });

  Future<Message> sendMessage({
    required String conversationId,
    String? content,
    String? mediaUrl,
    String messageType = 'text',
    String? replyToId,
  });

  Future<void> deleteMessage(String messageId);

  Future<void> markAsRead(String messageId);

  Future<void> addReaction(String messageId, String emoji);

  Stream<List<Message>> watchMessages(String conversationId);
}
