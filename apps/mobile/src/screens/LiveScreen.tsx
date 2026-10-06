import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

export function LiveScreen({ navigation, route }: any) {
  const isHost = !route?.params?.viewerId
  const [title, setTitle] = useState('')
  const [topicTag, setTopicTag] = useState('')
  const [viewerCount] = useState(0)
  const [isLive, setIsLive] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; text: string }[]>([])
  const [chatInput, setChatInput] = useState('')

  const startLive = () => {
    setIsLive(true)
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { id: Date.now().toString(), user: 'You', text: chatInput.trim() }])
    setChatInput('')
  }

  return (
    <View style={styles.container}>
      {!isLive && isHost ? (
        <View style={styles.setupContainer}>
          <Text style={styles.setupTitle}>Go Live</Text>
          <TextInput
            style={styles.input}
            placeholder="Live stream title"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Topic tag"
            placeholderTextColor="#94A3B8"
            value={topicTag}
            onChangeText={setTopicTag}
          />
          <TouchableOpacity style={styles.startButton} onPress={startLive}>
            <Text style={styles.startText}>Go Live</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.liveContainer}>
          <View style={styles.liveHeader}>
            <View style={styles.liveBadge}>
              <Text style={styles.liveBadgeText}>LIVE</Text>
            </View>
            <Text style={styles.viewerCount}>{viewerCount} watching</Text>
            <TouchableOpacity style={styles.endLiveBtn} onPress={() => navigation?.goBack()}>
              <Text style={styles.endLiveText}>End</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.videoPlaceholder}>
            <Text style={styles.streamTitle}>{title || 'Live Stream'}</Text>
          </View>

          <View style={styles.chatSection}>
            <FlatList
              data={chatMessages}
              keyExtractor={item => item.id}
              style={styles.chatList}
              renderItem={({ item }) => (
                <View style={styles.chatMessage}>
                  <Text style={styles.chatUser}>{item.user}: </Text>
                  <Text style={styles.chatText}>{item.text}</Text>
                </View>
              )}
              ListEmptyComponent={
                <Text style={styles.noChat}>No messages yet</Text>
              }
            />
            <View style={styles.chatInputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Send a message..."
                placeholderTextColor="#94A3B8"
                value={chatInput}
                onChangeText={setChatInput}
              />
              <TouchableOpacity style={styles.chatSendBtn} onPress={sendChat}>
                <Text style={styles.chatSendText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A' },
  setupContainer: { flex: 1, justifyContent: 'center', padding: 24, gap: 16, backgroundColor: '#FFFFFF' },
  setupTitle: { color: '#0F172A', fontSize: 32, fontWeight: '700', textAlign: 'center', marginBottom: 24 },
  input: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 16, color: '#0F172A', fontSize: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  startButton: { backgroundColor: '#2563EB', borderRadius: 10, padding: 16, alignItems: 'center', marginTop: 8 },
  startText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  liveContainer: { flex: 1 },
  liveHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12 },
  liveBadge: { backgroundColor: '#DC2626', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  liveBadgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  viewerCount: { color: '#94A3B8', fontSize: 14 },
  endLiveBtn: { backgroundColor: 'rgba(220,38,38,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  endLiveText: { color: '#DC2626', fontSize: 14, fontWeight: '600' },
  videoPlaceholder: { flex: 1, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', margin: 16, borderRadius: 12 },
  streamTitle: { color: '#64748B', fontSize: 18 },
  chatSection: { height: 200, borderTopWidth: 1, borderTopColor: '#334155' },
  chatList: { flex: 1, padding: 12 },
  chatMessage: { flexDirection: 'row', marginBottom: 6 },
  chatUser: { color: '#60A5FA', fontWeight: '600', fontSize: 13 },
  chatText: { color: '#F1F5F9', fontSize: 13, flex: 1 },
  noChat: { color: '#64748B', fontSize: 13, textAlign: 'center', paddingTop: 20 },
  chatInputRow: { flexDirection: 'row', padding: 12, gap: 8, borderTopWidth: 1, borderTopColor: '#334155' },
  chatInput: { flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 10, padding: 10, color: '#FFFFFF', fontSize: 14, borderWidth: 1, borderColor: '#475569' },
  chatSendBtn: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 16, justifyContent: 'center' },
  chatSendText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
})
