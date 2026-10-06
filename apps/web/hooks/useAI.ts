'use client'

import { useState } from 'react'

const CAPTION_TEMPLATES = [
  'Beautiful {time} in {location} #tamilnadu',
  'Missing the vibes of {location} today',
  'Nothing beats {activity} with good company',
  'Life is better when you are laughing #tamil',
  'Grateful for moments like these in {location}',
  'Monday mood: {activity} all day',
  'Exploring the streets of {location} #travel',
  'Good food, good mood #tamilnadu #foodie',
  'When {activity} becomes therapy #selfcare',
]

const IMAGE_STYLES = ['vintage', 'cinematic', 'sketch', 'oil_painting', 'cartoon', 'neon']

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateCaptions = async (context: { time?: string; location?: string; activity?: string }): Promise<string[]> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 800))
      const captions = CAPTION_TEMPLATES.map(t =>
        t.replace('{time}', context.time || 'evening')
         .replace('{location}', context.location || 'Tamil Nadu')
         .replace('{activity}', context.activity || 'chilling')
      )
      return captions.slice(0, 4)
    } catch (e) {
      setError('Failed to generate captions')
      return []
    } finally {
      setLoading(false)
    }
  }

  const restyleImage = async (imageData: string, style: string): Promise<string> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 1500))
      if (!IMAGE_STYLES.includes(style)) throw new Error('Unknown style')
      return imageData
    } catch (e) {
      setError('Failed to restyle image')
      return imageData
    } finally {
      setLoading(false)
    }
  }

  const textToVideo = async (text: string): Promise<string> => {
    setLoading(true)
    setError(null)
    try {
      await new Promise(r => setTimeout(r, 2000))
      return 'mock_video_url_' + Date.now()
    } catch (e) {
      setError('Failed to generate video')
      return ''
    } finally {
      setLoading(false)
    }
  }

  return { generateCaptions, restyleImage, textToVideo, loading, error }
}
