'use client'

import { useState } from 'react'
import { useI18n } from '@/hooks/useI18n'

const SAMPLE_ANSWERS: Record<string, { answer: string; sources: string[] }> = {
  'tamil cinema': {
    answer: 'Tamil cinema (Kollywood) produces over 200 films annually. Major studios include AVM Productions, Sun Pictures, and Lyca Productions. Top actors include Rajinikanth, Kamal Haasan, Vijay, Ajith, and Suriya.',
    sources: ['Tamil Film Industry Reports', 'Wikipedia - Cinema of Tamil Nadu'],
  },
  'chennai': {
    answer: 'Chennai (formerly Madras) is the capital of Tamil Nadu, population ~12 million. Major IT hub, home to Marina Beach (world\'s second longest), Kapaleeshwarar Temple, Fort St. George, and the Chennai International Airport.',
    sources: ['Chennai Corporation', 'Tamil Nadu Tourism'],
  },
  'tamil food': {
    answer: 'Tamil cuisine features rice-based dishes, dosa, idli, vada, sambar, rasam, and chettinad specialties. Key ingredients: coconut, curry leaves, mustard seeds, tamarind. Famous dishes: Chettinad chicken, Madurai kari dosa, Kumbakonam filter coffee.',
    sources: ['Tamil Cuisine Encyclopedia', 'Chettinad Food Guide'],
  },
}

export default function AISearchPage() {
  const { isTamil } = useI18n()
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<{ answer: string; sources: string[] } | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    setSearched(true)
    await new Promise(r => setTimeout(r, 1000))
    const q = query.toLowerCase()
    let match: typeof result = null
    for (const [key, val] of Object.entries(SAMPLE_ANSWERS)) {
      if (q.includes(key)) { match = val; break }
    }
    if (!match) {
      match = {
        answer: `AI-generated answer for "${query}": Information about this topic is being indexed. Please try searching for topics like "Tamil cinema", "Chennai", or "Tamil food".`,
        sources: ['VAANJAY AI Index'],
      }
    }
    setResult(match)
    setLoading(false)
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border">
        <h1 className="text-lg font-bold text-text-primary">{isTamil ? 'AI தேடல்' : 'AI Search'}</h1>
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && search()}
            placeholder={isTamil ? 'கேள்வி கேளுங்கள்...' : 'Ask a question...'}
            className="flex-1 px-4 py-3 bg-white border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
          <button onClick={search} disabled={loading || !query.trim()}
            className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-50">
            {loading ? '...' : (isTamil ? 'தேடு' : 'Search')}
          </button>
        </div>

        {loading && (
          <div className="bg-surface-secondary rounded-xl p-6 animate-pulse">
            <div className="h-4 bg-surface rounded w-3/4 mb-3" />
            <div className="h-4 bg-surface rounded w-1/2 mb-3" />
            <div className="h-4 bg-surface rounded w-2/3" />
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4">
            <div className="bg-surface-secondary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-semibold text-text-primary">{isTamil ? 'AI பதில்' : 'AI Answer'}</span>
              </div>
              <p className="text-sm text-text-primary leading-relaxed">{result.answer}</p>
            </div>
            <div className="bg-surface-secondary rounded-xl p-4">
              <h3 className="text-xs font-semibold text-text-muted mb-2">{isTamil ? 'ஆதாரங்கள்' : 'Sources'}</h3>
              {result.sources.map((s, i) => (
                <p key={i} className="text-xs text-primary mb-1">- {s}</p>
              ))}
            </div>
          </div>
        )}

        {searched && !loading && !result && (
          <p className="text-center text-text-muted text-sm py-8">{isTamil ? 'முடிவுகள் எதுவுமில்லை' : 'No results found'}</p>
        )}

        {!searched && (
          <div className="text-center py-8">
            <svg className="w-16 h-16 text-text-muted/30 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm text-text-muted">{isTamil ? 'எதையும் கேளுங்கள்...' : 'Ask anything about Tamil Nadu, culture, cinema...'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
