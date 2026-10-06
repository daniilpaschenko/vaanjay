import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'

export function OTPVerifyScreen({ navigation, route }: any) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputs = useRef<(TextInput | null)[]>([])
  const phone = route?.params?.phone || ''

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleOTPChange = (text: string, index: number) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    if (text && index < 5) {
      inputs.current[index + 1]?.focus()
    }

    if (newOtp.every(d => d !== '') && newOtp.length === 6) {
      verifyOTP(newOtp.join(''))
    }
  }

  const verifyOTP = async (code: string) => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.post('http://localhost:8080/api/v1/auth/otp/verify', {
        phone_number: phone, otp: code
      })
      if (data.success) {
        // Store token and navigate
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const resendOTP = async () => {
    setTimer(30)
    setOtp(['', '', '', '', '', ''])
    await axios.post('http://localhost:8080/api/v1/auth/otp/send', { phone_number: phone })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {phone}</Text>

      <View style={styles.otpRow}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref}
            style={[styles.otpInput, digit ? styles.otpFilled : null]}
            value={digit}
            onChangeText={text => handleOTPChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
          />
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={resendOTP} disabled={timer > 0}>
        <Text style={[styles.resend, timer > 0 && styles.resendDisabled]}>
          {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  subtitle: { color: '#475569', fontSize: 14, marginBottom: 32, textAlign: 'center' },
  otpRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  otpInput: { width: 48, height: 56, backgroundColor: '#F8FAFC', borderRadius: 10, textAlign: 'center', color: '#0F172A', fontSize: 22, fontWeight: '600', borderWidth: 1, borderColor: '#E2E8F0' },
  otpFilled: { borderColor: '#2563EB' },
  error: { color: '#DC2626', fontSize: 14, marginBottom: 16 },
  resend: { color: '#2563EB', fontSize: 14 },
  resendDisabled: { color: '#94A3B8' },
})
