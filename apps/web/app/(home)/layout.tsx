'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { useTheme } from '@/components/ThemeProvider'
import { useI18n } from '@/hooks/useI18n'
import { useWebSocket } from '@/hooks/useWebSocket'

const NAV_ITEMS = [
  { label: 'feed', href: '/feed', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'explore', href: '/explore', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
  { label: 'communities', href: '/communities', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'messages', href: '/messages', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { label: 'vibez', href: '/vibez', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z' },
  { label: 'notifications', href: '/notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { label: 'create', href: '/create', icon: 'M12 4v16m8-8H4' },
  { label: 'earnings', href: '/earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'collections', href: '/collections', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { label: 'audio-rooms', href: '/audio-rooms', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
  { label: 'channels', href: '/channels', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { label: 'events', href: '/events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'settings', href: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
]

export default function HomeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { t, lang, isTamil } = useI18n()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [notifCount, setNotifCount] = useState(0)

  useWebSocket((event: any) => {
    if (event.type === 'notification' || event.type === 'message') {
      try {
        const raw = localStorage.getItem('vaanjay_notifications')
        if (raw) setNotifCount(JSON.parse(raw).filter((n: any) => !n.read).length)
      } catch {}
    }
  })

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaanjay_notifications')
      if (raw) {
        const all = JSON.parse(raw)
        setNotifCount(all.filter((n: any) => !n.read).length)
      }
    } catch {}
    const interval = setInterval(() => {
      try {
        const raw = localStorage.getItem('vaanjay_notifications')
        if (raw) {
          setNotifCount(JSON.parse(raw).filter((n: any) => !n.read).length)
        }
      } catch {}
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) router.push(`/explore?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="flex justify-center">
        {/* Left sidebar */}
        <aside className="w-72 border-r border-border min-h-screen hidden lg:block sticky top-0 self-start max-h-screen overflow-y-auto" style={{ backgroundColor: 'var(--background)' }}>
          <div className="p-6 pb-4">
            <Link href="/feed" className="text-2xl font-bold text-primary">VAANJAY</Link>
          </div>
          <nav className="px-3 space-y-0.5">
            {NAV_ITEMS.map(item => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${
                    isActive ? 'bg-primary/10 text-primary font-bold' : 'text-text-primary font-medium hover:bg-surface-hover'
                  }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={isActive ? 2.5 : 1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{t('nav.' + item.label)}</span>
                  {item.label === 'notifications' && notifCount > 0 && (
                    <span className="ml-auto bg-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {notifCount > 99 ? '99+' : notifCount}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="p-3 mt-4 border-t border-border space-y-1">
            {user && (
              <Link href={`/${user.username}`} className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-hover rounded-xl transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {user.username?.charAt(0) || 'U'}
                </div>
                <span className="truncate">@{user.username}</span>
              </Link>
            )}
            <div className="flex items-center gap-2 px-4 py-1.5">
              <button onClick={toggleTheme}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer focus:outline-none p-0.5 flex ${theme === 'dark' ? 'bg-primary' : 'bg-border'}`}>
                <span className={`w-5 h-5 bg-[#FFF] rounded-full shadow transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs text-text-secondary">{theme === 'dark' ? 'Dark' : 'Light'}</span>
            </div>
            {user && (
              <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium rounded-xl transition-colors" style={{ color: '#DC2626' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                <span>{t('nav.logout')}</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 max-w-2xl border-x border-border min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          {children}
        </main>

        {/* Right sidebar */}
        <aside className="w-80 border-l border-border min-h-screen hidden xl:block sticky top-0 self-start max-h-screen overflow-y-auto p-4" style={{ backgroundColor: 'var(--background)' }}>
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border)' }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input type="text" placeholder={t('nav.search')} value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ color: 'var(--text-primary)' }}
                className="flex-1 text-sm bg-transparent placeholder-text-muted focus:outline-none" />
            </div>
          </form>

          {/* Trending */}
          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'var(--surface-secondary)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{isTamil ? 'போக்குகள்' : 'Trending'}</p>
            <div className="space-y-3">
              {[
                { tag: '#Kollywood', posts: '12.4K' },
                { tag: '#Chennai', posts: '8.2K' },
                { tag: '#Pongal', posts: '6.7K' },
                { tag: '#TamilMemes', posts: '5.1K' },
                { tag: '#Madurai', posts: '3.9K' },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/explore/tags/${t.tag.slice(1)}`)}
                  className="w-full text-left hover:opacity-80 transition-opacity">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.tag}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.posts} posts</p>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested users */}
          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'var(--surface-secondary)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{isTamil ? 'பரிந்துரைகள்' : 'Suggestions'}</p>
            <div className="space-y-3">
              {['kollywood_star', 'tamil_news', 'chennai_culture', 'tamil_memes', 'district_updates'].map((u, i) => (
                <Link key={i} href={`/${u}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: 'var(--primary)' }}>
                    {u.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm truncate" style={{ color: 'var(--text-primary)' }}>@{u}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User info */}
          <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface-secondary)' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{isTamil ? 'உங்கள் மாவட்டம் & மொழி' : 'Your District & Language'}</p>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {isTamil ? 'மாவட்டம்' : 'District'}: <span style={{ color: 'var(--text-muted)' }}>{user?.district || (isTamil ? 'தேர்ந்தெடுக்கவும்' : 'Not set')}</span>
              </p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {isTamil ? 'மொழி' : 'Language'}: <span style={{ color: 'var(--text-muted)' }}>{isTamil ? 'தமிழ்' : 'English'}</span>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
