'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  festivalTheme: string | null
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggleTheme: () => {}, festivalTheme: null })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [festivalTheme, setFestivalTheme] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('vaanjay_theme') as Theme | null
    if (saved === 'dark' || saved === 'light') setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
    localStorage.setItem('vaanjay_theme', theme)
  }, [theme])

  useEffect(() => {
    import('@/lib/tamil-calendar').then(m => {
      const festival = m.getCurrentFestival()
      if (festival) {
        setFestivalTheme(festival.name)
        const cls = 'festival-' + festival.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
        document.documentElement.classList.add(cls)
      }
    })
  }, [])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, festivalTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
