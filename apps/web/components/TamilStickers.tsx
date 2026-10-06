'use client'

import { useState } from 'react'

const TAMIL_STICKERS = [
  { id: 's1', text: 'Vaanga Vanga' },
  { id: 's2', text: 'Superu' },
  { id: 's3', text: 'Sema' },
  { id: 's4', text: 'Rascala' },
  { id: 's5', text: 'Gypsy' },
  { id: 's6', text: 'Mass' },
  { id: 's7', text: 'Ullathai Alla' },
  { id: 's8', text: 'Dialogue' },
  { id: 's9', text: 'Vera Level' },
  { id: 's10', text: 'Thalaiva' },
  { id: 's11', text: 'Athu Superu' },
  { id: 's12', text: 'Semma Mass' },
]

export function TamilStickerPicker({ onSelect }: { onSelect?: (text: string) => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="px-3 py-1.5 text-xs bg-surface-secondary border border-border rounded-lg text-text-secondary hover:bg-surface-hover">
        Stickers
      </button>
      {open && (
        <div className="absolute bottom-10 left-0 bg-white border border-border rounded-lg shadow-lg p-3 w-72 z-50">
          <div className="grid grid-cols-3 gap-2">
            {TAMIL_STICKERS.map(s => (
              <button key={s.id} onClick={() => { onSelect?.(s.text); setOpen(false) }}
                className="p-2 text-xs bg-surface-secondary rounded-lg hover:bg-surface-hover text-text-primary font-medium">
                {s.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
