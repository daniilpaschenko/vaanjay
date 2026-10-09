abstract final class AppDimens {
  // Layout
  static const screenPadding = 24.0;
  static const titleGap = 4.0;
  static const subtitleGap = 8.0;
  static const sectionGap = 48.0; // login: header -> form
  static const headerGap = 32.0; // register: header -> form

  // Form gaps
  static const formGap = 14.0; // login: fields, links, divider
  static const registerFormGap = 12.0; // register: fields
  static const buttonGap = 18.0; // login: last field -> button
  static const registerButtonGap = 20.0; // register: password -> button
  static const registerLinkGap = 20.0; // register: button -> link

  // Paddings
  static const fieldPadding = 16.0;
  static const buttonPadding = 16.0;
  static const linkPadding = 4.0;
  static const dividerPadding = 4.0;
  static const dividerPartGap = 12.0;
  static const dividerLineHeight = 1.0;

  // Radius
  static const inputRadius = 10.0;
  static const buttonRadius = 10.0;
  static const linkRadius = 8.0;

  // Font sizes
  static const displayTitle = 42.0; // login: VAANJAY
  static const displayTitleSmall = 36.0; // register: VAANJAY
  static const splashTitle = 48.0;
  static const splashTagline = 24.0;
  static const taglineLarge = 20.0;
  static const tagline = 16.0;
  static const inputText = 16.0;
  static const buttonText = 16.0;
  static const bodyText = 14.0;
  static const caption = 13.0;

  // OTP verify
  static const otpTitle = 24.0;
  static const otpTitleGap = 8.0; // title -> subtitle
  static const otpSubtitleGap = 32.0; // subtitle -> otp boxes
  static const otpBoxWidth = 48.0;
  static const otpBoxHeight = 56.0;
  static const otpBoxGap = 10.0;
  static const otpBoxesBottomGap = 24.0; // boxes -> error / resend
  static const otpErrorBottomGap = 16.0; // error -> resend
  static const otpDigit = 22.0;

  // Forgot password
  static const forgotBackTopGap = 60.0;
  static const forgotBackBottomGap = 24.0;
  static const forgotContentGap = 16.0;
  static const forgotTitle = 28.0;
  static const forgotSubtitle = 15.0;
  static const forgotSubtitleLineHeight = 22.0;
  static const forgotButtonTopGap = 8.0;
  static const sentContainerTopGap = 20.0;
  static const sentGap = 12.0;
  static const sentIconSize = 64.0;
  static const sentIconText = 28.0;
  static const sentTitle = 20.0;
  static const sentText = 14.0;
  static const sentTextLineHeight = 22.0;
  static const loginLinkTopGap = 8.0;

  // Onboarding text
  static const onboardingTitleTa = 28.0;
  static const onboardingTitle = 18.0;
  static const onboardingSubtitleTa = 15.0;
  static const onboardingSubtitle = 13.0;
  static const onboardingSubtitleTaLineHeight = 24.0;
  static const onboardingSubtitleLineHeight = 20.0;

  // Splash
  static const spinnerGap = 40.0;

  // Onboarding
  static const onboardingSlidePadding = 32.0;
  static const onboardingFooterHPadding = 32.0;
  static const onboardingFooterVPadding = 24.0;
  static const onboardingIconSize = 120.0;
  static const onboardingIconInnerSize = 50.0;
  static const onboardingIconGap = 40.0; // icon -> title
  static const onboardingTitleGap = 4.0; // titleTa -> title
  static const onboardingTitleBottomGap = 24.0; // title -> subtitleTa
  static const onboardingSubtitleGap = 8.0; // subtitleTa -> subtitle
  static const onboardingDotWidth = 32.0;
  static const onboardingDotHeight = 8.0;
  static const onboardingDotGap = 8.0;
  static const onboardingDotRadius = 4.0;
  static const onboardingDotsBottomGap = 32.0; // dots -> buttons
  static const onboardingButtonHPadding = 32.0;
  static const onboardingButtonPadding = 14.0; // next / get started, vertical
  static const onboardingSkipVPadding = 8.0;

  // Bottom tab bar
  static const tabBarHeight = 60.0;
  static const tabBarPadding = 8.0;
  static const tabBorderWidth = 1.0;
  static const tabIconSize = 36.0;
  static const tabIconRadius = 8.0;

  // Hover link highlight width, as a fraction of the text width (per side)
  static const linkWidthFactor = 0.06;

  // Shared layout
  static const screenTopInset = 56.0; // status-bar offset used by RN headers
  static const headerHPadding = 16.0;
  static const contentPadding = 16.0;
  static const cardRadius = 12.0;
  static const cardRadiusSmall = 10.0;
  static const cardRadiusTiny = 8.0;
  static const borderWidth = 1.0;
  static const listGap = 12.0;
  static const fieldGap = 8.0;
  static const statGap = 8.0;

  // Avatars
  static const avatarSmall = 36.0;
  static const avatarMedium = 52.0;
  static const avatarLarge = 86.0;

  // Titles / captions used across feature screens
  static const screenTitle = 24.0;
  static const sectionTitle = 18.0;
  static const sectionLabel = 13.0;
  static const rowTitle = 15.0;
  static const captionSmall = 12.0;

  // Home
  static const homeHeaderBottomGap = 12.0;
  static const storiesVerticalPadding = 16.0;
  static const storyItemWidth = 68.0;
  static const storyRing = 64.0;
  static const storyAvatar = 56.0;
  static const storyRingWidth = 2.0;
  static const postHeaderPadding = 12.0;
  static const postActionsGap = 6.0;
  static const actionButtonSize = 32.0;
  static const actionButtonRadius = 8.0;
  static const emptyTopGap = 80.0;

  // Explore
  static const searchPadding = 14.0;
  static const hashtagRadius = 20.0;
  static const hashtagHPadding = 14.0;
  static const hashtagVPadding = 6.0;

  // Messages / notifications
  static const listRowPadding = 16.0;
  static const unreadBadgeSize = 24.0;
  static const onlineDot = 12.0;
  static const onlineDotBorder = 2.0;

  // Chat
  static const bubbleMaxWidthFactor = 0.8;
  static const bubblePadding = 12.0;
  static const bubbleRadius = 12.0;
  static const bubbleTailRadius = 4.0;

  // Call
  static const callTopPadding = 80.0;
  static const callBottomPadding = 60.0;
  static const callAvatar = 120.0;
  static const callAvatarInner = 110.0;
  static const callControlSize = 72.0;
  static const callEndSize = 80.0;

  // Live
  static const liveChatHeight = 200.0;
  static const liveBadgeHPadding = 10.0;
  static const liveBadgeVPadding = 4.0;

  // Create
  static const optionCardRadius = 12.0;
  static const optionCardPadding = 24.0;
  static const captionInputMinHeight = 100.0;

  // Profile grid
  static const profileAvatar = 86.0;
  static const editButtonRadius = 8.0;

  // Settings
  static const settingsSectionGap = 24.0;
  static const settingsItemPadding = 16.0;

  // Language select
  static const languageTopInset = 60.0;
  static const languageHPadding = 20.0;
  static const radioSize = 24.0;
  static const radioInner = 12.0;

  // Payment
  static const tabHPadding = 16.0;
  static const tabVPadding = 10.0;
  static const rupeeSize = 24.0;
}

