import 'hashtag.dart';
import 'post.dart';
import 'reel.dart';

class ExploreTopic {
  const ExploreTopic({
    this.id = '',
    this.name = '',
    this.nameTa,
    this.icon = '',
    this.postCount = 0,
    this.category = '',
  });

  final String id;
  final String name;
  final String? nameTa;
  final String icon;
  final int postCount;
  final String category;
}

class TrendingItem {
  const TrendingItem({
    this.type = '',
    this.id,
    this.tag,
    this.post,
    this.reel,
    this.hashtag,
    this.topic,
    this.score = 0,
  });

  final String type;
  final String? id;
  final String? tag;
  final Post? post;
  final Reel? reel;
  final Hashtag? hashtag;
  final ExploreTopic? topic;
  final double score;
}
