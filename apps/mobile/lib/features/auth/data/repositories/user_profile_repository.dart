
import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/user_profile.dart';
import '../../domain/interfaces/user_profile_interface.dart';
import '../models/user_profile_model.dart';

class UserProfileRepository
    implements UserProfileInterface {
  UserProfileRepository(this._firestore);

  final FirebaseFirestore _firestore;

  DocumentReference<Map<String, dynamic>> _profileDoc(
    String uid,
  ) {
    return _firestore.collection('users').doc(uid);
  }

  @override
  Future<UserProfile?> getProfile(String uid) async {
    final doc = await _profileDoc(uid).get();

    if (!doc.exists) return null;

    final data = doc.data();
    if (data == null) return null;

    return UserProfileModel.fromMap(
      doc.id,
      data,
    ).toEntity();
  }

  @override
  Stream<UserProfile?> watchProfile(String uid) {
    return _profileDoc(uid).snapshots().map((doc) {
      final data = doc.data();

      if (!doc.exists || data == null) return null;

      return UserProfileModel.fromMap(
        doc.id,
        data,
      ).toEntity();
    });
  }

  @override
  Future<void> upsertProfile({
    required String uid,
    required String phoneNumber,
    String? fullName,
    String? username,
  }) async {
    final doc = _profileDoc(uid);
    final existing = await doc.get();

    final data = <String, dynamic>{
      'uid': uid,
      'phoneNumber': phoneNumber,
      'fullName': ?fullName,
      'username': ?username,
      'updatedAt': FieldValue.serverTimestamp(),
    };

    if (existing.exists) {
      await doc.set(
        data,
        SetOptions(merge: true),
      );
    } else {
      await doc.set({
        ...data,
        'languagePreference': 'ta',
        'createdAt': FieldValue.serverTimestamp(),
      });
    }
  }
}
