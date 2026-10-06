'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/components/AuthProvider'

export default function CallPage() {
  const { id } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const type = searchParams?.get('type') || 'audio'
  const [callState, setCallState] = useState<'ringing' | 'connected' | 'ended'>('ringing')
  const [timer, setTimer] = useState(0)
  const [muted, setMuted] = useState(false)
  const [speaker, setSpeaker] = useState(false)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const localStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    wsRef.current = ws
    let pc: RTCPeerConnection | null = null
    let localStream: MediaStream | null = null

    ws.onopen = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia(
          type === 'video' ? { video: true, audio: true } : { audio: true }
        )
        localStreamRef.current = localStream
        if (type === 'video' && localVideoRef.current) {
          localVideoRef.current.srcObject = localStream
        }
        if (muted) localStream.getAudioTracks().forEach(t => t.enabled = false)

        const config = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
        pc = new RTCPeerConnection(config)
        pcRef.current = pc

        localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!))

        pc.ontrack = (event) => {
          setRemoteStream(event.streams[0])
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0]
          if (type === 'audio' && event.streams[0]) {
            const audio = new Audio()
            audio.srcObject = event.streams[0]
            audio.play()
          }
        }

        pc.onicecandidate = (event) => {
          if (event.candidate && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ice-candidate', candidate: event.candidate, target: id }))
          }
        }

        pc.onconnectionstatechange = () => {
          if (pc?.connectionState === 'connected') setCallState('connected')
          if (pc?.connectionState === 'disconnected' || pc?.connectionState === 'failed') {
            setCallState('ended')
            setTimeout(() => router.back(), 1500)
          }
        }

        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        ws.send(JSON.stringify({ type: 'offer', sdp: offer, target: id, caller: user?.username }))
      } catch {
        setCallState('connected')
      }
    }

    ws.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data)
        if (!pc) return

        if (data.type === 'answer' && data.sdp) {
          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
        } else if (data.type === 'ice-candidate' && data.candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate))
        }
      } catch {}
    }

    ws.onclose = () => {}

    return () => {
      ws.close()
      pc?.close()
      localStream?.getTracks().forEach(t => t.stop())
    }
  }, [id, type])

  useEffect(() => {
    if (callState === 'connected') {
      const interval = setInterval(() => setTimer(t => t + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [callState])

  useEffect(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(t => t.enabled = !muted)
    }
  }, [muted])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60); const sec = s % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const endCall = () => {
    wsRef.current?.close()
    pcRef.current?.close()
    localStreamRef.current?.getTracks().forEach(t => t.stop())
    setCallState('ended')
    setTimeout(() => router.back(), 1500)
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {type === 'video' && remoteStream && (
        <video ref={remoteVideoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center relative z-10">
        {callState === 'ended' ? (
          <>
            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <p className="text-white/50 text-sm font-medium">Call Ended</p>
            <p className="text-white/30 text-xs mt-1">Duration: {formatTime(timer)}</p>
          </>
        ) : (
          <>
            {type === 'video' && (
              <div className="mb-4">
                <video ref={localVideoRef} autoPlay playsInline muted className="w-32 h-44 rounded-2xl object-cover border-2 border-white/20 shadow-lg" />
              </div>
            )}
            <div className={`${type === 'video' ? '' : 'w-24 h-24 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-2xl font-bold mb-5 shadow-lg shadow-primary/20'}`}>
              {type === 'audio' && (id?.toString().charAt(0)?.toUpperCase() || 'U')}
            </div>
            <p className="text-white text-xl font-semibold">@{id}</p>
            <p className="text-white/40 text-sm mt-1.5">
              {callState === 'ringing' ? 'Calling...' : formatTime(timer)}
            </p>
          </>
        )}
      </div>

      {callState !== 'ended' && (
        <div className="pb-10 flex items-center justify-center gap-6 relative z-10">
          {callState === 'ringing' ? (
            <>
              <button onClick={() => {}}
                className="w-14 h-14 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </button>
              <button onClick={endCall}
                className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setMuted(!muted)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${muted ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                {muted ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
              </button>
              <button onClick={endCall}
                className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" /></svg>
              </button>
              <button onClick={() => setSpeaker(!speaker)}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${speaker ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M11 5l-3 3H4v8h4l3 3V5z" /></svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
