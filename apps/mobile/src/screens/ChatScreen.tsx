import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'

export function ChatScreen({ navigation, route }: any) {
  const { conversationId, name } = route?.params || {}
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), content: input.trim(), isMine: true }])
    setInput('')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.headerName}>{name || 'User'}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callBtnText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn}>
            <Text style={styles.callBtnText}>Video</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageContainer}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isMine ? styles.myMessage : styles.theirMessage]}>
            <Text style={styles.messageContent}>{item.content}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyChat}>
            <Text style={styles.emptyTitle}>No messages yet</Text>
            <Text style={styles.emptySubtitle}>Say hello to start the conversation</Text>
          </View>
        }
      />

      <View style={styles.inputBar}>
        <TextInput
          style={styles.messageInput}
          placeholder="Type a message..."
          placeholderTextColor="#94A3B8"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  backText: { color: '#2563EB', fontSize: 16, fontWeight: '500' },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 12, gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E2E8F0' },
  headerName: { color: '#0F172A', fontSize: 16, fontWeight: '600' },
  headerStatus: { color: '#16A34A', fontSize: 12 },
  headerActions: { flexDirection: 'row', gap: 8 },
  callBtn: { backgroundColor: '#EEF2FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  callBtnText: { color: '#2563EB', fontSize: 13, fontWeight: '600' },
  messageList: { flex: 1 },
  messageContainer: { padding: 16, gap: 8 },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 12, marginBottom: 4 },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F5F9',
    borderBottomLeftRadius: 4,
  },
  messageContent: { color: '#FFFFFF', fontSize: 15 },
  emptyChat: { alignItems: 'center', paddingTop: 80 },
  emptyTitle: { color: '#64748B', fontSize: 18, fontWeight: '600' },
  emptySubtitle: { color: '#94A3B8', fontSize: 14, marginTop: 4 },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    color: '#0F172A',
    fontSize: 15,
    maxHeight: 80,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sendButton: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 20, paddingVertical: 10 },
  sendText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
})
