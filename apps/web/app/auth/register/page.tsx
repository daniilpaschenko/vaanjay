'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'

const DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
  'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
  'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
  'Kanyakumari', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
  'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
  'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
  'Vellore', 'Viluppuram', 'Virudhunagar',
]

export default function RegisterPage() {
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', full_name: '', email: '', phone_number: '', password: '', district: '', language: 'ta' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form)
    } catch (err: any) {
      const msg = err.response?.data?.error || err.message || 'Registration failed'
      setErrors({ general: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">VAANJAY</h1>
          <p className="text-text-secondary mt-1">Create a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm"
            required
          />
          <input
            type="text"
            placeholder="Full name"
            value={form.full_name}
            onChange={e => setForm(prev => ({ ...prev, full_name: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm"
            required
          />
          <input
            type="text"
            placeholder="Phone number"
            value={form.phone_number}
            onChange={e => setForm(prev => ({ ...prev, phone_number: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm"
          />
          <select
            value={form.district}
            onChange={e => setForm(prev => ({ ...prev, district: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm">
            <option value="">Select your district</option>
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select
            value={form.language}
            onChange={e => setForm(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary focus:outline-none focus:border-primary text-sm">
            <option value="ta">Tamil</option>
            <option value="ml">Malayalam</option>
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="bn">Bengali</option>
            <option value="zh">Chinese</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="gu">Gujarati</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="kn">Kannada</option>
            <option value="ko">Korean</option>
            <option value="mr">Marathi</option>
            <option value="or">Odia</option>
            <option value="pt">Portuguese</option>
            <option value="pa">Punjabi</option>
            <option value="ru">Russian</option>
            <option value="es">Spanish</option>
            <option value="ur">Urdu</option>
          </select>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
            className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm"
            required
          />

          {errors.general && <p className="text-error text-sm">{errors.general}</p>}

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-text-secondary">
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary hover:underline">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  )
}
