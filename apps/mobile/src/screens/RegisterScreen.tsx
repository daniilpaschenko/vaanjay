import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { useAuth } from '../store/AuthContext'

export function RegisterScreen({ navigation }: any) {
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', full_name: '', email: '', phone_number: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleRegister = async () => {
    setError('')
    setLoading(true)
    try {
      await register(form)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>VAANJAY</Text>
          <Text style={styles.tagline}>vaanjay - new account</Text>
        </View>

        <View style={styles.form}>
          {[
            { key: 'username', placeholder: 'Username' },
            { key: 'full_name', placeholder: 'Full Name' },
            { key: 'email', placeholder: 'Email', keyboard: 'email-address' as const },
            { key: 'phone_number', placeholder: 'Phone Number', keyboard: 'phone-pad' as const },
            { key: 'password', placeholder: 'Password', secure: true },
          ].map(field => (
            <TextInput
              key={field.key}
              style={styles.input}
              placeholder={field.placeholder}
              placeholderTextColor="#94A3B8"
              value={(form as any)[field.key]}
              onChangeText={v => updateField(field.key, v)}
              secureTextEntry={field.secure}
              keyboardType={field.keyboard || 'default'}
              autoCapitalize="none"
            />
          ))}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
            <Text style={styles.link}>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 36, fontWeight: '800', color: '#0F172A' },
  tagline: { fontSize: 16, color: '#2563EB', fontFamily: 'Noto Sans Tamil', marginTop: 4 },
  form: { gap: 12 },
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
  error: { color: '#DC2626', fontSize: 14, textAlign: 'center' },
  link: { color: '#2563EB', textAlign: 'center', fontSize: 14, marginTop: 8 },
})
