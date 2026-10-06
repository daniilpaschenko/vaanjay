'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function AdminVerificationPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [tab, setTab] = useState<'requests' | 'manage'>('requests')

  useEffect(() => {
    api.get('/admin/verification-requests?status=pending').then(r => {
      if (r.data?.data?.length) { setRequests(r.data.data); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_verification_requests')
        if (raw) setRequests(JSON.parse(raw))
      } catch {}
    })
    try {
      const raw = localStorage.getItem('vaanjay_users')
      if (raw) setUsers(JSON.parse(raw))
    } catch {}
  }, [])

  const handleRequest = (id: string, action: 'approve' | 'reject', badgeType?: 'blue' | 'gold' | 'official') => {
    try {
      const raw = localStorage.getItem('vaanjay_verification_requests')
      if (raw) {
        const all = JSON.parse(raw)
        const filtered = all.filter((r: any) => r.id !== id)
        localStorage.setItem('vaanjay_verification_requests', JSON.stringify(filtered))
        setRequests(filtered)
      }
      if (action === 'approve' && badgeType) {
        const usersRaw = localStorage.getItem('vaanjay_users')
        if (usersRaw) {
          const allUsers = JSON.parse(usersRaw)
          const req = requests.find(r => r.id === id)
          if (req) {
            const idx = allUsers.findIndex((u: any) => u.id === req.user_id)
            if (idx >= 0) {
              allUsers[idx].is_verified = true
              allUsers[idx].verification_type = badgeType
              localStorage.setItem('vaanjay_users', JSON.stringify(allUsers))
              setUsers(allUsers)
            }
          }
        }
      }
    } catch {}
  }

  const grantBadge = (userId: string, badgeType: 'blue' | 'gold' | 'official' | null, userName: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_users')
      if (!raw) return
      const allUsers = JSON.parse(raw)
      const idx = allUsers.findIndex((u: any) => u.id === userId)
      if (idx < 0) return
      if (badgeType) {
        allUsers[idx].is_verified = true
        allUsers[idx].verification_type = badgeType
      } else {
        allUsers[idx].is_verified = false
        allUsers[idx].verification_type = undefined
      }
      localStorage.setItem('vaanjay_users', JSON.stringify(allUsers))
      setUsers(allUsers)
    } catch {}
  }

  const createTestRequest = (userId: string, userName: string) => {
    const existing = JSON.parse(localStorage.getItem('vaanjay_verification_requests') || '[]')
    const req = {
      id: 'req_' + Date.now(), user_id: userId, username: userName,
      category: 'Influencer / Public Figure', reason: 'Building Tamil Nadu community',
      status: 'pending', created_at: new Date().toISOString(),
    }
    existing.push(req)
    localStorage.setItem('vaanjay_verification_requests', JSON.stringify(existing))
    setRequests(prev => [...prev, req])
  }

  const badgeLabel = (type: string) => {
    switch (type) {
      case 'blue': return { label: 'Blue', cls: 'bg-primary/10 text-primary' }
      case 'gold': return { label: 'Gold', cls: 'bg-amber-50 text-amber-600' }
      case 'official': return { label: 'Official', cls: 'bg-green-50 text-success' }
      default: return { label: 'None', cls: 'bg-surface-secondary text-text-muted' }
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-primary">Verification</h1>
        <div className="flex gap-2">
          <button onClick={() => setTab('requests')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium ${tab === 'requests' ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary'}`}>
            Requests ({requests.length})
          </button>
          <button onClick={() => setTab('manage')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium ${tab === 'manage' ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary'}`}>
            Manage Badges
          </button>
        </div>
      </div>

      {tab === 'requests' ? (
        <div>
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary text-sm">No pending verification requests</p>
              <p className="text-text-muted text-xs mt-1">Users can apply from Settings → Verification Request</p>
              {users.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs text-text-muted mb-2">Quick test: create a request for</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {users.filter((u: any) => u.username !== 'admin').slice(0, 5).map((u: any) => (
                      <button key={u.id} onClick={() => createTestRequest(u.id, u.username)}
                        className="px-3 py-1.5 text-xs bg-surface-secondary text-text-secondary rounded-lg border border-border hover:bg-surface-hover">
                        @{u.username}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {requests.map((req: any) => (
                <div key={req.id} className="bg-white rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold">
                      {req.username?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-text-primary text-sm">@{req.username}</p>
                      <p className="text-xs text-text-secondary">{req.category}</p>
                      {req.reason && <p className="text-xs text-text-muted mt-1">{req.reason}</p>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <select defaultValue="" onChange={e => { if (e.target.value) handleRequest(req.id, 'approve', e.target.value as any) }}
                        className="px-3 py-1.5 text-xs rounded-lg border border-border bg-white text-text-primary font-medium">
                        <option value="">Approve as...</option>
                        <option value="blue">Blue Tick</option>
                        <option value="gold">Gold Badge</option>
                        <option value="official">Official Badge</option>
                      </select>
                      <button onClick={() => handleRequest(req.id, 'reject')}
                        className="px-3 py-1.5 text-xs bg-red-50 text-error rounded-lg border border-red-200 font-medium">Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left p-3 font-medium">User</th>
                <th className="text-center p-3 font-medium">Current Badge</th>
                <th className="text-center p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter((u: any) => u.username !== 'admin').map((u: any) => {
                const b = badgeLabel(u.verification_type)
                return (
                  <tr key={u.id} className="border-b border-border/50 hover:bg-surface-hover">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold">
                          {u.full_name?.charAt(0) || u.username?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{u.full_name || u.username}</p>
                          <p className="text-xs text-text-muted">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${b.cls}`}>{b.label}</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex gap-1 justify-center">
                        <button onClick={() => grantBadge(u.id, 'blue', u.full_name)} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border border-primary/30 font-medium">Blue</button>
                        <button onClick={() => grantBadge(u.id, 'gold', u.full_name)} className="px-2 py-1 text-xs bg-amber-50 text-amber-600 rounded border border-amber-200 font-medium">Gold</button>
                        <button onClick={() => grantBadge(u.id, 'official', u.full_name)} className="px-2 py-1 text-xs bg-green-50 text-success rounded border border-green-200 font-medium">Official</button>
                        <button onClick={() => grantBadge(u.id, null, u.full_name)} className="px-2 py-1 text-xs bg-surface-secondary text-text-muted rounded border border-border font-medium">Remove</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {users.filter((u: any) => u.username !== 'admin').length === 0 && (
                <tr><td colSpan={3} className="p-8 text-center text-text-secondary text-sm">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
