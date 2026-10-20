class Hashtag {
  const Hashtag({
    this.id = '',
    this.tag = '',
    this.usageCount = 0,
    this.isTrending = false,
    this.category,
    this.createdAt,
  });

  final String id;
  final String tag;
  final int usageCount;
  final bool isTrending;
  final String? category;
  final DateTime? createdAt;
}
