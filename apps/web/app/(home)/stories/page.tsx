'use client'

import { useState } from 'react'

export default function StoriesPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const stories = [
    { id: '1', user: 'User 1' },
    { id: '2', user: 'User 2' },
    { id: '3', user: 'User 3' },
  ]

  const current = stories[currentIndex]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/30 rounded">
            <div className={`h-full bg-white rounded ${i === currentIndex ? 'w-full' : i < currentIndex ? 'w-full' : 'w-0'}`}
              style={i === currentIndex ? { animation: 'progress 5s linear forwards' } : undefined} />
          </div>
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <p className="text-white text-lg">Story {currentIndex + 1}</p>
      </div>

      <div className="absolute bottom-20 left-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20" />
        <p className="text-white text-sm font-semibold">{current?.user}</p>
        <p className="text-white/60 text-xs">2h ago</p>
      </div>

      <div className="absolute bottom-20 right-4">
        <button onClick={() => setCurrentIndex(prev => Math.min(prev + 1, stories.length - 1))}
          className="bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white/30">Reply</button>
      </div>

      <div className="absolute inset-0 flex">
        <div className="flex-1" onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))} />
        <div className="flex-1" onClick={() => {
          if (currentIndex < stories.length - 1) setCurrentIndex(prev => prev + 1)
        }} />
      </div>

      <style>{`@keyframes progress { from { width: 0%; } to { width: 100%; } }`}</style>
    </div>
  )
}
