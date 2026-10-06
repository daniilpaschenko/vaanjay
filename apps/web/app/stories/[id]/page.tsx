'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '@/lib/api'
import { useAuth } from '@/components/AuthProvider'

export default function StoryViewerPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [stories, setStories] = useState<any[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [progress, setProgress] = useState(0)
  const [input, setInput] = useState('')

  useEffect(() => {
    api.get(`/stories/user/${id}`).then(r => {
      if (r.data?.data?.length) { setStories(r.data.data); return }
      throw new Error()
    }).catch(() => {
      const raw = localStorage.getItem('vaanjay_stories')
      if (raw) {
        let all = JSON.parse(raw)
        all = all.filter((s: any) => {
          const createdAt = new Date(s.created_at || s.createdAt || Date.now())
          return Date.now() - createdAt.getTime() < 86400000
        })
        if (id) {
          const userStories = all.filter((s: any) => s.username === id || s.user_id === id)
          if (userStories.length > 0) setStories(userStories)
          else setStories(all.filter((s: any) => s.id === id || s.username === id))
        } else {
          setStories(all)
        }
      }
    })
  }, [id])

  // Auto-advance progress
  useEffect(() => {
    if (stories.length === 0) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + 2
        if (next >= 100) {
          goNext()
          return 0
        }
        return next
      })
    }, 100)
    return () => clearInterval(interval)
  }, [currentIdx, stories.length])

  const goNext = () => {
    if (currentIdx < stories.length - 1) {
      setCurrentIdx(i => i + 1)
    } else {
      router.back()
    }
  }

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1)
    }
  }

  const current = stories[currentIdx]
  if (!current) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">No stories available</p>
          <button onClick={() => router.back()} className="px-6 py-2 bg-white/10 text-white rounded-lg text-sm">Go Back</button>
        </div>
      </div>
    )
  }

  const storyUser = {
    username: current.username || current.user_id || 'user',
    full_name: current.full_name || current.displayName || '',
  }
  const isOwn = current.username === user?.username

  const deleteStory = () => {
    try {
      const raw = localStorage.getItem('vaanjay_stories')
      if (raw) {
        const all = JSON.parse(raw)
        const updated = all.filter((s: any) => s.id !== current.id)
        localStorage.setItem('vaanjay_stories', JSON.stringify(updated))
      }
    } catch {}
    goNext()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-100 rounded-full"
              style={{ width: i < currentIdx ? '100%' : i === currentIdx ? `${progress}%` : '0%' }} />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-4 left-0 right-0 z-10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold">
            {storyUser.full_name?.charAt(0) || storyUser.username?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{storyUser.full_name || storyUser.username}</p>
            <p className="text-white/60 text-xs">@{storyUser.username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOwn && (
            <button onClick={deleteStory} className="text-white/70 hover:text-white p-1.5" title="Delete story">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          )}
          <button onClick={() => router.back()} className="text-white/70 hover:text-white p-1.5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center relative" onClick={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        if (x < rect.width * 0.3) goPrev()
        else goNext()
      }}>
        {current.media_url ? (
          current.media_url.startsWith('data:video') ? (
            <video src={current.media_url} className="max-h-full max-w-full object-contain" autoPlay muted />
          ) : (
            <img src={current.media_url} alt="" className="max-h-full max-w-full object-contain" />
          )
        ) : (
          <div className="bg-gradient-to-br from-primary/80 to-blue-600/80 p-8 rounded-2xl max-w-sm text-center">
            <p className="text-white text-2xl font-bold">{current.text || current.caption || 'Story'}</p>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Send message..." value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { /* send logic */ setInput('') } }}
            className="flex-1 px-4 py-2 bg-white/10 rounded-full text-sm text-white placeholder-white/40 focus:outline-none" />
          <button onClick={() => { if (input.trim()) setInput('') }} className="text-white/70 hover:text-white p-1.5">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
