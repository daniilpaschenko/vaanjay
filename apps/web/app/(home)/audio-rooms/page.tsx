'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useI18n } from '@/hooks/useI18n'

const ROOMS_KEY = 'vaanjay_audio_rooms'

interface Room {
  id: string
  name: string
  topic: string
  host: string
  listeners: number
  speakers: string[]
  createdAt: string
  active: boolean
}

export default function AudioRoomsPage() {
  const { user } = useAuth()
  const { isTamil } = useI18n()
  const [rooms, setRooms] = useState<Room[]>(() => {
    try { return JSON.parse(localStorage.getItem(ROOMS_KEY) || '[]') } catch { return [] }
  })
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null)
  const [isSpeaker, setIsSpeaker] = useState(false)
  const [muted, setMuted] = useState(false)
  const [micLevel, setMicLevel] = useState(0)
  const [micError, setMicError] = useState('')
  const [micGranted, setMicGranted] = useState(false)
  const [speakingUsers, setSpeakingUsers] = useState<string[]>([])
  const [listenerCount, setListenerCount] = useState(0)

  const streamRef = useRef<MediaStream | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number>(0)
  const wsRef = useRef<WebSocket | null>(null)
  const peerConnectionsRef = useRef<Map<string, RTCPeerConnection>>(new Map())

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      streamRef.current = stream
      setMicGranted(true)
      setMicError('')

      const ctx = new AudioContext()
      audioContextRef.current = ctx
      const src = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      src.connect(analyser)
      analyserRef.current = analyser

      const buffer = new Uint8Array(analyser.frequencyBinCount)
      const tick = () => {
        analyser.getByteTimeDomainData(buffer)
        let max = 0
        for (let i = 0; i < buffer.length; i++) {
          const v = Math.abs(buffer[i] - 128)
          if (v > max) max = v
        }
        const level = Math.min(1, max / 128)
        setMicLevel(level)
        animFrameRef.current = requestAnimationFrame(tick)
      }
      tick()
    } catch (err: any) {
      setMicError(err.message || 'Mic access denied')
      setMicGranted(false)
    }
  }

  const stopMic = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    if (audioContextRef.current) audioContextRef.current.close()
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop())
    streamRef.current = null
    audioContextRef.current = null
    analyserRef.current = null
    setMicLevel(0)
    setMicGranted(false)
  }

  useEffect(() => {
    return () => {
      stopMic()
      wsRef.current?.close()
      peerConnectionsRef.current.forEach(pc => pc.close())
    }
  }, [])

  const connectWS = (roomId: string) => {
    const ws = new WebSocket('ws://localhost:8080')
    wsRef.current = ws
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'join_audio_room', roomId, username: user?.username, isSpeaker }))
    }
    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data)
        if (msg.type === 'speaker_update' && msg.roomId === roomId) {
          setSpeakingUsers(prev => msg.speaking ? [...new Set([...prev, msg.username])] : prev.filter(u => u !== msg.username))
        }
        if (msg.type === 'room_update' && msg.roomId === roomId) {
          setListenerCount(msg.listeners)
        }
        if (msg.type === 'webrtc_offer' && msg.target === user?.username) {
          handleWebRTCOffer(msg)
        }
        if (msg.type === 'webrtc_answer' && msg.target === user?.username) {
          handleWebRTCAnswer(msg)
        }
        if (msg.type === 'webrtc_ice' && msg.target === user?.username) {
          handleICE(msg)
        }
      } catch {}
    }
    ws.onclose = () => {
      setTimeout(() => connectWS(roomId), 3000)
    }
  }

  const handleWebRTCOffer = async (msg: any) => {
    if (!streamRef.current) return
    const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] })
    peerConnectionsRef.current.set(msg.from, pc)
    streamRef.current.getTracks().forEach(t => pc.addTrack(t, streamRef.current!))
    pc.onicecandidate = (e) => {
      if (e.candidate) wsRef.current?.send(JSON.stringify({ type: 'webrtc_ice', target: msg.from, from: user?.username, candidate: e.candidate }))
    }
    await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
    const answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    wsRef.current?.send(JSON.stringify({ type: 'webrtc_answer', target: msg.from, from: user?.username, sdp: answer }))
  }

  const handleWebRTCAnswer = async (msg: any) => {
    const pc = peerConnectionsRef.current.get(msg.from)
    if (pc) await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
  }

  const handleICE = async (msg: any) => {
    const pc = peerConnectionsRef.current.get(msg.from)
    if (pc && msg.candidate) await pc.addIceCandidate(new RTCIceCandidate(msg.candidate))
  }

  const createRoom = async () => {
    if (!name.trim() || !user?.username) return
    const room: Room = {
      id: 'room_' + Date.now(),
      name: name.trim(),
      topic: topic.trim(),
      host: user.username,
      listeners: 1,
      speakers: [user.username],
      createdAt: new Date().toISOString(),
      active: true,
    }
    const updated = [room, ...rooms]
    setRooms(updated)
    localStorage.setItem(ROOMS_KEY, JSON.stringify(updated))
    setName('')
    setTopic('')
    setShowCreate(false)
    setJoinedRoom(room.id)
    setIsSpeaker(true)
    setListenerCount(1)
    await startMic()
    connectWS(room.id)
    wsRef.current?.send(JSON.stringify({ type: 'room_created', roomId: room.id, host: user.username }))
  }

  const joinRoomHandler = async (roomId: string, asSpeaker: boolean) => {
    setJoinedRoom(roomId)
    setIsSpeaker(asSpeaker)
    const updated = rooms.map(r => {
      if (r.id === roomId) {
        return { ...r, listeners: r.listeners + 1, speakers: asSpeaker ? [...r.speakers, user?.username || ''] : r.speakers }
      }
      return r
    })
    setRooms(updated)
    localStorage.setItem(ROOMS_KEY, JSON.stringify(updated))
    setListenerCount(updated.find(r => r.id === roomId)?.listeners || 0)
    if (asSpeaker) await startMic()
    connectWS(roomId)
  }

  const leaveRoomHandler = () => {
    if (!joinedRoom) return
    stopMic()
    wsRef.current?.close()
    peerConnectionsRef.current.forEach(pc => pc.close())
    peerConnectionsRef.current.clear()
    const updated = rooms.map(r => {
      if (r.id === joinedRoom) {
        const speakers = r.speakers.filter(s => s !== user?.username)
        return { ...r, listeners: Math.max(0, r.listeners - 1), speakers }
      }
      return r
    })
    setRooms(updated)
    localStorage.setItem(ROOMS_KEY, JSON.stringify(updated))
    setJoinedRoom(null)
    setIsSpeaker(false)
    setMuted(false)
    setMicLevel(0)
    setSpeakingUsers([])
  }

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(t => { t.enabled = muted })
    }
    setMuted(!muted)
    wsRef.current?.send(JSON.stringify({ type: 'speaker_update', roomId: joinedRoom, username: user?.username, speaking: muted }))
  }

  const micBars = Math.round(micLevel * 20)

  if (joinedRoom) {
    const room = rooms.find(r => r.id === joinedRoom)
    if (!room) return <div className="p-4"><p className="text-text-muted">Room not found</p></div>
    return (
      <div className="pb-8">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <button onClick={leaveRoomHandler} className="text-error text-sm font-medium">{isTamil ? 'வெளியேறு' : 'Leave'}</button>
          <h1 className="text-lg font-bold text-text-primary">{room.name}</h1>
          <span className="text-xs text-text-muted">{listenerCount || room.listeners} {isTamil ? 'கேட்போர்' : 'listeners'}</span>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-surface-secondary rounded-xl p-6 text-center">
            {micGranted && (
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-3 transition-all duration-150 ${micLevel > 0.05 ? 'bg-primary/30 scale-110' : 'bg-primary/20'}`}>
                <svg className={`w-10 h-10 transition-colors ${micLevel > 0.05 ? 'text-primary' : 'text-text-muted'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={muted ? 'M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2' : 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'} />
                </svg>
              </div>
            )}
            {!micGranted && !micError && (
              <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-3">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            )}
            <p className="text-sm font-semibold text-text-primary mb-1">{isTamil ? 'ஆடியோ அறை' : 'Audio Room'}</p>
            <p className="text-xs text-text-muted">{room.topic || (isTamil ? 'பொது உரையாடல்' : 'General chat')}</p>

            {micGranted && (
              <div className="flex items-center justify-center gap-0.5 h-6 mt-3">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i}
                    className={`w-1 rounded-full transition-all duration-75 ${i < micBars ? 'bg-primary' : 'bg-border'}`}
                    style={{ height: `${Math.max(4, (i + 1) * 3)}px` }} />
                ))}
              </div>
            )}

            {micError && (
              <p className="text-xs text-error mt-2">{micError}</p>
            )}

            {isSpeaker && (
              <button onClick={toggleMute}
                className={`mt-4 px-6 py-2 rounded-full text-sm font-semibold transition-all ${muted ? 'bg-error text-white' : 'bg-primary text-white'}`}>
                {muted ? (isTamil ? 'ம்யூட் நீக்கு' : 'Unmute') : (isTamil ? 'ம்யூட்' : 'Mute')}
              </button>
            )}

            <div className="mt-4 text-left space-y-2">
              <p className="text-xs font-semibold text-text-muted">{isTamil ? 'பேச்சாளர்கள்' : 'Speakers'}</p>
              {room.speakers.map(s => (
                <div key={s} className="flex items-center gap-2 text-sm">
                  <span className={`w-2 h-2 rounded-full transition-colors ${speakingUsers.includes(s) ? 'bg-green-500 animate-pulse' : 'bg-green-400'}`} />
                  <span className="text-text-primary">@{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="text-lg font-bold text-text-primary">{isTamil ? 'ஆடியோ அறைகள்' : 'Audio Rooms'}</h1>
        <button onClick={() => setShowCreate(true)}
          className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold">
          {isTamil ? 'உருவாக்கு' : 'Create'}
        </button>
      </div>

      {showCreate && (
        <div className="p-4 border-b border-border space-y-3">
          <input type="text" placeholder={isTamil ? 'அறை பெயர்' : 'Room name'} value={name} onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          <input type="text" placeholder={isTamil ? 'தலைப்பு (விரும்பினால்)' : 'Topic (optional)'} value={topic} onChange={e => setTopic(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          <button onClick={createRoom} disabled={!name.trim()}
            className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50">
            {isTamil ? 'அறையை தொடங்கு' : 'Start Room'}
          </button>
        </div>
      )}

      <div className="p-4 space-y-3">
        {rooms.filter(r => r.active).map(room => (
          <div key={room.id} className="bg-surface-secondary rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h3 className="text-sm font-semibold text-text-primary">{room.name}</h3>
              </div>
              <span className="text-xs text-text-muted">{room.listeners} {isTamil ? 'கேட்போர்' : 'listeners'}</span>
            </div>
            <p className="text-xs text-text-muted mb-3">{room.topic || (isTamil ? 'பொது உரையாடல்' : 'General chat')}</p>
            <div className="flex gap-2">
              <button onClick={() => joinRoomHandler(room.id, false)}
                className="flex-1 py-2 bg-primary text-white rounded-lg text-xs font-semibold">
                {isTamil ? 'கேட்க' : 'Listen'}
              </button>
              <button onClick={() => joinRoomHandler(room.id, true)}
                className="flex-1 py-2 border border-primary text-primary rounded-lg text-xs font-semibold hover:bg-primary/5">
                {isTamil ? 'பேச' : 'Speak'}
              </button>
            </div>
          </div>
        ))}
        {rooms.filter(r => r.active).length === 0 && (
          <p className="text-center text-text-muted text-sm py-8">{isTamil ? 'செயலில் உள்ள அறைகள் இல்லை' : 'No active rooms'}</p>
        )}
      </div>
    </div>
  )
}
