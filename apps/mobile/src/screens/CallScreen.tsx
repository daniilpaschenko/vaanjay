import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export function CallScreen({ navigation, route }: any) {
  const { type, callerName } = route?.params || { type: 'audio', callerName: 'User' }
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeaker, setIsSpeaker] = useState(false)
  const [isCameraFront, setIsCameraFront] = useState(true)
  const [duration, setDuration] = useState(0)
  const [isOngoing, setIsOngoing] = useState(true)

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isOngoing) setDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isOngoing])

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <View style={styles.container}>
      <View style={styles.callerInfo}>
        <View style={styles.avatarLarge}>
          <View style={styles.avatarInner} />
        </View>
        <Text style={styles.callerName}>{callerName}</Text>
        <Text style={styles.callStatus}>
          {isOngoing ? formatDuration(duration) : 'Connecting...'}
        </Text>
      </View>

      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity style={[styles.controlBtn, isMuted && styles.controlActive]} onPress={() => setIsMuted(!isMuted)}>
            <Text style={styles.controlIcon}>{isMuted ? 'U' : 'M'}</Text>
            <Text style={styles.controlLabel}>{isMuted ? 'Unmute' : 'Mute'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlBtn, isSpeaker && styles.controlActive]} onPress={() => setIsSpeaker(!isSpeaker)}>
            <Text style={styles.controlIcon}>SP</Text>
            <Text style={styles.controlLabel}>Speaker</Text>
          </TouchableOpacity>
          {type === 'video' && (
            <TouchableOpacity style={styles.controlBtn} onPress={() => setIsCameraFront(!isCameraFront)}>
              <Text style={styles.controlIcon}>CF</Text>
              <Text style={styles.controlLabel}>Flip</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.endCallBtn}
          onPress={() => {
            setIsOngoing(false)
            navigation?.goBack()
          }}
        >
          <Text style={styles.endCallText}>End Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', justifyContent: 'space-between', paddingTop: 80, paddingBottom: 60 },
  callerInfo: { alignItems: 'center', gap: 16 },
  avatarLarge: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  avatarInner: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#334155' },
  callerName: { color: '#FFFFFF', fontSize: 28, fontWeight: '700' },
  callStatus: { color: '#94A3B8', fontSize: 16 },
  controls: { alignItems: 'center', gap: 32 },
  controlRow: { flexDirection: 'row', gap: 24 },
  controlBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', gap: 4 },
  controlActive: { backgroundColor: 'rgba(37,99,235,0.3)' },
  controlIcon: { color: '#FFFFFF', fontSize: 14, fontWeight: '700' },
  controlLabel: { color: '#94A3B8', fontSize: 11 },
  endCallBtn: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#DC2626', alignItems: 'center', justifyContent: 'center' },
  endCallText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
})
