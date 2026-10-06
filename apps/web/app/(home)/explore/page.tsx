'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import api from '@/lib/api'
import { ExploreSkeleton } from '@/components/Skeleton'

const THREAD_TOPICS = [
  { name: 'Science & Tech', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', posts: 1243 },
  { name: 'Geopolitics', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', posts: 892 },
  { name: 'Tamil Culture', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', posts: 2156 },
  { name: 'Entertainment', icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z', posts: 3421 },
  { name: 'Sports', icon: 'M13 10V3L4 14h7v7l9-11h-7z', posts: 1876 },
  { name: 'Finance', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', posts: 654 },
  { name: 'Memes', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', posts: 5678 },
  { name: 'Education', icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222', posts: 1432 },
]

export default function ExplorePage() {
  const { user: currentUser } = useAuth()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams?.get('q') || '')
  const [hashtags, setHashtags] = useState<any[]>([])
  const [topics, setTopics] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [follows, setFollows] = useState<Set<string>>(new Set())
  const [activeTag, setActiveTag] = useState<string | null>(null)

  useEffect(() => {
    api.get('/explore/hashtags').then(r => {
      if (r.data?.data?.length) setHashtags(r.data.data)
    }).catch(() => {})
    api.get('/explore/trending').then(r => {
      if (r.data?.data?.length) setTopics(r.data.data)
    }).catch(() => {})
    api.get('/explore/posts').then(r => {
      if (r.data?.data?.length) setPosts(r.data.data)
    }).catch(() => {})
    try {
      const raw = localStorage.getItem('vaanjay_users')
      if (raw) setUsers(JSON.parse(raw))
    } catch {}
    try {
      const fRaw = localStorage.getItem('vaanjay_follows')
      if (fRaw) setFollows(new Set(JSON.parse(fRaw)))
    } catch {}
    setLoading(false)
  }, [])

  const toggleFollow = (targetUsername: string) => {
    const next = new Set(follows)
    if (next.has(targetUsername)) next.delete(targetUsername)
    else next.add(targetUsername)
    setFollows(next)
    localStorage.setItem('vaanjay_follows', JSON.stringify([...next]))
  }

  const filteredUsers = query.trim()
    ? users.filter(u =>
        u.username !== 'admin' &&
        u.username !== currentUser?.username &&
        (u.username?.toLowerCase().includes(query.toLowerCase()) ||
         u.full_name?.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  const filteredPosts = activeTag
    ? posts.filter(p => p.tags?.includes(activeTag))
    : posts

  return loading ? <ExploreSkeleton /> : (
    <div className="pb-8">
      {/* Search bar */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search users, hashtags, topics..."
            value={query} onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent text-text-primary placeholder-text-muted focus:outline-none" />
        </div>
      </div>

      {/* User search results */}
      {filteredUsers.length > 0 && (
        <div className="border-b border-border">
          <div className="px-4 py-3">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">People</h3>
            <div className="space-y-2">
              {filteredUsers.map(u => (
                <div key={u.id} className="flex items-center gap-3">
                  <Link href={`/${u.username}`} className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {u.username?.charAt(0) || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">@{u.username}</p>
                    </div>
                  </Link>
                  <button onClick={() => toggleFollow(u.username)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors flex-shrink-0 ${
                      follows.has(u.username)
                        ? 'bg-surface-secondary text-text-secondary border border-border'
                        : 'bg-primary text-white'
                    }`}>
                    {follows.has(u.username) ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hashtags row */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 border-b border-border scrollbar-hide">
        {hashtags.length === 0 && (
          <span className="text-xs text-text-muted">No trending hashtags yet</span>
        )}
        {hashtags.map(tag => (
          <button key={tag.id} onClick={() => setActiveTag(activeTag === tag.name ? null : tag.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              activeTag === tag.name ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary hover:bg-surface-hover'
            }`}>
            #{tag.name}
          </button>
        ))}
      </div>

      {/* Trending topics */}
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary mb-2">Trending in Tamil Nadu</h2>
        <div className="space-y-2">
          {topics.length === 0 && (
            <span className="text-xs text-text-muted">No trending topics yet</span>
          )}
          {topics.map(topic => (
            <Link key={topic.id} href="/explore" className="block">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-surface-secondary flex items-center justify-center text-xs text-text-muted">
                  {topic.category?.charAt(0) || '#'}
                </span>
                <div>
                  <p className="text-sm text-text-primary font-medium">{topic.name}</p>
                  <p className="text-xs text-text-muted">{topic.post_count} posts</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Topic threads (Reddit-style) */}
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-text-primary mb-3">Topic Threads</h2>
        <div className="grid grid-cols-2 gap-2">
          {THREAD_TOPICS.map(t => (
            <Link key={t.name} href={`/explore/topics/${t.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-surface-hover transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} /></svg>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{t.name}</p>
                <p className="text-xs text-text-muted">{t.posts.toLocaleString()} posts</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Explore grid */}
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {filteredPosts.length === 0 && (
          <div className="col-span-3 text-center py-16 text-text-secondary text-sm">No posts found. Follow more people or search for topics.</div>
        )}
        {filteredPosts.map(post => (
          <Link key={post.id} href={`/${post.username}/post/${post.id}`}
            className="aspect-square bg-surface-secondary overflow-hidden hover:opacity-90 transition-opacity relative group">
            {post.media_url ? (
              <img src={post.media_url} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">Photo</div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
              <span className="text-white text-xs font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                {post.like_count || 0}
              </span>
              <span className="text-white text-xs font-semibold flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" /></svg>
                {post.comment_count || 0}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
