import '../../domain/interfaces/user_profile_interface.dart';

/// Updates the editable fields of the signed-in user's profile.
class UpdateUserProfile {
  const UpdateUserProfile(this._repository);

  final UserProfileInterface _repository;

  Future<void> call({
    required String uid,
    String? fullName,
    String? username,
    String? bio,
    String? websiteUrl,
    String? gender,
    bool? isPrivate,
    String? languagePreference,
  }) {
    return _repository.updateProfile(
      uid: uid,
      fullName: fullName,
      username: username,
      bio: bio,
      websiteUrl: websiteUrl,
      gender: gender,
      isPrivate: isPrivate,
      languagePreference: languagePreference,
    );
  }
}
