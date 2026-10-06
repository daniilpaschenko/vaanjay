'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import api from '@/lib/api'
import { PostSkeleton } from '@/components/Skeleton'

export default function HashtagPage() {
  const params = useParams()
  const tag = typeof params?.tag === 'string' ? params.tag : ''
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tag) return
    const tagStr = tag.startsWith('#') ? tag : '#' + tag

    api.get('/explore/hashtag/' + tag).then(r => {
      if (r.data?.data?.length) { setPosts(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        const all: any[] = raw ? JSON.parse(raw) : []
        const filtered = all.filter((p: any) =>
          p.hashtags?.some((h: string) => h.toLowerCase() === tagStr.toLowerCase())
        )
        setPosts(filtered)
      } catch { setPosts([]) }
    }).finally(() => setLoading(false))
  }, [tag])

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
        <h1 className="text-2xl font-bold text-text-primary">#{tag}</h1>
        <p className="text-sm text-text-muted mt-1">{posts.length} posts</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-12 h-12 text-text-muted mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="text-text-muted">No posts with this hashtag yet</p>
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
