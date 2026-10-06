'use client'

import { useState, useEffect } from 'react'
import { getTamilMonth, getUpcomingFestival, formatTamilDate } from '@/lib/tamil-calendar'

export function TamilCalendar() {
  const [tamilMonth, setTamilMonth] = useState<{ name: string; nameTa: string }>({ name: '', nameTa: '' })
  const [upcoming, setUpcoming] = useState<{ name: string; nameTa: string; date: string } | null>(null)
  const [dateStr, setDateStr] = useState('')

  useEffect(() => {
    setTamilMonth(getTamilMonth())
    setUpcoming(getUpcomingFestival())
    setDateStr(formatTamilDate(new Date()))
  }, [])

  return (
    <div className="text-xs text-text-muted flex items-center gap-2">
      <span>{tamilMonth.nameTa}</span>
      <span className="opacity-50">|</span>
      <span>{dateStr}</span>
      {upcoming && (
        <>
          <span className="opacity-50">|</span>
          <span className="text-primary font-medium">Upcoming: {upcoming.nameTa}</span>
        </>
      )}
    </div>
  )
}
