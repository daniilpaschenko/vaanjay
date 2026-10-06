'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'
import { VerifiedBadge } from '@vaanjay/ui'
import { ProfileSkeleton } from '@/components/Skeleton'
import { getGamification, getLevelProgress, BADGES } from '@/lib/gamification'

export default function UserProfilePage() {
  const { username } = useParams()
  const { user: currentUser } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('posts')
  const [isFollowing, setIsFollowing] = useState(false)
  const [closeFriends, setCloseFriends] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('vaanjay_close_friends') || '[]') } catch { return [] }
  })
  const [showCloseFriends, setShowCloseFriends] = useState(false)

  useEffect(() => {
    try {
      const fRaw = localStorage.getItem('vaanjay_follows')
      if (fRaw) {
        const follows: string[] = JSON.parse(fRaw)
        setIsFollowing(follows.includes(username as string))
      }
    } catch {}
  }, [username])

  const toggleFollow = () => {
    try {
      const fRaw = localStorage.getItem('vaanjay_follows')
      const follows: string[] = fRaw ? JSON.parse(fRaw) : []
      const idx = follows.indexOf(username as string)
      if (idx >= 0) follows.splice(idx, 1)
      else follows.push(username as string)
      localStorage.setItem('vaanjay_follows', JSON.stringify(follows))
      setIsFollowing(!isFollowing)
    } catch {}
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('vaanjay_token')
        const headers: Record<string, string> = {}
        if (token) headers.Authorization = `Bearer ${token}`
        const res = await fetch(`http://localhost:8080/api/v1/users/${username}`, { headers })
        if (res.ok) {
          const data = await res.json()
          setProfile(data.data)
          setPosts(data.data.posts || [])
          setLoading(false)
          return
        }
      } catch {}
      try {
        const raw = localStorage.getItem('vaanjay_posts')
        if (raw) {
          const all = JSON.parse(raw)
          const userPosts = all.filter((p: any) => p.username === username)
          if (userPosts.length) setPosts(userPosts)
        }
      } catch {}
      try {
        const usersRaw = localStorage.getItem('vaanjay_users')
        if (usersRaw) {
          const all = JSON.parse(usersRaw)
          const found = all.find((u: any) => u.username === username)
          if (found) setProfile(found)
        }
      } catch {}
      setLoading(false)
    }
    fetchUser()
  }, [username])

  if (loading) return <ProfileSkeleton />

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="w-20 h-20 rounded-full bg-surface-secondary flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <p className="text-text-muted text-sm">User not found</p>
        <Link href="/feed" className="mt-4 text-sm text-primary hover:underline">Go to Feed</Link>
      </div>
    )
  }

  const isOwn = currentUser?.username === profile.username

  return (
    <div className="pb-8">
      <div className="p-4 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {profile.username?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-text-primary">@{profile.username}</h1>
              {profile.is_verified && (
                <VerifiedBadge type={profile.verification_type || 'blue'} size={18} />
              )}
            </div>
            {profile.bio && <p className="text-sm text-text-primary mt-1">{profile.bio}</p>}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {isOwn ? (
              <Link href="/edit-profile" className="px-4 py-1.5 border border-border text-text-primary rounded-lg text-sm font-medium hover:bg-surface-hover transition-colors">Edit Profile</Link>
            ) : (
              <>
                <button onClick={toggleFollow}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isFollowing ? 'bg-surface-secondary text-text-secondary border border-border' : 'bg-primary text-white'
                  }`}>
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <Link href={`/messages?user=${username}`} className="px-4 py-1.5 border border-border text-text-primary rounded-lg text-sm font-medium inline-block hover:bg-surface-hover">Message</Link>
                <Link href={`/call/${username}?type=audio`} className="px-3 py-1.5 border border-border text-text-primary rounded-lg text-sm hover:bg-surface-hover inline-block">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </Link>
                <Link href={`/call/${username}?type=video`} className="px-3 py-1.5 border border-border text-text-primary rounded-lg text-sm hover:bg-surface-hover inline-block">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-6 text-sm mt-4">
          <span className="text-text-primary"><strong>{posts.length}</strong> posts</span>
          <span className="text-text-primary"><strong>{profile.followers_count || 0}</strong> followers</span>
          <span className="text-text-primary"><strong>{profile.following_count || 0}</strong> following</span>
        </div>

        {/* Close Friends (own profile) */}
        {isOwn && (
          <div className="mt-3">
            <button onClick={() => setShowCloseFriends(!showCloseFriends)}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Close Friends ({closeFriends.length})
            </button>
            {showCloseFriends && (
              <div className="mt-2 bg-surface-secondary rounded-lg border border-border p-3">
                <input type="text" placeholder="Add username..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.target as HTMLInputElement).value.trim()) {
                      const val = (e.target as HTMLInputElement).value.trim()
                      if (!closeFriends.includes(val)) {
                        const updated = [...closeFriends, val]
                        setCloseFriends(updated)
                        localStorage.setItem('vaanjay_close_friends', JSON.stringify(updated))
                      }
                      (e.target as HTMLInputElement).value = ''
                    }
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-lg text-sm text-text-primary mb-2 focus:outline-none focus:border-primary" />
                {closeFriends.map(cf => (
                  <div key={cf} className="flex items-center justify-between text-sm text-text-primary py-1">
                    <span>@{cf}</span>
                    <button onClick={() => {
                      const updated = closeFriends.filter(c => c !== cf)
                      setCloseFriends(updated)
                      localStorage.setItem('vaanjay_close_friends', JSON.stringify(updated))
                    }} className="text-error text-xs">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gamification */}
        {(() => {
          const g = getGamification(profile.username)
          const { current, progress } = getLevelProgress(g.xp)
          return (
            <div className="mt-3 p-3 bg-surface-secondary rounded-lg border border-border">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">Level {g.level}</span>
                  <span className="text-xs text-text-muted">{g.label}</span>
                </div>
                <span className="text-xs text-text-muted">{g.xp} XP</span>
              </div>
              <div className="h-1.5 bg-surface border border-border rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: progress + '%' }} />
              </div>
              {g.badges.length > 0 && (
                <div className="flex gap-1 mt-2 flex-wrap">
                  {g.badges.map((bid: string) => {
                    const badge = BADGES.find(b => b.id === bid)
                    if (!badge) return null
                    return (
                      <span key={bid} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-semibold rounded-full" title={badge.description}>
                        {badge.icon} {badge.label}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })()}
      </div>

      <div className="flex border-b border-border">
        {['posts', 'vibez', 'saved'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {posts.length === 0 && (
          <div className="col-span-3 text-center py-16 text-text-secondary text-sm">
            {isOwn ? 'You haven\'t posted anything yet' : 'No posts yet'}
          </div>
        )}
        {posts.map((post: any) => (
          <Link key={post.id} href={`/${username}/post/${post.id}`}
            className="aspect-square bg-surface-secondary overflow-hidden hover:opacity-90 transition-opacity">
            {post.media_url && (
              <img src={post.media_url} alt="" className="w-full h-full object-cover" />
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
