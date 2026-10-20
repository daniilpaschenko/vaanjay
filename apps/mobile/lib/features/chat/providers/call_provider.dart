import 'package:flutter_riverpod/flutter_riverpod.dart';

class CallState {
  const CallState({
    this.duration = 0,
    this.isMuted = false,
    this.isSpeaker = false,
    this.isCameraFront = true,
    this.isOngoing = true,
  });

  final int duration;
  final bool isMuted;
  final bool isSpeaker;
  final bool isCameraFront;
  final bool isOngoing;

  CallState copyWith({
    int? duration,
    bool? isMuted,
    bool? isSpeaker,
    bool? isCameraFront,
    bool? isOngoing,
  }) {
    return CallState(
      duration: duration ?? this.duration,
      isMuted: isMuted ?? this.isMuted,
      isSpeaker: isSpeaker ?? this.isSpeaker,
      isCameraFront: isCameraFront ?? this.isCameraFront,
      isOngoing: isOngoing ?? this.isOngoing,
    );
  }
}

class CallNotifier extends Notifier<CallState> {
  @override
  CallState build() => const CallState();

  void tick() {
    if (state.isOngoing) {
      state = state.copyWith(duration: state.duration + 1);
    }
  }

  void toggleMute() => state = state.copyWith(isMuted: !state.isMuted);

  void toggleSpeaker() => state = state.copyWith(isSpeaker: !state.isSpeaker);

  void flipCamera() =>
      state = state.copyWith(isCameraFront: !state.isCameraFront);

  void end() => state = state.copyWith(isOngoing: false);

  void reset() => state = const CallState();
}

final callProvider = NotifierProvider<CallNotifier, CallState>(CallNotifier.new);
