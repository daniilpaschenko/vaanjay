import '../entities/user.dart';
import '../models/user.dart' as data;

extension UserModelMapper on data.User {
  User toEntity() => User(
        id: id,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        fullName: fullName,
        bio: bio,
        profilePicUrl: profilePicUrl,
        websiteUrl: websiteUrl,
        isVerified: isVerified,
        badgeType: badgeType,
        isAdmin: isAdmin,
        languagePreference: languagePreference,
        contentLanguagePreference: contentLanguagePreference,
        isPrivate: isPrivate,
        isActive: isActive,
        gender: gender,
        district: district,
        lastSeen: lastSeen,
        followerCount: followerCount,
        followingCount: followingCount,
        postCount: postCount,
        isFollowing: isFollowing,
        isFollowRequested: isFollowRequested,
        isBlocked: isBlocked,
        createdAt: createdAt,
        updatedAt: updatedAt,
      );
}

extension UserEntityMapper on User {
  data.User toModel() => data.User(
        id: id,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        fullName: fullName,
        bio: bio,
        profilePicUrl: profilePicUrl,
        websiteUrl: websiteUrl,
        isVerified: isVerified,
        badgeType: badgeType,
        isAdmin: isAdmin,
        languagePreference: languagePreference,
        contentLanguagePreference: contentLanguagePreference,
        isPrivate: isPrivate,
        isActive: isActive,
        gender: gender,
        district: district,
        lastSeen: lastSeen,
        followerCount: followerCount,
        followingCount: followingCount,
        postCount: postCount,
        isFollowing: isFollowing,
        isFollowRequested: isFollowRequested,
        isBlocked: isBlocked,
        createdAt: createdAt,
        updatedAt: updatedAt,
      );
}
