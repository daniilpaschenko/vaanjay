import '../../domain/interfaces/user_profile_interface.dart';

/// Makes sure `users/{uid}` exists after a successful sign-in.
class EnsureUserProfile {
  const EnsureUserProfile(this._repository);

  final UserProfileInterface _repository;

  Future<void> call({required String uid, required String phoneNumber}) {
    return _repository.upsertProfile(uid: uid, phoneNumber: phoneNumber);
  }
}
