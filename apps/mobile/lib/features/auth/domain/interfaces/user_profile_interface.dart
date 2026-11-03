import '../entities/user_profile.dart';

abstract interface class UserProfileInterface {
  Future<UserProfile?> getProfile(String uid);

  Stream<UserProfile?> watchProfile(String uid);

  Future<void> upsertProfile({
    required String uid,
    required String phoneNumber,
    String? fullName,
    String? username,
  });
}
