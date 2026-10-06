'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

interface User {
  id: string; username: string; email: string; phone_number: string
  full_name: string; bio?: string; profile_pic_url?: string
  is_verified: boolean; is_admin: boolean; language_preference: string
  district?: string; language?: string; verification_type?: 'blue' | 'gold' | 'official'
}

interface AuthContextType {
  user: User | null; loading: boolean
  login: (credential: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
  updateUser: (partial: Partial<User>) => void
  isAuthenticated: boolean; isAdmin: boolean
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'
const AuthContext = createContext<AuthContextType>({} as AuthContextType)

const ADMIN_CREDENTIALS = { username: 'admin', email: 'admin@vaanjay.com', password: 'Admin@123' }

function getLocalUser(): User | null {
  try {
    const raw = localStorage.getItem('vaanjay_user')
    const u = raw ? JSON.parse(raw) : null
    if (u && u.username === 'admin') u.is_admin = true
    return u
  } catch { return null }
}

function setLocalUser(user: User, password?: string) {
  const store = password ? { ...user, password } : user
  localStorage.setItem('vaanjay_user', JSON.stringify(store))
  localStorage.setItem('vaanjay_token', 'local_' + user.id)
}

function getStoredUsers(): User[] {
  try {
    const raw = localStorage.getItem('vaanjay_users')
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function storeUser(user: User, password?: string) {
  const users = getStoredUsers()
  const idx = users.findIndex(u => u.id === user.id)
  const store = password ? { ...user, password } : user
  if (idx >= 0) users[idx] = store
  else users.push(store)
  localStorage.setItem('vaanjay_users', JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('vaanjay_token')
    if (token && token.startsWith('local_')) {
      setUser(getLocalUser())
    } else if (token) {
      const raw = localStorage.getItem('access_token')
      if (raw) {
        axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${raw}` } })
          .then(r => setUser(r.data.data))
          .catch(() => { localStorage.removeItem('access_token'); localStorage.removeItem('refresh_token') })
          .finally(() => setLoading(false))
        return
      }
    }
    setLoading(false)
  }, [])

  const login = async (credential: string, password: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { credential, password })
      localStorage.setItem('access_token', data.data.access_token)
      localStorage.setItem('refresh_token', data.data.refresh_token)
      setUser(data.data.user)
      router.push('/feed')
      return
    } catch {}

    // Check admin credentials
    if ((credential === ADMIN_CREDENTIALS.username || credential === ADMIN_CREDENTIALS.email) && password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: 'admin', username: 'admin', email: 'admin@vaanjay.com',
        phone_number: '', full_name: 'Admin', bio: 'VAANJAY Administrator',
        profile_pic_url: '', is_verified: true, is_admin: true,
        language_preference: 'ta', district: 'Chennai', verification_type: 'official'
      }
      setLocalUser(adminUser, password)
      storeUser(adminUser, password)
      setUser(adminUser)
      router.push('/admin/dashboard')
      return
    }

    // Check all stored users
    const users = getStoredUsers()
    const match = users.find(u =>
      (u.username === credential || u.email === credential || u.phone_number === credential) &&
      (u as any).password === password
    )
    if (match) {
      const safe = { ...match }; delete (safe as any).password
      setLocalUser(match)
      setUser(safe)
      router.push(match.is_admin ? '/admin/dashboard' : '/feed')
      return
    }

    // Don't auto-create on login if already exists under different name
    if (users.some(u => u.username === credential || u.email === credential || u.phone_number === credential)) {
      throw new Error('Incorrect password')
    }

    const newUser: User = {
      id: 'user_' + Date.now(), username: credential, email: credential + '@vaanjay.com',
      phone_number: credential.replace(/\D/g, ''), full_name: credential,
      bio: '', profile_pic_url: '', is_verified: false, is_admin: false, language_preference: 'ta'
    }
    setLocalUser(newUser, password)
    storeUser(newUser, password)
    setUser(newUser)
    router.push('/feed')
  }

  const register = async (input: any) => {
    if (input.username === 'admin') throw new Error('Username not available')

    const existing = getStoredUsers()
    if (existing.some(u => u.username === input.username)) throw new Error('Username already taken')
    if (input.email && existing.some(u => u.email === input.email)) throw new Error('Email already registered')
    if (input.phone_number && existing.some(u => u.phone_number === input.phone_number)) throw new Error('Phone number already registered')

    try {
      const { data } = await axios.post(`${API_URL}/auth/register`, input)
      localStorage.setItem('access_token', data.data.access_token)
      localStorage.setItem('refresh_token', data.data.refresh_token)
      setUser(data.data.user)
    } catch (err: any) {
      if (err?.response?.status === 409 || err?.response?.status === 400) throw err
      const { password, language, ...rest } = input
      const newUser: User = {
        id: 'user_' + Date.now(), ...rest,
        is_verified: false, is_admin: false, language_preference: language || 'ta', district: input.district || ''
      }
      setLocalUser(newUser, input.password)
      storeUser(newUser, input.password)
      setUser(newUser)
    }
    router.push('/feed')
  }

  const updateUser = (partial: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...partial } : prev)
  }

  const logout = () => {
    localStorage.removeItem('vaanjay_token')
    localStorage.removeItem('vaanjay_user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout, updateUser,
      isAuthenticated: !!user, isAdmin: user?.is_admin || false,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
