import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

export function PaymentScreen({ navigation }: any) {
  const [tab, setTab] = useState<'send' | 'request' | 'history'>('send')
  const [receiver, setReceiver] = useState('')
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')

  const handleSend = () => {
    if (!receiver || !amount) return
    navigation?.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payments</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.tabRow}>
        {(['send', 'request', 'history'] as const).map(t => (
          <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.activeTab]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.activeTabText]}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll}>
        {tab === 'send' && (
          <View style={styles.form}>
            <View style={styles.upiSection}>
              <Text style={styles.upiLabel}>Your UPI ID</Text>
              <Text style={styles.upiId}>username@vaanjay</Text>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Send to</Text>
              <TextInput
                style={styles.input}
                placeholder="Username or phone number"
                placeholderTextColor="#94A3B8"
                value={receiver}
                onChangeText={setReceiver}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Amount</Text>
              <View style={styles.amountRow}>
                <Text style={styles.rupee}>Rs</Text>
                <TextInput
                  style={[styles.input, styles.amountInput]}
                  placeholder="0.00"
                  placeholderTextColor="#94A3B8"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Note (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="What is this for?"
                placeholderTextColor="#94A3B8"
                value={note}
                onChangeText={setNote}
              />
            </View>

            <TouchableOpacity style={styles.payButton} onPress={handleSend}>
              <Text style={styles.payText}>Pay Rs{amount || '0.00'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.qrButton}>
              <Text style={styles.qrText}>Scan UPI QR Code</Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'request' && (
          <View style={styles.form}>
            <Text style={styles.emptyText}>Request money from another VAANJAY user</Text>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Request from</Text>
              <TextInput
                style={styles.input}
                placeholder="Username or phone number"
                placeholderTextColor="#94A3B8"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Amount</Text>
              <View style={styles.amountRow}>
                <Text style={styles.rupee}>Rs</Text>
                <TextInput
                  style={[styles.input, styles.amountInput]}
                  placeholder="0.00"
                  placeholderTextColor="#94A3B8"
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payText}>Request Money</Text>
            </TouchableOpacity>
          </View>
        )}

        {tab === 'history' && (
          <View style={styles.form}>
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backText: { color: '#2563EB', fontSize: 16, fontWeight: '500' },
  headerTitle: { color: '#0F172A', fontSize: 20, fontWeight: '700' },
  tabRow: { flexDirection: 'row', marginHorizontal: 16, gap: 8, marginBottom: 20, marginTop: 16 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8, backgroundColor: '#F1F5F9' },
  activeTab: { backgroundColor: '#2563EB' },
  tabText: { color: '#64748B', fontSize: 14, fontWeight: '500' },
  activeTabText: { color: '#FFFFFF', fontWeight: '600' },
  scroll: { flex: 1, paddingHorizontal: 16 },
  form: { gap: 16, paddingBottom: 40 },
  upiSection: { backgroundColor: '#EEF2FF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#C7D2FE' },
  upiLabel: { color: '#64748B', fontSize: 13 },
  upiId: { color: '#2563EB', fontSize: 18, fontWeight: '700', marginTop: 4 },
  field: { gap: 8 },
  fieldLabel: { color: '#475569', fontSize: 13, fontWeight: '500' },
  input: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 14, color: '#0F172A', fontSize: 15, borderWidth: 1, borderColor: '#E2E8F0' },
  amountRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rupee: { color: '#2563EB', fontSize: 24, fontWeight: '700' },
  amountInput: { flex: 1, fontSize: 24, fontWeight: '700' },
  payButton: { backgroundColor: '#2563EB', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  payText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  qrButton: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  qrText: { color: '#2563EB', fontSize: 15, fontWeight: '600' },
  emptyText: { color: '#64748B', fontSize: 15, textAlign: 'center', paddingTop: 40 },
})
