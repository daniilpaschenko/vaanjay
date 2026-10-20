import 'package:flutter_riverpod/flutter_riverpod.dart';

class ExploreState {
  const ExploreState({
    this.search = '',
    this.topics = const [],
    this.trending = const [],
  });

  final String search;
  final List<Map<String, dynamic>> topics;
  final List<Map<String, dynamic>> trending;

  ExploreState copyWith({
    String? search,
    List<Map<String, dynamic>>? topics,
    List<Map<String, dynamic>>? trending,
  }) {
    return ExploreState(
      search: search ?? this.search,
      topics: topics ?? this.topics,
      trending: trending ?? this.trending,
    );
  }
}

class ExploreNotifier extends Notifier<ExploreState> {
  @override
  ExploreState build() => const ExploreState();

  void setSearch(String value) => state = state.copyWith(search: value);

  Future<void> load() async {}
}

final exploreProvider = NotifierProvider<ExploreNotifier, ExploreState>(
  ExploreNotifier.new,
);
