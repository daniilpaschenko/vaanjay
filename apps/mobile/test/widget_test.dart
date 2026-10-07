import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:vaanjay/core/router/app_router.dart';
import 'package:vaanjay/main.dart';

Future<void> _openLogin(WidgetTester tester) async {
  await tester.pumpWidget(const ProviderScope(child: MyApp()));

  // splash auto-navigates to onboarding after 1.5s
  expect(find.text('VAANJAY'), findsOneWidget);
  await tester.pump(const Duration(milliseconds: 1600));
  await tester.pump();
  expect(find.text('Onboarding'), findsOneWidget);

  await tester.tap(find.text('Next'));
  await tester.pumpAndSettle();
  expect(find.text('Language Select'), findsOneWidget);

  await tester.tap(find.text('Continue'));
  await tester.pumpAndSettle();
  expect(find.text('Sign in to continue'), findsOneWidget);
}

void main() {
  testWidgets('Splash walks to login screen', _openLogin);

  testWidgets('Login screen smoke test', (WidgetTester tester) async {
    await _openLogin(tester);

    expect(find.text('VAANJAY'), findsOneWidget);
    expect(find.text('Sign In'), findsOneWidget);
    expect(find.text('Create new account'), findsOneWidget);
    expect(find.text('Forgot password?'), findsOneWidget);
    expect(find.text('Use OTP instead'), findsOneWidget);
    expect(find.byType(TextField), findsNWidgets(2));
  });

  testWidgets('Login navigates to register screen', (WidgetTester tester) async {
    await _openLogin(tester);

    await tester.tap(find.text('Create new account'));
    await tester.pumpAndSettle();

    expect(find.text('vaanjay - new account'), findsOneWidget);
    expect(find.text('Username'), findsOneWidget);
    expect(find.text('Full Name'), findsOneWidget);
    expect(find.text('Email'), findsOneWidget);
    expect(find.text('Phone Number'), findsOneWidget);
    expect(find.text('Password'), findsOneWidget);
    expect(find.text('Create Account'), findsOneWidget);
    expect(find.text('Already have an account? Sign in'), findsOneWidget);
    expect(find.byType(TextField), findsNWidgets(5));

    await tester.tap(find.text('Already have an account? Sign in'));
    await tester.pumpAndSettle();

    expect(find.text('Sign in to continue'), findsOneWidget);
  });

  testWidgets('Sign in opens main tabs, sign out returns to login',
      (WidgetTester tester) async {
    await _openLogin(tester);

    await tester.tap(find.text('Sign In'));
    await tester.pumpAndSettle();
    expect(find.text('Home'), findsOneWidget);

    final container = ProviderScope.containerOf(
      tester.element(find.byType(MyApp)),
    );
    container.read(routerProvider).go('/settings');
    await tester.pumpAndSettle();
    expect(find.text('Settings'), findsOneWidget);

    await tester.tap(find.text('Sign out'));
    await tester.pumpAndSettle();
    expect(find.text('Sign in to continue'), findsOneWidget);
  });
}
