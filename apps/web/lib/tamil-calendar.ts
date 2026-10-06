const TAMIL_MONTHS = [
  'Thai', 'Maasi', 'Panguni', 'Chithirai', 'Vaikasi', 'Aani',
  'Aadi', 'Aavani', 'Purattasi', 'Aippasi', 'Karthigai', 'Maargazhi',
] as const

const TAMIL_MONTHS_TA = [
  'Thai', 'Maasi', 'Panguni', 'Chithirai', 'Vaikasi', 'Aani',
  'Aadi', 'Aavani', 'Purattasi', 'Aippasi', 'Karthigai', 'Maargazhi',
] as const

const FESTIVALS: { date: string; name: string; nameTa: string; color: string }[] = [
  { date: '01-14', name: 'Pongal', nameTa: 'Pongal', color: '#DC2626' },
  { date: '01-15', name: 'Maattu Pongal', nameTa: 'Maattu Pongal', color: '#DC2626' },
  { date: '01-16', name: 'Kaanum Pongal', nameTa: 'Kaanum Pongal', color: '#DC2626' },
  { date: '02-14', name: 'Valentine\'s Day', nameTa: 'Valentine\'s Day', color: '#EC4899' },
  { date: '03-08', name: 'Women\'s Day', nameTa: 'Women\'s Day', color: '#EC4899' },
  { date: '04-14', name: 'Tamil New Year', nameTa: 'Tamil New Year', color: '#F59E0B' },
  { date: '07-17', name: 'Aadi Perukku', nameTa: 'Aadi Perukku', color: '#8B5CF6' },
  { date: '08-15', name: 'Independence Day', nameTa: 'Independence Day', color: '#2563EB' },
  { date: '10-02', name: 'Gandhi Jayanti', nameTa: 'Gandhi Jayanti', color: '#16A34A' },
  { date: '11-01', name: 'Karnataka Rajyotsava', nameTa: 'Karnataka Rajyotsava', color: '#DC2626' },
  { date: '12-13', name: 'Karthigai Deepam', nameTa: 'Karthigai Deepam', color: '#F59E0B' },
  { date: '12-25', name: 'Christmas', nameTa: 'Christmas', color: '#DC2626' },
]

export function getTamilMonth() {
  const now = new Date()
  const month = now.getMonth()
  return {
    name: TAMIL_MONTHS[month],
    nameTa: TAMIL_MONTHS_TA[month],
    index: month + 1,
  }
}

export function getCurrentFestival(): typeof FESTIVALS[0] | null {
  const now = new Date()
  const mmdd = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return FESTIVALS.find(f => f.date === mmdd) || null
}

export function getUpcomingFestival(): typeof FESTIVALS[0] | null {
  const now = new Date()
  const today = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const sorted = [...FESTIVALS].sort((a, b) => a.date.localeCompare(b.date))
  return sorted.find(f => f.date >= today) || sorted[0] || null
}

export function formatTamilDate(date: Date): string {
  const month = date.getMonth()
  const day = date.getDate()
  return `${TAMIL_MONTHS_TA[month]} ${day}`
}
