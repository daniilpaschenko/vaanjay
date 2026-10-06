'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function AdminContentPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filter, setFilter] = useState('all')
  const [message, setMessage] = useState('')

  useEffect(() => {
    api.get(`/admin/posts?filter=${filter}&limit=50`).then(r => {
      if (r.data?.data?.length) { setPosts(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        if (raw) {
          let all = JSON.parse(raw)
          if (filter !== 'all') all = all.filter((p: any) => p.type === filter || p.media_type === filter)
          setPosts(all)
        }
      } catch {}
    })
  }, [filter])

  const savePosts = (updated: any[]) => {
    localStorage.setItem('vaanjay_posts', JSON.stringify(updated))
    setPosts(updated)
  }

  const deletePost = (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        savePosts(all.filter((p: any) => p.id !== id))
      }
    } catch {}
  }

  const togglePin = (id: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        const idx = all.findIndex((p: any) => p.id === id)
        if (idx < 0) return
        all[idx].pinned_to_explore = !all[idx].pinned_to_explore
        savePosts(all)
        setMessage(all[idx].pinned_to_explore ? 'Pinned to Explore' : 'Unpinned from Explore')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch {}
  }

  const toggleFeatured = (id: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (raw) {
        const all = JSON.parse(raw)
        const idx = all.findIndex((p: any) => p.id === id)
        if (idx < 0) return
        all[idx].featured = !all[idx].featured
        savePosts(all)
        setMessage(all[idx].featured ? 'Marked as Featured' : 'Unmarked Featured')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-primary">Content Moderation ({posts.length})</h1>
        <div className="flex gap-2">
          {(['all', 'photo', 'video', 'vibez', 'text'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${filter === f ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary hover:bg-surface-hover'}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="mb-4 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary font-medium">{message}</div>
      )}

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left p-3 font-medium">Content</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Author</th>
                <th className="text-center p-3 font-medium">Likes</th>
                <th className="text-center p-3 font-medium">Date</th>
                <th className="text-center p-3 font-medium">Status</th>
                <th className="text-center p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post.id} className={`border-b border-border/50 hover:bg-surface-hover ${post.pinned_to_explore ? 'bg-primary/5' : ''}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      {post.media_url ? (
                        post.media_url.startsWith('data:video') || post.type === 'vibez' ? (
                          <video src={post.media_url} className="w-10 h-10 rounded object-cover flex-shrink-0" />
                        ) : (
                          <img src={post.media_url} alt="" className="w-10 h-10 rounded object-cover flex-shrink-0" />
                        )
                      ) : (
                        <div className="w-10 h-10 rounded bg-surface-secondary flex-shrink-0 flex items-center justify-center text-text-muted text-xs">{post.type === 'vibez' ? 'V' : 'P'}</div>
                      )}
                      <p className="text-text-primary truncate max-w-[200px]">{post.caption || 'No caption'}</p>
                    </div>
                  </td>
                  <td className="p-3 text-text-secondary capitalize">{post.type || 'post'}</td>
                  <td className="p-3 text-text-secondary">@{post.username || post.user_id?.slice(0, 8)}</td>
                  <td className="p-3 text-center text-text-secondary">{post.like_count || 0}</td>
                  <td className="p-3 text-center text-text-secondary text-xs">
                    {post.created_at ? new Date(post.created_at).toLocaleDateString() : '-'}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      {post.pinned_to_explore && <span className="text-xs font-medium text-primary">Pinned</span>}
                      {post.featured && <span className="text-xs font-medium text-amber-600">Featured</span>}
                      {!post.pinned_to_explore && !post.featured && <span className="text-xs text-text-muted">-</span>}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex gap-1 justify-center">
                      <button onClick={() => togglePin(post.id)}
                        className={`px-2 py-1 text-xs rounded border font-medium ${post.pinned_to_explore ? 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20' : 'bg-surface-secondary text-text-secondary border-border hover:bg-surface-hover'}`}>
                        {post.pinned_to_explore ? 'Unpin' : 'Pin'}
                      </button>
                      <button onClick={() => toggleFeatured(post.id)}
                        className={`px-2 py-1 text-xs rounded border font-medium ${post.featured ? 'bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100' : 'bg-surface-secondary text-text-secondary border-border hover:bg-surface-hover'}`}>
                        {post.featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button onClick={() => deletePost(post.id)}
                        className="px-2 py-1 text-xs bg-red-50 text-error rounded hover:bg-red-100 border border-red-200 font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary text-sm">No content found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
