import 'package:cloud_firestore/cloud_firestore.dart';

import '../../domain/entities/user_profile.dart';

class UserProfileModel {
  const UserProfileModel({
    required this.uid,
    this.phoneNumber,
    this.fullName,
    this.username,
    this.bio,
    this.websiteUrl,
    this.gender,
    this.isPrivate = false,
    this.languagePreference = 'ta',
    this.createdAt,
    this.updatedAt,
  });

  final String uid;
  final String? phoneNumber;
  final String? fullName;
  final String? username;
  final String? bio;
  final String? websiteUrl;
  final String? gender;
  final bool isPrivate;
  final String languagePreference;
  final DateTime? createdAt;
  final DateTime? updatedAt;

  /// Firestore -> Model
  factory UserProfileModel.fromMap(String uid, Map<String, dynamic> data) {
    return UserProfileModel(
      uid: uid,
      phoneNumber: data['phoneNumber'] as String?,
      fullName: data['fullName'] as String?,
      username: data['username'] as String?,
      bio: data['bio'] as String?,
      websiteUrl: data['websiteUrl'] as String?,
      gender: data['gender'] as String?,
      isPrivate: (data['isPrivate'] as bool?) ?? false,
      languagePreference: (data['languagePreference'] as String?) ?? 'ta',
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
      updatedAt: (data['updatedAt'] as Timestamp?)?.toDate(),
    );
  }

  /// Model -> Entity
  UserProfile toEntity() {
    return UserProfile(
      uid: uid,
      phoneNumber: phoneNumber,
      fullName: fullName,
      username: username,
      bio: bio,
      websiteUrl: websiteUrl,
      gender: gender,
      isPrivate: isPrivate,
      languagePreference: languagePreference,
      createdAt: createdAt,
      updatedAt: updatedAt,
    );
  }

  /// Model -> Firestore
  Map<String, dynamic> toMap() {
    return {
      'uid': uid,
      'phoneNumber': phoneNumber,
      'fullName': fullName,
      'username': username,
      'bio': bio,
      'websiteUrl': websiteUrl,
      'gender': gender,
      'isPrivate': isPrivate,
      'languagePreference': languagePreference,
      'createdAt': createdAt,
      'updatedAt': updatedAt,
    }..removeWhere((_, value) => value == null);
  }
}
