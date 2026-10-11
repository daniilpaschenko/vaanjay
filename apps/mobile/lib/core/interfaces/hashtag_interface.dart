import '../entities/entities.dart';

abstract class HashtagInterface {
  Future<Paginated<Hashtag>> getTrendingHashtags({int page = 1});

  Future<Hashtag> getHashtag(String tag);

  Future<Paginated<Post>> getHashtagPosts(String tag, {int page = 1});
}
