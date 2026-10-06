'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import api from '@/lib/api'
import { PostSkeleton } from '@/components/Skeleton'

const TOPIC_NAMES: Record<string, { ta: string }> = {
  'science-&-tech': { ta: 'அறிவியல் & தொழில்நுட்பம்' },
  'geopolitics': { ta: 'புவிசார் அரசியல்' },
  'tamil-culture': { ta: 'தமிழ் பண்பாடு' },
  'entertainment': { ta: 'மகிழ்கலை' },
  'sports': { ta: 'விளையாட்டு' },
  'finance': { ta: 'நிதி' },
  'memes': { ta: 'மீம்ஸ்' },
  'education': { ta: 'கல்வி' },
}

export default function TopicPage() {
  const params = useParams()
  const topic = typeof params?.topic === 'string' ? params.topic : ''
  const { user: currentUser } = useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!topic) return
    const slug = topic.replace(/-/g, ' ').toLowerCase()

    api.get('/explore/topics/' + topic).then(r => {
      if (r.data?.data?.posts) { setPosts(r.data.data.posts); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        const all: any[] = raw ? JSON.parse(raw) : []
        const filtered = all.filter((p: any) =>
          p.caption?.toLowerCase().includes(slug) ||
          p.hashtags?.some((h: string) => h.toLowerCase().includes(slug))
        )
        setPosts(filtered)
      } catch { setPosts([]) }
    }).finally(() => setLoading(false))
  }, [topic])

  const displayName = TOPIC_NAMES[topic]?.ta || topic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  if (loading) return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="h-8 w-48 bg-surface-secondary rounded animate-pulse mb-6" />
      {[1,2,3].map(i => <PostSkeleton key={i} />)}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <Link href="/explore" className="text-sm text-primary hover:underline mb-2 inline-block">&larr; Explore</Link>
        <h1 className="text-2xl font-bold text-text-primary">{displayName}</h1>
        <p className="text-sm text-text-muted mt-1">{posts.length} posts</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-text-muted mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-text-muted">No posts in this topic yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post: any) => (
            <Link key={post.id} href={`/${post.username}/post/${post.id}`} className="aspect-square bg-surface-secondary rounded overflow-hidden group relative">
              {post.media_url?.[0] ? (
                <img src={post.media_url[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-sm p-2 text-center">
                  {post.caption?.slice(0, 60)}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <span className="text-white text-sm font-medium">&hearts; {post.like_count || 0}</span>
                <span className="text-white text-sm font-medium">&#9998; {post.comment_count || 0}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
