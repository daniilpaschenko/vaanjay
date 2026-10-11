import '../entities/entities.dart';

abstract class ReelInterface {
  Future<Paginated<Reel>> getReels({int page = 1, int limit = 20});

  Future<Reel> getReel(String reelId);

  Future<Reel> createReel({
    required String videoUrl,
    String? thumbnailUrl,
    String? caption,
    String? audioId,
    List<String> hashtags = const <String>[],
  });

  Future<void> deleteReel(String reelId);

  Future<void> likeReel(String reelId);

  Future<void> unlikeReel(String reelId);

  Future<void> saveReel(String reelId);

  Future<void> unsaveReel(String reelId);
}
