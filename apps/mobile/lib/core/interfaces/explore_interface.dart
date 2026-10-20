import '../entities/entities.dart';

abstract class ExploreInterface {
  Future<List<ExploreTopic>> getTopics();

  Future<List<TrendingItem>> getTrending();

  Future<List<TrendingItem>> search(String query);
}
