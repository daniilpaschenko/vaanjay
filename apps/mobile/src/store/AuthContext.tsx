import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/v1'

interface User {
  id: string
  username: string
  email: string
  phone_number: string
  full_name: string
  bio?: string
  profile_pic_url?: string
  is_verified: boolean
  is_admin: boolean
  language_preference: string
}

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  login: (credential: string, password: string) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  login: async (credential, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, { credential, password })
    set({ user: data.data.user })
  },
  register: async (input) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, input)
    set({ user: data.data.user })
  },
  logout: () => set({ user: null }),
}))

const AuthCtx = createContext<ReturnType<typeof useAuthStore>>(null!)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const store = useAuthStore()
  return <AuthCtx.Provider value={store}>{children}</AuthCtx.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
