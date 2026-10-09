import 'package:flutter_riverpod/flutter_riverpod.dart';

class VibezState {
  const VibezState({this.reels = const []});

  final List<Map<String, dynamic>> reels;

  VibezState copyWith({List<Map<String, dynamic>>? reels}) {
    return VibezState(reels: reels ?? this.reels);
  }
}

class VibezNotifier extends Notifier<VibezState> {
  @override
  VibezState build() => const VibezState();

  Future<void> load() async {}
}

final vibezProvider = NotifierProvider<VibezNotifier, VibezState>(
  VibezNotifier.new,
);
