import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'

export function MessagesScreen({ navigation }: any) {
  const [conversations, setConversations] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/messages/conversations')
      .then(r => setConversations(r.data.data || []))
      .catch(() => {})
  }, [])

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.convItem} onPress={() => navigation?.navigate('Chat', { conversationId: item.id })}>
      <View style={styles.convAvatar}>
        <View style={styles.avatarInner} />
        <View style={styles.onlineDot} />
      </View>
      <View style={styles.convContent}>
        <View style={styles.convTop}>
          <Text style={styles.convName}>{item.name || 'User'}</Text>
          <Text style={styles.convTime}>now</Text>
        </View>
        <Text style={styles.convLastMsg} numberOfLines={1}>
          {item.last_message?.content || 'Start a conversation'}
        </Text>
      </View>
      {item.unread_count > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unread_count}</Text>
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No conversations yet</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', padding: 16, paddingBottom: 8, paddingTop: 56, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  convItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  convAvatar: { position: 'relative' },
  avatarInner: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#E2E8F0' },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#16A34A', borderWidth: 2, borderColor: '#FFFFFF' },
  convContent: { flex: 1 },
  convTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  convName: { color: '#0F172A', fontWeight: '600', fontSize: 15 },
  convTime: { color: '#64748B', fontSize: 12 },
  convLastMsg: { color: '#64748B', fontSize: 13 },
  unreadBadge: { backgroundColor: '#2563EB', borderRadius: 12, minWidth: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  unreadCount: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  empty: { color: '#64748B', textAlign: 'center', paddingTop: 60 },
})
