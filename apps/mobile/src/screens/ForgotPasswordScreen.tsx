import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'

export function ForgotPasswordScreen({ navigation }: any) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 1000))
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email address and we will send you a reset link.</Text>

        {!sent ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.sentContainer}>
            <View style={styles.sentIcon}>
              <Text style={styles.sentIconText}>V</Text>
            </View>
            <Text style={styles.sentTitle}>Email Sent</Text>
            <Text style={styles.sentText}>
              If an account exists with {email}, you will receive a password reset link shortly.
            </Text>
            <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
              <Text style={styles.loginLink}>Return to Sign In</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 24 },
  backButton: { marginTop: 60, marginBottom: 24 },
  backText: { color: '#2563EB', fontSize: 16, fontWeight: '500' },
  content: { gap: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#0F172A' },
  subtitle: { color: '#475569', fontSize: 15, lineHeight: 22 },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 16,
    color: '#0F172A',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  button: { backgroundColor: '#2563EB', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  sentContainer: { alignItems: 'center', paddingTop: 20, gap: 12 },
  sentIcon: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  sentIconText: { color: '#2563EB', fontSize: 28, fontWeight: '700' },
  sentTitle: { color: '#0F172A', fontSize: 20, fontWeight: '700' },
  sentText: { color: '#475569', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  loginLink: { color: '#2563EB', fontSize: 16, fontWeight: '600', marginTop: 8 },
})
