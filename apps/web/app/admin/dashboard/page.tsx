'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api'

export default function AdminDashboardPage() {
  const [data, setData] = useState({
    total_users: 0, total_posts: 0, total_vibez: 0,
    dau: 0, mau: 0, active_calls: 0, total_dms: 0,
    active_users_today: 0, pending_reports: 0, revenue_this_month: 0,
    growth: { users: 0, posts: 0, vibez: 0, revenue: 0 },
    users_chart: [4, 7, 5, 12, 8, 15, 10, 18, 14, 22, 20, 25],
    posts_chart: [10, 8, 15, 12, 20, 18, 25, 22, 30, 28, 35, 32],
    language_distribution: { ta: 0, en: 0, hi: 0 },
    top_users: [],
  })

  useEffect(() => {
    api.get('/admin/stats').then(r => {
      if (r.data?.data && !Array.isArray(r.data.data)) { setData(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const users = JSON.parse(localStorage.getItem('vaanjay_users') || '[]')
        const posts = JSON.parse(localStorage.getItem('vaanjay_posts') || '[]')
        const reports = JSON.parse(localStorage.getItem('vaanjay_reports') || '[]')
        const vibez = posts.filter((p: any) => p.type === 'vibez')
        const langCount: any = { ta: 0, en: 0 }
        users.forEach((u: any) => {
          const l = u.language_preference || 'ta'
          langCount[l] = (langCount[l] || 0) + 1
        })
        setData(prev => ({
          ...prev,
          total_users: users.length,
          total_posts: posts.length,
          total_vibez: vibez.length,
          dau: Math.min(users.length, 5),
          mau: users.length,
          active_calls: 0,
          total_dms: 0,
          active_users_today: Math.min(users.length, 3),
          pending_reports: reports.filter((r: any) => r.status === 'pending').length,
          language_distribution: langCount,
          top_users: users.slice(0, 5).map((u: any) => ({
            id: u.id, full_name: u.full_name || u.username,
            username: u.username, is_verified: u.is_verified,
            verification_type: u.verification_type,
            post_count: posts.filter((p: any) => p.username === u.username).length,
            followers_count: 0,
          })),
        }))
      } catch {}
    })
  }, [])

  const maxChart = Math.max(...data.users_chart, 1)
  const maxPosts = Math.max(...data.posts_chart, 1)
  const langTotal = Object.values(data.language_distribution).reduce((a: any, b: any) => a + b, 0) || 1

  return (
    <div>
      <h1 className="text-lg font-bold text-text-primary mb-4">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Users', value: data.total_users, icon: 'users', change: `+${data.growth.users}%` },
          { label: 'DAU', value: data.dau, icon: 'activity', change: '' },
          { label: 'MAU', value: data.mau, icon: 'calendar', change: '' },
          { label: 'Total Posts', value: data.total_posts, icon: 'file-text', change: `+${data.growth.posts}%` },
          { label: 'Total Vibez', value: data.total_vibez, icon: 'video', change: `+${data.growth.vibez}%` },
          { label: 'Active Calls', value: data.active_calls, icon: 'phone', change: '' },
          { label: 'DM Messages', value: data.total_dms, icon: 'message-square', change: '' },
          { label: 'Revenue', value: `Rs${data.revenue_this_month}`, icon: 'dollar-sign', change: `+${data.growth.revenue}%` },
        ].map((card, i) => (
          <div key={i} className="bg-white border border-border rounded-xl p-4">
            <p className="text-xs text-text-muted mb-1">{card.label}</p>
            <p className="text-xl font-bold text-text-primary">{card.value.toLocaleString?.() || card.value}</p>
            {card.change && <p className="text-xs text-green-600 mt-0.5">{card.change}</p>}
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* User growth bar chart */}
        <div className="bg-white border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">User Growth (months)</h3>
          <div className="flex items-end gap-1 h-24">
            {data.users_chart.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-primary/20 rounded-t" style={{ height: `${(v / maxChart) * 100}%`, minHeight: '4px' }}>
                  <div className="w-full bg-primary rounded-t" style={{ height: '60%' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-text-muted">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>

        {/* Content posted bar chart */}
        <div className="bg-white border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Content Posted (months)</h3>
          <div className="flex items-end gap-1 h-24">
            {data.posts_chart.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-blue-100 rounded-t" style={{ height: `${(v / maxPosts) * 100}%`, minHeight: '4px' }}>
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: '60%' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 text-xs text-text-muted">
            <span>Jan</span><span>Jun</span><span>Dec</span>
          </div>
        </div>

        {/* Language distribution pie chart */}
        <div className="bg-white border border-border rounded-xl p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Language Distribution</h3>
          <div className="flex items-center gap-4">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {(() => {
                const segments = Object.entries(data.language_distribution).filter(([_, v]) => (v as number) > 0)
                const colors = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']
                let offset = 0
                const total = segments.reduce((s, [_, v]) => s + (v as number), 0) || 1
                return segments.map(([lang, count], i) => {
                  const pct = (count as number) / total
                  const dash = pct * 251.2
                  const el = (
                    <circle key={lang} cx="50" cy="50" r="40" fill="none" stroke={colors[i % colors.length]} strokeWidth="16"
                      strokeDasharray={`${dash} ${251.2 - dash}`} strokeDashoffset={-offset} transform="rotate(-90 50 50)" />
                  )
                  offset += 251.2 - dash
                  return el
                })
              })()}
              <text x="50" y="55" textAnchor="middle" className="text-xs font-bold" fill="currentColor">{langTotal} users</text>
            </svg>
            <div className="space-y-1.5">
              {Object.entries(data.language_distribution).filter(([_, v]) => (v as number) > 0).map(([lang, count], i) => {
                const colors = ['#2563EB', '#10B981', '#F59E0B']
                const pct = ((count as number) / langTotal * 100).toFixed(0)
                return (
                  <div key={lang} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[i % colors.length] }} />
                    <span className="text-xs text-text-secondary">{lang === 'ta' ? 'Tamil' : lang === 'en' ? 'English' : lang === 'hi' ? 'Hindi' : lang} ({pct}%)</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Link href="/admin/users" className="bg-white border border-border rounded-xl p-4 hover:border-primary transition-colors">
          <p className="text-sm font-semibold text-text-primary">User Management</p>
          <p className="text-xs text-text-muted mt-1">{data.total_users} users</p>
        </Link>
        <Link href="/admin/content" className="bg-white border border-border rounded-xl p-4 hover:border-primary transition-colors">
          <p className="text-sm font-semibold text-text-primary">Content Moderation</p>
          <p className="text-xs text-text-muted mt-1">{data.total_posts} posts, {data.pending_reports} reports</p>
        </Link>
        <Link href="/admin/verification-requests" className="bg-white border border-border rounded-xl p-4 hover:border-primary transition-colors">
          <p className="text-sm font-semibold text-text-primary">Verification</p>
          <p className="text-xs text-text-muted mt-1">Blue/Gold/Official badges</p>
        </Link>
        <Link href="/admin/settings" className="bg-white border border-border rounded-xl p-4 hover:border-primary transition-colors">
          <p className="text-sm font-semibold text-text-primary">Settings</p>
          <p className="text-xs text-text-muted mt-1">App configuration</p>
        </Link>
      </div>

      {/* Top users */}
      <div className="bg-white border border-border rounded-xl p-4">
        <h2 className="text-sm font-semibold text-text-primary mb-3">Top Users</h2>
        {data.top_users?.length > 0 ? (
          <div className="divide-y divide-border">
            {data.top_users.map((u: any, i: number) => (
              <div key={u.id || i} className="flex items-center gap-3 py-2">
                <span className="w-5 h-5 rounded-full bg-surface-secondary flex items-center justify-center text-xs text-text-muted font-medium">{i + 1}</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {u.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary font-medium truncate">
                    {u.full_name}
                    {u.is_verified && <span className="ml-1 text-primary text-xs">({u.verification_type || '✓'})</span>}
                  </p>
                  <p className="text-xs text-text-muted">{u.post_count || 0} posts</p>
                </div>
                <Link href={`/admin/users?search=${u.username}`} className="text-xs text-primary hover:underline">View</Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-text-muted text-center py-4">No registered users yet</p>
        )}
      </div>
    </div>
  )
}
