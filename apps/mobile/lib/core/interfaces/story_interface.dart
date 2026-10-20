import '../entities/entities.dart';

abstract class StoryInterface {
  Future<Paginated<Story>> getStories({int page = 1});

  Future<Paginated<Story>> getUserStories(String userId);

  Future<Story> createStory({
    required String mediaUrl,
    String? caption,
    String type = 'image',
  });

  Future<void> deleteStory(String storyId);

  Future<void> viewStory(String storyId);
}
