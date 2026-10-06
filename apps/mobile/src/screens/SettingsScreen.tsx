import React from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'

const SECTIONS = [
  {
    title: 'Account',
    items: [
      { label: 'Account Settings', key: 'account' },
      { label: 'Verification Request', key: 'verify' },
      { label: 'Language', key: 'language', value: 'Tamil' },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { label: 'Privacy Settings', key: 'privacy' },
      { label: 'Blocked Users', key: 'blocked' },
      { label: 'Close Friends', key: 'close_friends' },
      { label: 'Story Settings', key: 'story_settings' },
    ],
  },
  {
    title: 'Security',
    items: [
      { label: 'Change Password', key: 'password' },
      { label: 'Two-Factor Authentication', key: '2fa' },
      { label: 'Login Activity', key: 'login_activity' },
    ],
  },
  {
    title: 'Payments',
    items: [
      { label: 'UPI Settings', key: 'upi' },
      { label: 'Payment History', key: 'payment_history' },
      { label: 'Creator Earnings', key: 'earnings' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Help Center', key: 'help' },
      { label: 'About VAANJAY', key: 'about' },
      { label: 'Report a Problem', key: 'report_problem' },
    ],
  },
]

export function SettingsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item) => (
                <TouchableOpacity key={item.key} style={styles.settingItem}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <View style={styles.settingRight}>
                    {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                    <Text style={styles.chevron}>{'>'}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>VAANJAY v1.0.0</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { color: '#0F172A', fontSize: 28, fontWeight: '700' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#64748B', fontSize: 13, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginLeft: 4 },
  sectionCard: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  settingLabel: { color: '#0F172A', fontSize: 15 },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  settingValue: { color: '#64748B', fontSize: 14 },
  chevron: { color: '#94A3B8', fontSize: 16 },
  logoutButton: { backgroundColor: '#FEF2F2', borderRadius: 12, padding: 16, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#FECACA' },
  logoutText: { color: '#DC2626', fontSize: 16, fontWeight: '600' },
  version: { color: '#94A3B8', fontSize: 13, textAlign: 'center', marginBottom: 40 },
})
