import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VAANJAY</Text>
      <Text style={styles.tagline}>vaanjay</Text>
      <Text style={styles.subtitle}>your world, your voice</Text>
      <ActivityIndicator color="#2563EB" size="large" style={{ marginTop: 40 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 48, fontWeight: '800', color: '#0F172A' },
  tagline: { fontSize: 24, color: '#2563EB', fontFamily: 'Noto Sans Tamil', marginTop: 4 },
  subtitle: { fontSize: 14, color: '#475569', fontFamily: 'Noto Sans Tamil', marginTop: 8 },
})
