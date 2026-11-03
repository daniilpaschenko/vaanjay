class UserProfile {
  const UserProfile({
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
}
