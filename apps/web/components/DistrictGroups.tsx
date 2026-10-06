'use client'

import { useState } from 'react'

const TN_DISTRICTS = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
  'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
  'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
  'Kanyakumari', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
  'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli',
  'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur',
  'Vellore', 'Viluppuram', 'Virudhunagar',
]

export function DistrictGroupSelector({ onSelect }: { onSelect?: (district: string) => void }) {
  const [search, setSearch] = useState('')

  const filtered = TN_DISTRICTS.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-2">
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search your district..."
        className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary"
      />
      <div className="max-h-48 overflow-y-auto space-y-1">
        {filtered.map(district => (
          <button key={district} onClick={() => onSelect?.(district)}
            className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-surface-hover rounded-lg transition-colors">
            {district}
          </button>
        ))}
      </div>
    </div>
  )
}

export const DISTRICT_LIST = TN_DISTRICTS
