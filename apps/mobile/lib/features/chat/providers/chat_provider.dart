import 'package:flutter_riverpod/flutter_riverpod.dart';

class ChatMessage {
  const ChatMessage({
    required this.id,
    required this.content,
    required this.isMine,
  });

  final String id;
  final String content;
  final bool isMine;
}

class ChatState {
  const ChatState({this.messages = const []});

  final List<ChatMessage> messages;

  ChatState copyWith({List<ChatMessage>? messages}) {
    return ChatState(messages: messages ?? this.messages);
  }
}

class ChatNotifier extends Notifier<ChatState> {
  @override
  ChatState build() => const ChatState();

  void send(String input) {
    final text = input.trim();
    if (text.isEmpty) return;
    state = state.copyWith(
      messages: [
        ...state.messages,
        ChatMessage(
          id: DateTime.now().microsecondsSinceEpoch.toString(),
          content: text,
          isMine: true,
        ),
      ],
    );
  }
}

final chatProvider = NotifierProvider<ChatNotifier, ChatState>(ChatNotifier.new);
