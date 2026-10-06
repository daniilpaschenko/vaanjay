const LEVELS = [
  { level: 1, label: 'Newcomer', xp: 0 },
  { level: 2, label: 'Active Member', xp: 100 },
  { level: 3, label: 'Regular', xp: 300 },
  { level: 4, label: 'Contributor', xp: 600 },
  { level: 5, label: 'Enthusiast', xp: 1000 },
  { level: 6, label: 'Expert', xp: 2000 },
  { level: 7, label: 'Influencer', xp: 3500 },
  { level: 8, label: 'VIP', xp: 5000 },
  { level: 9, label: 'Legend', xp: 7500 },
  { level: 10, label: 'VAANJAY Icon', xp: 10000 },
]

const BADGES = [
  { id: 'first_post', label: 'First Post', icon: 'P', description: 'Created your first post', xp: 50 },
  { id: 'first_like', label: 'First Like', icon: 'L', description: 'Liked your first post', xp: 10 },
  { id: 'first_follow', label: 'First Follow', icon: 'F', description: 'Got your first follower', xp: 30 },
  { id: 'first_comment', label: 'First Comment', icon: 'C', description: 'Left your first comment', xp: 20 },
  { id: 'popular', label: 'Popular', icon: 'H', description: 'Got 100 likes on a post', xp: 100 },
  { id: 'trending', label: 'Trending', icon: 'T', description: 'Got 500 likes on a post', xp: 250 },
  { id: 'viral', label: 'Viral', icon: 'V', description: 'Got 1000 likes on a post', xp: 500 },
  { id: 'storyteller', label: 'Storyteller', icon: 'S', description: 'Created 5 stories', xp: 75 },
  { id: 'vibez_master', label: 'Vibez Master', icon: 'M', description: 'Created 10 Vibez', xp: 150 },
  { id: 'social_butterfly', label: 'Social Butterfly', icon: 'B', description: 'Followed 10 people', xp: 50 },
  { id: 'conversationalist', label: 'Conversationalist', icon: 'D', description: 'Sent 50 messages', xp: 100 },
  { id: 'supporter', label: 'Supporter', icon: 'U', description: 'Subscribed to a creator', xp: 200 },
]

export function getGamification(username: string) {
  try {
    const raw = localStorage.getItem('vaanjay_gamification_' + username)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { xp: 0, badges: [] as string[], level: 1, label: 'Newcomer' }
}

export function addXP(username: string, amount: number, badgeId?: string) {
  if (!username) return null
  const state = getGamification(username)
  state.xp += amount
  if (badgeId && !state.badges.includes(badgeId)) state.badges.push(badgeId)

  let newLevel = 1
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (state.xp >= LEVELS[i].xp) { newLevel = LEVELS[i].level; state.label = LEVELS[i].label; break }
  }
  state.level = newLevel

  try {
    localStorage.setItem('vaanjay_gamification_' + username, JSON.stringify(state))
  } catch {}
  return state
}

export function getLevelProgress(xp: number) {
  let current = LEVELS[0]
  let next = LEVELS[1]
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) current = LEVELS[i]
    if (xp < LEVELS[i].xp) { next = LEVELS[i]; break }
  }
  const currentXp = current.xp
  const nextXp = next?.xp || currentXp + 1000
  const progress = next ? ((xp - currentXp) / (nextXp - currentXp)) * 100 : 100
  return { current, next, progress: Math.min(progress, 100), xp }
}

export { LEVELS, BADGES }
