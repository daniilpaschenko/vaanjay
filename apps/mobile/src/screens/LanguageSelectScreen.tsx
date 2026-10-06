import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

const LANGUAGES = [
  { code: 'ta', name: 'Tamil', native: 'Tamil', priority: 1 },
  { code: 'te', name: 'Telugu', native: 'Telugu', priority: 2 },
  { code: 'kn', name: 'Kannada', native: 'Kannada', priority: 3 },
  { code: 'ml', name: 'Malayalam', native: 'Malayalam', priority: 4 },
  { code: 'en', name: 'English', native: 'English', priority: 7 },
  { code: 'hi', name: 'Hindi', native: 'Hindi', priority: 99 },
  { code: 'bn', name: 'Bengali', native: 'Bengali', priority: 8 },
  { code: 'mr', name: 'Marathi', native: 'Marathi', priority: 9 },
  { code: 'gu', name: 'Gujarati', native: 'Gujarati', priority: 10 },
  { code: 'or', name: 'Odia', native: 'Odia', priority: 11 },
  { code: 'pa', name: 'Punjabi', native: 'Punjabi', priority: 12 },
  { code: 'as', name: 'Assamese', native: 'Assamese', priority: 13 },
  { code: 'ur', name: 'Urdu', native: 'Urdu', priority: 14 },
  { code: 'ar', name: 'Arabic', native: 'Arabic', priority: 15 },
  { code: 'fr', name: 'French', native: 'French', priority: 16 },
  { code: 'de', name: 'German', native: 'German', priority: 17 },
  { code: 'ja', name: 'Japanese', native: 'Japanese', priority: 18 },
  { code: 'ko', name: 'Korean', native: 'Korean', priority: 19 },
  { code: 'zh', name: 'Mandarin', native: 'Mandarin', priority: 20 },
  { code: 'pt', name: 'Portuguese', native: 'Portuguese', priority: 21 },
  { code: 'ru', name: 'Russian', native: 'Russian', priority: 22 },
  { code: 'es', name: 'Spanish', native: 'Spanish', priority: 23 },
]

export function LanguageSelectScreen({ navigation, route }: any) {
  const [selected, setSelected] = useState('ta')
  const onSelect = route?.params?.onSelect

  const sorted = [...LANGUAGES].sort((a, b) => a.priority - b.priority)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>VAANJAY</Text>
        <Text style={styles.tagline}>Choose your language</Text>
      </View>

      <FlatList
        data={sorted}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.langItem, selected === item.code && styles.langSelected]}
            onPress={() => {
              setSelected(item.code)
              if (onSelect) onSelect(item.code)
              if (navigation) navigation.goBack()
            }}
          >
            <View style={styles.langInfo}>
              <Text style={styles.langNative}>{item.native}</Text>
              <Text style={styles.langName}>{item.name}</Text>
            </View>
            <View style={[styles.radio, selected === item.code && styles.radioSelected]}>
              {selected === item.code && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          if (onSelect) onSelect(selected)
          if (navigation) navigation.replace('Login')
        }}
      >
        <Text style={styles.confirmText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 60, paddingHorizontal: 20 },
  header: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 36, fontWeight: '800', color: '#0F172A' },
  tagline: { fontSize: 16, color: '#2563EB', fontFamily: 'Noto Sans Tamil', marginTop: 4 },
  langItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  langSelected: {
    backgroundColor: '#EEF2FF',
    borderColor: '#2563EB',
  },
  langInfo: { flex: 1 },
  langNative: { color: '#0F172A', fontSize: 18, fontWeight: '600' },
  langName: { color: '#475569', fontSize: 14, marginTop: 2 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: '#2563EB' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#2563EB' },
  confirmButton: { marginTop: 20, marginBottom: 40, backgroundColor: '#2563EB', borderRadius: 10, padding: 16, alignItems: 'center' },
  confirmText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
})
