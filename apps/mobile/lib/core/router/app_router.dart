import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/presentation/forgot_password_screen.dart';
import '../../features/auth/presentation/login_screen.dart';
import '../../features/auth/presentation/onboarding_screen.dart';
import '../../features/auth/presentation/otp_verify_screen.dart';
import '../../features/auth/presentation/register_screen.dart';
import '../../features/auth/providers/auth_provider.dart';
import '../../features/billing/presentation/payment_screen.dart';
import '../../features/chat/presentation/call_screen.dart';
import '../../features/chat/presentation/chat_screen.dart';
import '../../features/chat/presentation/messages_screen.dart';
import '../../features/create/presentation/create_screen.dart';
import '../../features/explore/presentation/explore_screen.dart';
import '../../features/home/presentation/home_screen.dart';
import '../../features/notifications/presentation/notification_screen.dart';
import '../../features/profile/presentation/edit_profile_screen.dart';
import '../../features/profile/presentation/other_user_profile_screen.dart';
import '../../features/settings/presentation/language_select_screen.dart';
import '../../features/settings/presentation/settings_screen.dart';
import '../../features/vibez/presentation/live_screen.dart';
import '../../features/vibez/presentation/story_viewer_screen.dart';
import '../../features/vibez/presentation/vibez_screen.dart';
import '../screens/splash_screen.dart';
import '../widgets/main_tabs_shell.dart';
import 'route_paths.dart';

/// Routes reachable only while logged out (RN auth stack).
const _authPaths = {
  RoutePaths.splash,
  RoutePaths.onboarding,
  RoutePaths.languageSelect,
  RoutePaths.login,
  RoutePaths.register,
  RoutePaths.otpVerify,
  RoutePaths.forgotPassword,
};

/// Mirrors RN `RootNavigator`: splash while loading, auth stack for guests,
/// tabs + pushed screens for signed-in users.
final routerProvider = Provider<GoRouter>((ref) {
  final router = GoRouter(
    initialLocation: RoutePaths.splash,
    redirect: (context, state) {
      final auth = ref.read(authProvider);
      final location = state.matchedLocation;

      if (auth.loading) {
        return location == RoutePaths.splash ? null : RoutePaths.splash;
      }
      if (auth.loggedIn) {
        return _authPaths.contains(location) ? RoutePaths.home : null;
      }
      return _authPaths.contains(location) ? null : RoutePaths.login;
    },
    routes: [
      // Root — login for guests, tabs for signed-in users.
      GoRoute(
        path: RoutePaths.root,
        redirect: (context, state) => ref.read(authProvider).loggedIn
            ? RoutePaths.home
            : RoutePaths.login,
      ),

      // Auth stack
      GoRoute(
        path: RoutePaths.splash,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: RoutePaths.onboarding,
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: RoutePaths.languageSelect,
        builder: (context, state) => const LanguageSelectScreen(),
      ),
      GoRoute(
        path: RoutePaths.login,
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: RoutePaths.register,
        builder: (context, state) => const RegisterScreen(),
      ),
      GoRoute(
        path: RoutePaths.otpVerify,
        builder: (context, state) => const OTPVerifyScreen(),
      ),
      GoRoute(
        path: RoutePaths.forgotPassword,
        builder: (context, state) => const ForgotPasswordScreen(),
      ),

      // Main tabs
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) => MainTabsShell(
          shell: navigationShell,
        ),
        branches: [
          StatefulShellBranch(routes: [
            GoRoute(
              path: RoutePaths.home,
              builder: (context, state) => const HomeScreen(),
            ),
          ]),
          StatefulShellBranch(routes: [
            GoRoute(
              path: RoutePaths.vibez,
              builder: (context, state) => const VibezScreen(),
            ),
          ]),
          StatefulShellBranch(routes: [
            GoRoute(
              path: RoutePaths.create,
              builder: (context, state) => const CreateScreen(),
            ),
          ]),
          StatefulShellBranch(routes: [
            GoRoute(
              path: RoutePaths.explore,
              builder: (context, state) => const ExploreScreen(),
            ),
          ]),
          StatefulShellBranch(routes: [
            GoRoute(
              path: RoutePaths.notifications,
              builder: (context, state) => const NotificationsScreen(),
            ),
          ]),
          StatefulShellBranch(routes: [
            GoRoute(
              path: RoutePaths.messages,
              builder: (context, state) => const MessagesScreen(),
            ),
          ]),
        ],
      ),

      // Pushed on top of the tabs
      GoRoute(
        path: RoutePaths.chat,
        builder: (context, state) => const ChatScreen(),
      ),
      GoRoute(
        path: RoutePaths.otherUserProfile,
        builder: (context, state) => const OtherUserProfileScreen(),
      ),
      GoRoute(
        path: RoutePaths.editProfile,
        builder: (context, state) => const EditProfileScreen(),
      ),
      GoRoute(
        path: RoutePaths.settings,
        builder: (context, state) => const SettingsScreen(),
      ),
      GoRoute(
        path: RoutePaths.call,
        builder: (context, state) => const CallScreen(),
      ),
      GoRoute(
        path: RoutePaths.payment,
        builder: (context, state) => const PaymentScreen(),
      ),
      GoRoute(
        path: RoutePaths.storyViewer,
        builder: (context, state) => const StoryViewerScreen(),
      ),
      GoRoute(
        path: RoutePaths.live,
        builder: (context, state) => const LiveScreen(),
      ),
    ],
  );

  ref.listen(authProvider, (_, _) => router.refresh());
  ref.onDispose(router.dispose);
  return router;
});
