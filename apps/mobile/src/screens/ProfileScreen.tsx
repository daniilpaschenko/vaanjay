import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import axios from 'axios'
import { useAuth } from '../store/AuthContext'

const SCREEN_WIDTH = Dimensions.get('window').width
const GRID_SIZE = SCREEN_WIDTH / 3

export function ProfileScreen({ navigation }: any) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'tagged'>('posts')
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/users/me`)
      .then(r => setProfile(r.data.data?.user || null))
      .catch(() => {})
  }, [])

  const renderGridItem = ({ item }: { item: any }) => (
    <View style={styles.gridItem}>
      <View style={styles.gridPlaceholder} />
    </View>
  )

  return (
    <View style={styles.container}>
      {profile && (
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.profileTop}>
                <View style={styles.avatarLarge} />
                <View style={styles.stats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statCount}>{profile.post_count || 0}</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statCount}>{profile.follower_count || 0}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statCount}>{profile.following_count || 0}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.fullName}>{profile.full_name}</Text>
              <Text style={styles.username}>@{profile.username}</Text>
              {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.editBtn} onPress={() => navigation?.navigate('EditProfile')}>
                  <Text style={styles.editText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tabRow}>
                {(['posts', 'reels', 'tagged'] as const).map(tab => (
                  <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
                    <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          }
          data={posts}
          keyExtractor={(item, index) => item.id || index.toString()}
          numColumns={3}
          renderItem={renderGridItem}
          ListEmptyComponent={
            <View style={styles.emptyGrid}>
              {Array.from({ length: 9 }).map((_, i) => (
                <View key={i} style={styles.gridItem}>
                  <View style={styles.gridPlaceholder} />
                </View>
              ))}
            </View>
          }
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { paddingBottom: 8 },
  profileTop: { flexDirection: 'row', padding: 16, alignItems: 'center', gap: 24 },
  avatarLarge: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#E2E8F0' },
  stats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statCount: { color: '#0F172A', fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#64748B', fontSize: 13 },
  fullName: { color: '#0F172A', fontWeight: '600', fontSize: 15, paddingHorizontal: 16 },
  username: { color: '#64748B', fontSize: 13, paddingHorizontal: 16 },
  bio: { color: '#334155', fontSize: 14, paddingHorizontal: 16, marginTop: 4 },
  actionRow: { flexDirection: 'row', padding: 16, gap: 8 },
  editBtn: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 8, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  editText: { color: '#0F172A', fontSize: 14, fontWeight: '600' },
  tabRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E2E8F0', marginTop: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2563EB' },
  tabText: { color: '#64748B', fontSize: 14, fontWeight: '500' },
  activeTabText: { color: '#2563EB', fontWeight: '600' },
  emptyGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: GRID_SIZE, height: GRID_SIZE, padding: 0.5 },
  gridPlaceholder: { flex: 1, backgroundColor: '#F1F5F9', margin: 0.5 },
})
