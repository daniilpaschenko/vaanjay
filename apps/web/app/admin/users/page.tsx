'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import api from '@/lib/api'

interface UserData {
  id: string; username: string; email: string; full_name: string
  is_admin: boolean; is_verified: boolean; district?: string
  language_preference?: string; created_at?: string
  followers_count?: number; following_count?: number; post_count?: number
  is_suspended?: boolean; warn_count?: number; verification_type?: string
}

export default function AdminUsersPage() {
  const searchParams = useSearchParams()
  const [users, setUsers] = useState<UserData[]>([])
  const [search, setSearch] = useState(searchParams?.get('search') || '')
  const [message, setMessage] = useState('')
  const [viewUserPosts, setViewUserPosts] = useState<string | null>(null)
  const [userPosts, setUserPosts] = useState<any[]>([])
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const loadUsers = () => {
    try {
      const raw = localStorage.getItem('vaanjay_users')
      if (raw) {
        const local: any[] = JSON.parse(raw)
        const mapped = local.map((u: any) => ({
          id: u.id || '', username: u.username || '', email: u.email || '',
          full_name: u.full_name || '', is_admin: u.is_admin || false,
          is_verified: u.is_verified || false, district: u.district || '',
          language_preference: u.language_preference || 'ta',
          created_at: u.created_at || new Date().toISOString(),
          followers_count: 0, following_count: 0, post_count: 0,
          is_suspended: u.is_suspended || false, warn_count: u.warn_count || 0,
          verification_type: u.verification_type || 'blue',
        }))
        const filtered = search ? mapped.filter(u =>
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.full_name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
        ) : mapped
        setUsers(filtered)
      }
    } catch {}
  }

  useEffect(() => { loadUsers() }, [search])

  const updateUser = (id: string, updates: any) => {
    try {
      const raw = localStorage.getItem('vaanjay_users')
      if (!raw) return
      let all = JSON.parse(raw)
      const idx = all.findIndex((u: any) => u.id === id)
      if (idx < 0) return
      all[idx] = { ...all[idx], ...updates }
      localStorage.setItem('vaanjay_users', JSON.stringify(all))
      loadUsers()
    } catch {}
  }

  const adminAction = (id: string, action: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_users')
      if (!raw) return
      let all = JSON.parse(raw)
      const idx = all.findIndex((u: any) => u.id === id)
      if (idx < 0) return
      const user = all[idx]

      switch (action) {
        case 'warn':
          user.warn_count = (user.warn_count || 0) + 1
          setMessage(`Warning sent to ${user.full_name || user.username}`)
          break
        case 'suspend':
          user.is_suspended = !user.is_suspended
          setMessage(user.is_suspended ? `${user.full_name || user.username} suspended` : `${user.full_name || user.username} unsuspended`)
          break
        case 'promote':
          user.is_admin = true
          setMessage(`${user.full_name || user.username} promoted to admin`)
          break
        case 'demote':
          if (user.username === 'admin') { setMessage('Cannot demote super admin'); return }
          user.is_admin = false
          setMessage(`${user.full_name || user.username} demoted to user`)
          break
        case 'verify':
          user.is_verified = !user.is_verified
          user.verification_type = user.is_verified ? 'blue' : undefined
          setMessage(user.is_verified ? `${user.full_name || user.username} verified` : `${user.full_name || user.username} unverified`)
          break
        case 'force_logout':
          user.token_invalidated = true
          setMessage(`${user.full_name || user.username} forced logout - all sessions invalidated`)
          break
        case 'delete_account':
          all.splice(idx, 1)
          setMessage(`${user.full_name || user.username} account deleted permanently`)
          // Also remove their posts
          try {
            const postsRaw = localStorage.getItem('vaanjay_posts')
            if (postsRaw) {
              let posts = JSON.parse(postsRaw)
              posts = posts.filter((p: any) => p.username !== user.username)
              localStorage.setItem('vaanjay_posts', JSON.stringify(posts))
            }
          } catch {}
          break
      }
      localStorage.setItem('vaanjay_users', JSON.stringify(all))
      loadUsers()
      setTimeout(() => setMessage(''), 4000)
    } catch {}
  }

  const viewPosts = (username: string) => {
    try {
      const postsRaw = localStorage.getItem('vaanjay_posts')
      if (postsRaw) {
        const all = JSON.parse(postsRaw)
        setUserPosts(all.filter((p: any) => p.username === username))
      } else {
        setUserPosts([])
      }
      setViewUserPosts(username)
    } catch { setUserPosts([]); setViewUserPosts(username) }
  }

  const deletePost = (postId: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_posts')
      if (!raw) return
      let all = JSON.parse(raw)
      all = all.filter((p: any) => p.id !== postId)
      localStorage.setItem('vaanjay_posts', JSON.stringify(all))
      setUserPosts(all.filter((p: any) => p.username === viewUserPosts))
      setMessage('Post deleted')
      setTimeout(() => setMessage(''), 3000)
    } catch {}
  }

  const BadgeCell = ({ verified, type }: { verified: boolean; type?: string }) => {
    if (!verified) return <span className="text-xs text-text-muted">-</span>
    const label = type === 'gold' ? 'Gold' : type === 'official' ? 'Official' : 'Blue'
    const colors = type === 'gold' ? 'bg-amber-50 text-amber-600 border-amber-200' : type === 'official' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-primary/10 text-primary border-primary/20'
    return <span className={'px-2 py-0.5 rounded text-xs font-medium ' + colors}>{label}</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-primary">Users ({users.length})</h1>
        <input type="text" placeholder="Search users..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary w-64" />
      </div>

      {message && (
        <div className="mb-4 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary font-medium">{message}</div>
      )}

      {confirmDelete && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm font-medium text-error mb-3">Permanently delete this user account and all their posts?</p>
          <div className="flex gap-2">
            <button onClick={() => { adminAction(confirmDelete, 'delete_account'); setConfirmDelete(null) }}
              className="px-4 py-2 bg-error text-white rounded-lg text-sm font-medium hover:opacity-90">Delete Permanently</button>
            <button onClick={() => setConfirmDelete(null)}
              className="px-4 py-2 border border-border text-text-primary rounded-lg text-sm font-medium hover:bg-surface-hover">Cancel</button>
          </div>
        </div>
      )}

      {/* User posts modal */}
      {viewUserPosts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setViewUserPosts(null)}>
          <div className="bg-white rounded-xl border border-border w-full max-w-lg max-h-[80vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-text-primary">Posts by @{viewUserPosts}</h3>
              <button onClick={() => setViewUserPosts(null)} className="text-text-secondary hover:text-text-primary p-1"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-4 space-y-3">
              {userPosts.length === 0 && <p className="text-sm text-text-muted text-center py-4">No posts by this user</p>}
              {userPosts.map((p: any) => (
                <div key={p.id} className="flex gap-3 p-3 border border-border rounded-lg">
                  {p.media_url && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-secondary">
                      {p.media_url.startsWith('data:video') || p.type === 'vibez' ? (
                        <video src={p.media_url} className="w-full h-full object-cover" />
                      ) : (
                        <img src={p.media_url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary line-clamp-2">{p.caption || '(no caption)'}</p>
                    <p className="text-xs text-text-muted mt-1">
                      {new Date(p.created_at || p.createdAt).toLocaleDateString()}
                      {p.type === 'vibez' && <span className="ml-2 text-primary font-medium">Vibez</span>}
                      {p.tags?.length > 0 && <span className="ml-2">Tags: {p.tags.join(', ')}</span>}
                    </p>
                  </div>
                  <button onClick={() => deletePost(p.id)} className="text-error/60 hover:text-error p-1 flex-shrink-0 self-start">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left p-3 font-medium">User</th>
                <th className="text-left p-3 font-medium">Contact</th>
                <th className="text-center p-3 font-medium">Role</th>
                <th className="text-center p-3 font-medium">Status</th>
                <th className="text-center p-3 font-medium">Badge</th>
                <th className="text-center p-3 font-medium">District</th>
                <th className="text-center p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className={`border-b border-border/50 hover:bg-surface-hover ${u.is_suspended ? 'bg-red-50/30' : ''}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.full_name?.charAt(0) || u.username?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{u.full_name || u.username}</p>
                        <p className="text-xs text-text-muted">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-text-secondary text-xs">{u.email}</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.is_admin ? 'bg-primary/10 text-primary' : 'bg-surface-secondary text-text-secondary'}`}>
                      {u.is_admin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    {u.is_suspended ? (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-error">Suspended</span>
                    ) : u.warn_count && u.warn_count > 0 ? (
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-600">{u.warn_count} warning{u.warn_count > 1 ? 's' : ''}</span>
                    ) : (
                      <span className="text-xs text-text-muted">Active</span>
                    )}
                  </td>
                  <td className="p-3 text-center">
                    <BadgeCell verified={u.is_verified} type={u.verification_type} />
                  </td>
                  <td className="p-3 text-center text-text-secondary text-xs">{u.district || '-'}</td>
                  <td className="p-3 text-center">
                    <div className="flex gap-1 justify-center flex-wrap">
                      <button onClick={() => adminAction(u.id, 'warn')} className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded border border-amber-200 font-medium hover:bg-amber-100" title="Send warning">Warn</button>
                      <button onClick={() => adminAction(u.id, 'suspend')} className={`px-2 py-1 text-xs rounded border font-medium ${u.is_suspended ? 'bg-green-50 text-success border-green-200 hover:bg-green-100' : 'bg-red-50 text-error border-red-200 hover:bg-red-100'}`}>
                        {u.is_suspended ? 'Unsuspend' : 'Suspend'}
                      </button>
                      <button onClick={() => adminAction(u.id, u.is_admin ? 'demote' : 'promote')} className="px-2 py-1 text-xs bg-surface-secondary text-text-secondary rounded border border-border hover:bg-surface-hover font-medium">
                        {u.is_admin ? 'Demote' : 'Promote'}
                      </button>
                      <button onClick={() => adminAction(u.id, 'force_logout')} className="px-2 py-1 text-xs bg-orange-50 text-orange-600 rounded border border-orange-200 font-medium hover:bg-orange-100" title="Force logout all sessions">Logout</button>
                      <button onClick={() => viewPosts(u.username)} className="px-2 py-1 text-xs bg-primary/5 text-primary rounded border border-primary/20 font-medium hover:bg-primary/10">Posts</button>
                      <button onClick={() => setConfirmDelete(u.id)} className="px-2 py-1 text-xs bg-red-50 text-error rounded border border-red-200 font-medium hover:bg-red-100">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-text-secondary text-sm">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
