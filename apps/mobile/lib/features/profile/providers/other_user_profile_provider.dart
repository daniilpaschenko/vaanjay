import 'package:flutter_riverpod/flutter_riverpod.dart';

enum OtherUserTab { posts, reels }

class OtherUserProfileState {
  const OtherUserProfileState({
    this.isFollowing = false,
    this.tab = OtherUserTab.posts,
  });

  final bool isFollowing;
  final OtherUserTab tab;

  OtherUserProfileState copyWith({
    bool? isFollowing,
    OtherUserTab? tab,
  }) {
    return OtherUserProfileState(
      isFollowing: isFollowing ?? this.isFollowing,
      tab: tab ?? this.tab,
    );
  }
}

class OtherUserProfileNotifier extends Notifier<OtherUserProfileState> {
  @override
  OtherUserProfileState build() => const OtherUserProfileState();

  void toggleFollow() =>
      state = state.copyWith(isFollowing: !state.isFollowing);

  void setTab(OtherUserTab tab) => state = state.copyWith(tab: tab);
}

final otherUserProfileProvider =
    NotifierProvider<OtherUserProfileNotifier, OtherUserProfileState>(
  OtherUserProfileNotifier.new,
);
