'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

const TAMIL_LIVE_REACTIONS = ['வாழ்த்துக்கள்', 'சூப்பர்', 'அருமை', 'கமெண்ட்', 'லைக்']

export default function LivePage() {
  const { id } = useParams()
  const router = useRouter()
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<{ id: string; user: string; text: string }[]>([])
  const [chatOpen, setChatOpen] = useState(true)
  const [viewerCount] = useState(Math.floor(Math.random() * 200) + 15)

  const sendChat = () => {
    if (!chatInput.trim()) return
    setChatMessages(prev => [...prev, { id: Date.now().toString(), user: 'You', text: chatInput.trim() }])
    setChatInput('')
  }

  const addReaction = (text: string) => {
    setChatMessages(prev => [...prev, { id: Date.now().toString() + Math.random(), user: 'You', text: '❤️ ' + text }])
  }

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-lg px-3 py-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-400 text-xs font-bold tracking-wider">LIVE</span>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 text-xs">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            <span>{viewerCount}</span>
          </div>
        </div>
        <button onClick={() => router.back()}
          className="bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
          Exit
        </button>
      </div>

      {/* Main area */}
      <div className="flex-1 flex gap-0 px-5 pb-5 min-h-0">
        {/* Video area */}
        <div className={`flex-1 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden ${chatOpen ? 'mr-3' : ''}`}>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <p className="text-white/30 text-sm font-medium">Stream will appear here</p>
            <p className="text-white/20 text-xs mt-1">Waiting for broadcaster...</p>
          </div>

          {/* Streamer overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur rounded-xl px-4 py-2.5 border border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-xs font-bold border-2 border-primary/50">
              S
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Streamer Name</p>
              <p className="text-white/50 text-[10px] tracking-wider">TAMIL NADU</p>
            </div>
          </div>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <div className="w-72 flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex-shrink-0">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white text-sm font-semibold">Live Chat</h3>
              <button onClick={() => setChatOpen(false)} className="text-white/40 hover:text-white/70">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {chatMessages.length === 0 && (
                <div className="text-center pt-8">
                  <svg className="w-8 h-8 mx-auto mb-2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                  <p className="text-white/30 text-xs">Be the first to say Vanakkam!</p>
                </div>
              )}
              {chatMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">
                    {msg.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs">
                      <span className="text-primary-light font-semibold">{msg.user}</span>
                      <span className="text-white/70 ml-1.5">{msg.text}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-white/10 space-y-2">
              <div className="flex gap-2">
                {TAMIL_LIVE_REACTIONS.map(r => (
                  <button key={r} onClick={() => addReaction(r)}
                    className="flex-1 text-[10px] text-white/60 bg-white/5 hover:bg-white/10 rounded-lg py-1.5 font-medium transition-colors">
                    {r}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendChat()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-white/10 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-primary/50" />
                <button onClick={sendChat}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary-dark transition-colors">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chat toggle when closed */}
      {!chatOpen && (
        <div className="px-5 pb-5">
          <button onClick={() => setChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/60 text-sm hover:text-white hover:bg-white/10 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Show Chat ({chatMessages.length})
          </button>
        </div>
      )}
    </div>
  )
}
