interface Bot {
  id: string
  name: string
  username: string
  description: string
  webhookUrl: string
  owner: string
  active: boolean
  createdAt: string
}

interface BotMessage {
  text: string
  from: string
  to: string
  timestamp: string
}

const BOTS_KEY = 'vaanjay_bots'

function getBots(): Bot[] {
  try {
    return JSON.parse(localStorage.getItem(BOTS_KEY) || '[]')
  } catch {
    return []
  }
}

function saveBots(bots: Bot[]) {
  localStorage.setItem(BOTS_KEY, JSON.stringify(bots))
}

export function registerBot(bot: Omit<Bot, 'id' | 'createdAt'>): Bot {
  const newBot: Bot = {
    ...bot,
    id: 'bot_' + Date.now(),
    createdAt: new Date().toISOString(),
  }
  const bots = getBots()
  bots.push(newBot)
  saveBots(bots)
  return newBot
}

export function getBotByUsername(username: string): Bot | undefined {
  return getBots().find(b => b.username === username)
}

export function getAllBots(): Bot[] {
  return getBots()
}

export function sendBotMessage(botId: string, message: BotMessage): boolean {
  try {
    const bot = getBots().find(b => b.id === botId)
    if (!bot || !bot.active) return false
    const key = 'vaanjay_bot_log_' + botId
    const logs: BotMessage[] = JSON.parse(localStorage.getItem(key) || '[]')
    logs.push(message)
    localStorage.setItem(key, JSON.stringify(logs.slice(-100)))
    return true
  } catch {
    return false
  }
}

export function seedSampleBots() {
  const bots = getBots()
  if (bots.length > 0) return
  registerBot({
    name: 'Tamil News Bot',
    username: 'tamilnewsbot',
    description: 'Latest Tamil news updates every hour',
    webhookUrl: 'https://api.vaanjay.com/bots/tamilnewsbot',
    owner: 'system',
    active: true,
  })
  registerBot({
    name: 'Weather Bot',
    username: 'weatherbot',
    description: 'Tamil Nadu weather updates and alerts',
    webhookUrl: 'https://api.vaanjay.com/bots/weatherbot',
    owner: 'system',
    active: true,
  })
}
