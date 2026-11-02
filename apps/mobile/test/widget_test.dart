import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

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
  expect(find.text('Sign in with your phone number'), findsOneWidget);
}

void main() {
  testWidgets('Splash walks to login screen', _openLogin);

  testWidgets('Login screen shows the phone OTP form', (WidgetTester tester) async {
    await _openLogin(tester);

    expect(find.text('VAANJAY'), findsOneWidget);
    expect(find.text('+91'), findsOneWidget);
    expect(find.text('Send OTP'), findsOneWidget);
    expect(find.byType(TextField), findsOneWidget);
  });
}
