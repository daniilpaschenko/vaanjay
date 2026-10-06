'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { useI18n } from '@/hooks/useI18n'
import { DISTRICT_LIST } from '@/components/DistrictGroups'

export default function CommunitiesPage() {
  const { user } = useAuth()
  const { t, isTamil } = useI18n()
  const [activeDistrict, setActiveDistrict] = useState(user?.district || '')
  const [posts, setPosts] = useState<any[]>([])
  const [postInput, setPostInput] = useState('')

  useEffect(() => {
    if (user?.district && !activeDistrict) {
      setActiveDistrict(user.district)
    }
  }, [user])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        if (activeDistrict) {
          setPosts(all.filter((p: any) => p.location === activeDistrict || p.tags?.includes(activeDistrict)))
        } else {
          setPosts(all)
        }
      }
    } catch {}
  }, [activeDistrict])

  const postToCommunity = () => {
    const text = postInput.trim()
    if (!text || !activeDistrict) return
    const post = {
      id: 'comm_' + Date.now(),
      caption: text,
      type: 'post',
      media_url: '',
      username: user?.username,
      full_name: user?.full_name || user?.username,
      location: activeDistrict,
      tags: [activeDistrict],
      like_count: 0, comment_count: 0,
      created_at: new Date().toISOString(),
      user_id: user?.id,
    }
    const existing = JSON.parse(localStorage.getItem('vaanjay_posts') || '[]')
    existing.unshift(post)
    localStorage.setItem('vaanjay_posts', JSON.stringify(existing))
    setPosts(prev => [post, ...prev])
    setPostInput('')
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-text-primary">{isTamil ? 'சமூகங்கள்' : 'Communities'}</h1>
        <p className="text-xs text-text-muted mt-0.5">{isTamil ? 'உங்கள் மாவட்ட சமூகம்' : 'Your District Community'}</p>
      </div>

      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-text-muted font-medium">{isTamil ? 'மாவட்டம்:' : 'District:'}</span>
          <select value={activeDistrict} onChange={e => setActiveDistrict(e.target.value)}
            className="text-sm bg-surface-secondary border border-border rounded-lg px-3 py-1.5 text-text-primary focus:outline-none">
            <option value="">{isTamil ? 'அனைத்தும்' : 'All'}</option>
            {DISTRICT_LIST.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        {activeDistrict && (
          <div className="mt-2 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs font-semibold text-primary">{activeDistrict} {isTamil ? 'சமூகம்' : 'Community'}</span>
            <span className="text-xs text-text-muted">· {posts.length} {isTamil ? 'இடுகைகள்' : 'posts'}</span>
          </div>
        )}
      </div>

      {activeDistrict && (
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.username?.charAt(0) || 'U'}
          </div>
          <input type="text" value={postInput} onChange={e => setPostInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && postToCommunity()}
            placeholder={isTamil ? `உங்கள் ${activeDistrict} பகுதியைப் பகிரவும்...` : `Share about ${activeDistrict}...`}
            className="flex-1 text-sm bg-transparent text-text-primary placeholder-text-muted focus:outline-none" />
          <button onClick={postToCommunity} disabled={!postInput.trim()}
            className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold disabled:opacity-30">
            {isTamil ? 'பகிர்' : 'Post'}
          </button>
        </div>
      )}

      <div className="divide-y divide-border">
        {posts.length === 0 && (
          <div className="px-4 py-16 text-center text-text-secondary text-sm">
            {isTamil ? 'இந்த மாவட்டத்தில் இன்னும் இடுகைகள் இல்லை' : 'No posts in this district yet'}
          </div>
        )}
        {posts.map(post => (
          <Link key={post.id} href={`/${post.username}/post/${post.id}`} className="block px-4 py-3 hover:bg-surface-secondary transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {post.username?.charAt(0) || 'U'}
              </div>
              <span className="text-xs font-semibold text-text-primary">@{post.username}</span>
              <span className="text-xs text-text-muted">· {post.location}</span>
            </div>
            <p className="text-sm text-text-primary">{post.caption}</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-text-muted">
              <span>{post.like_count || 0} likes</span>
              <span>{post.comment_count || 0} comments</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
