import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { useAuth } from '../store/AuthContext'

export function LoginScreen({ navigation }: any) {
  const { login } = useAuth()
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await login(credential, password)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Text style={styles.title}>VAANJAY</Text>
        <Text style={styles.tagline}>vaanjay</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username, email, or phone"
          placeholderTextColor="#94A3B8"
          value={credential}
          onChangeText={setCredential}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94A3B8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.navigate('OTPVerify')}>
          <Text style={styles.link}>Use OTP instead</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.navigate('ForgotPassword')}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
          <Text style={styles.signupLink}>Create new account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 48 },
  title: { fontSize: 42, fontWeight: '800', color: '#0F172A' },
  tagline: { fontSize: 20, color: '#2563EB', fontFamily: 'Noto Sans Tamil', marginTop: 4 },
  subtitle: { fontSize: 14, color: '#475569', marginTop: 8 },
  form: { gap: 14 },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 16,
    color: '#0F172A',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: { backgroundColor: '#2563EB', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  error: { color: '#DC2626', fontSize: 14, textAlign: 'center' },
  link: { color: '#2563EB', textAlign: 'center', fontSize: 14, paddingVertical: 4 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { color: '#94A3B8', fontSize: 13 },
  signupLink: { color: '#2563EB', textAlign: 'center', fontSize: 14, fontWeight: '600' },
})
