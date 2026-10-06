import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const GRID = SCREEN_WIDTH / 3

export function OtherUserProfileScreen({ navigation, route }: any) {
  const username = route?.params?.username || 'unknown'
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts')

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>@{username}</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.profileSection}>
              <View style={styles.profilePicRow}>
                <View style={styles.avatarLarge} />
                <View style={styles.statsRow}>
                  <View style={styles.stat}><Text style={styles.statCount}>42</Text><Text style={styles.statLabel}>Posts</Text></View>
                  <View style={styles.stat}><Text style={styles.statCount}>1.2K</Text><Text style={styles.statLabel}>Followers</Text></View>
                  <View style={styles.stat}><Text style={styles.statCount}>580</Text><Text style={styles.statLabel}>Following</Text></View>
                </View>
              </View>
              <Text style={styles.fullName}>User Full Name</Text>
              <Text style={styles.username}>@{username}</Text>
              <Text style={styles.bio}>Bio goes here</Text>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.followBtn, isFollowing && styles.followingBtn]}
                  onPress={() => setIsFollowing(!isFollowing)}
                >
                  <Text style={[styles.followText, isFollowing && styles.followingText]}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.messageBtn}>
                  <Text style={styles.messageText}>Message</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tabRow}>
              {(['posts', 'reels'] as const).map(tab => (
                <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        data={[]}
        numColumns={3}
        keyExtractor={(_, i) => i.toString()}
        renderItem={() => (
          <View style={styles.gridItem}>
            <View style={styles.gridPlaceholder} />
          </View>
        )}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 56, paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backText: { color: '#2563EB', fontSize: 16, fontWeight: '500' },
  headerTitle: { color: '#0F172A', fontSize: 16, fontWeight: '600' },
  profileSection: { padding: 16 },
  profilePicRow: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  avatarLarge: { width: 86, height: 86, borderRadius: 43, backgroundColor: '#E2E8F0' },
  statsRow: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  stat: { alignItems: 'center' },
  statCount: { color: '#0F172A', fontSize: 18, fontWeight: '700' },
  statLabel: { color: '#64748B', fontSize: 13 },
  fullName: { color: '#0F172A', fontWeight: '600', fontSize: 15, marginTop: 12 },
  username: { color: '#64748B', fontSize: 13 },
  bio: { color: '#475569', fontSize: 14, marginTop: 4 },
  actionRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  followBtn: { flex: 1, backgroundColor: '#2563EB', borderRadius: 8, padding: 12, alignItems: 'center' },
  followingBtn: { backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  followText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  followingText: { color: '#475569' },
  messageBtn: { flex: 1, backgroundColor: '#F1F5F9', borderRadius: 8, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  messageText: { color: '#0F172A', fontSize: 14, fontWeight: '600' },
  tabRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#E2E8F0', marginTop: 8 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 12 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#2563EB' },
  tabText: { color: '#64748B', fontSize: 14, fontWeight: '500' },
  activeTabText: { color: '#2563EB', fontWeight: '600' },
  emptyGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  gridItem: { width: GRID, height: GRID, padding: 0.5 },
  gridPlaceholder: { flex: 1, backgroundColor: '#F1F5F9', margin: 0.5 },
})
