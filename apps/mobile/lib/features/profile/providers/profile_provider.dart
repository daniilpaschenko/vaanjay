import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../auth/domain/entities/user_profile.dart';
import '../../auth/providers/auth_provider.dart';
import '../../auth/providers/user_profile_provider.dart';

enum ProfileTab { posts, reels, tagged }

/// Live `users/{uid}` document for the signed-in user.
final currentUserProfileProvider = StreamProvider<UserProfile?>((ref) {
  final uid = ref.watch(authProvider.select((state) => state.user?.uid));
  if (uid == null) return Stream<UserProfile?>.value(null);
  return ref.watch(userProfileRepositoryProvider).watchProfile(uid);
});

class ProfileState {
  const ProfileState({this.tab = ProfileTab.posts});

  final ProfileTab tab;
}

class ProfileNotifier extends Notifier<ProfileState> {
  @override
  ProfileState build() => const ProfileState();

  void setTab(ProfileTab tab) => state = ProfileState(tab: tab);
}

final profileProvider = NotifierProvider<ProfileNotifier, ProfileState>(
  ProfileNotifier.new,
);
