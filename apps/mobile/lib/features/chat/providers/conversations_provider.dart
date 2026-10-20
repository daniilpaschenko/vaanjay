import 'package:flutter_riverpod/flutter_riverpod.dart';

class ConversationsState {
  const ConversationsState({this.conversations = const []});

  final List<Map<String, dynamic>> conversations;

  ConversationsState copyWith({List<Map<String, dynamic>>? conversations}) {
    return ConversationsState(conversations: conversations ?? this.conversations);
  }
}

class ConversationsNotifier extends Notifier<ConversationsState> {
  @override
  ConversationsState build() => const ConversationsState();

  Future<void> load() async {}
}

final conversationsProvider =
    NotifierProvider<ConversationsNotifier, ConversationsState>(
  ConversationsNotifier.new,
);
