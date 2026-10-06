'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { addXP } from '@/lib/gamification'
import { useAI } from '@/hooks/useAI'

export default function CreatePage() {
  const { user } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [type, setType] = useState<'post' | 'vibez'>('post')
  const [caption, setCaption] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [location, setLocation] = useState('')
  const [tags, setTags] = useState('')
  const [posting, setPosting] = useState(false)
  const [pollOptions, setPollOptions] = useState<string[]>([])
  const [showPoll, setShowPoll] = useState(false)
  const [drafts, setDrafts] = useState<any[]>([])
  const [showDrafts, setShowDrafts] = useState(false)
  const [aiModal, setAiModal] = useState(false)
  const [aiCaptions, setAiCaptions] = useState<string[]>([])
  const [aiStyle, setAiStyle] = useState('cinematic')
  const { generateCaptions, restyleImage, textToVideo, loading: aiLoading } = useAI()

  useEffect(() => {
    try {
      const raw = localStorage.getItem('vaanjay_drafts')
      if (raw) setDrafts(JSON.parse(raw))
    } catch {}
  }, [])

  const saveDraft = () => {
    const draft = { id: 'draft_' + Date.now(), caption, location, tags, type, pollOptions }
    const existing = JSON.parse(localStorage.getItem('vaanjay_drafts') || '[]')
    existing.unshift(draft)
    localStorage.setItem('vaanjay_drafts', JSON.stringify(existing))
    setDrafts(existing)
    setCaption(''); setLocation(''); setTags(''); setFile(null); setPreview(''); setPollOptions([]); setShowPoll(false)
  }

  const loadDraft = (draft: any) => {
    setCaption(draft.caption || ''); setLocation(draft.location || ''); setTags(draft.tags || '')
    if (draft.pollOptions?.length >= 2) { setPollOptions(draft.pollOptions); setShowPoll(true) }
  }

  const deleteDraft = (id: string) => {
    const remaining = drafts.filter(d => d.id !== id)
    setDrafts(remaining)
    localStorage.setItem('vaanjay_drafts', JSON.stringify(remaining))
  }

  const addPollOption = () => {
    if (pollOptions.length < 6) setPollOptions([...pollOptions, ''])
  }

  const updatePollOption = (idx: number, val: string) => {
    const next = [...pollOptions]; next[idx] = val; setPollOptions(next)
  }

  const removePollOption = (idx: number) => {
    setPollOptions(pollOptions.filter((_, i) => i !== idx))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (type === 'post' && f.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let w = img.width, h = img.height
          const maxDim = 1920
          if (w > maxDim || h > maxDim) {
            const ratio = Math.min(maxDim / w, maxDim / h)
            w = Math.round(w * ratio)
            h = Math.round(h * ratio)
          }
          canvas.width = w; canvas.height = h
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, w, h)
          canvas.toBlob(blob => {
            if (blob && blob.size < f.size) {
              const compressed = new File([blob], f.name, { type: 'image/jpeg' })
              setFile(compressed)
            } else {
              setFile(f)
            }
          }, 'image/jpeg', 0.85)
          setPreview(ev.target?.result as string)
        }
        img.src = ev.target?.result as string
      }
      reader.readAsDataURL(f)
    } else {
      setFile(f)
      const reader = new FileReader()
      reader.onload = (ev) => setPreview(ev.target?.result as string)
      reader.readAsDataURL(f)
    }
  }

  const handleSubmit = async () => {
    if (type === 'vibez' && !file) return
    if (!file && !caption.trim()) return
    setPosting(true)
    try {
      const formData = new FormData()
      if (file) formData.append('media', file)
      formData.append('caption', caption)
      formData.append('type', type)
      if (location) formData.append('location', location)
      if (tags) formData.append('tags', tags)

      const token = localStorage.getItem('vaanjay_token') || localStorage.getItem('access_token')
      const res = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      })
      if (res.ok) {
        setPosting(false)
        router.push(user ? `/${user.username}` : '/feed')
        return
      }
    } catch {}

    // Save locally
    const pollOpts = pollOptions.filter(o => o.trim())
    const post = {
      id: 'post_' + Date.now(),
      caption, location, tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      type, media_url: preview, full_name: user?.full_name || user?.username,
      username: user?.username, like_count: 0, comment_count: 0,
      created_at: new Date().toISOString(), user_id: user?.id,
      poll: pollOpts.length >= 2 ? { options: pollOpts, votes: {} } : undefined,
    }
    const existing = JSON.parse(localStorage.getItem('vaanjay_posts') || '[]')
    existing.unshift(post)
    localStorage.setItem('vaanjay_posts', JSON.stringify(existing))

    if (user?.username) addXP(user.username, 25, 'first_post')

    setPosting(false)
    router.push(user ? `/${user.username}` : '/feed')
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="text-sm text-text-secondary hover:text-text-primary">Cancel</button>
          <h1 className="text-lg font-bold text-text-primary">Create</h1>
          <button onClick={handleSubmit} disabled={posting || (!file && !caption)}
            className="px-4 py-1.5 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50 hover:opacity-90 transition-opacity">
            {posting ? 'Posting...' : type === 'post' ? 'Share' : 'Upload'}
          </button>
          <button onClick={saveDraft} disabled={posting || (!caption.trim() && !file)}
            className="px-3 py-1.5 border border-border text-text-secondary rounded-lg text-xs font-medium hover:bg-surface-hover transition-colors disabled:opacity-30">
            Draft
          </button>
        </div>
      </div>

      <div className="flex border-b border-border">
        <button onClick={() => { setType('post'); setFile(null); setPreview(''); setCaption(''); setLocation(''); setTags('') }}
          className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${type === 'post' ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}>
          Post
        </button>
        <button onClick={() => { setType('vibez'); setFile(null); setPreview(''); setCaption(''); setLocation(''); setTags('') }}
          className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${type === 'vibez' ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}>
          Vibez
        </button>
      </div>

      <div className="p-4 space-y-4">
        <div onClick={() => fileInputRef.current?.click()}
          className="aspect-square max-w-sm mx-auto bg-surface-secondary border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors overflow-hidden">
          {preview ? (
            <img src={preview} alt="" className="w-full h-full object-contain" />
          ) : (
            <>
              <svg className="w-12 h-12 text-text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-sm text-text-muted">Tap to select {type === 'post' ? 'photo' : 'video'}</p>
              <p className="text-xs text-text-muted mt-1">or drag and drop</p>
            </>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept={type === 'post' ? 'image/*' : 'video/*'} className="hidden" onChange={handleFileSelect} />

        <textarea value={caption} onChange={e => setCaption(e.target.value)}
          placeholder="Write a caption..."
          className="w-full px-4 py-3 bg-surface-secondary border border-border rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-primary text-sm resize-none h-24" />

        <div className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2 border border-border">
          <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)}
            placeholder="Add location"
            className="flex-1 text-sm bg-transparent text-text-primary placeholder-text-muted focus:outline-none" />
        </div>

        <div className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2 border border-border">
          <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)}
            placeholder="Add tags (comma separated)"
            className="flex-1 text-sm bg-transparent text-text-primary placeholder-text-muted focus:outline-none" />
        </div>

        {/* AI Assist */}
        <button type="button" onClick={() => {
          setAiModal(true)
          generateCaptions({ time: 'evening', location: location || 'Tamil Nadu' }).then(setAiCaptions)
        }}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          AI Assist
        </button>

        {aiModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setAiModal(false)}>
            <div className="bg-white rounded-2xl p-5 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-text-primary mb-4">AI Assist</h3>
              {aiLoading ? (
                <div className="text-center py-8 text-text-muted text-sm">Generating...</div>
              ) : (
                <>
                  <p className="text-xs font-semibold text-text-muted mb-2">Caption Ideas</p>
                  <div className="space-y-2 mb-4">
                    {aiCaptions.map((c, i) => (
                      <button key={i} onClick={() => { setCaption(c); setAiModal(false) }}
                        className="w-full text-left px-3 py-2 bg-surface-secondary rounded-lg text-sm text-text-primary hover:bg-primary/10 transition-colors">
                        {c}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-text-muted mb-2">Restyle Image</p>
                  <select value={aiStyle} onChange={e => setAiStyle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary mb-2">
                    {['vintage', 'cinematic', 'sketch', 'oil_painting', 'cartoon', 'neon'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button onClick={async () => {
                    if (preview) {
                      const restyled = await restyleImage(preview, aiStyle)
                      setPreview(restyled)
                      setAiModal(false)
                    }
                  }} disabled={!preview}
                    className="w-full py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium disabled:opacity-50">
                    Apply Style
                  </button>
                </>
              )}
              <button onClick={() => setAiModal(false)} className="mt-3 w-full py-2 border border-border text-text-primary rounded-lg text-sm">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Poll toggle */}
        <button type="button" onClick={() => { setShowPoll(!showPoll); if (!showPoll && pollOptions.length === 0) setPollOptions(['', '']) }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${showPoll ? 'bg-primary/10 text-primary' : 'bg-surface-secondary border border-border text-text-secondary hover:text-text-primary'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          {showPoll ? 'Remove Poll' : 'Add Poll'}
        </button>

        {/* Poll options */}
        {showPoll && (
          <div className="space-y-2 pl-2 border-l-2 border-primary/30">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Poll Options</p>
            {pollOptions.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input type="text" value={opt} onChange={e => updatePollOption(idx, e.target.value)}
                  placeholder={`Option ${idx + 1}`}
                  className="flex-1 px-3 py-2 bg-surface-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-primary" />
                {pollOptions.length > 2 && (
                  <button onClick={() => removePollOption(idx)} className="text-text-muted hover:text-error p-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
            ))}
            {pollOptions.length < 6 && (
              <button onClick={addPollOption} className="text-xs text-primary hover:underline">+ Add option</button>
            )}
          </div>
        )}

        {/* Drafts */}
        {drafts.length > 0 && (
          <div>
            <button onClick={() => setShowDrafts(!showDrafts)}
              className="flex items-center gap-2 text-xs text-text-muted hover:text-text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showDrafts ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} /></svg>
              Drafts ({drafts.length})
            </button>
            {showDrafts && (
              <div className="mt-2 space-y-2">
                {drafts.map((d: any) => (
                  <div key={d.id} className="flex items-center gap-2 px-3 py-2 bg-surface-secondary rounded-lg border border-border">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-primary truncate">{d.caption || 'No caption'}</p>
                      <p className="text-[10px] text-text-muted">{d.type} {d.pollOptions?.length ? '| Poll' : ''}</p>
                    </div>
                    <button onClick={() => loadDraft(d)} className="text-xs text-primary hover:underline">Load</button>
                    <button onClick={() => deleteDraft(d.id)} className="text-xs text-text-muted hover:text-error">Del</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
