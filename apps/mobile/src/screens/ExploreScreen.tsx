import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import axios from 'axios'

export function ExploreScreen() {
  const [search, setSearch] = useState('')
  const [topics, setTopics] = useState<any[]>([])
  const [trending, setTrending] = useState<any[]>([])

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/explore/topics')
      .then(r => setTopics(r.data.data || []))
      .catch(() => {})
    axios.get('http://localhost:8080/api/v1/explore/trending')
      .then(r => setTrending(r.data.data?.hashtags || []))
      .catch(() => {})
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search VAANJAY..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={topics}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            {trending.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Hashtags</Text>
                <View style={styles.hashtagRow}>
                  {trending.map((h: any, i: number) => (
                    <TouchableOpacity key={i} style={styles.hashtag}>
                      <Text style={styles.hashtagText}>#{h.tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            <Text style={styles.sectionTitle}>Explore Topics</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.topicCard}>
            <Text style={styles.topicName}>{item.name}</Text>
            <Text style={styles.topicNameTa}>{item.name_ta}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingTop: 56 },
  searchContainer: { paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  search: { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 14, color: '#0F172A', fontSize: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  section: { marginBottom: 16, paddingHorizontal: 16, paddingTop: 16 },
  sectionTitle: { color: '#0F172A', fontSize: 18, fontWeight: '600', marginBottom: 12, paddingHorizontal: 16, paddingTop: 16 },
  hashtagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: 16 },
  hashtag: { backgroundColor: '#EEF2FF', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  hashtagText: { color: '#2563EB', fontSize: 14 },
  row: { justifyContent: 'space-between', marginBottom: 12, paddingHorizontal: 16 },
  topicCard: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 16, width: '48%', borderWidth: 1, borderColor: '#E2E8F0' },
  topicName: { color: '#0F172A', fontSize: 14, fontWeight: '600', marginTop: 8 },
  topicNameTa: { color: '#64748B', fontSize: 12, fontFamily: 'Noto Sans Tamil' },
})
