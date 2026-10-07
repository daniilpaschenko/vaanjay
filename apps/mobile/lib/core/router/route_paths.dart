class RoutePaths {
  /// App root — redirects to login or home depending on auth state.
  static const root = '/';

  // Auth flow
  static const splash = '/splash';
  static const onboarding = '/onboarding';
  static const languageSelect = '/language-select';
  static const login = '/login';
  static const register = '/register';
  static const otpVerify = '/otp-verify';
  static const forgotPassword = '/forgot-password';

  // Main tabs
  static const home = '/home';
  static const vibez = '/vibez';
  static const create = '/create';
  static const explore = '/explore';
  static const notifications = '/notifications';
  static const messages = '/messages';

  // Pushed on top of the tabs
  static const chat = '/chat';
  static const otherUserProfile = '/other-user-profile';
  static const editProfile = '/edit-profile';
  static const settings = '/settings';
  static const call = '/call';
  static const payment = '/payment';
  static const storyViewer = '/story-viewer';
  static const live = '/live';
}
