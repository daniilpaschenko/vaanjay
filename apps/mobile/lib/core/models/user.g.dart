// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_User _$UserFromJson(Map<String, dynamic> json) => _User(
  id: json['id'] as String? ?? '',
  username: json['username'] as String? ?? '',
  email: json['email'] as String? ?? '',
  phoneNumber: json['phone_number'] as String? ?? '',
  fullName: json['full_name'] as String? ?? '',
  bio: json['bio'] as String?,
  profilePicUrl: json['profile_pic_url'] as String?,
  websiteUrl: json['website_url'] as String?,
  isVerified: json['is_verified'] as bool? ?? false,
  badgeType: json['badge_type'] as String?,
  isAdmin: json['is_admin'] as bool? ?? false,
  languagePreference: json['language_preference'] as String? ?? 'ta',
  contentLanguagePreference:
      json['content_language_preference'] as String? ?? 'ta',
  isPrivate: json['is_private'] as bool? ?? false,
  isActive: json['is_active'] as bool? ?? true,
  gender: json['gender'] as String?,
  district: json['district'] as String?,
  lastSeen: json['last_seen'] == null
      ? null
      : DateTime.parse(json['last_seen'] as String),
  followerCount: (json['follower_count'] as num?)?.toInt() ?? 0,
  followingCount: (json['following_count'] as num?)?.toInt() ?? 0,
  postCount: (json['post_count'] as num?)?.toInt() ?? 0,
  isFollowing: json['is_following'] as bool? ?? false,
  isFollowRequested: json['is_follow_requested'] as bool? ?? false,
  isBlocked: json['is_blocked'] as bool? ?? false,
  createdAt: json['created_at'] == null
      ? null
      : DateTime.parse(json['created_at'] as String),
  updatedAt: json['updated_at'] == null
      ? null
      : DateTime.parse(json['updated_at'] as String),
);

Map<String, dynamic> _$UserToJson(_User instance) => <String, dynamic>{
  'id': instance.id,
  'username': instance.username,
  'email': instance.email,
  'phone_number': instance.phoneNumber,
  'full_name': instance.fullName,
  'bio': ?instance.bio,
  'profile_pic_url': ?instance.profilePicUrl,
  'website_url': ?instance.websiteUrl,
  'is_verified': instance.isVerified,
  'badge_type': ?instance.badgeType,
  'is_admin': instance.isAdmin,
  'language_preference': instance.languagePreference,
  'content_language_preference': instance.contentLanguagePreference,
  'is_private': instance.isPrivate,
  'is_active': instance.isActive,
  'gender': ?instance.gender,
  'district': ?instance.district,
  'last_seen': ?instance.lastSeen?.toIso8601String(),
  'follower_count': instance.followerCount,
  'following_count': instance.followingCount,
  'post_count': instance.postCount,
  'is_following': instance.isFollowing,
  'is_follow_requested': instance.isFollowRequested,
  'is_blocked': instance.isBlocked,
  'created_at': ?instance.createdAt?.toIso8601String(),
  'updated_at': ?instance.updatedAt?.toIso8601String(),
};
