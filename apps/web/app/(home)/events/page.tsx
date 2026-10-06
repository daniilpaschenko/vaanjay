'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useI18n } from '@/hooks/useI18n'

const EVENTS_KEY = 'vaanjay_events'

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  host: string
  attendees: string[]
  maxAttendees: number
  createdAt: string
}

export default function EventsPage() {
  const { user } = useAuth()
  const { isTamil } = useI18n()
  const [events, setEvents] = useState<Event[]>(() => {
    try { return JSON.parse(localStorage.getItem(EVENTS_KEY) || '[]') } catch { return [] }
  })
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('social')
  const [maxCap, setMaxCap] = useState(100)
  const [filter, setFilter] = useState('all')

  const createEvent = () => {
    if (!title.trim() || !date || !user?.username) return
    const event: Event = {
      id: 'evt_' + Date.now(),
      title: title.trim(),
      description: desc.trim(),
      date,
      time,
      location: location.trim(),
      category,
      host: user.username,
      attendees: [user.username],
      maxAttendees: maxCap,
      createdAt: new Date().toISOString(),
    }
    const updated = [event, ...events]
    setEvents(updated)
    localStorage.setItem(EVENTS_KEY, JSON.stringify(updated))
    setTitle('')
    setDesc('')
    setDate('')
    setTime('')
    setLocation('')
    setShowCreate(false)
  }

  const rsvp = (eventId: string) => {
    if (!user?.username) return
    const updated = events.map(e => {
      if (e.id === eventId) {
        const already = e.attendees.includes(user.username)
        const attendees = already
          ? e.attendees.filter(a => a !== user.username)
          : [...e.attendees, user.username]
        return { ...e, attendees }
      }
      return e
    })
    setEvents(updated)
    localStorage.setItem(EVENTS_KEY, JSON.stringify(updated))
  }

  const now = new Date()
  const filtered = events.filter(e => {
    const eventDate = new Date(e.date)
    if (filter === 'upcoming') return eventDate >= now
    if (filter === 'past') return eventDate < now
    if (filter === 'hosted') return e.host === user?.username
    return true
  })

  return (
    <div className="pb-8">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h1 className="text-lg font-bold text-text-primary">{isTamil ? 'நிகழ்வுகள்' : 'Events'}</h1>
        <button onClick={() => setShowCreate(true)}
          className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold">
          {isTamil ? 'உருவாக்கு' : 'Create'}
        </button>
      </div>

      <div className="flex border-b border-border">
        {(['all', 'upcoming', 'past', 'hosted'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`flex-1 py-3 text-xs font-medium text-center border-b-2 transition-colors ${
              filter === f ? 'border-primary text-primary' : 'border-transparent text-text-secondary'
            }`}>
            {f === 'all' ? (isTamil ? 'அனைத்தும்' : 'All')
              : f === 'upcoming' ? (isTamil ? 'வரவிருக்கும்' : 'Upcoming')
              : f === 'past' ? (isTamil ? 'முடிந்தவை' : 'Past')
              : (isTamil ? 'எனது நிகழ்வுகள்' : 'Hosted')}
          </button>
        ))}
      </div>

      {showCreate && (
        <div className="p-4 border-b border-border space-y-3">
          <input type="text" placeholder={isTamil ? 'நிகழ்வு தலைப்பு' : 'Event title'} value={title} onChange={e => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          <textarea placeholder={isTamil ? 'விளக்கம்' : 'Description'} value={desc} onChange={e => setDesc(e.target.value)} rows={2}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary resize-none" />
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
            <input type="time" value={time} onChange={e => setTime(e.target.value)}
              className="px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          </div>
          <input type="text" placeholder={isTamil ? 'இடம்' : 'Location'} value={location} onChange={e => setLocation(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          <div className="flex gap-2">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary">
              <option value="social">{isTamil ? 'சமூக' : 'Social'}</option>
              <option value="cultural">{isTamil ? 'கலாச்சார' : 'Cultural'}</option>
              <option value="music">{isTamil ? 'இசை' : 'Music'}</option>
              <option value="tech">{isTamil ? 'தொழில்நுட்பம்' : 'Tech'}</option>
              <option value="sports">{isTamil ? 'விளையாட்டு' : 'Sports'}</option>
            </select>
            <input type="number" placeholder={isTamil ? 'அதிகபட்சம்' : 'Max'} value={maxCap} onChange={e => setMaxCap(Number(e.target.value))} min={1}
              className="w-20 px-3 py-2 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary" />
          </div>
          <button onClick={createEvent} disabled={!title.trim() || !date}
            className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-50">
            {isTamil ? 'நிகழ்வை உருவாக்கு' : 'Create Event'}
          </button>
        </div>
      )}

      <div className="p-4 space-y-3">
        {filtered.map(event => {
          const isAttending = user?.username ? event.attendees.includes(user.username) : false
          const isFull = event.attendees.length >= event.maxAttendees
          return (
            <div key={event.id} className="bg-surface-secondary rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{event.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full mt-1 inline-block">{event.category}</span>
                </div>
                <span className="text-xs text-text-muted">{event.attendees.length}/{event.maxAttendees}</span>
              </div>
              <p className="text-xs text-text-muted mb-2">{event.description}</p>
              <div className="flex items-center gap-3 text-xs text-text-muted mb-3">
                <span>{new Date(event.date).toLocaleDateString()} {event.time}</span>
                {event.location && <span>{event.location}</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => rsvp(event.id)}
                  disabled={isFull && !isAttending}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-50 ${isAttending ? 'border border-primary text-primary' : 'bg-primary text-white'}`}>
                  {isAttending ? (isTamil ? 'கலந்துகொள்கிறேன்' : 'Attending') : (isTamil ? 'பதிவு செய்' : 'RSVP')}
                </button>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-center text-text-muted text-sm py-8">{isTamil ? 'நிகழ்வுகள் இல்லை' : 'No events found'}</p>
        )}
      </div>
    </div>
  )
}
