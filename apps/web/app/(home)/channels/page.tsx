'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useI18n } from '@/hooks/useI18n'

const CHANNELS_KEY = 'vaanjay_channels'
const SUBS_KEY = 'vaanjay_channels_subs'

interface Channel {
  id: string
  name: string
  description: string
  owner: string
  category: string
  subscriberCount: number
  createdAt: string
}

interface ChannelPost {
  id: string
  channelId: string
  text: string
  from: string
  timestamp: string
}

export default function ChannelsPage() {
  const { user } = useAuth()
  const { isTamil } = useI18n()
  const [channels, setChannels] = useState<Channel[]>(() => {
    try { return JSON.parse(localStorage.getItem(CHANNELS_KEY) || '[]') } catch { return [] }
  })
  const [subs, setSubs] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(SUBS_KEY) || '[]') } catch { return [] }
  })
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState('general')
  const [viewChannel, setViewChannel] = useState<string | null>(null)
  const [postText, setPostText] = useState('')

  const createChannel = () => {
    if (!name.trim() || !user?.username) return
    const channel: Channel = {
      id: 'ch_' + Date.now(),
      name: name.trim(),
      description: desc.trim(),
      owner: user.username,
      category,
      subscriberCount: 1,
      createdAt: new Date().toISOString(),
    }
    const updated = [channel, ...channels]
    setChannels(updated)
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(updated))
    const newSubs = [...subs, channel.id]
    setSubs(newSubs)
    localStorage.setItem(SUBS_KEY, JSON.stringify(newSubs))
    setName('')
    setDesc('')
    setShowCreate(false)
  }

  const toggleSubscribe = (channelId: string) => {
    const isSubbed = subs.includes(channelId)
    const newSubs = isSubbed ? subs.filter(s => s !== channelId) : [...subs, channelId]
    setSubs(newSubs)
    localStorage.setItem(SUBS_KEY, JSON.stringify(newSubs))
    const updated = channels.map(c => {
      if (c.id === channelId) {
        return { ...c, subscriberCount: c.subscriberCount + (isSubbed ? -1 : 1) }
      }
      return c
    })
    setChannels(updated)
    localStorage.setItem(CHANNELS_KEY, JSON.stringify(updated))
  }

  const sendBroadcast = () => {
    if (!postText.trim() || !viewChannel || !user?.username) return
    const postsKey = 'vaanjay_channel_posts_' + viewChannel
    const posts: ChannelPost[] = JSON.parse(localStorage.getItem(postsKey) || '[]')
    posts.unshift({
      id: 'cp_' + Date.now(),
      channelId: viewChannel,
      text: postText.trim(),
      from: user.username,
      timestamp: new Date().toISOString(),
    })
    localStorage.setItem(postsKey, JSON.stringify(posts.slice(0, 200)))
    setPostText('')
  }

  if (viewChannel) {
    const channel = channels.find(c => c.id === viewChannel)
    if (!channel) return <div className="p-4"><p className="text-text-muted">Channel not found</p></div>
    const postsKey = 'vaanjay_channel_posts_' + viewChannel
    const posts: ChannelPost[] = JSON.parse(localStorage.getItem(postsKey) || '[]')
    return (
      <div className="pb-8">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <button onClick={() => setViewChannel(null)} className="text-primary text-sm font-medium">
            {isTamil ? 'பின்' : 'Back'}
          </button>
          <h1 className="text-lg font-bold text-text-primary">{channel.name}</h1>
          <div />
        </div>
        <div className="p-4 border-b border-border">
          <p className="text-xs text-text-muted mb-2">{channel.description}</p>
          <p className="text-xs text-text-muted">{channel.subscriberCount} {isTamil ? 'சந்தாதாரர்கள்' : 'subscribers'}</p>
          <button onClick={() => toggleSubscribe(channel.id)}
            className={`mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold ${subs.includes(channel.id) ? 'border border-primary text-primary' : 'bg-primary text-white'}`}>
            {subs.includes(channel.id) ? (isTamil ? 'குழுவிலகு' : 'Unsubscribe') : (isTamil ? 'சந்தா' : 'Subscribe')}
          </button>
        </div>
        {user?.username === channel.owner && (
          <div className="p-4 border-b border-border flex gap-2">
            <input type="text" placeholder={isTamil ? 'ஒளிபரப்பு இடுகை...' : 'Broadcast post...'} value={postText} onChange={e => setPostText(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
            <button onClick={sendBroadcast} disabled={!postText.trim()}
              className="px-4 py-2 bg-primary text-white rounded-lg text-xs font-semibold disabled:opacity-50">
              {isTamil ? 'அனுப்பு' : 'Send'}
            </button>
          </div>
        )}
        <div className="p-4 space-y-3">
          {posts.map(p => (
            <div key={p.id} className="bg-surface-secondary rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-primary">@{p.from}</span>
                <span className="text-[10px] text-text-muted">{new Date(p.timestamp).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-text-primary">{p.text}</p>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-text-muted text-sm py-8">{isTamil ? 'இன்னும் இடுகைகள் இல்லை' : 'No posts yet'}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="text-lg font-bold text-text-primary">{isTamil ? 'சேனல்கள்' : 'Channels'}</h1>
        <button onClick={() => setShowCreate(true)}
          className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold">
          {isTamil ? 'உருவாக்கு' : 'Create'}
        </button>
      </div>

      {showCreate && (
        <div className="p-4 border-b border-border space-y-3">
          <input type="text" placeholder={isTamil ? 'சேனல் பெயர்' : 'Channel name'} value={name} onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          <input type="text" placeholder={isTamil ? 'விளக்கம்' : 'Description'} value={desc} onChange={e => setDesc(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary">
            <option value="general">{isTamil ? 'பொது' : 'General'}</option>
            <option value="news">{isTamil ? 'செய்திகள்' : 'News'}</option>
            <option value="entertainment">{isTamil ? 'பொழுதுபோக்கு' : 'Entertainment'}</option>
            <option value="tech">{isTamil ? 'தொழில்நுட்பம்' : 'Tech'}</option>
            <option value="sports">{isTamil ? 'விளையாட்டு' : 'Sports'}</option>
          </select>
          <button onClick={createChannel} disabled={!name.trim()}
            className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50">
            {isTamil ? 'சேனலை உருவாக்கு' : 'Create Channel'}
          </button>
        </div>
      )}

      <div className="p-4 space-y-3">
        {channels.map(channel => (
          <div key={channel.id} className="bg-surface-secondary rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-text-primary">{channel.name}</h3>
              <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full">{channel.category}</span>
            </div>
            <p className="text-xs text-text-muted mb-2">{channel.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-muted">{channel.subscriberCount} {isTamil ? 'சந்தாதாரர்கள்' : 'subs'}</span>
              <div className="flex gap-2">
                <button onClick={() => toggleSubscribe(channel.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${subs.includes(channel.id) ? 'border border-primary text-primary' : 'bg-primary text-white'}`}>
                  {subs.includes(channel.id) ? (isTamil ? 'குழுவிலகு' : 'Unsub') : (isTamil ? 'சந்தா' : 'Sub')}
                </button>
                <button onClick={() => setViewChannel(channel.id)}
                  className="px-3 py-1 border border-border text-text-primary rounded-lg text-xs font-medium hover:bg-surface-hover">
                  {isTamil ? 'திற' : 'Open'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {channels.length === 0 && (
          <p className="text-center text-text-muted text-sm py-8">{isTamil ? 'இன்னும் சேனல்கள் இல்லை' : 'No channels yet'}</p>
        )}
      </div>
    </div>
  )
}
