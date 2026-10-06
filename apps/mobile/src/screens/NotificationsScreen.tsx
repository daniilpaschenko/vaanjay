import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'

export function NotificationsScreen() {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/notifications?page=1&limit=50')
      .then(r => setNotifications(r.data.data || []))
      .catch(() => {})
  }, [])

  const grouped = notifications.reduce((acc: any, n: any) => {
    const days = Math.floor((Date.now() - new Date(n.created_at).getTime()) / (1000 * 86400))
    let group = 'Earlier'
    if (days === 0) group = 'Today'
    else if (days === 1) group = 'Yesterday'
    else if (days < 7) group = 'This Week'
    if (!acc[group]) acc[group] = []
    acc[group].push(n)
    return acc
  }, {} as Record<string, any[]>)

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.notifItem}>
      <View style={styles.notifAvatar} />
      <View style={styles.notifContent}>
        <Text style={styles.notifText}>{item.message}</Text>
        <Text style={styles.notifTime}>
          {new Date(item.created_at).toLocaleDateString('en-IN')}
        </Text>
      </View>
      {!item.is_read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={Object.entries(grouped).flatMap(([section, items]) => [{ section, isHeader: true }, ...items])}
        keyExtractor={(item: any, index: number) => item.isHeader ? item.section : item.id + index}
        renderItem={({ item }: any) => {
          if (item.isHeader) {
            return <Text style={styles.sectionHeader}>{item.section}</Text>
          }
          return renderItem({ item })
        }}
        ListEmptyComponent={<Text style={styles.empty}>No notifications yet</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', padding: 16, paddingBottom: 8, paddingTop: 56, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  sectionHeader: { color: '#64748B', fontSize: 13, fontWeight: '600', textTransform: 'uppercase', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  notifItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  notifAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E2E8F0' },
  notifContent: { flex: 1 },
  notifText: { color: '#0F172A', fontSize: 14 },
  notifTime: { color: '#64748B', fontSize: 12, marginTop: 4 },
  unreadDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#2563EB' },
  empty: { color: '#64748B', textAlign: 'center', paddingTop: 60 },
})
