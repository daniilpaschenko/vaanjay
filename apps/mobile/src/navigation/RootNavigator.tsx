import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View, StyleSheet } from 'react-native'
import { useAuth } from '../store/AuthContext'

// Auth Screens
import { SplashScreen } from '../screens/SplashScreen'
import { LanguageSelectScreen } from '../screens/LanguageSelectScreen'
import { OnboardingScreen } from '../screens/OnboardingScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import { OTPVerifyScreen } from '../screens/OTPVerifyScreen'
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen'

// Main Tab Screens
import { HomeScreen } from '../screens/HomeScreen'
import { VibezScreen } from '../screens/VibezScreen'
import { ExploreScreen } from '../screens/ExploreScreen'
import { NotificationsScreen } from '../screens/NotificationsScreen'
import { MessagesScreen } from '../screens/MessagesScreen'
import { ProfileScreen } from '../screens/ProfileScreen'
import { CreateScreen } from '../screens/CreateScreen'

// Additional Screens
import { ChatScreen } from '../screens/ChatScreen'
import { OtherUserProfileScreen } from '../screens/OtherUserProfileScreen'
import { EditProfileScreen } from '../screens/EditProfileScreen'
import { SettingsScreen } from '../screens/SettingsScreen'
import { CallScreen } from '../screens/CallScreen'
import { PaymentScreen } from '../screens/PaymentScreen'
import { StoryViewerScreen } from '../screens/StoryViewerScreen'
import { LiveScreen } from '../screens/LiveScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Reels: 'Vibez',
  Create: 'Create',
  Explore: 'Explore',
  Notifications: 'Notifs',
  Messages: 'Chat',
}

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  return (
    <View style={[styles.tabIconBase, focused && styles.tabIconActive]}>
      <Text style={[styles.tabIconText, focused && styles.tabIconTextActive]}>
        {TAB_LABELS[name]?.charAt(0) || '?'}
      </Text>
    </View>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Vibez" component={VibezScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
    </Tab.Navigator>
  )
}

export function RootNavigator() {
  const { user, loading } = useAuth()

  if (loading) return <SplashScreen />

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="OtherUserProfile" component={OtherUserProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Call" component={CallScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="StoryViewer" component={StoryViewerScreen} />
          <Stack.Screen name="Live" component={LiveScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="OTPVerify" component={OTPVerifyScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E2E8F0',
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
  tabIconBase: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  tabIconActive: {
    backgroundColor: '#2563EB',
  },
  tabIconText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '700',
  },
  tabIconTextActive: {
    color: '#FFFFFF',
  },
})
