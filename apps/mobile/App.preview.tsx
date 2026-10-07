// cd apps/mobile
// npm run preview

import React from 'react'
import { AuthProvider } from './src/store/AuthContext' // for screens where exists 'useAuth()'
import { RegisterScreen } from './src/screens/RegisterScreen' // screen that i need to view

export default function App() {
  return (
    <AuthProvider>
      <RegisterScreen /> 
    </AuthProvider>
  )
}
