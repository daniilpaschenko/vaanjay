'use client'

import { useState, useEffect } from 'react'

export default function AdminSettingsPage() {
  const [maintenance, setMaintenance] = useState(false)
  const [defaultLang, setDefaultLang] = useState('ta')
  const [moderationLevel, setModerationLevel] = useState('medium')
  const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({
    stories: true, vibez: true, messages: true, calls: true, live: false, payments: false,
  })
  const [mounted, setMounted] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMounted(true)
    setMaintenance(localStorage.getItem('vaanjay_maintenance') === 'true')
    setDefaultLang(localStorage.getItem('vaanjay_default_lang') || 'ta')
    setModerationLevel(localStorage.getItem('vaanjay_moderation') || 'medium')
    try {
      const flags = JSON.parse(localStorage.getItem('vaanjay_features') || '{}')
      if (Object.keys(flags).length) setFeatureFlags(prev => ({ ...prev, ...flags }))
    } catch {}
  }, [])

  if (!mounted) return null

  const toggleMaintenance = () => {
    const next = !maintenance
    setMaintenance(next)
    localStorage.setItem('vaanjay_maintenance', String(next))
    setMessage(next ? 'Maintenance mode enabled' : 'Maintenance mode disabled')
    setTimeout(() => setMessage(''), 3000)
  }

  const toggleFeature = (key: string) => {
    const next = { ...featureFlags, [key]: !featureFlags[key] }
    setFeatureFlags(next)
    localStorage.setItem('vaanjay_features', JSON.stringify(next))
    setMessage(`Feature "${key}" ${next[key] ? 'enabled' : 'disabled'}`)
    setTimeout(() => setMessage(''), 3000)
  }

  const saveDefaultLang = (val: string) => {
    setDefaultLang(val)
    localStorage.setItem('vaanjay_default_lang', val)
    setMessage(`Default language set to ${val === 'ta' ? 'Tamil' : val === 'en' ? 'English' : 'Hindi'}`)
    setTimeout(() => setMessage(''), 3000)
  }

  const saveModeration = (val: string) => {
    setModerationLevel(val)
    localStorage.setItem('vaanjay_moderation', val)
    setMessage(`Moderation sensitivity: ${val}`)
    setTimeout(() => setMessage(''), 3000)
  }

  const FEATURES = [
    { key: 'stories', label: 'Stories' },
    { key: 'vibez', label: 'Vibez (Reels)' },
    { key: 'messages', label: 'Direct Messages' },
    { key: 'calls', label: 'Voice/Video Calls' },
    { key: 'live', label: 'Live Streaming' },
    { key: 'payments', label: 'Payments (Razorpay)' },
  ]

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary mb-6">Settings</h1>

      {message && (
        <div className="mb-4 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary font-medium">{message}</div>
      )}

      <div className="space-y-4 max-w-xl">
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-text-primary">Maintenance Mode</h3>
              <p className="text-xs text-text-muted mt-1">When enabled, users see a maintenance page</p>
            </div>
            <button onClick={toggleMaintenance}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer focus:outline-none p-0.5 flex ${maintenance ? 'bg-error' : 'bg-border'}`}>
              <span className={`w-5 h-5 bg-[#FFF] rounded-full shadow transition-transform ${maintenance ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Default Language</h3>
          <div className="flex gap-2">
            {[
              { value: 'ta', label: 'Tamil' },
              { value: 'en', label: 'English' },
            ].map(o => (
              <button key={o.value} onClick={() => saveDefaultLang(o.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border ${defaultLang === o.value ? 'bg-primary text-white border-primary' : 'bg-surface-secondary text-text-secondary border-border hover:bg-surface-hover'}`}>
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Content Moderation Sensitivity</h3>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map(o => (
              <button key={o} onClick={() => saveModeration(o)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize border ${moderationLevel === o ? 'bg-primary text-white border-primary' : 'bg-surface-secondary text-text-secondary border-border hover:bg-surface-hover'}`}>
                {o}
              </button>
            ))}
          </div>
          <p className="text-xs text-text-muted mt-2">
            {moderationLevel === 'low' ? 'Minimal filtering (most content allowed)' :
             moderationLevel === 'medium' ? 'Standard filtering (default)' :
             'Strict filtering (maximum content moderation)'}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-3">Feature Flags</h3>
          <div className="space-y-2">
            {FEATURES.map(f => (
              <div key={f.key} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-text-primary">{f.label}</span>
                <button onClick={() => toggleFeature(f.key)}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer focus:outline-none p-0.5 flex ${featureFlags[f.key] ? 'bg-primary' : 'bg-border'}`}>
                  <span className={`w-5 h-5 bg-[#FFF] rounded-full shadow transition-transform ${featureFlags[f.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
