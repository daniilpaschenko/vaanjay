class Paginated<T> {
  const Paginated({
    this.items = const [],
    this.total = 0,
    this.page = 1,
    this.limit = 20,
    this.hasMore = false,
  });

  final List<T> items;
  final int total;
  final int page;
  final int limit;
  final bool hasMore;
}
