import 'package:flutter_riverpod/flutter_riverpod.dart';

class LiveMessage {
  const LiveMessage({
    required this.id,
    required this.user,
    required this.text,
  });

  final String id;
  final String user;
  final String text;
}

class LiveState {
  const LiveState({
    this.title = '',
    this.topicTag = '',
    this.viewerCount = 0,
    this.isLive = false,
    this.chatMessages = const [],
  });

  final String title;
  final String topicTag;
  final int viewerCount;
  final bool isLive;
  final List<LiveMessage> chatMessages;

  LiveState copyWith({
    String? title,
    String? topicTag,
    int? viewerCount,
    bool? isLive,
    List<LiveMessage>? chatMessages,
  }) {
    return LiveState(
      title: title ?? this.title,
      topicTag: topicTag ?? this.topicTag,
      viewerCount: viewerCount ?? this.viewerCount,
      isLive: isLive ?? this.isLive,
      chatMessages: chatMessages ?? this.chatMessages,
    );
  }
}

class LiveNotifier extends Notifier<LiveState> {
  @override
  LiveState build() => const LiveState();

  void setTitle(String value) => state = state.copyWith(title: value);

  void setTopicTag(String value) => state = state.copyWith(topicTag: value);

  void start() => state = state.copyWith(isLive: true);

  void sendChat(String input) {
    final text = input.trim();
    if (text.isEmpty) return;
    state = state.copyWith(
      chatMessages: [
        ...state.chatMessages,
        LiveMessage(
          id: DateTime.now().microsecondsSinceEpoch.toString(),
          user: 'You',
          text: text,
        ),
      ],
    );
  }

  void reset() => state = const LiveState();
}

final liveProvider = NotifierProvider<LiveNotifier, LiveState>(LiveNotifier.new);
