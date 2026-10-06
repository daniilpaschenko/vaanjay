'use client'

import { useState, useEffect } from 'react'

interface AdminNotification {
  id: string; title: string; body: string
  target: string; target_value: string
  created_at: string; sent_by: string
}

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [target, setTarget] = useState<'all' | 'username' | 'language' | 'district'>('all')
  const [targetValue, setTargetValue] = useState('')
  const [message, setMessage] = useState('')
  const [history, setHistory] = useState<AdminNotification[]>([])
  const [sending, setSending] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaanjay_notifications')
      if (raw) setHistory(JSON.parse(raw))
    } catch {}
  }, [])

  const saveHistory = (n: AdminNotification[]) => {
    localStorage.setItem('vaanjay_notifications', JSON.stringify(n))
    setHistory(n)
  }

  const countTarget = (): number => {
    const usersRaw = localStorage.getItem('vaanjay_users')
    if (!usersRaw) return 0
    const users = JSON.parse(usersRaw)
    switch (target) {
      case 'all': return users.length
      case 'username': return users.filter((u: any) => u.username === targetValue).length
      case 'language': return users.filter((u: any) => (u.language_preference || 'ta') === targetValue).length
      case 'district': return users.filter((u: any) => u.district === targetValue).length
      default: return 0
    }
  }

  const sendNotification = () => {
    if (!title.trim() || !body.trim()) {
      setMessage('Title and body are required')
      setTimeout(() => setMessage(''), 3000)
      return
    }
    if (target !== 'all' && !targetValue.trim()) {
      setMessage('Please specify a target value')
      setTimeout(() => setMessage(''), 3000)
      return
    }
    setSending(true)
    const count = countTarget()
    const notif: AdminNotification = {
      id: Date.now().toString(),
      title: title.trim(),
      body: body.trim(),
      target, target_value: targetValue.trim(),
      created_at: new Date().toISOString(),
      sent_by: 'admin',
    }
    const updated = [notif, ...history]
    saveHistory(updated)
    setMessage(`Notification sent to ${count} user${count !== 1 ? 's' : ''} (${target === 'all' ? 'Everyone' : `${target}: ${targetValue}`})`)
    setTitle('')
    setBody('')
    setTarget('all')
    setTargetValue('')
    setSending(false)
    setTimeout(() => setMessage(''), 4000)
  }

  const targetOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'username', label: 'By Username' },
    { value: 'language', label: 'By Language' },
    { value: 'district', label: 'By District' },
  ]

  const DISTRICTS = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
    'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri',
    'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Kanyakumari', 'Nilgiris',
    'Namakkal', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet',
    'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi',
    'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
    'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Villupuram', 'Virudhunagar',
  ]

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary mb-6">Send Notification</h1>

      {message && (
        <div className="mb-4 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary font-medium">{message}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Compose Notification</h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs text-text-secondary mb-1.5 font-medium">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)}
                placeholder="Notification title..." maxLength={100}
                className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1.5 font-medium">Body</label>
              <textarea value={body} onChange={e => setBody(e.target.value)}
                placeholder="Notification message..." rows={4} maxLength={500}
                className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary resize-none" />
              <p className="text-xs text-text-muted mt-1">{body.length}/500</p>
            </div>

            <div>
              <label className="block text-xs text-text-secondary mb-1.5 font-medium">Target Audience</label>
              <select value={target} onChange={e => setTarget(e.target.value as any)}
                className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary">
                {targetOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {target !== 'all' && (
              <div>
                <label className="block text-xs text-text-secondary mb-1.5 font-medium">
                  {target === 'username' ? 'Username' : target === 'language' ? 'Language Code (ta, en, hi)' : 'District'}
                </label>
                {target === 'district' ? (
                  <select value={targetValue} onChange={e => setTargetValue(e.target.value)}
                    className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary">
                    <option value="">Select district...</option>
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                ) : (
                  <input type="text" value={targetValue} onChange={e => setTargetValue(e.target.value)}
                    placeholder={target === 'username' ? 'Enter username...' : 'e.g. ta, en, hi'}
                    className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-text-muted">Reaches: <strong className="text-text-primary">{countTarget()}</strong> users</p>
              <button onClick={sendNotification} disabled={sending}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50">
                {sending ? 'Sending...' : 'Send Notification'}
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold text-text-primary mb-4">Sent History ({history.length})</h2>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {history.length === 0 && (
              <p className="text-xs text-text-muted text-center py-6">No notifications sent yet</p>
            )}
            {history.map(n => (
              <div key={n.id} className="p-3 bg-surface-secondary rounded-lg border border-border">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-text-primary">{n.title}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0 ${
                    n.target === 'all' ? 'bg-primary/10 text-primary' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {n.target === 'all' ? 'All' : n.target_value}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">{n.body}</p>
                <p className="text-[10px] text-text-muted mt-1.5">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
