'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { useAuth } from '@/components/AuthProvider'
import { NotificationsSkeleton } from '@/components/Skeleton'

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/notifications').then(r => {
      if (r.data?.data?.length) { setNotifications(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_notifications')
        if (raw) {
          const all = JSON.parse(raw)
          const updated = all.map((n: any) => ({ ...n, read: true }))
          localStorage.setItem('vaanjay_notifications', JSON.stringify(updated))
          setNotifications(updated)
        }
      } catch {}
      setLoading(false)
    })
  }, [])

  const filtered = activeFilter === 'all' ? notifications : notifications.filter(n => n.type === activeFilter)

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      case 'follow': return <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
      case 'comment': return <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
      case 'mention': return <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
      default: return <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
    }
  }

  if (loading) return <NotificationsSkeleton />

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-text-primary">Notifications</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex border-b border-border">
        {['all', 'like', 'follow', 'comment', 'mention'].map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`flex-1 py-3 text-xs font-medium text-center border-b-2 transition-colors ${
              activeFilter === f ? 'border-primary text-primary' : 'border-transparent text-text-secondary'
            }`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="divide-y divide-border">
        {filtered.length === 0 && (
          <div className="px-4 py-16 text-center text-text-secondary text-sm">
            <svg className="w-10 h-10 mx-auto mb-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            No notifications yet
          </div>
        )}
        {filtered.map((notif: any) => (
          <Link key={notif.id} href={notif.link || '#'}
            className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-secondary ${!notif.read ? 'bg-primary bg-opacity-5' : ''}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {notif.actor_name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary">
                <span className="font-semibold">@{notif.actor_name}</span>{' '}
                {notif.message}
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                {notif.created_at ? new Date(notif.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              {getIcon(notif.type)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
