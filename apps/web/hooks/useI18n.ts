'use client'

import { useMemo } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { translations, LANGUAGE_NAMES } from '@/lib/i18n'

export function useI18n() {
  const { user } = useAuth()
  
  return useMemo(() => {
    const lang = user?.language_preference || 'ta'
    const t = (key: string): string => {
      return translations[lang]?.[key] || key
    }
    return { t, lang, langName: LANGUAGE_NAMES[lang] || lang, isTamil: lang === 'ta' }
  }, [user?.language_preference])
}
