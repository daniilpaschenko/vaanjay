'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { VibezSkeleton } from '@/components/Skeleton'

export default function VibezPage() {
  const [vibez, setVibez] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [muted, setMuted] = useState(true)
  const [loading, setLoading] = useState(true)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    api.get('/vibez').then(r => {
      if (r.data?.data?.length) {
        setVibez(r.data.data)
        return
      }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        if (raw) {
          const all = JSON.parse(raw)
          const vids = all.filter((p: any) => p.type === 'vibez')
          if (vids.length) setVibez(vids)
        }
      } catch {}
      setLoading(false)
    })
  }, [])

  const next = () => {
    if (currentIndex < vibez.length - 1) setCurrentIndex(i => i + 1)
  }

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1)
  }

  const toggleLike = (id: string) => {}

  const toggleSave = (id: string) => {}

  if (loading) return <VibezSkeleton />

  if (vibez.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
        <svg className="w-12 h-12 text-white/40 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
        <p className="text-white/60 text-sm">No Vibez yet</p>
        <p className="text-white/30 text-xs mt-1">Upload your first video</p>
      </div>
    )
  }

  const current = vibez[currentIndex]

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">
      {vibez.map((v, i) => (
        <div key={v.id} className={`absolute inset-0 transition-opacity duration-300 ${i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
          <video ref={el => { videoRefs.current[i] = el }}
            src={v.media_url || v.video_url}
            className="w-full h-full object-cover"
            loop playsInline muted={muted}
            autoPlay={i === currentIndex}
            onClick={() => setMuted(!muted)}
          />
          {!v.video_url && !v.media_url && (
            <div className="w-full h-full flex items-center justify-center bg-black/40">
              <p className="text-white/60 text-sm">Vibez</p>
            </div>
          )}
        </div>
      ))}

      {/* Overlay UI */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none">
        {/* Top */}
        <div className="p-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            <Link href="/feed" className="text-white/80 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <span className="text-white/70 text-xs font-medium bg-black/30 px-2 py-1 rounded-full">Vibez</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 pointer-events-auto">
          <div className="flex items-end gap-3">
            <div className="flex-1 min-w-0">
              <Link href={`/${current.username}`} className="font-semibold text-white text-sm hover:underline">
                @{current.username}
              </Link>
              {current.caption && <p className="text-white/80 text-xs mt-1">{current.caption}</p>}
              {(current.song_name || current.tags?.length > 0) && (
                <div className="flex items-center gap-1 mt-2">
                  <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                  <span className="text-white/60 text-xs">{current.song_name || current.tags?.join(', ') || ''}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
              <button onClick={() => toggleLike(current.id)} className="flex flex-col items-center gap-1">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                <span className="text-white text-xs">{current.like_count || 0}</span>
              </button>
              <Link href={`/${current.username}/post/${current.id}`} className="flex flex-col items-center gap-1">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <span className="text-white text-xs">{current.comment_count || 0}</span>
              </Link>
              <button onClick={() => toggleSave(current.id)}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {currentIndex > 0 && (
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      {currentIndex < vibez.length - 1 && (
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
    </div>
  )
}
