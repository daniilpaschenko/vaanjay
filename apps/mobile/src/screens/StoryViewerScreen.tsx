import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native'

const { width, height } = Dimensions.get('window')
const STORY_DURATION = 5000

export function StoryViewerScreen({ navigation, route }: any) {
  const { stories, initialIndex } = route?.params || { stories: [{ id: '1' }], initialIndex: 0 }
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0)
  const progress = useRef(new Animated.Value(0)).current
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      progress.setValue(0)
      Animated.timing(progress, {
        toValue: 1,
        duration: STORY_DURATION,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished && currentIndex < stories.length - 1) {
          setCurrentIndex(prev => prev + 1)
        } else if (finished) {
          navigation?.goBack()
        }
      })
    }
    return () => progress.stopAnimation()
  }, [currentIndex, isPaused])

  const handleTap = (evt: any) => {
    const x = evt.nativeEvent.locationX
    if (x < width * 0.3 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    } else if (x > width * 0.7 && currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1)
    } else if (x > width * 0.7) {
      navigation?.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        {stories.map((_: any, i: number) => (
          <View key={i} style={styles.progressSegment}>
            <View style={styles.progressBg}>
              {i === currentIndex && (
                <Animated.View
                  style={[styles.progressFill, { width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }) }]}
                />
              )}
              {i < currentIndex && <View style={[styles.progressFill, { width: '100%' }]} />}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity activeOpacity={1} onPress={handleTap} style={styles.touchArea}>
        <View style={styles.storyContent}>
          <Text style={styles.storyText}>Story {currentIndex + 1}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <View style={styles.storyAvatar}>
            <View style={styles.storyAvatarInner} />
          </View>
          <Text style={styles.storyUsername}>username</Text>
          <Text style={styles.storyTime}>2h ago</Text>
        </View>
        <TouchableOpacity
          style={styles.replyButton}
          onPress={() => navigation?.goBack()}
        >
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  progressBar: { position: 'absolute', top: 50, left: 12, right: 12, flexDirection: 'row', gap: 4, zIndex: 10 },
  progressSegment: { flex: 1, height: 2 },
  progressBg: { flex: 1, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 1, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FFFFFF', borderRadius: 1 },
  touchArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  storyContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  storyText: { color: '#FFFFFF', fontSize: 24, fontWeight: '600' },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  storyAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  storyAvatarInner: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1E293B' },
  storyUsername: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  storyTime: { color: '#94A3B8', fontSize: 12 },
  replyButton: { backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  replyText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
})
