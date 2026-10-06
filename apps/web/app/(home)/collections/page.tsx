'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/AuthProvider'

const COLLECTIONS_KEY = 'vaanjay_collections'

export default function CollectionsPage() {
  const { user } = useAuth()
  const [collections, setCollections] = useState<Record<string, string[]>>({})
  const [newName, setNewName] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COLLECTIONS_KEY)
      if (raw) setCollections(JSON.parse(raw))
    } catch {}
  }, [])

  const save = (c: Record<string, string[]>) => {
    setCollections(c)
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(c))
  }

  const createCollection = () => {
    const name = newName.trim()
    if (!name || collections[name]) return
    save({ ...collections, [name]: [] })
    setNewName('')
  }

  const deleteCollection = (name: string) => {
    const { [name]: _, ...rest } = collections
    save(rest)
  }

  const saved = (() => {
    try { return JSON.parse(localStorage.getItem('vaanjay_saved') || '[]') } catch { return [] }
  })()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold text-text-primary mb-4">Collections</h1>

      <div className="flex items-center gap-2 mb-6">
        <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
          placeholder="New collection name..."
          className="flex-1 px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
        <button onClick={createCollection} disabled={!newName.trim()}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50">Create</button>
      </div>

      {Object.keys(collections).length === 0 ? (
        <div className="text-center py-12 text-text-muted text-sm">
          <svg className="w-12 h-12 mx-auto mb-3 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <p>No collections yet. Create one to organize your saved posts!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {Object.entries(collections).map(([name, postIds]) => (
            <div key={name} className="border border-border rounded-lg overflow-hidden">
              <button onClick={() => setExpanded(expanded === name ? null : name)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition-colors">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="font-medium text-text-primary">{name}</span>
                  <span className="text-xs text-text-muted">({postIds.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={e => { e.stopPropagation(); deleteCollection(name) }}
                    className="text-xs text-text-muted hover:text-error">Delete</button>
                  <svg className={`w-4 h-4 text-text-muted transition-transform ${expanded === name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {expanded === name && (
                <div className="px-4 pb-3">
                  {postIds.length === 0 ? (
                    <p className="text-xs text-text-muted py-2">No saved posts yet. Save posts and add them to this collection.</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-1">
                      {postIds.map(pid => (
                        <div key={pid} className="aspect-square bg-surface-secondary rounded overflow-hidden">
                          <div className="w-full h-full bg-surface-secondary flex items-center justify-center text-[10px] text-text-muted p-1 text-center break-all">{pid}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
