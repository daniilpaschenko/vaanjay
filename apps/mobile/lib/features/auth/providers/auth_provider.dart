import 'package:flutter_riverpod/flutter_riverpod.dart';

class AuthState {
  const AuthState({this.loading = false, this.loggedIn = false});

  final bool loading;
  final bool loggedIn;
}

class AuthNotifier extends Notifier<AuthState> {
  @override
  AuthState build() => const AuthState();

  void signIn() => state = const AuthState(loggedIn: true);

  void signOut() => state = const AuthState();
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(
  AuthNotifier.new,
);
