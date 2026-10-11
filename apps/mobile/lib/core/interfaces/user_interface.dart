import '../entities/entities.dart';

abstract class UserInterface {
  Future<User> getCurrentUser();

  Future<User> getProfile(String userId);

  Future<User> updateProfile({
    String? fullName,
    String? username,
    String? bio,
    String? profilePicUrl,
    String? websiteUrl,
    String? gender,
    String? district,
    bool? isPrivate,
  });

  Future<Paginated<User>> searchUsers(String query, {int page = 1});

  Future<Paginated<User>> getFollowers(String userId, {int page = 1});

  Future<Paginated<User>> getFollowing(String userId, {int page = 1});

  Future<void> follow(String userId);

  Future<void> unfollow(String userId);

  Future<void> block(String userId);

  Future<void> unblock(String userId);
}
