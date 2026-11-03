import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../data/repositories/user_profile_repository.dart';

/// Firestore instance provider
final firestoreProvider = Provider<FirebaseFirestore>((ref) {
  return FirebaseFirestore.instance;
});

/// User profile repository provider
final userProfileRepositoryProvider = Provider<UserProfileRepository>((ref) {
  final firestore = ref.watch(firestoreProvider);
  return UserProfileRepository(firestore);
});
