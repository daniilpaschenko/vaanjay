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

  /// Updates the editable profile fields. Only non-null values are written.
  Future<void> updateProfile({
    required String uid,
    String? fullName,
    String? username,
    String? bio,
    String? websiteUrl,
    String? gender,
    bool? isPrivate,
    String? languagePreference,
  });
}
