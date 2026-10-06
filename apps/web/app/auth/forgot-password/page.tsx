'use client'

import { useState } from 'react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">VAANJAY</h1>
          <p className="text-text-secondary mt-1">Forgot Password</p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-text-secondary">Enter your email address and we will send you a reset link.</p>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm"
              required
            />
            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 text-sm">
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
            <a href="/auth/login" className="block text-center text-sm text-primary hover:underline">Back to Sign In</a>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center mx-auto">
              <span className="text-primary text-2xl font-bold">V</span>
            </div>
            <p className="font-semibold text-text-primary">Email Sent</p>
            <p className="text-sm text-text-secondary">If an account exists with {email}, you will receive a password reset link shortly.</p>
            <a href="/auth/login" className="block text-sm text-primary hover:underline font-medium">Return to Sign In</a>
          </div>
        )}
      </div>
    </div>
  )
}
