import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/repositories/firebase_user_profile_repository.dart';
import '../domain/interfaces/user_profile_interface.dart';
import '../domain/usecases/ensure_user_profile.dart';
import '../domain/usecases/update_user_profile.dart';

/// Firestore instance provider.
final firestoreProvider = Provider<FirebaseFirestore>((ref) {
  return FirebaseFirestore.instance;
});

/// User profile repository, exposed through its interface.
final userProfileRepositoryProvider = Provider<UserProfileInterface>((ref) {
  return FirebaseUserProfileRepository(ref.watch(firestoreProvider));
});

/// Ensures the current user has a profile document.
final ensureUserProfileProvider = Provider<EnsureUserProfile>((ref) {
  return EnsureUserProfile(ref.watch(userProfileRepositoryProvider));
});

/// Updates the current user's profile.
final updateUserProfileProvider = Provider<UpdateUserProfile>((ref) {
  return UpdateUserProfile(ref.watch(userProfileRepositoryProvider));
});
