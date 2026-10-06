'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    title: 'Kollywood Vibez',
    desc: 'Built-in Tamil movie audio tracks from Ilaiyaraaja to Anirudh for your reels',
    icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z',
  },
  {
    title: 'District Communities',
    desc: 'Connect with your district — Chennai, Madurai, Coimbatore and 35 more',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  },
  {
    title: 'Festival Themes',
    desc: 'App transforms during Pongal, Karthigai Deepam, Deepavali and Tamil festivals',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  },
  {
    title: 'Tamil Stickers',
    desc: '24 expressive Tamil stickers across 8 categories for chats and stories',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: 'UPI Payments',
    desc: 'Send money, subscribe to creators, accept tips with Razorpay',
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'AI Content Tools',
    desc: 'AI caption generator, image restyle, content moderation and smart search',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    title: 'Audio Rooms',
    desc: 'Live voice conversations with real-time mic, volume meters, and Tamil emoji reactions',
    icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z',
  },
  {
    title: 'Channels & Events',
    desc: 'Create broadcast channels, host events with RSVP, calendar, and reminders',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
]

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'shadow-sm'
            : ''
        }`}
        style={{
          backgroundColor: scrolled ? 'var(--surface)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : 'none',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight" style={{ color: 'var(--primary)' }}>
            VAANJAY
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium px-3 py-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="text-sm px-5 py-2 rounded-lg font-semibold transition-all"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, transparent 40%, transparent 60%, var(--primary) 100%)',
              opacity: 0.08,
            }}
          />
          <div className="relative z-10 flex items-center" style={{ minHeight: '90vh' }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-16">
              <div className="max-w-3xl">
                <h1
                  className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  your world,
                  <br />
                  <span style={{ color: 'var(--primary)' }}>your voice</span>
                </h1>
                <p
                  className="text-lg sm:text-xl max-w-xl mb-8 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Tamil Nadu social network — share photos, chat, make calls, pay friends,
                  discover culture, and connect with your district community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auth/register"
                    className="px-8 py-3 rounded-xl font-semibold text-sm text-center transition-all"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                    }}
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/auth/login"
                    className="px-8 py-3 rounded-xl font-semibold text-sm text-center transition-all"
                    style={{
                      border: '2px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--surface-secondary)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '38', label: 'Districts' },
              { value: '20', label: 'Languages' },
              { value: '10K+', label: 'Users' },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{s.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-20 sm:py-28 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                Everything in one place
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                Social media, messaging, calls, payments, and Tamil culture — built for Tamil Nadu.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-xl p-6 transition-all"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors"
                    style={{ backgroundColor: 'var(--primary)', opacity: 0.1 }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} style={{ color: 'var(--primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-28 px-4 sm:px-6" style={{ backgroundColor: 'var(--surface-secondary)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              Ready to join?
            </h2>
            <p className="mb-8" style={{ color: 'var(--text-muted)' }}>
              Experience the social network built for Tamil Nadu.
            </p>
            <Link
              href="/auth/register"
              className="inline-block px-10 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#FFFFFF',
              }}
            >
              Create Your Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 px-4 sm:px-6" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <p className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>VAANJAY</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>your world, your voice</p>
          <p className="text-xs pt-2" style={{ color: 'var(--text-muted)' }}>
            VAANJAY 2026 — Chennai, Tamil Nadu, India
          </p>
        </div>
      </footer>
    </div>
  )
}
