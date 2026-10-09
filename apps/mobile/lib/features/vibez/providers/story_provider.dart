import 'package:flutter_riverpod/flutter_riverpod.dart';

class StoryState {
  const StoryState({
    this.currentIndex = 0,
    this.isPaused = false,
    this.count = 0,
  });

  final int currentIndex;
  final bool isPaused;
  final int count;

  StoryState copyWith({
    int? currentIndex,
    bool? isPaused,
    int? count,
  }) {
    return StoryState(
      currentIndex: currentIndex ?? this.currentIndex,
      isPaused: isPaused ?? this.isPaused,
      count: count ?? this.count,
    );
  }
}

class StoryNotifier extends Notifier<StoryState> {
  @override
  StoryState build() => const StoryState();

  void init({required int count, int initialIndex = 0}) {
    state = StoryState(count: count, currentIndex: initialIndex);
  }

  bool next() {
    if (state.currentIndex < state.count - 1) {
      state = state.copyWith(currentIndex: state.currentIndex + 1);
      return true;
    }
    return false;
  }

  bool previous() {
    if (state.currentIndex > 0) {
      state = state.copyWith(currentIndex: state.currentIndex - 1);
      return true;
    }
    return false;
  }

  void setPaused(bool value) => state = state.copyWith(isPaused: value);
}

final storyProvider = NotifierProvider<StoryNotifier, StoryState>(
  StoryNotifier.new,
);
