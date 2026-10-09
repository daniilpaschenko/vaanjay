import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeState {
  const HomeState({
    this.posts = const [],
    this.refreshing = false,
    this.page = 1,
    this.hasMore = true,
  });

  final List<Map<String, dynamic>> posts;
  final bool refreshing;
  final int page;
  final bool hasMore;

  HomeState copyWith({
    List<Map<String, dynamic>>? posts,
    bool? refreshing,
    int? page,
    bool? hasMore,
  }) {
    return HomeState(
      posts: posts ?? this.posts,
      refreshing: refreshing ?? this.refreshing,
      page: page ?? this.page,
      hasMore: hasMore ?? this.hasMore,
    );
  }
}

class HomeNotifier extends Notifier<HomeState> {
  @override
  HomeState build() => const HomeState();

  Future<void> fetchFeed(int pageNum) async {}

  Future<void> refresh() async {
    state = state.copyWith(refreshing: true);
    await fetchFeed(1);
    state = state.copyWith(refreshing: false, page: 1);
  }

  void loadMore() {
    if (!state.hasMore) return;
    fetchFeed(state.page + 1);
  }
}

final homeProvider = NotifierProvider<HomeNotifier, HomeState>(HomeNotifier.new);
