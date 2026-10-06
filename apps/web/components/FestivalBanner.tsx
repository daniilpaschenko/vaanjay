'use client'

import { useState, useEffect } from 'react'
import { getCurrentFestival, getTamilMonth, formatTamilDate } from '@/lib/tamil-calendar'

export function FestivalBanner() {
  const [festival, setFestival] = useState<{ name: string; nameTa: string; color: string } | null>(null)
  const [tamilMonth, setTamilMonth] = useState<{ name: string; nameTa: string }>({ name: '', nameTa: '' })

  useEffect(() => {
    setFestival(getCurrentFestival())
    setTamilMonth(getTamilMonth())
  }, [])

  if (!festival) return null

  return (
    <div
      className="px-4 py-3 flex items-center justify-between text-white text-sm"
      style={{ backgroundColor: festival.color }}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold">{festival.nameTa}</span>
        <span className="opacity-80">| {festival.name}</span>
      </div>
      <span className="text-xs opacity-75">{tamilMonth.nameTa} - {formatTamilDate(new Date())}</span>
    </div>
  )
}
