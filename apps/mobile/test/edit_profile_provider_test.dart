import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:vaanjay/features/auth/domain/entities/user_profile.dart';
import 'package:vaanjay/features/profile/providers/edit_profile_provider.dart';

void main() {
  test('load fills the edit form from the stored profile', () {
    final container = ProviderContainer();
    addTearDown(container.dispose);

    container
        .read(editProfileProvider.notifier)
        .load(
          const UserProfile(
            uid: 'uid-1',
            fullName: 'Test User',
            username: 'test',
            bio: 'Hello',
            websiteUrl: 'https://example.com',
            gender: 'female',
            isPrivate: true,
            languagePreference: 'en',
          ),
        );

    final state = container.read(editProfileProvider);
    expect(state.fullName, 'Test User');
    expect(state.username, 'test');
    expect(state.bio, 'Hello');
    expect(state.website, 'https://example.com');
    expect(state.gender, 'female');
    expect(state.isPrivate, isTrue);
    expect(state.languagePreference, 'en');
  });
}
