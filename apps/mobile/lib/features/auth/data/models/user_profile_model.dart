import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/user_profile.dart';

class UserProfileModel {
  const UserProfileModel({
    required this.uid,
    this.phoneNumber,
    this.fullName,
    this.username,
    this.languagePreference = 'ta',
    this.createdAt,
    this.updatedAt,
  });

  final String uid;
  final String? phoneNumber;
  final String? fullName;
  final String? username;
  final String languagePreference;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  // Firestore -> Model
  factory UserProfileModel.fromMap(String uid, Map<String, dynamic> data) {
    return UserProfileModel(
      uid: uid,
      phoneNumber: data['phoneNumber'] as String?,
      fullName: data['fullName'] as String?,
      username: data['username'] as String?,
      languagePreference: (data['languagePreference'] as String?) ?? 'ta',
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate(),
    );
  }

  // Model -> Entity
  UserProfile toEntity() {
    return UserProfile(
      uid: uid,
      phoneNumber: phoneNumber,
      fullName: fullName,
      username: username,
      languagePreference: languagePreference,
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }

  // Model -> Firestore
  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'phoneNumber': phoneNumber,
      'fullName': fullName,
      'username': username,
      'languagePreference': languagePreference,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    }..removeWhere((_, value) => value == null);
  }
}
