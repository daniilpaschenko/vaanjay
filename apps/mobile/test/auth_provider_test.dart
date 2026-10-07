import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:vaanjay/features/auth/providers/auth_provider.dart';

ProviderContainer createContainer() {
  final container = ProviderContainer();
  addTearDown(container.dispose);
  return container;
}

void main() {
  group('authProvider', () {
    test('starts with a logged out guest', () {
      final container = createContainer();
      final state = container.read(authProvider);
      expect(state.loading, isFalse);
      expect(state.loggedIn, isFalse);
    });

    test('signIn marks the user as logged in', () {
      final container = createContainer();
      container.read(authProvider.notifier).signIn();
      final state = container.read(authProvider);
      expect(state.loggedIn, isTrue);
      expect(state.loading, isFalse);
    });

    test('signOut clears the session', () {
      final container = createContainer();
      final notifier = container.read(authProvider.notifier);
      notifier.signIn();
      notifier.signOut();
      final state = container.read(authProvider);
      expect(state.loggedIn, isFalse);
      expect(state.loading, isFalse);
    });

    test('signIn after signOut logs back in', () {
      final container = createContainer();
      final notifier = container.read(authProvider.notifier);
      notifier.signIn();
      notifier.signOut();
      notifier.signIn();
      expect(container.read(authProvider).loggedIn, isTrue);
    });
  });
}
