const SYNC_KEY = 'vaanjay_sync_session'
const CONVERSATIONS_KEY = 'vaanjay_conversations'

export interface SyncSession {
  id: string
  deviceName: string
  deviceType: 'mobile' | 'desktop' | 'tablet'
  lastSynced: string
  createdAt: string
}

export function createSyncSession(deviceName: string, deviceType: SyncSession['deviceType']): SyncSession {
  const sessions = getSyncSessions()
  const session: SyncSession = {
    id: 'sync_' + Date.now(),
    deviceName,
    deviceType,
    lastSynced: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }
  sessions.push(session)
  localStorage.setItem(SYNC_KEY, JSON.stringify(sessions))
  return session
}

export function getSyncSessions(): SyncSession[] {
  try {
    return JSON.parse(localStorage.getItem(SYNC_KEY) || '[]')
  } catch {
    return []
  }
}

export function removeSyncSession(sessionId: string) {
  const sessions = getSyncSessions().filter(s => s.id !== sessionId)
  localStorage.setItem(SYNC_KEY, JSON.stringify(sessions))
}

export function syncConversations(): boolean {
  try {
    const conversations = localStorage.getItem(CONVERSATIONS_KEY)
    if (!conversations) return false
    localStorage.setItem(SYNC_KEY + '_last', JSON.stringify({
      conversations: JSON.parse(conversations),
      syncedAt: new Date().toISOString(),
    }))
    const sessions = getSyncSessions()
    sessions.forEach(s => {
      s.lastSynced = new Date().toISOString()
    })
    localStorage.setItem(SYNC_KEY, JSON.stringify(sessions))
    return true
  } catch {
    return false
  }
}

export function getLastSyncData(): any {
  try {
    return JSON.parse(localStorage.getItem(SYNC_KEY + '_last') || 'null')
  } catch {
    return null
  }
}
