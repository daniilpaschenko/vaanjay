import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import axios from 'axios'
import { useAuth } from '../store/AuthContext'

export function HomeScreen({ navigation }: any) {
  const { user } = useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchFeed = async (pageNum = 1) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/posts/feed?page=${pageNum}&limit=20`)
      if (pageNum === 1) setPosts(data.data || [])
      else setPosts(prev => [...prev, ...(data.data || [])])
      setHasMore(data.data?.length === 20)
    } catch {}
  }

  useEffect(() => { fetchFeed() }, [])

  const onRefresh = async () => {
    setRefreshing(true)
    setPage(1)
    await fetchFeed(1)
    setRefreshing(false)
  }

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.avatar} />
        <View style={styles.postHeaderText}>
          <Text style={styles.username}>@{item.user_id?.slice(0, 8)}</Text>
          {item.location && <Text style={styles.location}>{item.location}</Text>}
        </View>
      </View>

      {item.media_urls?.length > 0 && (
        <Image source={{ uri: item.media_urls[0] }} style={styles.postImage} />
      )}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>L</Text>
        </TouchableOpacity>
        <Text style={styles.actionCount}>{item.like_count}</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIconMuted}>C</Text>
        </TouchableOpacity>
        <Text style={styles.actionCount}>{item.comment_count}</Text>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIconMuted}>S</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIconMuted}>R</Text>
        </TouchableOpacity>
      </View>

      {item.caption && (
        <View style={styles.captionSection}>
          <Text style={styles.captionUser}>@{item.user_id?.slice(0, 8)} </Text>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
      )}

      <Text style={styles.timestamp}>{new Date(item.created_at).toLocaleDateString('en-IN')}</Text>
    </View>
  )

  const stories = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>VAANJAY</Text>
        <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
          <Text style={styles.settingsIcon}>S</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563EB" />}
        onEndReached={() => hasMore && fetchFeed(page + 1)}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={
          <View style={styles.storiesRow}>
            {stories.map((_, i) => (
              <TouchableOpacity key={i} style={styles.storyItem}>
                <View style={styles.storyRing}>
                  <View style={styles.storyAvatar} />
                </View>
                <Text style={styles.storyName}>User {i + 1}</Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Welcome to VAANJAY</Text>
            <Text style={styles.emptySubtitle}>Follow users to see their posts in your feed</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  headerBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 56, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#0F172A' },
  settingsIcon: { color: '#2563EB', fontSize: 18, fontWeight: '700', width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEF2FF', textAlign: 'center', lineHeight: 36 },
  storiesRow: { flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 16, gap: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  storyItem: { alignItems: 'center', gap: 4, width: 68 },
  storyRing: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  storyAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E2E8F0' },
  storyName: { color: '#475569', fontSize: 11, textAlign: 'center' },
  post: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#E2E8F0' },
  postHeaderText: { flex: 1 },
  username: { color: '#0F172A', fontWeight: '600', fontSize: 14 },
  location: { color: '#64748B', fontSize: 12 },
  postImage: { width: '100%', aspectRatio: 1, backgroundColor: '#F8FAFC' },
  postActions: { flexDirection: 'row', alignItems: 'center', padding: 12, gap: 6 },
  actionButton: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  actionIcon: { color: '#2563EB', fontSize: 14, fontWeight: '700' },
  actionIconMuted: { color: '#64748B', fontSize: 14, fontWeight: '700' },
  actionCount: { color: '#64748B', fontSize: 13, marginRight: 12 },
  captionSection: { flexDirection: 'row', paddingHorizontal: 12, paddingBottom: 4 },
  captionUser: { color: '#0F172A', fontWeight: '600', fontSize: 14 },
  caption: { color: '#334155', fontSize: 14, flex: 1 },
  timestamp: { color: '#94A3B8', fontSize: 12, paddingHorizontal: 12, paddingBottom: 12 },
  emptyContainer: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 32 },
  emptyTitle: { color: '#0F172A', fontSize: 20, fontWeight: '600' },
  emptySubtitle: { color: '#64748B', fontSize: 14, marginTop: 8, textAlign: 'center' },
})
