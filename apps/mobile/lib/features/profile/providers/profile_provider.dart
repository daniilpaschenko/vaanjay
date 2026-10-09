import 'package:flutter_riverpod/flutter_riverpod.dart';

enum ProfileTab { posts, reels, tagged }

class ProfileState {
  const ProfileState({
    this.profile,
    this.tab = ProfileTab.posts,
    this.posts = const [],
  });

  final Map<String, dynamic>? profile;
  final ProfileTab tab;
  final List<Map<String, dynamic>> posts;

  ProfileState copyWith({
    Map<String, dynamic>? profile,
    ProfileTab? tab,
    List<Map<String, dynamic>>? posts,
  }) {
    return ProfileState(
      profile: profile ?? this.profile,
      tab: tab ?? this.tab,
      posts: posts ?? this.posts,
    );
  }
}

class ProfileNotifier extends Notifier<ProfileState> {
  @override
  ProfileState build() => const ProfileState();

  void setTab(ProfileTab tab) => state = state.copyWith(tab: tab);

  Future<void> load() async {}
}

final profileProvider = NotifierProvider<ProfileNotifier, ProfileState>(
  ProfileNotifier.new,
);
