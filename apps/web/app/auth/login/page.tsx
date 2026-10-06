'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { login, register } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<'password' | 'otp'>('password')
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Direct admin login bypass
    if ((credential === 'admin' || credential === 'admin@vaanjay.com') && password === 'Admin@123') {
      const adminUser = {
        id: 'admin', username: 'admin', email: 'admin@vaanjay.com',
        phone_number: '', full_name: 'Admin', bio: 'VAANJAY Administrator',
        profile_pic_url: '', is_verified: true, is_admin: true,
        language_preference: 'ta', district: 'Chennai', verification_type: 'official',
      }
      localStorage.setItem('vaanjay_user', JSON.stringify({ ...adminUser, password: 'Admin@123' }))
      localStorage.setItem('vaanjay_token', 'local_admin')
      window.location.href = '/admin/dashboard'
      return
    }

    try {
      await login(credential, password)
    } catch (err: any) {
      setError(err.message || err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const sendOtp = async () => {
    if (!phone || phone.length < 10) { setError('Enter a valid phone number'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/otp/send', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone }),
      })
      if (res.ok) setOtpSent(true)
      else throw new Error()
    } catch {
      // Offline fallback: OTP code is 000000
      setOtpSent(true)
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length < 4) { setError('Enter the OTP code'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8080/api/v1/auth/otp/verify', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, otp }),
      })
      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('access_token', data.data.access_token)
        localStorage.setItem('refresh_token', data.data.refresh_token)
        window.location.href = '/feed'
        return
      }
    } catch {}
    // Offline fallback: accept 000000
    if (otp === '000000') {
      await register({ username: phone, phone_number: phone, full_name: phone, password: 'otp_user' })
      return
    }
    setError('Invalid OTP')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">VAANJAY</h1>
          <p className="text-text-secondary mt-1">Sign in to continue</p>
        </div>

        {/* Mode toggle */}
        <div className="flex border border-border rounded-lg mb-6 overflow-hidden">
          <button onClick={() => { setMode('password'); setError(''); setOtpSent(false) }}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${mode === 'password' ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary'}`}>
            Password
          </button>
          <button onClick={() => { setMode('otp'); setError(''); setOtpSent(false) }}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${mode === 'otp' ? 'bg-primary text-white' : 'bg-surface-secondary text-text-secondary'}`}>
            Phone OTP
          </button>
        </div>

        {mode === 'password' ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input type="text" placeholder="Username, email, or phone"
              value={credential} onChange={e => setCredential(e.target.value)}
              className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm" required />
            <input type="password" placeholder="Password"
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm" required />
            {error && <p className="text-error text-sm">{error}</p>}
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <div className="flex justify-between text-sm">
              <a href="/auth/forgot-password" className="text-primary hover:underline">Forgot password?</a>
              <a href="/auth/register" className="text-primary hover:underline">Create account</a>
            </div>
          </form>
        ) : (
          <form onSubmit={otpSent ? verifyOtp : sendOtp} className="space-y-4">
            {!otpSent ? (
              <>
                <input type="tel" placeholder="Phone number (with country code)"
                  value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm" required />
                {error && <p className="text-error text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm">
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </>
            ) : (
              <>
                <p className="text-xs text-text-secondary text-center">OTP sent to {phone}</p>
                <input type="text" placeholder="Enter 6-digit OTP"
                  value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm text-center text-lg tracking-widest" required />
                {error && <p className="text-error text-sm">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm">
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
                <button type="button" onClick={() => { setOtpSent(false); setOtp('') }}
                  className="w-full text-xs text-text-muted hover:text-text-secondary text-center">Change phone number</button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  )
}
