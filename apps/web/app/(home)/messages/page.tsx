'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import api from '@/lib/api'
import { useAuth } from '@/components/AuthProvider'
import { MessagesSkeleton } from '@/components/Skeleton'
import { useWebSocket } from '@/hooks/useWebSocket'

const TAMIL_STICKERS = [
  { id: 'st1', label: 'Vanakkam', text: 'வணக்கம்', category: 'greeting' },
  { id: 'st2', label: 'Nandri', text: 'நன்றி', category: 'greeting' },
  { id: 'st3', label: 'Romba Sandhosham', text: 'ரொம்ப சந்தோஷம்', category: 'feeling' },
  { id: 'st4', label: 'Super', text: 'சூப்பர்', category: 'reaction' },
  { id: 'st5', label: 'Semma', text: 'செம்மை', category: 'reaction' },
  { id: 'st6', label: 'Azhagu', text: 'அழகு', category: 'reaction' },
  { id: 'st7', label: 'Sari', text: 'சரி', category: 'response' },
  { id: 'st8', label: 'Ponga', text: 'போங்க', category: 'response' },
  { id: 'st9', label: 'Vanga', text: 'வாங்க', category: 'greeting' },
  { id: 'st10', label: 'Sapida Varen', text: 'சாப்பிட வரேன்', category: 'food' },
  { id: 'st11', label: 'Nalla Iruku', text: 'நல்லா இருக்கு', category: 'reaction' },
  { id: 'st12', label: 'Seri da', text: 'சரி டா', category: 'response' },
  { id: 'st13', label: 'Konjam Poru', text: 'கொஞ்சம் பொறு', category: 'response' },
  { id: 'st14', label: 'Super ah Iruku', text: 'சூப்பரா இருக்கு', category: 'reaction' },
  { id: 'st15', label: 'Nalla Velai', text: 'நல்ல வேலை', category: 'reaction' },
  { id: 'st16', label: 'Rojave', text: 'ரோஜாவே', category: 'love' },
  { id: 'st17', label: 'En Uyire', text: 'என் உயிரே', category: 'love' },
  { id: 'st18', label: 'Kanna', text: 'கண்ணா', category: 'love' },
  { id: 'st19', label: 'Machan', text: 'மச்சான்', category: 'friendly' },
  { id: 'st20', label: 'Machi', text: 'மச்சி', category: 'friendly' },
  { id: 'st21', label: 'Sema Thala', text: 'செம தலை', category: 'praise' },
  { id: 'st22', label: 'Namma Alright', text: 'நம்ம ஆல்ரைட்', category: 'response' },
  { id: 'st23', label: 'Parthu Ponga', text: 'பார்த்து போங்க', category: 'warning' },
  { id: 'st24', label: 'Adhu Vera Level', text: 'அது வேற லெவல்', category: 'reaction' },
]

const stickerCategories = [
  { id: 'greeting', label: 'வாழ்த்துக்கள்' },
  { id: 'reaction', label: 'உணர்வுகள்' },
  { id: 'response', label: 'பதில்கள்' },
  { id: 'love', label: 'காதல்' },
  { id: 'friendly', label: 'நட்பு' },
  { id: 'food', label: 'உணவு' },
  { id: 'praise', label: 'பாராட்டு' },
  { id: 'warning', label: 'எச்சரிக்கை' },
]

