'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { PostDetailSkeleton } from '@/components/Skeleton'

export default function PostDetailPage() {
  const { username, id } = useParams()
  const { user } = useAuth()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [commentInput, setCommentInput] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaanjay_comments')
      if (raw) {
        const all = JSON.parse(raw)
        setComments(all.filter((c: any) => c.post_id === id))
      }
    } catch {}
  }, [id])

  const postComment = () => {
    const text = commentInput.trim()
    if (!text) return
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        const idx = all.findIndex((p: any) => p.id === id)
        if (idx >= 0) {
          all[idx].comment_count = (all[idx].comment_count || 0) + 1
          localStorage.setItem('vaanjay_posts', JSON.stringify(all))
        }
      }
      const allComments = JSON.parse(localStorage.getItem('vaanjay_comments') || '[]')
      const c = { id: 'c_' + Date.now(), post_id: id, username: user?.username, text, created_at: new Date().toISOString() }
      allComments.push(c)
      localStorage.setItem('vaanjay_comments', JSON.stringify(allComments))
      setComments(prev => [...prev, c])
    } catch {}
    setCommentInput('')
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/v1/posts/${id}`)
        if (res.ok) {
          const data = await res.json()
          setPost(data.data)
          setLoading(false)
          return
        }
      } catch {}
      // Check localStorage
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        if (raw) {
          const all = JSON.parse(raw)
          const found = all.find((p: any) => p.id === id)
          if (found) setPost(found)
        }
      } catch {}
      setLoading(false)
    }
    fetchPost()
  }, [id])

  const deletePost = () => {
    if (!confirm('Delete this post?')) return
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        const filtered = all.filter((p: any) => p.id !== id)
        localStorage.setItem('vaanjay_posts', JSON.stringify(filtered))
      }
      router.push(`/${username}`)
    } catch {}
  }

  if (loading) return <PostDetailSkeleton />

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Post not found</h1>
          <Link href="/" className="text-primary text-sm font-medium hover:underline">Go Home</Link>
        </div>
      </div>
    )
  }

  const isOwner = user?.username === post.username || user?.username === username

  return (
    <div className="min-h-screen bg-white max-w-2xl mx-auto border-x border-border">
      <div className="p-3 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {post.username?.charAt(0) || 'U'}
        </div>
        <div className="flex-1">
          <Link href={`/${username}`} className="font-semibold text-sm text-text-primary hover:underline">
            @{post.username || username}
          </Link>
          {post.location && <p className="text-xs text-text-secondary">{post.location}</p>}
        </div>
        {isOwner && (
          <button onClick={deletePost} className="text-text-secondary hover:text-red-500 transition-colors" title="Delete post">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        )}
      </div>

      {post.media_url && (
        <div className="bg-surface-secondary">
          <img src={post.media_url} alt="" className="w-full max-h-[70vh] object-contain mx-auto" />
        </div>
      )}

      {post.poll?.options?.length >= 2 && (
        <div className="p-4 space-y-2 bg-surface-secondary">
          <p className="text-xs font-semibold text-text-muted uppercase">Poll</p>
          {post.poll.options.map((opt: string, i: number) => {
            const votes = post.poll.votes || {}
            const total = Object.keys(votes).length
            const count = Object.values(votes).filter((v: any) => v === opt).length
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            const hasVoted = post.poll._myVote || votes[user?.username || '']
            const voted = hasVoted === opt
            return (
              <button key={i} onClick={() => {
                if (hasVoted) return
                try {
                  const raw = localStorage.getItem('vaanjay_posts')
                  if (!raw) return
                  const all: any[] = JSON.parse(raw)
                  const target = all.find((p: any) => p.id === post.id)
                  if (target?.poll) {
                    if (!target.poll.votes) target.poll.votes = {}
                    const key = user?.username || 'anon'
                    target.poll.votes[key] = opt
                    target.poll._myVote = opt
                    localStorage.setItem('vaanjay_posts', JSON.stringify(all))
                    setPost({ ...post, poll: { ...target.poll } })
                  }
                } catch {}
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

      <div className="p-4 space-y-3">
        <div className="flex gap-4">
          <button onClick={() => setLiked(!liked)}
            className={`text-sm font-medium transition-colors flex items-center gap-1 ${liked ? 'text-red-500' : 'text-text-secondary hover:text-text-primary'}`}>
            <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {post.like_count > 0 ? post.like_count : ''}
          </button>
          <button className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            {post.comment_count > 0 ? post.comment_count : ''}
          </button>
          <button className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          </button>
        </div>

        {post.caption && (
          <p className="text-sm text-text-primary">
            <span className="font-semibold mr-1">@{post.username}</span>
            {post.caption}
          </p>
        )}

        {post.tags?.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-primary">#{tag}</span>
            ))}
          </div>
        )}

        <p className="text-xs text-text-muted uppercase tracking-wider">
          {post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
        </p>
      </div>

      {/* Comments */}
      <div className="border-t border-border p-4 space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Comments ({comments.length})</h3>
        {comments.length === 0 && (
          <p className="text-xs text-text-muted">No comments yet</p>
        )}
        {comments.map(c => (
          <div key={c.id} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
              {c.username?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm text-text-primary">
                <span className="font-semibold mr-1">@{c.username}</span>
                {c.text}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {new Date(c.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <input type="text" placeholder="Add a comment..." value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') postComment() }}
            className="flex-1 text-sm text-text-primary placeholder-text-muted bg-transparent focus:outline-none py-1" />
          <button onClick={postComment} disabled={!commentInput.trim()}
            className="text-xs font-semibold text-primary hover:text-primary-dark disabled:opacity-30">
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
