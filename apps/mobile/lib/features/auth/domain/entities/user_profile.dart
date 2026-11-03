class UserProfile {
  const UserProfile({
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
}
