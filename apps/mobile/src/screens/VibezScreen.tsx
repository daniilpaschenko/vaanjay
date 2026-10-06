import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import axios from 'axios'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export function VibezScreen() {
  const [vibez, setVibez] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/reels/feed?page=1&limit=10')
      .then(r => setVibez(r.data.data || []))
      .catch(() => {})
  }, [])

  const renderReel = ({ item }: { item: any }) => (
    <View style={styles.reelContainer}>
      <View style={styles.videoPlaceholder}>
        <Text style={styles.playIcon}>Play</Text>
      </View>
      <View style={styles.overlay}>
        <View style={styles.reelInfo}>
          <View style={styles.reelUser}>
            <View style={styles.reelAvatar} />
            <Text style={styles.reelUsername}>@{item.user_id?.slice(0, 8)}</Text>
            <TouchableOpacity style={styles.followBtn}><Text style={styles.followText}>Follow</Text></TouchableOpacity>
          </View>
          {item.caption && <Text style={styles.reelCaption}>{item.caption}</Text>}
        </View>
        <View style={styles.reelActions}>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionIcon}>L</Text><Text style={styles.actionCount}>{item.like_count}</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionIcon}>C</Text></TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}><Text style={styles.actionIcon}>S</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <FlatList
      data={reels}
      keyExtractor={item => item.id}
      renderItem={renderReel}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={SCREEN_HEIGHT}
      snapToAlignment="start"
      decelerationRate="fast"
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No Reels Yet</Text>
          <Text style={styles.emptySub}>Create or follow users to see reels</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  reelContainer: { height: SCREEN_HEIGHT, backgroundColor: '#0F172A', position: 'relative' },
  videoPlaceholder: { flex: 1, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  playIcon: { fontSize: 18, color: '#64748B', fontWeight: '600' },
  overlay: { position: 'absolute', bottom: 80, left: 0, right: 0, flexDirection: 'row', paddingHorizontal: 16, justifyContent: 'space-between', alignItems: 'flex-end' },
  reelInfo: { flex: 1, marginRight: 16 },
  reelUser: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  reelAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#2563EB' },
  reelUsername: { color: '#FFFFFF', fontWeight: '600' },
  followBtn: { backgroundColor: '#2563EB', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 },
  followText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  reelCaption: { color: '#F1F5F9', fontSize: 14 },
  reelActions: { alignItems: 'center', gap: 20 },
  actionBtn: { alignItems: 'center', gap: 2 },
  actionIcon: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  actionCount: { color: '#CBD5E1', fontSize: 12 },
  empty: { height: SCREEN_HEIGHT, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  emptyTitle: { color: '#0F172A', fontSize: 20, fontWeight: '600', marginTop: 40 },
  emptySub: { color: '#64748B', fontSize: 14, marginTop: 8 },
})
