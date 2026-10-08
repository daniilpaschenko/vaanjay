import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import 'package:vaanjay/core/router/route_paths.dart';
import 'package:vaanjay/core/theme/app_dimens.dart';
import 'package:vaanjay/core/widgets/primary_button.dart';
import 'package:vaanjay/features/auth/presentation/onboarding_screen.dart';
import 'package:vaanjay/features/settings/presentation/language_select_screen.dart';

Future<void> _pumpOnboarding(WidgetTester tester) async {
  final router = GoRouter(
    initialLocation: RoutePaths.onboarding,
    routes: [
      GoRoute(
        path: RoutePaths.onboarding,
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: RoutePaths.languageSelect,
        builder: (context, state) => const LanguageSelectScreen(),
      ),
    ],
  );
  addTearDown(router.dispose);
  await tester.pumpWidget(MaterialApp.router(routerConfig: router));
  await tester.pump();
}

List<Container> _dots(WidgetTester tester) => tester
    .widgetList<Container>(
      find.byWidgetPredicate(
        (w) =>
            w is Container &&
            w.constraints != null &&
            w.constraints!.maxHeight == AppDimens.onboardingDotHeight &&
            w.constraints!.maxWidth <= AppDimens.onboardingDotWidth,
      ),
    )
    .toList();

void _expectActiveDot(WidgetTester tester, int index) {
  final dots = _dots(tester);
  expect(dots, hasLength(3), reason: 'pagination dots');
  for (var i = 0; i < dots.length; i++) {
    final width = dots[i].constraints!.maxWidth;
    expect(
      width,
      i == index
          ? AppDimens.onboardingDotWidth
          : AppDimens.onboardingDotHeight,
      reason: 'dot $i ${i == index ? 'should' : 'should not'} be active',
    );
  }
}

Future<void> _goToLastSlide(WidgetTester tester) async {
  await tester.tap(find.text('Next'));
  await tester.pumpAndSettle();
  await tester.tap(find.text('Next'));
  await tester.pumpAndSettle();
}

void main() {
  testWidgets('first slide renders content, dots and footer',
      (WidgetTester tester) async {
    await _pumpOnboarding(tester);

    expect(find.text('Unga Ulagam'), findsOneWidget);
    expect(find.text('Your World'), findsOneWidget);
    expect(
      find.text(
        'Tamil Nadu matrum ulaga Tamil samutha thodu inangungal.',
      ),
      findsOneWidget,
    );
    expect(
      find.text('Connect with Tamil Nadu and the global Tamil community.'),
      findsOneWidget,
    );

    expect(find.text('Skip'), findsOneWidget);
    expect(find.text('Next'), findsOneWidget);
    expect(find.text('Get Started'), findsNothing);
    expect(find.byType(PrimaryButton), findsOneWidget);
    _expectActiveDot(tester, 0);
  });

  testWidgets('primary buttons use the click mouse cursor',
      (WidgetTester tester) async {
    await _pumpOnboarding(tester);

    final region = tester.widget<MouseRegion>(
      find.descendant(
        of: find.byType(PrimaryButton),
        matching: find.byType(MouseRegion),
      ),
    );
    expect(region.cursor, SystemMouseCursors.click);
  });

  testWidgets('Next advances to the second slide', (WidgetTester tester) async {
    await _pumpOnboarding(tester);

    await tester.tap(find.text('Next'));
    await tester.pumpAndSettle();

    expect(find.text('Pala Vakai Pothivugal'), findsOneWidget);
    expect(find.text('Multiple Formats'), findsOneWidget);
    expect(find.text('Your World'), findsNothing);
    expect(find.text('Skip'), findsOneWidget);
    expect(find.text('Next'), findsOneWidget);
    _expectActiveDot(tester, 1);
  });

  testWidgets('last slide swaps Skip/Next for Get Started',
      (WidgetTester tester) async {
    await _pumpOnboarding(tester);
    await _goToLastSlide(tester);

    expect(find.text('Ellam Oru Idathil'), findsOneWidget);
    expect(find.text('All in One'), findsOneWidget);
    expect(find.text('Get Started'), findsOneWidget);
    expect(find.text('Skip'), findsNothing);
    expect(find.text('Next'), findsNothing);
    expect(find.byType(PrimaryButton), findsOneWidget);
    _expectActiveDot(tester, 2);
  });

  testWidgets('swiping left advances to the next slide',
      (WidgetTester tester) async {
    await _pumpOnboarding(tester);

    await tester.fling(find.text('Your World'), const Offset(-400, 0), 1000);
    await tester.pumpAndSettle();

    expect(find.text('Multiple Formats'), findsOneWidget);
    _expectActiveDot(tester, 1);
  });

  testWidgets('Skip jumps straight to language select',
      (WidgetTester tester) async {
    await _pumpOnboarding(tester);

    await tester.tap(find.text('Skip'));
    await tester.pumpAndSettle();

    expect(find.text('Language Select'), findsOneWidget);
  });

  testWidgets('Get Started opens language select', (WidgetTester tester) async {
    await _pumpOnboarding(tester);
    await _goToLastSlide(tester);

    await tester.tap(find.text('Get Started'));
    await tester.pumpAndSettle();

    expect(find.text('Language Select'), findsOneWidget);
  });
}
