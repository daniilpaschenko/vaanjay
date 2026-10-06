'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { useAuth } from '@/components/AuthProvider'
import { VerifiedBadge } from '@vaanjay/ui'
import { PostSkeleton } from '@/components/Skeleton'
import { linkifyText } from '@/lib/linkify'

export default function HomeFeedPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [stories, setStories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({})
  const [storyModal, setStoryModal] = useState(false)
  const [storyFile, setStoryFile] = useState<File | null>(null)
  const [storyPreview, setStoryPreview] = useState('')
  const [storyText, setStoryText] = useState('')
  const storyInputRef = useRef<HTMLInputElement>(null)
  const [viewingStory, setViewingStory] = useState<any | null>(null)
  const [storyIndex, setStoryIndex] = useState(0)

  const deleteStory = (storyId: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_stories')
      if (raw) {
        const all = JSON.parse(raw)
        const filtered = all.filter((s: any) => s.id !== storyId)
        localStorage.setItem('vaanjay_stories', JSON.stringify(filtered))
        setStories(filtered)
      }
      if (viewingStory) {
        const updated = viewingStory.filter((s: any) => s.id !== storyId)
        if (updated.length === 0) { setViewingStory(null); return }
        setViewingStory(updated)
        setStoryIndex(i => Math.min(i, updated.length - 1))
      }
    } catch (e) { console.error('delete story error', e) }
  }

  useEffect(() => {
    api.get('/posts/feed').then(r => {
      if (r.data?.data?.length) {
        setPosts(r.data.data)
        setLoading(false)
        return
      }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        if (raw) {
          const all = JSON.parse(raw)
          setPosts(all.filter((p: any) => !p.type || p.type === 'post'))
        }
      } catch {}
      setLoading(false)
    })
    api.get('/stories/feed').then(r => {
      if (r.data?.data?.length) {
        setStories(r.data.data)
        return
      }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_stories')
        if (raw) {
          const all: any[] = JSON.parse(raw)
          const now = Date.now()
          const valid = all.filter((s: any) => now - new Date(s.created_at).getTime() < 86400000)
          if (valid.length !== all.length) localStorage.setItem('vaanjay_stories', JSON.stringify(valid))
          if (valid.length) setStories(valid)
        }
      } catch {}
    })
  }, [])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaanjay_liked')
      if (raw) setLikedPosts(new Set(JSON.parse(raw)))
    } catch {}
    try {
      const raw = localStorage.getItem('vaanjay_saved')
      if (raw) setSavedPosts(new Set(JSON.parse(raw)))
    } catch {}
  }, [])

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      localStorage.setItem('vaanjay_liked', JSON.stringify([...next]))
      return next
    })
  }

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      localStorage.setItem('vaanjay_saved', JSON.stringify([...next]))
      return next
    })
  }

  const postComment = (postId: string) => {
    const text = commentTexts[postId]?.trim()
    if (!text) return
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        const idx = all.findIndex((p: any) => p.id === postId)
        if (idx >= 0) {
          all[idx].comment_count = (all[idx].comment_count || 0) + 1
          localStorage.setItem('vaanjay_posts', JSON.stringify(all))
        }
      }
      const comments = JSON.parse(localStorage.getItem('vaanjay_comments') || '[]')
      comments.push({ id: 'c_' + Date.now(), post_id: postId, username: user?.username, text, created_at: new Date().toISOString() })
      localStorage.setItem('vaanjay_comments', JSON.stringify(comments))
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, comment_count: (p.comment_count || 0) + 1 } : p))
    } catch {}
    setCommentTexts(prev => ({ ...prev, [postId]: '' }))
  }

  const openStoryModal = () => {
    setStoryModal(true)
    setTimeout(() => storyInputRef.current?.click(), 100)
  }

  const handleStoryFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setStoryFile(f)
    const reader = new FileReader()
    reader.onload = (ev) => setStoryPreview(ev.target?.result as string)
    reader.readAsDataURL(f)
  }

  const postStory = async () => {
    if (!storyFile || !user) return
    try {
      const fd = new FormData()
      fd.append('media', storyFile)
      fd.append('text', storyText)
      const token = localStorage.getItem('vaanjay_token') || localStorage.getItem('access_token')
      await fetch('http://localhost:8080/api/v1/stories', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      })
    } catch {
      // Save locally
      const localStory = {
        id: 'story_' + Date.now(),
        full_name: user.full_name || user.username,
        username: user.username,
        text: storyText,
        media_url: storyPreview,
        created_at: new Date().toISOString(),
      }
      const existing = JSON.parse(localStorage.getItem('vaanjay_stories') || '[]')
      const now = Date.now()
      const valid = existing.filter((s: any) => now - new Date(s.created_at).getTime() < 86400000)
      valid.push(localStory)
      localStorage.setItem('vaanjay_stories', JSON.stringify(valid))
      setStories(valid)
    }
    setStoryModal(false)
    setStoryFile(null)
    setStoryPreview('')
    setStoryText('')
  }

  return (
    <div className="pb-8">
      {/* Stories row */}
      <div className="flex gap-4 overflow-x-auto px-4 py-4 border-b border-border scrollbar-hide">
        <div onClick={openStoryModal} className="flex flex-col items-center gap-1 flex-shrink-0 cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-border p-0.5">
            <div className="w-full h-full rounded-full bg-surface-secondary flex items-center justify-center">
              <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
          </div>
          <span className="text-xs text-text-secondary">Your Story</span>
        </div>
        {stories.map((story, i) => (
          <div key={story.id} className="flex flex-col items-center gap-1 flex-shrink-0 relative group">
            <div onClick={() => { setViewingStory(stories); setStoryIndex(i) }} className="cursor-pointer">
              <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5">
                <div className="w-full h-full rounded-full bg-white p-0.5">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold">
                    {story.username?.charAt(0) || 'U'}
                  </div>
                </div>
              </div>
            </div>
            <span className="text-xs text-text-secondary truncate w-16 text-center">@{story.username}</span>
            {story.username === user?.username && (
              <button onClick={() => { if (confirm('Delete this story?')) deleteStory(story.id) }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Feed posts */}
      <div className="divide-y divide-border">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)
        ) : posts.length === 0 && (
          <div className="px-4 py-16 text-center text-text-secondary text-sm">No posts yet. Follow people to see their posts here.</div>
        )}
        {posts.map(post => {
          const isLiked = likedPosts.has(post.id)
          const isSaved = savedPosts.has(post.id)
          return (
            <div key={post.id} className="py-3">
              <div className="flex items-center gap-3 px-4 mb-2">
                <Link href={`/${post.username}`} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {post.username?.charAt(0) || 'U'}
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/${post.username}`} className="font-semibold text-sm text-text-primary hover:underline">
                    @{post.username}
                  </Link>
                  {post.is_verified && (
                    <VerifiedBadge type={post.verification_type || 'blue'} size={14} />
                  )}
                  {post.location && (
                    <span className="text-xs text-text-secondary block">{post.location}</span>
                  )}
                </div>
                <button className="text-text-secondary hover:text-text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                </button>
              </div>

              <div className="bg-surface-secondary">
                {post.media_url ? (
                  <div className="aspect-square border-t border-b border-border overflow-hidden">
                    <img src={post.media_url} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-square flex items-center justify-center text-text-muted text-sm border-t border-b border-border">
                    [Photo]
                  </div>
                )}
              </div>

              {post.poll?.options?.length >= 2 && (
                <div className="px-4 py-3 space-y-2">
                  <p className="text-xs font-semibold text-text-muted uppercase">Poll</p>
                  {post.poll.options.map((opt: string, i: number) => {
                    const votes = post.poll.votes || {}
                    const total = Object.keys(votes).length
                    const count = Object.values(votes).filter(v => v === opt).length
                    const pct = total > 0 ? Math.round((count / total) * 100) : 0
                    const voted = post.poll._myVote === opt
                    return (
                      <button key={i} onClick={() => {
                        if (post.poll._myVote) return
                        const allPosts = JSON.parse(localStorage.getItem('vaanjay_posts') || '[]')
                        const target = allPosts.find((p: any) => p.id === post.id)
                        if (target?.poll) {
                          if (!target.poll.votes) target.poll.votes = {}
                          target.poll.votes[user?.username || 'anon'] = opt
                          target.poll._myVote = opt
                          localStorage.setItem('vaanjay_posts', JSON.stringify(allPosts))
                          const postsCopy = [...posts]
                          const idx = postsCopy.findIndex(p => p.id === post.id)
                          if (idx >= 0) { postsCopy[idx] = { ...target, poll: { ...target.poll } }; setPosts(postsCopy) }
                        }
                      }}
                        className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${voted ? 'bg-primary/10 border-primary text-primary font-semibold' : 'bg-surface-secondary border-border text-text-primary hover:border-primary'}`}>
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {total > 0 && <span className="text-xs text-text-muted">{pct}%</span>}
                        </div>
                        {total > 0 && (
                          <div className="mt-1 h-1.5 bg-surface-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all" style={{ width: pct + '%' }} />
                          </div>
                        )}
                      </button>
                    )
                  })}
                  <p className="text-xs text-text-muted">{Object.keys(post.poll.votes || {}).length} votes</p>
                </div>
              )}

              <div className="flex items-center gap-4 px-4 pt-3 pb-1">
                <button onClick={() => toggleLike(post.id)} className="transition-colors">
                  <svg className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-text-primary'}`} fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button className="text-text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </button>
                <button className="text-text-primary">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </button>
                <button onClick={() => toggleSave(post.id)} className="ml-auto transition-colors">
                  <svg className={`w-6 h-6 ${isSaved ? 'text-text-primary fill-current' : 'text-text-primary'}`} fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>

              <div className="px-4 pt-1">
                <span className="text-sm font-semibold text-text-primary">
                  {post.like_count + (isLiked ? 1 : 0)} likes
                </span>
              </div>

              <div className="px-4 mt-1">
                <p className="text-sm">
                  <Link href={`/${post.username}`} className="font-semibold text-text-primary hover:underline mr-1">
                    @{post.username}
                  </Link>
                  <span className="text-text-primary">{linkifyText(post.caption)}</span>
                </p>
              </div>

              <div className="px-4 mt-1">
                <button className="text-xs text-text-muted">
                  View all {post.comment_count} comments
                </button>
              </div>

              <div className="px-4 mt-1">
                <span className="text-xs text-text-muted uppercase tracking-wider">
                  {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="px-4 mt-2 pt-2 border-t border-border flex items-center gap-2">
                <input type="text" placeholder="Add a comment..." value={commentTexts[post.id] || ''}
                  onChange={e => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                  onKeyDown={e => { if (e.key === 'Enter') postComment(post.id) }}
                  className="flex-1 text-sm text-text-primary placeholder-text-muted bg-transparent focus:outline-none py-1" />
                <button onClick={() => postComment(post.id)} disabled={!commentTexts[post.id]?.trim()}
                  className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors disabled:opacity-30">
                  Post
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Story creation modal */}
      {storyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setStoryModal(false); setStoryFile(null); setStoryPreview(''); setStoryText('') }}>
          <div className="bg-white rounded-xl max-w-sm w-full mx-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">Create Story</span>
              <button onClick={() => { setStoryModal(false); setStoryFile(null); setStoryPreview(''); setStoryText('') }}
                className="text-text-secondary hover:text-text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-4">
              <div onClick={() => storyInputRef.current?.click()}
                className="aspect-[9/16] max-h-96 bg-surface-secondary rounded-lg flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity overflow-hidden border border-border">
                {storyPreview ? (
                  <img src={storyPreview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg className="w-10 h-10 text-text-muted mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="text-sm text-text-muted">Select photo</p>
                  </div>
                )}
              </div>
              <input ref={storyInputRef} type="file" accept="image/*" className="hidden" onChange={handleStoryFile} />
              {storyPreview && (
                <textarea value={storyText} onChange={e => setStoryText(e.target.value)}
                  placeholder="Add text overlay..."
                  className="w-full mt-3 px-3 py-2 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm resize-none h-16" />
              )}
            </div>
            {storyPreview && (
              <div className="px-4 pb-4">
                <button onClick={postStory}
                  className="w-full py-2.5 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                  Share to Story
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Story viewer */}
      {viewingStory && viewingStory[storyIndex] && (
        <div className="fixed inset-0 z-50 bg-black" onClick={() => setViewingStory(null)}>
          <div className="relative w-full h-full flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
              {viewingStory.map((_: any, i: number) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
                  <div className={`h-full bg-white rounded transition-all duration-300 ${i < storyIndex ? 'w-full' : i === storyIndex ? 'w-full animate-pulse' : 'w-0'}`} />
                </div>
              ))}
            </div>

            <div className="absolute top-4 left-4 z-10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold border-2 border-white">
                {viewingStory[storyIndex].username?.charAt(0) || 'U'}
              </div>
              <div>
                <p className="text-white text-sm font-semibold">@{viewingStory[storyIndex].username}</p>
                <p className="text-white/60 text-xs">
                  {new Date(viewingStory[storyIndex].created_at).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            <button onClick={() => setViewingStory(null)}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {viewingStory[storyIndex].username === user?.username && (
              <button onClick={() => { if (confirm('Delete this story?')) deleteStory(viewingStory[storyIndex].id) }}
                className="absolute top-16 right-4 z-10 text-white/50 hover:text-red-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            )}

            {viewingStory[storyIndex].media_url && (
              <img src={viewingStory[storyIndex].media_url} alt="" className="w-full h-full object-contain" />
            )}

            {viewingStory[storyIndex].text && (
              <div className="absolute bottom-20 left-4 right-4 z-10 text-center">
                <p className="text-white text-lg font-semibold drop-shadow-lg">{viewingStory[storyIndex].text}</p>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2">
              <input type="text" placeholder="Send message..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/30 border border-white/20" />
              <button className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>

          <button onClick={() => setStoryIndex(i => Math.max(0, i - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white disabled:opacity-20"
            disabled={storyIndex === 0}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setStoryIndex(i => Math.min(viewingStory.length - 1, i + 1))}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/50 hover:text-white disabled:opacity-20"
            disabled={storyIndex === viewingStory.length - 1}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}
