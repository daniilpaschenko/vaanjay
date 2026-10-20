import 'package:freezed_annotation/freezed_annotation.dart';

part 'user.freezed.dart';
part 'user.g.dart';

@freezed
abstract class User with _$User {
  const factory User({
    @Default('') String id,
    @Default('') String username,
    @Default('') String email,
    @Default('') String phoneNumber,
    @Default('') String fullName,
    String? bio,
    String? profilePicUrl,
    String? websiteUrl,
    @Default(false) bool isVerified,
    String? badgeType,
    @Default(false) bool isAdmin,
    @Default('ta') String languagePreference,
    @Default('ta') String contentLanguagePreference,
    @Default(false) bool isPrivate,
    @Default(true) bool isActive,
    String? gender,
    String? district,
    DateTime? lastSeen,
    @Default(0) int followerCount,
    @Default(0) int followingCount,
    @Default(0) int postCount,
    @Default(false) bool isFollowing,
    @Default(false) bool isFollowRequested,
    @Default(false) bool isBlocked,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) = _User;

  factory User.fromJson(Map<String, Object?> json) => _$UserFromJson(json);
}
