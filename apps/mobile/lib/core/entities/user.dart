class User {
  const User({
    this.id = '',
    this.username = '',
    this.email = '',
    this.phoneNumber = '',
    this.fullName = '',
    this.bio,
    this.profilePicUrl,
    this.websiteUrl,
    this.isVerified = false,
    this.badgeType,
    this.isAdmin = false,
    this.languagePreference = 'ta',
    this.contentLanguagePreference = 'ta',
    this.isPrivate = false,
    this.isActive = true,
    this.gender,
    this.district,
    this.lastSeen,
    this.followerCount = 0,
    this.followingCount = 0,
    this.postCount = 0,
    this.isFollowing = false,
    this.isFollowRequested = false,
    this.isBlocked = false,
    this.createdAt,
    this.updatedAt,
  });

  final String id;
  final String username;
  final String email;
  final String phoneNumber;
  final String fullName;
  final String? bio;
  final String? profilePicUrl;
  final String? websiteUrl;
  final bool isVerified;
  final String? badgeType;
  final bool isAdmin;
  final String languagePreference;
  final String contentLanguagePreference;
  final bool isPrivate;
  final bool isActive;
  final String? gender;
  final String? district;
  final DateTime? lastSeen;
  final int followerCount;
  final int followingCount;
  final int postCount;
  final bool isFollowing;
  final bool isFollowRequested;
  final bool isBlocked;
  final DateTime? createdAt;
  final DateTime? updatedAt;
}
