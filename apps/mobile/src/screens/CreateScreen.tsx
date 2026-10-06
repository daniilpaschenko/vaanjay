import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native'

export function CreateScreen() {
  const [postType, setPostType] = useState<string | null>(null)

  const options = [
    { type: 'photo', label: 'Photo' },
    { type: 'reel', label: 'Reel' },
    { type: 'story', label: 'Story' },
    { type: 'live', label: 'Go Live' },
    { type: 'text', label: 'Text Post' },
  ]

  if (postType) {
    return (
      <View style={styles.container}>
        <View style={styles.editorHeader}>
          <TouchableOpacity onPress={() => setPostType(null)}><Text style={styles.cancel}>Cancel</Text></TouchableOpacity>
          <Text style={styles.editorTitle}>New {postType}</Text>
          <TouchableOpacity style={styles.shareBtn}><Text style={styles.shareText}>Share</Text></TouchableOpacity>
        </View>
        <ScrollView style={styles.editorBody}>
          {postType === 'text' && (
            <TextInput
              style={styles.captionInput}
              placeholder="What's on your mind?"
              placeholderTextColor="#94A3B8"
              multiline
              autoFocus
            />
          )}
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#94A3B8"
            multiline
          />
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create</Text>
      <View style={styles.optionsGrid}>
        {options.map(opt => (
          <TouchableOpacity key={opt.type} style={styles.optionCard} onPress={() => setPostType(opt.type)}>
            <Text style={styles.optionLabel}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 56 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 24, paddingHorizontal: 16 },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 16 },
  optionCard: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 24, alignItems: 'center', justifyContent: 'center', width: '47%', aspectRatio: 1, borderWidth: 1, borderColor: '#E2E8F0' },
  optionLabel: { color: '#0F172A', fontSize: 16, fontWeight: '500' },
  editorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  cancel: { color: '#64748B', fontSize: 16 },
  editorTitle: { color: '#0F172A', fontSize: 16, fontWeight: '600' },
  shareBtn: { backgroundColor: '#2563EB', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  shareText: { color: '#FFFFFF', fontWeight: '600' },
  editorBody: { flex: 1, marginTop: 16, paddingHorizontal: 16 },
  captionInput: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 16, color: '#0F172A', fontSize: 16, minHeight: 100, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
})
