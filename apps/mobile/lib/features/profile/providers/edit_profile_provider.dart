import 'package:flutter_riverpod/flutter_riverpod.dart';

class EditProfileState {
  const EditProfileState({
    this.fullName = '',
    this.username = '',
    this.bio = '',
    this.website = '',
    this.gender = '',
    this.languagePreference = 'ta',
    this.isPrivate = false,
  });

  final String fullName;
  final String username;
  final String bio;
  final String website;
  final String gender;
  final String languagePreference;
  final bool isPrivate;

  EditProfileState copyWith({
    String? fullName,
    String? username,
    String? bio,
    String? website,
    String? gender,
    String? languagePreference,
    bool? isPrivate,
  }) {
    return EditProfileState(
      fullName: fullName ?? this.fullName,
      username: username ?? this.username,
      bio: bio ?? this.bio,
      website: website ?? this.website,
      gender: gender ?? this.gender,
      languagePreference: languagePreference ?? this.languagePreference,
      isPrivate: isPrivate ?? this.isPrivate,
    );
  }
}

class EditProfileNotifier extends Notifier<EditProfileState> {
  @override
  EditProfileState build() => const EditProfileState();

  void setFullName(String value) => state = state.copyWith(fullName: value);

  void setUsername(String value) => state = state.copyWith(username: value);

  void setBio(String value) => state = state.copyWith(bio: value);

  void setWebsite(String value) => state = state.copyWith(website: value);

  void setGender(String value) => state = state.copyWith(gender: value);

  void setLanguagePreference(String value) =>
      state = state.copyWith(languagePreference: value);

  void togglePrivate() => state = state.copyWith(isPrivate: !state.isPrivate);
}

final editProfileProvider =
    NotifierProvider<EditProfileNotifier, EditProfileState>(
  EditProfileNotifier.new,
);
