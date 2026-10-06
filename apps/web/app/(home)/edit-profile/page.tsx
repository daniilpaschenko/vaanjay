'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'

export default function EditProfilePage() {
  const { user, updateUser } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    username: user?.username || '',
    bio: user?.bio || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
  })
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const save = () => {
    setSaving(true)
    try {
      const raw = localStorage.getItem('vaanjay_user')
      if (raw) {
        const u = JSON.parse(raw)
        u.full_name = form.full_name
        u.username = form.username
        u.bio = form.bio
        u.email = form.email
        u.phone_number = form.phone_number
        localStorage.setItem('vaanjay_user', JSON.stringify(u))
      }
      const users = JSON.parse(localStorage.getItem('vaanjay_users') || '[]')
      const idx = users.findIndex((u: any) => u.id === user?.id)
      if (idx >= 0) {
        users[idx].full_name = form.full_name
        users[idx].username = form.username
        users[idx].bio = form.bio
        users[idx].email = form.email
        users[idx].phone_number = form.phone_number
        localStorage.setItem('vaanjay_users', JSON.stringify(users))
      }
      updateUser({ bio: form.bio, full_name: form.full_name, username: form.username, email: form.email, phone_number: form.phone_number })
      setDone(true)
      setTimeout(() => { router.push(`/${form.username}`) }, 1000)
    } catch {}
    setSaving(false)
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <button onClick={() => router.back()} className="text-sm text-text-secondary hover:text-text-primary">Cancel</button>
        <h1 className="text-lg font-bold text-text-primary">Edit Profile</h1>
        <button onClick={save} disabled={saving || done}
          className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:opacity-90">
          {done ? 'Saved' : saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {done && (
        <div className="m-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-success font-medium text-center">
          Profile updated! Redirecting...
        </div>
      )}

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-border">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {form.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-semibold text-text-primary text-sm">{user?.full_name}</p>
            <button className="text-xs text-primary font-medium mt-1">Change profile photo</button>
          </div>
        </div>

        {(['full_name', 'username', 'bio', 'email', 'phone_number'] as const).map(field => (
          <div key={field}>
            <label className="text-xs text-text-muted font-medium uppercase tracking-wider mb-1 block">{field.replace('_', ' ')}</label>
            {field === 'bio' ? (
              <textarea value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary resize-none h-20" />
            ) : (
              <input type={field === 'email' ? 'email' : field === 'phone_number' ? 'tel' : 'text'}
                value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