export default function MessagesPage() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [conversations, setConversations] = useState<any[]>([])
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [showStickers, setShowStickers] = useState(false)
  const [stickerCat, setStickerCat] = useState('greeting')
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [chatInput, setChatInput] = useState('')
  const [stickerMsg, setStickerMsg] = useState('')
  const [initialized, setInitialized] = useState(false)
  const [loading, setLoading] = useState(true)

  const { send: wsSend, subscribe: wsSubscribe } = useWebSocket()

  useEffect(() => {
    const unsub = wsSubscribe('message', (event: any) => {
      if (event.conversation_id === selectedConv && event.sender_username !== user?.username) {
        setChatMessages(prev => {
          const exists = prev.some(m => m.id === event.id)
          if (exists) return prev
          const newMsg = { id: event.id, text: event.text, sender: event.sender_username, time: event.created_at }
          const updated = [...prev, newMsg]
          saveMessages(selectedConv!, updated)
          return updated
        })
      }
    })
    return () => unsub?.()
  }, [selectedConv, user])

  const getMessages = (convId: string) => {
    try {
      const raw = localStorage.getItem('vaanjay_chats_' + convId)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  }

  const saveMessages = (convId: string, msgs: any[]) => {
    localStorage.setItem('vaanjay_chats_' + convId, JSON.stringify(msgs))
  }

  const notifyRecipient = (text: string) => {
    try {
      const conv = conversations.find(c => c.id === selectedConv)
      if (!conv || !conv.username) return
      const notifs = JSON.parse(localStorage.getItem('vaanjay_notifications') || '[]')
      notifs.unshift({
        id: 'notif_' + Date.now(),
        type: 'message',
        actor_name: user?.username,
        message: text.length > 60 ? text.slice(0, 60) + '...' : text,
        link: `/messages?user=${user?.username}`,
        created_at: new Date().toISOString(),
        read: false,
      })
      localStorage.setItem('vaanjay_notifications', JSON.stringify(notifs))
    } catch {}
  }

  const openConversation = (conv: any) => {
    setSelectedConv(conv.id)
    setShowStickers(false)
    const saved = getMessages(conv.id)
    setChatMessages(saved.length ? saved : [])
  }

  const startConversation = (targetUser: any) => {
    const existing = conversations.find(c => c.username === targetUser.username)
    if (existing) {
      openConversation(existing)
      return
    }
    const newConv = {
      id: 'conv_' + Date.now(),
      username: targetUser.username,
      full_name: targetUser.full_name || targetUser.username,
      is_online: false,
      last_message: '',
      last_message_at: new Date().toISOString(),
    }
    setConversations(prev => {
      const updated = [newConv, ...prev]
      localStorage.setItem('vaanjay_conversations', JSON.stringify(updated))
      return updated
    })
    setSelectedConv(newConv.id)
    setShowStickers(false)
    setChatMessages([])
  }

  useEffect(() => {
    api.get('/messages/conversations').then(r => {
      if (r.data?.data?.length) { setConversations(r.data.data); setLoading(false); return }
      throw new Error()
    }).catch(() => {
      try {
        const raw = localStorage.getItem('vaanjay_conversations')
        if (raw) setConversations(JSON.parse(raw))
      } catch {}
      try {
        const raw = localStorage.getItem('vaanjay_users')
        if (raw) {
          const parsed = JSON.parse(raw)
          const filtered = parsed.filter((u: any) => u.username !== 'admin' && u.username !== user?.username)
          setAllUsers(filtered)
          const targetUser = searchParams?.get('user')
          if (targetUser && !initialized) {
            setInitialized(true)
            const found = filtered.find((u: any) => u.username === targetUser)
            if (found) {
              setTimeout(() => startConversation(found), 100)
            }
          }
        }
      } catch {}
      setLoading(false)
    })
  }, [user, searchParams])

  const filteredUsers = search.trim()
    ? allUsers.filter(u =>
        u.username?.toLowerCase().includes(search.toLowerCase()) ||
        u.full_name?.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const filtered = search
    ? conversations.filter(c =>
        c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        c.username?.toLowerCase().includes(search.toLowerCase())
      )
    : conversations

  const sendSticker = (sticker: any) => {
    setStickerMsg(`Sent: ${sticker.text}`)
    setTimeout(() => setStickerMsg(''), 2000)
    const msg = {
      id: Date.now().toString(),
      text: sticker.text,
      is_sticker: true,
      sender: user?.username,
      time: new Date().toISOString(),
    }
    const updated = [...chatMessages, msg]
    setChatMessages(updated)
    saveMessages(selectedConv!, updated)
    notifyRecipient(sticker.text)
    wsSend({ type: 'message', conversation_id: selectedConv, sender_username: user?.username, text: sticker.text, id: msg.id, created_at: msg.time, is_sticker: true })
    setShowStickers(false)
  }

  const sendMessage = () => {
    if (!chatInput.trim()) return
    const msg = {
      id: Date.now().toString(),
      text: chatInput.trim(),
      sender: user?.username,
      time: new Date().toISOString(),
    }
    const updated = [...chatMessages, msg]
    setChatMessages(updated)
    saveMessages(selectedConv!, updated)
    notifyRecipient(chatInput.trim())
    wsSend({ type: 'message', conversation_id: selectedConv, sender_username: user?.username, text: chatInput.trim(), id: msg.id, created_at: msg.time })
    setChatInput('')
  }

  const filteredStickers = TAMIL_STICKERS.filter(s => s.category === stickerCat)

  if (selectedConv) {
    const conv = conversations.find(c => c.id === selectedConv)
  if (loading) return <MessagesSkeleton />

  return (
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-white">
          <button onClick={() => setSelectedConv(null)} className="text-text-secondary hover:text-text-primary p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {conv?.username?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary truncate">@{conv?.username || 'User'}</p>
            {conv?.is_online && <p className="text-xs text-success">Online</p>}
          </div>
          <button className="text-text-secondary hover:text-text-primary p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </button>
          <Link href={`/call/${conv?.username}?type=audio`} className="text-text-secondary hover:text-primary p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          </Link>
          <Link href={`/call/${conv?.username}?type=video`} className="text-text-secondary hover:text-primary p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          </Link>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-secondary">
          {chatMessages.map(m => (
            <div key={m.id} className={`flex ${m.sender === user?.username ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] ${m.is_sticker ? '' : 'px-3 py-2 rounded-2xl'} ${
                m.sender === user?.username ? 'bg-primary text-white rounded-br-sm' : 'bg-white border border-border text-text-primary rounded-bl-sm'
              }`}>
                {m.is_sticker ? (
                  <div className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                    <p className="text-lg font-bold text-primary">{m.text}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">Tamil sticker</p>
                  </div>
                ) : (
                  <p className="text-sm">{m.text}</p>
                )}
              </div>
            </div>
          ))}
          {stickerMsg && <p className="text-xs text-text-muted text-center">{stickerMsg}</p>}
        </div>

        {/* Sticker picker */}
        {showStickers && (
          <div className="border-t border-border bg-white">
            <div className="flex gap-1 px-3 py-2 overflow-x-auto border-b border-border">
              {stickerCategories.map(cat => (
                <button key={cat.id} onClick={() => setStickerCat(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                    stickerCat === cat.id ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-hover'
                  }`}>{cat.label}</button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-2 p-3 max-h-48 overflow-y-auto">
              {filteredStickers.map(s => (
                <button key={s.id} onClick={() => sendSticker(s)}
                  className="aspect-square flex items-center justify-center p-1 bg-surface-secondary rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center">
                  <span className="text-xs font-semibold text-text-primary leading-tight">{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-white">
          <button onClick={() => setShowStickers(!showStickers)}
            className={`p-2 rounded-lg transition-colors ${showStickers ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:bg-surface-hover'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <input type="text" placeholder="Type a message..."
            value={chatInput} onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 px-4 py-2 bg-surface-secondary rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none" />
          <button onClick={sendMessage} disabled={!chatInput.trim()}
            className="p-2 text-primary hover:opacity-80 disabled:opacity-30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold text-text-primary">{user?.username || 'Messages'}</h1>
          <div className="flex items-center gap-1">
            <button className="text-text-secondary hover:text-text-primary p-1.5 rounded-lg hover:bg-surface-hover" title="Tamil Stickers">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </button>
            <button className="text-primary hover:opacity-80 p-1.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-surface-secondary rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search messages..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm bg-transparent text-text-primary placeholder-text-muted focus:outline-none" />
        </div>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {filtered.length === 0 && (
          <div className="px-4 py-4 text-center text-text-secondary text-sm">
            {search ? (
              <div>
                <p className="mb-3">No conversations match your search</p>
                {filteredUsers.length > 0 && (
                  <div className="text-left space-y-2">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Search results</p>
                    {filteredUsers.map(u => (
                      <button key={u.id} onClick={() => startConversation(u)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-surface-secondary transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {u.username?.charAt(0) || 'U'}
                        </div>
                        <div className="text-left min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">@{u.username}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              'No messages yet. Start a conversation!'
            )}
          </div>
        )}
        {filtered.map(conv => (
          <button key={conv.id} onClick={() => openConversation(conv)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary transition-colors text-left">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 relative">
              {conv.username?.charAt(0) || 'U'}
              {conv.is_online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-text-primary truncate">@{conv.username}</span>
                <span className="text-xs text-text-muted flex-shrink-0">
                  {conv.last_message_at ? new Date(conv.last_message_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                </span>
              </div>
              <p className="text-sm text-text-muted truncate">
                {conv.last_message || 'No messages yet'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
