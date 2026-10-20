import '../entities/entities.dart';

abstract class PostInterface {
  Future<Paginated<Post>> getFeed({int page = 1, int limit = 20});

  Future<Paginated<Post>> getUserPosts(
    String userId, {
    int page = 1,
    int limit = 20,
  });

  Future<Post> getPost(String postId);

  Future<Post> createPost({
    required List<String> mediaUrls,
    String? caption,
    String? location,
    String type = 'photo',
    String audience = 'public',
    List<String> hashtags = const <String>[],
    List<String> taggedUsers = const <String>[],
  });

  Future<void> deletePost(String postId);

  Future<void> likePost(String postId);

  Future<void> unlikePost(String postId);

  Future<void> dislikePost(String postId);

  Future<void> savePost(String postId);

  Future<void> unsavePost(String postId);

  Future<void> repostPost(String postId);

  Future<Paginated<Post>> getSavedPosts({int page = 1, int limit = 20});
}
