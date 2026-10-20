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
  expect(find.text('Unga Ulagam'), findsOneWidget);

  // walk the onboarding carousel to the last slide
  await tester.tap(find.text('Next'));
  await tester.pumpAndSettle();
  await tester.tap(find.text('Next'));
  await tester.pumpAndSettle();
  expect(find.text('Get Started'), findsOneWidget);

  await tester.tap(find.text('Get Started'));
  await tester.pumpAndSettle();
  expect(find.text('Choose your language'), findsOneWidget);

  await tester.tap(find.text('Confirm'));
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

  testWidgets('Login links open OTP and forgot password screens',
      (WidgetTester tester) async {
    await _openLogin(tester);

    await tester.tap(find.text('Forgot password?'));
    await tester.pumpAndSettle();
    expect(find.text('Forgot Password'), findsOneWidget);

    await tester.tap(find.text('Back'));
    await tester.pumpAndSettle();
    expect(find.text('Sign in to continue'), findsOneWidget);

    await tester.tap(find.text('Use OTP instead'));
    await tester.pumpAndSettle();
    expect(find.text('Verify OTP'), findsOneWidget);
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
    expect(find.text('VAANJAY'), findsOneWidget);

    // Tab bar: every icon opens its own tab
    await tester.tap(find.text('V'));
    await tester.pumpAndSettle();
    expect(find.text('No Reels Yet'), findsOneWidget);
    await tester.tap(find.text('C'));
    await tester.pumpAndSettle();
    expect(find.text('Create'), findsOneWidget);
    await tester.tap(find.text('E'));
    await tester.pumpAndSettle();
    expect(find.text('Explore Topics'), findsOneWidget);
    await tester.tap(find.text('N'));
    await tester.pumpAndSettle();
    expect(find.text('Notifications'), findsOneWidget);
    await tester.tap(find.text('M'));
    await tester.pumpAndSettle();
    expect(find.text('Messages'), findsOneWidget);
    await tester.tap(find.text('H'));
    await tester.pumpAndSettle();
    expect(find.text('VAANJAY'), findsOneWidget);

    final container = ProviderScope.containerOf(
      tester.element(find.byType(MyApp)),
    );
    container.read(routerProvider).go('/settings');
    await tester.pumpAndSettle();
    expect(find.text('Settings'), findsOneWidget);

    await tester.scrollUntilVisible(find.text('Log Out'), 300);
    await tester.tap(find.text('Log Out'));
    await tester.pumpAndSettle();
    expect(find.text('Sign in to continue'), findsOneWidget);
  });
}
