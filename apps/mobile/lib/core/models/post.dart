import 'package:freezed_annotation/freezed_annotation.dart';

import 'user.dart';

part 'post.freezed.dart';
part 'post.g.dart';

@freezed
abstract class Post with _$Post {
  const factory Post({
    @Default('') String id,
    @Default('') String userId,
    @Default(<String>[]) List<String> mediaUrls,
    String? caption,
    String? location,
    @Default('photo') String type,
    @Default('public') String audience,
    @Default(false) bool isArchived,
    @Default(0) int likeCount,
    @Default(0) int dislikeCount,
    @Default(0) int commentCount,
    @Default(0) int repostCount,
    @Default(false) bool isLiked,
    @Default(false) bool isDisliked,
    @Default(false) bool isSaved,
    @Default(false) bool isReposted,
    @Default(<String>[]) List<String> hashtags,
    @Default(<String>[]) List<String> taggedUsers,
    User? user,
    DateTime? createdAt,
  }) = _Post;

  factory Post.fromJson(Map<String, Object?> json) => _$PostFromJson(json);
}
