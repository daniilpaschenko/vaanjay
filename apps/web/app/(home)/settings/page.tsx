'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useTheme } from '@/components/ThemeProvider'
import { LANGUAGE_NAMES } from '@/lib/i18n'

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [modal, setModal] = useState<string | null>(null)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [language, setLanguage] = useState(user?.language_preference || 'ta')
  const [district, setDistrict] = useState(user?.district || '')
  const [passwordForm, setPasswordForm] = useState({ current: '', newpass: '', confirm: '' })
  const [passwordMsg, setPasswordMsg] = useState('')
  const [verifyType, setVerifyType] = useState('blue')

  useEffect(() => {
    if (user) {
      setLanguage(user.language_preference || 'ta')
      setDistrict(user.district || '')
    }
  }, [user])

  const saveLanguage = () => {
    try {
      const raw = localStorage.getItem('vaanjay_user')
      if (raw) {
        const u = JSON.parse(raw)
        u.language_preference = language
        u.language = language
        localStorage.setItem('vaanjay_user', JSON.stringify(u))
      }
      // Also update in users list
      const users = JSON.parse(localStorage.getItem('vaanjay_users') || '[]')
      const idx = users.findIndex((u: any) => u.id === user?.id)
      if (idx >= 0) {
        users[idx].language_preference = language
        users[idx].language = language
        localStorage.setItem('vaanjay_users', JSON.stringify(users))
      }
      updateUser({ language_preference: language, language })
      setModal(null)
    } catch {}
  }

  const saveDistrict = () => {
    try {
      const raw = localStorage.getItem('vaanjay_user')
      if (raw) {
        const u = JSON.parse(raw)
        u.district = district
        localStorage.setItem('vaanjay_user', JSON.stringify(u))
      }
      const users = JSON.parse(localStorage.getItem('vaanjay_users') || '[]')
      const idx = users.findIndex((u: any) => u.id === user?.id)
      if (idx >= 0) {
        users[idx].district = district
        localStorage.setItem('vaanjay_users', JSON.stringify(users))
      }
      setModal(null)
    } catch {}
  }

  const changePassword = () => {
    if (passwordForm.newpass !== passwordForm.confirm) {
      setPasswordMsg('Passwords do not match')
      return
    }
    if (passwordForm.newpass.length < 6) {
      setPasswordMsg('Password must be at least 6 characters')
      return
    }
    try {
      const raw = localStorage.getItem('vaanjay_user')
      if (raw) {
        const u = JSON.parse(raw)
        if (u.password && u.password !== passwordForm.current) {
          setPasswordMsg('Current password is incorrect')
          return
        }
        u.password = passwordForm.newpass
        localStorage.setItem('vaanjay_user', JSON.stringify(u))
      }
      const users = JSON.parse(localStorage.getItem('vaanjay_users') || '[]')
      const idx = users.findIndex((u: any) => u.id === user?.id)
      if (idx >= 0) {
        users[idx].password = passwordForm.newpass
        localStorage.setItem('vaanjay_users', JSON.stringify(users))
      }
      setPasswordMsg('Password changed successfully')
      setTimeout(() => { setModal(null); setPasswordMsg('') }, 1500)
    } catch {}
  }

  const deleteAccount = () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    try {
      localStorage.removeItem('vaanjay_user')
      localStorage.removeItem('vaanjay_token')
      const users = JSON.parse(localStorage.getItem('vaanjay_users') || '[]')
      const filtered = users.filter((u: any) => u.id !== user?.id)
      localStorage.setItem('vaanjay_users', JSON.stringify(filtered))
      logout()
    } catch {}
  }

  const SECTIONS = [
    {
      title: 'Account',
      items: [
        { label: 'Language', key: 'language', value: LANGUAGE_NAMES[language] || language },
        { label: 'Your District', key: 'district', value: district || 'Not set' },
        { label: 'Verification Request', key: 'verify' },
        { label: 'Change Password', key: 'password' },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { label: 'Dark Mode', key: 'darkmode', action: toggleTheme, value: theme === 'dark' ? 'On' : 'Off' },
      ],
    },
    {
      title: 'Privacy',
      items: [
        { label: 'Blocked Users', key: 'blocked' },
        { label: 'Close Friends', key: 'close_friends' },
      ],
    },
    {
      title: 'Support',
      items: [
        { label: 'Help Center', key: 'help' },
        { label: 'About VAANJAY', key: 'about' },
        { label: 'Report a Problem', key: 'report' },
      ],
    },
  ]

  const handleItemClick = (key: string) => {
    if (key === 'darkmode') { toggleTheme(); return }
    if (key === 'verify') { setModal('verify'); return }
    if (key === 'help') { setModal('help'); return }
    if (key === 'about') { setModal('about'); return }
    setModal(key)
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-text-primary">Settings</h1>
      </div>
      <div className="p-4 space-y-6">
        {/* User info */}
        <div className="flex items-center gap-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
            {user?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <p className="font-semibold text-text-primary text-base">{user?.full_name}</p>
            <p className="text-sm text-text-secondary">@{user?.username}</p>
          </div>
        </div>

        {SECTIONS.map(section => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">{section.title}</h2>
            <div className="border border-border rounded-lg divide-y divide-border">
              {section.items.map(item => (
                <button key={item.key} onClick={() => handleItemClick(item.key)}
                  className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface-hover text-left transition-colors">
                  <span className="text-sm text-text-primary">{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs text-text-muted">{item.value}</span>}
                    <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {(user?.is_admin || (() => { try { const raw = localStorage.getItem('vaanjay_user'); return raw ? JSON.parse(raw).is_admin === true : false } catch { return false } })()) && (
        <div>
          <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Administration</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            <a href="/admin/dashboard" className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface-hover transition-colors">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                <span className="text-sm text-text-primary">Admin Dashboard</span>
              </div>
              <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
            <a href="/admin/settings" className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface-hover transition-colors">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span className="text-sm text-text-primary">Admin Settings</span>
              </div>
              <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
        )}

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Private Account</p>
              <p className="text-xs text-text-secondary mt-0.5">Only approved followers can see your content</p>
            </div>
            <button onClick={() => setPrivateAccount(!privateAccount)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer focus:outline-none p-0.5 flex ${privateAccount ? 'bg-primary' : 'bg-border'}`}>
              <div className={`w-5 h-5 rounded-full bg-[#FFF] shadow transition-transform ${privateAccount ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <button onClick={logout}
          className="w-full py-3 bg-red-50 text-error rounded-lg text-sm font-semibold border border-red-200 hover:bg-red-100 transition-colors">
          Log Out
        </button>

        <button onClick={deleteAccount}
          className="w-full py-2 text-xs text-text-muted hover:text-error transition-colors">
          Delete Account
        </button>

        <p className="text-xs text-center text-text-muted pb-4">VAANJAY v1.0.0</p>
      </div>

      {/* Language modal */}
      {modal === 'language' && (
        <Modal title="Language" onClose={() => setModal(null)}>
          <div className="space-y-1 max-h-60 overflow-y-auto">
              {[
                  { value: 'ta', label: 'Tamil / தமிழ்' },
                  { value: 'ml', label: 'Malayalam / മലയാളം' },
                  { value: 'en', label: 'English' },
                  { value: 'ar', label: 'Arabic / العربية' },
                  { value: 'bn', label: 'Bengali / বাংলা' },
                  { value: 'zh', label: 'Chinese / 中文' },
                  { value: 'fr', label: 'French / Français' },
                  { value: 'de', label: 'German / Deutsch' },
                  { value: 'gu', label: 'Gujarati / ગુજરાતી' },
                  { value: 'it', label: 'Italian / Italiano' },
                  { value: 'ja', label: 'Japanese / 日本語' },
                  { value: 'kn', label: 'Kannada / ಕನ್ನಡ' },
                  { value: 'ko', label: 'Korean / 한국어' },
                  { value: 'mr', label: 'Marathi / मराठी' },
                  { value: 'or', label: 'Odia / ଓଡ଼ିଆ' },
                  { value: 'pt', label: 'Portuguese / Português' },
                  { value: 'pa', label: 'Punjabi / ਪੰਜਾਬੀ' },
                  { value: 'ru', label: 'Russian / Русский' },
                  { value: 'es', label: 'Spanish / Español' },
                  { value: 'ur', label: 'Urdu / اردو' },
                ].map(l => (
              <button key={l.value} onClick={() => setLanguage(l.value)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  language === l.value ? 'bg-primary/10 text-primary font-medium' : 'text-text-primary hover:bg-surface-secondary'
                }`}>
                {l.label}
              </button>
            ))}
          </div>
          <button onClick={saveLanguage}
            className="w-full mt-4 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
        </Modal>
      )}

      {/* District modal */}
      {modal === 'district' && (
        <Modal title="Your District" onClose={() => setModal(null)}>
          <select value={district} onChange={e => setDistrict(e.target.value)}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary">
            <option value="">Select district</option>
            {['Ariyalur','Chengalpattu','Chennai','Coimbatore','Cuddalore','Dharmapuri','Dindigul','Erode','Kallakurichi','Kancheepuram','Karur','Krishnagiri','Madurai','Mayiladuthurai','Nagapattinam','Kanyakumari','Namakkal','Nilgiris','Perambalur','Pudukkottai','Ramanathapuram','Ranipet','Salem','Sivaganga','Tenkasi','Thanjavur','Theni','Thoothukudi','Tiruchirappalli','Tirunelveli','Tirupathur','Tiruppur','Tiruvallur','Tiruvannamalai','Tiruvarur','Vellore','Viluppuram','Virudhunagar'].map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <button onClick={saveDistrict}
            className="w-full mt-4 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Save</button>
        </Modal>
      )}

      {/* Password modal */}
      {modal === 'password' && (
        <Modal title="Change Password" onClose={() => { setModal(null); setPasswordMsg('') }}>
          <div className="space-y-3">
            <input type="password" placeholder="Current password" value={passwordForm.current}
              onChange={e => setPasswordForm(p => ({ ...p, current: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            <input type="password" placeholder="New password" value={passwordForm.newpass}
              onChange={e => setPasswordForm(p => ({ ...p, newpass: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            <input type="password" placeholder="Confirm new password" value={passwordForm.confirm}
              onChange={e => setPasswordForm(p => ({ ...p, confirm: e.target.value }))}
              className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
            {passwordMsg && <p className={`text-xs ${passwordMsg.includes('success') ? 'text-success' : 'text-error'}`}>{passwordMsg}</p>}
          </div>
          <button onClick={changePassword}
            className="w-full mt-4 py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Change Password</button>
        </Modal>
      )}

      {/* About modal */}
      {modal === 'about' && (
        <Modal title="About VAANJAY" onClose={() => setModal(null)}>
          <div className="text-center py-4">
            <p className="text-2xl font-bold text-primary mb-1">VAANJAY</p>
            <p className="text-text-secondary text-sm mb-4">your world, your voice</p>
            <p className="text-text-muted text-xs leading-relaxed">
              Social network for Tamil Nadu and Tamil culture worldwide.<br />
              Connect, share, and discover your community.
            </p>
            <p className="text-text-muted text-xs mt-3">Version 1.0.0</p>
          </div>
        </Modal>
      )}

      {/* Other modals (placeholder) */}
      {modal === 'blocked' && <PlaceholderModal title="Blocked Users" desc="No users blocked" onClose={() => setModal(null)} />}
      {modal === 'close_friends' && <PlaceholderModal title="Close Friends" desc="No close friends added" onClose={() => setModal(null)} />}
      {modal === 'report' && <PlaceholderModal title="Report a Problem" desc="Describe the issue you're facing" onClose={() => setModal(null)} />}
      {modal === 'verify' && (
        <Modal title="Request Verification" onClose={() => { setModal(null); setVerifyType('blue') }}>
          <p className="text-sm text-text-secondary mb-3">Select the badge type you want to request:</p>
          <div className="space-y-2 mb-4">
            {[
              { type: 'blue', label: 'Blue Badge', desc: 'Standard verification for notable accounts', color: 'text-primary' },
              { type: 'gold', label: 'Gold Badge', desc: 'Premium verification for creators & influencers', color: 'text-amber-500' },
              { type: 'official', label: 'Official Badge', desc: 'Official organization or public figure', color: 'text-emerald-500' },
            ].map(b => (
              <button key={b.type} onClick={() => setVerifyType(b.type)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${verifyType === b.type ? 'border-primary bg-primary/5' : 'border-border hover:bg-surface-hover'}`}>
                <p className={`text-sm font-semibold ${b.color}`}>{b.label}</p>
                <p className="text-xs text-text-muted mt-0.5">{b.desc}</p>
              </button>
            ))}
          </div>
          <button onClick={() => {
            const existing = JSON.parse(localStorage.getItem('vaanjay_verification_requests') || '[]')
            existing.push({
              id: 'req_' + Date.now(),
              user_id: user?.id,
              username: user?.username,
              full_name: user?.full_name,
              type: verifyType,
              status: 'pending',
              created_at: new Date().toISOString(),
            })
            localStorage.setItem('vaanjay_verification_requests', JSON.stringify(existing))
            setModal(null)
            setVerifyType('blue')
          }}
            className="w-full py-3 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90">Submit Request</button>
        </Modal>
      )}
      {modal === 'help' && <PlaceholderModal title="Help Center" desc="Documentation and guides coming soon." onClose={() => setModal(null)} />}
    </div>
  )
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-sm w-full mx-4 p-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-text-primary">{title}</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function PlaceholderModal({ title, desc, onClose }: { title: string; desc: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl max-w-sm w-full mx-4 p-6 text-center" onClick={e => e.stopPropagation()}>
        <p className="text-base font-bold text-text-primary mb-2">{title}</p>
        <p className="text-sm text-text-secondary mb-4">{desc}</p>
        <button onClick={onClose}
          className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90">Close</button>
      </div>
    </div>
  )
}
