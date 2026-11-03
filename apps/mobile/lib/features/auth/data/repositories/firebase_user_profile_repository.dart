import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/user_profile.dart';
import '../../domain/interfaces/user_profile_interface.dart';
import '../models/user_profile_model.dart';

/// Firestore implementation of [UserProfileInterface].
class FirebaseUserProfileRepository implements UserProfileInterface {
  FirebaseUserProfileRepository(this._firestore);

  final FirebaseFirestore _firestore;

  DocumentReference<Map<String, dynamic>> _profileDoc(String uid) =>
      _firestore.collection('users').doc(uid);

  @override
  Future<void> upsertProfile({
    required String uid,
    required String phoneNumber,
    String? fullName,
    String? username,
  }) async {
    final doc = _profileDoc(uid);
    final snapshot = await doc.get();

    if (snapshot.exists) {
      // Keep the original `createdAt` and the chosen language.
      await doc.set({
        'phoneNumber': phoneNumber,
        'fullName': ?fullName,
        'username': ?username,
        'updatedAt': FieldValue.serverTimestamp(),
      }, SetOptions(merge: true));
      return;
    }

    final model = UserProfileModel(
      uid: uid,
      phoneNumber: phoneNumber,
      fullName: fullName,
      username: username,
    );

    await doc.set({
      ...model.toMap(),
      'createdAt': FieldValue.serverTimestamp(),
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }

  @override
  Future<void> updateProfile({
    required String uid,
    String? fullName,
    String? username,
    String? bio,
    String? websiteUrl,
    String? gender,
    bool? isPrivate,
    String? languagePreference,
  }) async {
    await _profileDoc(uid).set({
      'fullName': ?fullName,
      'username': ?username,
      'bio': ?bio,
      'websiteUrl': ?websiteUrl,
      'gender': ?gender,
      'isPrivate': ?isPrivate,
      'languagePreference': ?languagePreference,
      'updatedAt': FieldValue.serverTimestamp(),
    }, SetOptions(merge: true));
  }

  @override
  Future<UserProfile?> getProfile(String uid) async {
    final snapshot = await _profileDoc(uid).get();
    return _toEntity(snapshot);
  }

  @override
  Stream<UserProfile?> watchProfile(String uid) {
    return _profileDoc(uid).snapshots().map(_toEntity);
  }

  UserProfile? _toEntity(DocumentSnapshot<Map<String, dynamic>> doc) {
    final data = doc.data();
    if (!doc.exists || data == null) return null;
    return UserProfileModel.fromMap(doc.id, data).toEntity();
  }
}
