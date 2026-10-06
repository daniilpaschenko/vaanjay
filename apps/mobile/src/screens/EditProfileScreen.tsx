import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

export function EditProfileScreen({ navigation }: any) {
  const [form, setForm] = useState({
    full_name: '',
    username: '',
    bio: '',
    website: '',
    gender: '',
    language_preference: 'ta',
    is_private: false,
  })

  const updateField = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }))

  const saveProfile = () => navigation?.goBack()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={saveProfile}>
          <View style={styles.saveBtn}>
            <Text style={styles.saveText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarGradient}>
            <View style={styles.avatarInner} />
          </View>
          <TouchableOpacity>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {[
            { key: 'full_name', label: 'Full Name', placeholder: 'Your full name' },
            { key: 'username', label: 'Username', placeholder: 'username' },
            { key: 'bio', label: 'Bio', placeholder: 'Tell your story...', multiline: true },
            { key: 'website', label: 'Website', placeholder: 'https://' },
            { key: 'gender', label: 'Gender', placeholder: 'Prefer not to say' },
          ].map(field => (
            <View key={field.key} style={styles.field}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <TextInput
                style={[styles.fieldInput, field.multiline && { minHeight: 80, textAlignVertical: 'top' }]}
                placeholder={field.placeholder}
                placeholderTextColor="#94A3B8"
                value={(form as any)[field.key]}
                onChangeText={v => updateField(field.key, v)}
                multiline={field.multiline}
                autoCapitalize="none"
              />
            </View>
          ))}

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Language</Text>
            <TouchableOpacity style={styles.languagePicker}>
              <Text style={styles.languageText}>Tamil (Tamil)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.switchRow}>
            <View>
              <Text style={styles.switchLabel}>Private Account</Text>
              <Text style={styles.switchDesc}>Only approved followers can see your content</Text>
            </View>
            <TouchableOpacity
              style={[styles.switch, form.is_private && styles.switchActive]}
              onPress={() => updateField('is_private', !form.is_private)}
            >
              <View style={[styles.switchThumb, form.is_private && styles.switchThumbActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  cancelText: { color: '#64748B', fontSize: 16 },
  headerTitle: { color: '#0F172A', fontSize: 17, fontWeight: '600' },
  saveBtn: { backgroundColor: '#2563EB', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  saveText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  avatarSection: { alignItems: 'center', paddingVertical: 24, gap: 12 },
  avatarGradient: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  avatarInner: { width: 78, height: 78, borderRadius: 39, backgroundColor: '#CBD5E1' },
  changePhotoText: { color: '#2563EB', fontSize: 14, fontWeight: '600' },
  form: { gap: 16, paddingBottom: 40 },
  field: { gap: 8 },
  fieldLabel: { color: '#475569', fontSize: 13, fontWeight: '500' },
  fieldInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 14,
    color: '#0F172A',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  languagePicker: { backgroundColor: '#EEF2FF', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#C7D2FE' },
  languageText: { color: '#2563EB', fontSize: 15 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  switchLabel: { color: '#0F172A', fontSize: 15, fontWeight: '500' },
  switchDesc: { color: '#64748B', fontSize: 13, marginTop: 2 },
  switch: { width: 50, height: 28, borderRadius: 14, backgroundColor: '#CBD5E1', padding: 2 },
  switchActive: { backgroundColor: '#2563EB' },
  switchThumb: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF' },
  switchThumbActive: { alignSelf: 'flex-end' },
})
