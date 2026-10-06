import React, { useRef, useState } from 'react'
import { View, Text, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'

const { width } = Dimensions.get('window')

const slides = [
  {
    id: '1',
    title: 'Your World',
    titleTa: 'Unga Ulagam',
    subtitle: 'Connect with Tamil Nadu and the global Tamil community.',
    subtitleTa: 'Tamil Nadu matrum ulaga Tamil samutha thodu inangungal.',
  },
  {
    id: '2',
    title: 'Multiple Formats',
    titleTa: 'Pala Vakai Pothivugal',
    subtitle: 'Share photos, videos, reels, stories, and text. Express yourself.',
    subtitleTa: 'Photos, videos, reels, stories matrum text. Ungal mozhiyil velippadungal.',
  },
  {
    id: '3',
    title: 'All in One',
    titleTa: 'Ellam Oru Idathil',
    subtitle: 'Chat, call, share payments, and build your community in one app.',
    subtitleTa: 'Araattai, azhaithal, payment, matrum ungal samutha oru app-il.',
  },
]

export function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width)
          setCurrentIndex(index)
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <View style={styles.iconInner} />
              </View>
            </View>
            <Text style={styles.titleTa}>{item.titleTa}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitleTa}>{item.subtitleTa}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === currentIndex && styles.dotActive]} />
          ))}
        </View>

        <View style={styles.buttons}>
          {currentIndex < slides.length - 1 ? (
            <>
              <TouchableOpacity onPress={() => navigation?.replace('LanguageSelect')}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => flatListRef.current?.scrollToIndex({ index: currentIndex + 1 })}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation?.replace('LanguageSelect')}
            >
              <Text style={styles.nextText}>Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  slide: { width, flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  iconContainer: { marginBottom: 40 },
  iconCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  iconInner: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#2563EB' },
  titleTa: { fontSize: 28, fontWeight: '700', color: '#2563EB', fontFamily: 'Noto Sans Tamil', textAlign: 'center' },
  title: { fontSize: 18, color: '#0F172A', marginTop: 4, marginBottom: 24, textAlign: 'center' },
  subtitleTa: { fontSize: 15, color: '#475569', textAlign: 'center', lineHeight: 24, fontFamily: 'Noto Sans Tamil' },
  subtitle: { fontSize: 13, color: '#64748B', textAlign: 'center', marginTop: 8, lineHeight: 20 },
  footer: { paddingHorizontal: 32, paddingBottom: 48 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#CBD5E1' },
  dotActive: { width: 32, backgroundColor: '#2563EB' },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  skipText: { color: '#64748B', fontSize: 16, fontWeight: '500' },
  nextButton: { backgroundColor: '#2563EB', borderRadius: 10, paddingHorizontal: 32, paddingVertical: 14 },
  startButton: { flex: 1, backgroundColor: '#2563EB', borderRadius: 10, padding: 14, alignItems: 'center' },
  nextText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
})
