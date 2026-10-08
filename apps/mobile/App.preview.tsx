// cd apps/mobile
// npm run preview

import React from 'react'
import { AuthProvider } from './src/store/AuthContext' // for screens where exists 'useAuth()'
import { OnboardingScreen } from './src/screens/OnboardingScreen' // screen that i need to view

export default function App() {
  return (
    <AuthProvider>
      <OnboardingScreen /> 
    </AuthProvider>
  )
}
