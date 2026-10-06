const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const http = require('http')
const { WebSocketServer } = require('ws')
const { store } = require('./data')

const app = express()
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const JWT_SECRET = 'vaanjay-dev-secret'
const JWT_REFRESH_SECRET = 'vaanjay-refresh-secret'
const PORT = process.env.APP_PORT || 8080

app.use(cors({ origin: '*', credentials: true }))
app.use(express.json({ limit: '100mb' }))

function ok(data, status = 200) {
  return { status: 'success', data }
}

function err(msg, status = 400) {
  return { status: 'error', error: msg }
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json(err('Missing or invalid token', 401))
  }
  try {
    const decoded = jwt.verify(authHeader.slice(7), JWT_SECRET)
    req.user = decoded
    next()
  } catch {
    return res.status(401).json(err('Invalid token', 401))
  }
}

function adminAuth(req, res, next) {
  auth(req, res, () => {
    if (!req.user.is_admin) return res.status(403).json(err('Admin only'))
    next()
  })
}

function findUser(username) {
  return store.users.find(u => u.username === username) || null
}

function getUserByCredential(credential) {
  return store.users.find(u =>
    u.username === credential || u.email === credential || u.phone_number === credential
  ) || null
}

// ─── Health ──────────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json(ok({ app: 'VAANJAY', version: '1.0.0', time: Date.now() }))
})

// ─── Auth ────────────────────────────────────────────────
app.post('/api/v1/auth/register', (req, res) => {
  const { username, email, password, full_name, language_preference, district } = req.body
  if (!username || !email || !password) return res.status(400).json(err('Missing required fields'))
  if (store.users.find(u => u.username === username)) return res.status(400).json(err('Username taken'))
  if (store.users.find(u => u.email === email)) return res.status(400).json(err('Email already registered'))
  const user = {
    id: `user${uuidv4().slice(0, 8)}`,
    username, email, phone_number: '', full_name: full_name || '',
    bio: '', profile_pic_url: '', is_verified: false, is_admin: false,
    language_preference: language_preference || 'ta',
    district: district || '',
    verification_type: null,
    password: `$2a$12$${password}`,
    created_at: new Date().toISOString(),
  }
  store.users.push(user)
  store.users_by_username[username] = user
  const access_token = jwt.sign({ id: user.id, username: user.username, is_admin: false }, JWT_SECRET, { expiresIn: '15m' })
  const refresh_token = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  const { password: _, ...safe } = user
  res.status(201).json(ok({ user: safe, access_token, refresh_token }))
})

app.post('/api/v1/auth/login', (req, res) => {
  const { credential, password } = req.body
  const user = getUserByCredential(credential)
  if (!user) return res.status(401).json(err('Invalid credentials'))
  const expected = user.password.startsWith('$2a$12$') ? user.password.slice(7) : user.password
  if (expected !== password) return res.status(401).json(err('Invalid credentials'))
  const access_token = jwt.sign({ id: user.id, username: user.username, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '15m' })
  const refresh_token = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  const { password: _, ...safe } = user
  res.json(ok({ user: safe, access_token, refresh_token }))
})

app.post('/api/v1/auth/otp/send', (req, res) => {
  const { phone } = req.body
  res.json(ok({ message: 'OTP sent', expires_in: 300 }))
})

app.post('/api/v1/auth/otp/verify', (req, res) => {
  const { phone, otp } = req.body
  const user = store.users.find(u => u.phone_number === phone)
  if (!user) return res.status(401).json(err('Invalid phone'))
  if (otp !== '000000') return res.status(400).json(err('Invalid OTP'))
  const access_token = jwt.sign({ id: user.id, username: user.username, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '15m' })
  const refresh_token = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
  const { password: _, ...safe } = user
  res.json(ok({ user: safe, access_token, refresh_token }))
})

app.post('/api/v1/auth/refresh-token', (req, res) => {
  const { refresh_token } = req.body
  try {
    const decoded = jwt.verify(refresh_token, JWT_REFRESH_SECRET)
    const user = store.users.find(u => u.id === decoded.id)
    if (!user) return res.status(401).json(err('User not found'))
    const access_token = jwt.sign({ id: user.id, username: user.username, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '15m' })
    const new_refresh = jwt.sign({ id: user.id }, JWT_REFRESH_SECRET, { expiresIn: '30d' })
    res.json(ok({ access_token, refresh_token: new_refresh }))
  } catch {
    return res.status(401).json(err('Invalid refresh token'))
  }
})

app.post('/api/v1/auth/logout', auth, (req, res) => {
  res.json(ok({ message: 'Logged out' }))
})

app.post('/api/v1/auth/forgot-password', (req, res) => {
  res.json(ok({ message: 'Reset link sent to email' }))
})

app.post('/api/v1/auth/reset-password', (req, res) => {
  res.json(ok({ message: 'Password reset successfully' }))
})

// ─── Users ──────────────────────────────────────────────
app.get('/api/v1/users/me', auth, (req, res) => {
  const user = store.users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json(err('User not found'))
  const { password: _, ...safe } = user
  res.json(ok(safe))
})

app.put('/api/v1/users/me', auth, (req, res) => {
  const user = store.users.find(u => u.id === req.user.id)
  if (!user) return res.status(404).json(err('User not found'))
  const allowed = ['full_name', 'bio', 'email', 'phone_number', 'profile_pic_url', 'language_preference', 'district']
  allowed.forEach(k => { if (req.body[k] !== undefined) user[k] = req.body[k] })
  store.users_by_username[user.username] = user
  const { password: _, ...safe } = user
  res.json(ok(safe))
})

app.get('/api/v1/users/:username', auth, (req, res) => {
  const user = findUser(req.params.username)
  if (!user) return res.status(404).json(err('User not found'))
  const { password: _, ...safe } = user
  const posts = store.posts.filter(p => p.username === user.username)
  res.json(ok({ ...safe, posts }))
})

app.post('/api/v1/users/:id/follow', auth, (req, res) => {
  const target = store.users.find(u => u.id === req.params.id)
  if (!target) return res.status(404).json(err('User not found'))
  if (!store.follows[req.user.username]) store.follows[req.user.username] = []
  if (!store.follows[req.user.username].includes(target.username)) {
    store.follows[req.user.username].push(target.username)
  }
  res.json(ok({ message: `Following ${target.username}` }))
})

app.delete('/api/v1/users/:id/unfollow', auth, (req, res) => {
  const target = store.users.find(u => u.id === req.params.id)
  if (!target) return res.status(404).json(err('User not found'))
  if (store.follows[req.user.username]) {
    store.follows[req.user.username] = store.follows[req.user.username].filter(u => u !== target.username)
  }
  res.json(ok({ message: `Unfollowed ${target.username}` }))
})

app.get('/api/v1/users/:id/followers', auth, (req, res) => {
  const target = store.users.find(u => u.id === req.params.id)
  if (!target) return res.status(404).json(err('User not found'))
  const followers = Object.entries(store.follows)
    .filter(([_, list]) => list.includes(target.username))
    .map(([username]) => {
      const u = findUser(username)
      return u ? { id: u.id, username: u.username, full_name: u.full_name, profile_pic_url: u.profile_pic_url, is_verified: u.is_verified } : null
    })
    .filter(Boolean)
  res.json(ok(followers))
})

app.get('/api/v1/users/:id/following', auth, (req, res) => {
  const target = store.users.find(u => u.id === req.params.id)
  if (!target) return res.status(404).json(err('User not found'))
  const following = (store.follows[target.username] || []).map(username => {
    const u = findUser(username)
    return u ? { id: u.id, username: u.username, full_name: u.full_name, profile_pic_url: u.profile_pic_url, is_verified: u.is_verified } : null
  }).filter(Boolean)
  res.json(ok(following))
})

app.get('/api/v1/users/search', auth, (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  const results = store.users
    .filter(u => u.username.toLowerCase().includes(q) || u.full_name.toLowerCase().includes(q))
    .map(({ password, ...u }) => u)
  res.json(ok(results))
})

// ─── Posts ──────────────────────────────────────────────
app.post('/api/v1/posts', auth, (req, res) => {
  const post = {
    id: `post${uuidv4().slice(0, 8)}`,
    username: req.user.username,
    caption: req.body.caption || '',
    media_url: req.body.media_url || [],
    media_type: req.body.media_type || 'image',
    hashtags: req.body.hashtags || [],
    location: req.body.location || '',
    type: req.body.type || 'post',
    like_count: 0,
    comment_count: 0,
    repost_count: 0,
    is_liked: false,
    is_saved: false,
    created_at: new Date().toISOString(),
  }
  store.posts.unshift(post)
  res.status(201).json(ok(post))
})

app.get('/api/v1/posts/feed', auth, (req, res) => {
  const following = store.follows[req.user.username] || []
  const feed = store.posts.filter(p =>
    p.username === req.user.username || following.includes(p.username)
  ).slice(0, 50)
  res.json(ok(feed))
})

app.get('/api/v1/posts/saved', auth, (req, res) => {
  const savedSet = store.saved[req.user.username] || []
  const saved = store.posts.filter(p => savedSet.includes(p.id))
  res.json(ok(saved))
})

app.get('/api/v1/posts/:id', auth, (req, res) => {
  const post = store.posts.find(p => p.id === req.params.id)
  if (!post) return res.status(404).json(err('Post not found'))
  const comments = store.comments.filter(c => c.post_id === post.id)
  res.json(ok({ ...post, comments }))
})

app.delete('/api/v1/posts/:id', auth, (req, res) => {
  const idx = store.posts.findIndex(p => p.id === req.params.id && p.username === req.user.username)
  if (idx === -1) return res.status(404).json(err('Post not found'))
  store.posts.splice(idx, 1)
  res.json(ok({ message: 'Post deleted' }))
})

app.post('/api/v1/posts/:id/like', auth, (req, res) => {
  const post = store.posts.find(p => p.id === req.params.id)
  if (!post) return res.status(404).json(err('Post not found'))
  if (!store.liked[req.user.username]) store.liked[req.user.username] = []
  if (!store.liked[req.user.username].includes(post.id)) {
    store.liked[req.user.username].push(post.id)
    post.like_count++
  }
  res.json(ok({ liked: true, like_count: post.like_count }))
})

app.post('/api/v1/posts/:id/dislike', auth, (req, res) => {
  const post = store.posts.find(p => p.id === req.params.id)
  if (!post) return res.status(404).json(err('Post not found'))
  if (store.liked[req.user.username]) {
    store.liked[req.user.username] = store.liked[req.user.username].filter(id => id !== post.id)
    if (post.like_count > 0) post.like_count--
  }
  res.json(ok({ liked: false, like_count: post.like_count }))
})

app.post('/api/v1/posts/:id/repost', auth, (req, res) => {
  const post = store.posts.find(p => p.id === req.params.id)
  if (!post) return res.status(404).json(err('Post not found'))
  post.repost_count = (post.repost_count || 0) + 1
  res.json(ok({ reposted: true, repost_count: post.repost_count }))
})

app.post('/api/v1/posts/:id/save', auth, (req, res) => {
  const post = store.posts.find(p => p.id === req.params.id)
  if (!post) return res.status(404).json(err('Post not found'))
  if (!store.saved[req.user.username]) store.saved[req.user.username] = []
  if (!store.saved[req.user.username].includes(post.id)) {
    store.saved[req.user.username].push(post.id)
  }
  res.json(ok({ saved: true }))
})

// ─── Stories ────────────────────────────────────────────
app.post('/api/v1/stories', auth, (req, res) => {
  const story = {
    id: `story${uuidv4().slice(0, 8)}`,
    username: req.user.username,
    media_url: req.body.media_url || '',
    media_type: req.body.media_type || 'image',
    created_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    viewed: false,
  }
  store.stories.unshift(story)
  res.status(201).json(ok(story))
})

app.get('/api/v1/stories/feed', auth, (req, res) => {
  const following = store.follows[req.user.username] || []
  const feed = store.stories.filter(s =>
    (s.username === req.user.username || following.includes(s.username)) &&
    new Date(s.expires_at) > new Date()
  )
  const grouped = feed.reduce((acc, s) => {
    if (!acc[s.username]) acc[s.username] = { username: s.username, stories: [] }
    acc[s.username].stories.push(s)
    return acc
  }, {})
  res.json(ok(Object.values(grouped)))
})

app.delete('/api/v1/stories/:id', auth, (req, res) => {
  const idx = store.stories.findIndex(s => s.id === req.params.id && s.username === req.user.username)
  if (idx === -1) return res.status(404).json(err('Story not found'))
  store.stories.splice(idx, 1)
  res.json(ok({ message: 'Story deleted' }))
})

app.post('/api/v1/stories/:id/view', auth, (req, res) => {
  const story = store.stories.find(s => s.id === req.params.id)
  if (story) story.viewed = true
  res.json(ok({ viewed: true }))
})

// ─── Reels ──────────────────────────────────────────────
app.post('/api/v1/reels', auth, (req, res) => {
  const reel = {
    id: `reel${uuidv4().slice(0, 8)}`,
    username: req.user.username,
    caption: req.body.caption || '',
    media_url: req.body.media_url || '',
    hashtags: req.body.hashtags || [],
    like_count: 0, comment_count: 0,
    is_liked: false,
    created_at: new Date().toISOString(),
  }
  store.reels.unshift(reel)
  res.status(201).json(ok(reel))
})

app.get('/api/v1/reels/feed', auth, (req, res) => {
  res.json(ok(store.reels))
})

app.get('/api/v1/reels/:id', auth, (req, res) => {
  const reel = store.reels.find(r => r.id === req.params.id)
  if (!reel) return res.status(404).json(err('Reel not found'))
  res.json(ok(reel))
})

app.post('/api/v1/reels/:id/like', auth, (req, res) => {
  const reel = store.reels.find(r => r.id === req.params.id)
  if (!reel) return res.status(404).json(err('Reel not found'))
  if (!store.liked[req.user.username]) store.liked[req.user.username] = []
  if (!store.liked[req.user.username].includes(reel.id)) {
    store.liked[req.user.username].push(reel.id)
    reel.like_count++
  }
  res.json(ok({ liked: true, like_count: reel.like_count }))
})

app.post('/api/v1/reels/:id/dislike', auth, (req, res) => {
  const reel = store.reels.find(r => r.id === req.params.id)
  if (!reel) return res.status(404).json(err('Reel not found'))
  if (store.liked[req.user.username]) {
    store.liked[req.user.username] = store.liked[req.user.username].filter(id => id !== reel.id)
    if (reel.like_count > 0) reel.like_count--
  }
  res.json(ok({ liked: false, like_count: reel.like_count }))
})

// ─── Comments ───────────────────────────────────────────
app.post('/api/v1/comments', auth, (req, res) => {
  const comment = {
    id: `c${uuidv4().slice(0, 8)}`,
    post_id: req.body.post_id,
    parent_id: req.body.parent_id || null,
    username: req.user.username,
    text: req.body.text,
    like_count: 0,
    replies: [],
    created_at: new Date().toISOString(),
  }
  store.comments.unshift(comment)
  const post = store.posts.find(p => p.id === req.body.post_id)
  if (post) post.comment_count = (post.comment_count || 0) + 1
  res.status(201).json(ok(comment))
})

app.get('/api/v1/comments', auth, (req, res) => {
  const { post_id, target_type, target_id } = req.query
  let comments = store.comments
  if (post_id) comments = comments.filter(c => c.post_id === post_id)
  if (target_id) comments = comments.filter(c => c.post_id === target_id)
  res.json(ok(comments))
})

app.delete('/api/v1/comments/:id', auth, (req, res) => {
  const idx = store.comments.findIndex(c => c.id === req.params.id && c.username === req.user.username)
  if (idx === -1) return res.status(404).json(err('Comment not found'))
  store.comments.splice(idx, 1)
  res.json(ok({ message: 'Comment deleted' }))
})

app.post('/api/v1/comments/:id/like', auth, (req, res) => {
  const comment = store.comments.find(c => c.id === req.params.id)
  if (!comment) return res.status(404).json(err('Comment not found'))
  comment.like_count++
  res.json(ok({ liked: true, like_count: comment.like_count }))
})

app.post('/api/v1/comments/:id/reply', auth, (req, res) => {
  const parent = store.comments.find(c => c.id === req.params.id)
  if (!parent) return res.status(404).json(err('Comment not found'))
  const reply = {
    id: `c${uuidv4().slice(0, 8)}`,
    post_id: parent.post_id,
    parent_id: parent.id,
    username: req.user.username,
    text: req.body.text,
    like_count: 0,
    created_at: new Date().toISOString(),
  }
  parent.replies = parent.replies || []
  parent.replies.push(reply)
  res.status(201).json(ok(reply))
})

// ─── Messages ───────────────────────────────────────────
app.get('/api/v1/messages/conversations', auth, (req, res) => {
  const convos = store.conversations.filter(c => c.members.includes(req.user.username))
  res.json(ok(convos))
})

app.post('/api/v1/messages/conversations', auth, (req, res) => {
  const convo = {
    id: `conv${uuidv4().slice(0, 8)}`,
    type: req.body.type || 'direct',
    members: [req.user.username, ...(req.body.members || [])],
    last_message: '',
    last_message_at: new Date().toISOString(),
    unread: 0,
  }
  store.conversations.unshift(convo)
  res.status(201).json(ok(convo))
})

app.get('/api/v1/messages/conversations/:id', auth, (req, res) => {
  const convo = store.conversations.find(c => c.id === req.params.id)
  if (!convo) return res.status(404).json(err('Conversation not found'))
  const msgs = store.messages.filter(m => m.conversation_id === convo.id)
  res.json(ok({ ...convo, messages: msgs }))
})

app.post('/api/v1/messages/conversations/:id/send', auth, (req, res) => {
  const convo = store.conversations.find(c => c.id === req.params.id)
  if (!convo) return res.status(404).json(err('Conversation not found'))
  const msg = {
    id: `m${uuidv4().slice(0, 8)}`,
    conversation_id: convo.id,
    sender_username: req.user.username,
    text: req.body.text,
    media_url: req.body.media_url || '',
    created_at: new Date().toISOString(),
  }
  store.messages.push(msg)
  convo.last_message = req.body.text
  convo.last_message_at = msg.created_at
  res.status(201).json(ok(msg))
})

app.delete('/api/v1/messages/conversations/:id/messages/:msgId', auth, (req, res) => {
  const idx = store.messages.findIndex(m => m.id === req.params.msgId && m.sender_username === req.user.username)
  if (idx === -1) return res.status(404).json(err('Message not found'))
  store.messages.splice(idx, 1)
  res.json(ok({ message: 'Message deleted' }))
})

app.post('/api/v1/messages/conversations/:id/members/add', auth, (req, res) => {
  const convo = store.conversations.find(c => c.id === req.params.id)
  if (!convo) return res.status(404).json(err('Conversation not found'))
  const username = req.body.username
  if (!convo.members.includes(username)) convo.members.push(username)
  res.json(ok(convo))
})

app.delete('/api/v1/messages/conversations/:id/members/remove', auth, (req, res) => {
  const convo = store.conversations.find(c => c.id === req.params.id)
  if (!convo) return res.status(404).json(err('Conversation not found'))
  convo.members = convo.members.filter(m => m !== req.body.username)
  res.json(ok(convo))
})

app.put('/api/v1/messages/conversations/:id/info', auth, (req, res) => {
  const convo = store.conversations.find(c => c.id === req.params.id)
  if (!convo) return res.status(404).json(err('Conversation not found'))
  if (req.body.name) convo.name = req.body.name
  if (req.body.icon) convo.icon = req.body.icon
  res.json(ok(convo))
})

// ─── Calls ──────────────────────────────────────────────
app.post('/api/v1/calls/initiate', auth, (req, res) => {
  const call = {
    id: `call${uuidv4().slice(0, 8)}`,
    caller_username: req.user.username,
    callee_username: req.body.callee_username,
    call_type: req.body.call_type || 'audio',
    status: 'ringing',
    started_at: new Date().toISOString(),
  }
  res.status(201).json(ok(call))
})

app.post('/api/v1/calls/accept/:callId', auth, (req, res) => {
  res.json(ok({ status: 'connected' }))
})

app.post('/api/v1/calls/reject/:callId', auth, (req, res) => {
  res.json(ok({ status: 'rejected' }))
})

app.post('/api/v1/calls/end/:callId', auth, (req, res) => {
  res.json(ok({ status: 'ended' }))
})

app.get('/api/v1/calls/history', auth, (req, res) => {
  res.json(ok([]))
})

// ─── Explore ────────────────────────────────────────────
app.get('/api/v1/explore/trending', auth, (req, res) => {
  const trending = [...store.posts].sort((a, b) => b.like_count - a.like_count).slice(0, 20)
  const hashtags = ['#TamilNadu', '#சினிமா', '#இசை', '#சென்னை', '#கோயில்', '#பயணம்', '#சமையல்', '#கிரிக்கெட்']
  res.json(ok({ posts: trending, hashtags }))
})

app.get('/api/v1/explore/hashtag/:tag', auth, (req, res) => {
  const tag = req.params.tag
  const posts = store.posts.filter(p => p.hashtags.some(h => h.toLowerCase().includes(tag.toLowerCase())))
  res.json(ok(posts))
})

app.get('/api/v1/explore/topics', auth, (req, res) => {
  res.json(ok(store.explore_topics))
})

app.get('/api/v1/explore/search', auth, (req, res) => {
  const q = (req.query.q || '').toLowerCase()
  const users = store.users.filter(u =>
    u.username.toLowerCase().includes(q) || u.full_name.toLowerCase().includes(q)
  ).map(({ password, ...u }) => u)
  const posts = store.posts.filter(p =>
    p.caption.toLowerCase().includes(q) || p.hashtags.some(h => h.toLowerCase().includes(q))
  )
  const hashtags = q.startsWith('#') ? [q] : []
  // Also add matching hashtag from posts
  store.posts.forEach(p => p.hashtags.forEach(h => {
    if (h.toLowerCase().includes(q) && !hashtags.includes(h)) hashtags.push(h)
  }))
  res.json(ok({ users, posts, hashtags: hashtags.slice(0, 10) }))
})

// ─── Notifications ──────────────────────────────────────
app.get('/api/v1/notifications', auth, (req, res) => {
  const notifs = store.notifications.filter(n => n.to_username === undefined || n.to_username === req.user.username)
  res.json(ok(notifs))
})

app.put('/api/v1/notifications/:id/read', auth, (req, res) => {
  const notif = store.notifications.find(n => n.id === req.params.id)
  if (notif) notif.is_read = true
  res.json(ok({ read: true }))
})

app.put('/api/v1/notifications/read-all', auth, (req, res) => {
  store.notifications.forEach(n => { n.is_read = true })
  res.json(ok({ read: true }))
})

// ─── Payments ───────────────────────────────────────────
app.post('/api/v1/payments/upi/send', auth, (req, res) => {
  res.json(ok({ transaction_id: `txn${uuidv4().slice(0, 8)}`, status: 'success' }))
})

app.get('/api/v1/payments/upi/history', auth, (req, res) => {
  res.json(ok([]))
})

app.get('/api/v1/payments/upi/profile', auth, (req, res) => {
  res.json(ok({ upi_id: `${req.user.username}@vaanjay`, balance: 5000 }))
})

app.post('/api/v1/payments/upi/request', auth, (req, res) => {
  res.json(ok({ request_id: `req${uuidv4().slice(0, 8)}`, status: 'pending' }))
})

// ─── Reports ────────────────────────────────────────────
app.post('/api/v1/reports', auth, (req, res) => {
  const report = {
    id: `r${uuidv4().slice(0, 8)}`,
    type: req.body.type,
    target_id: req.body.target_id,
    reported_by: req.user.username,
    reason: req.body.reason,
    status: 'pending',
    created_at: new Date().toISOString(),
  }
  store.reports.unshift(report)
  res.status(201).json(ok(report))
})

// ─── Admin Routes ───────────────────────────────────────
app.get('/api/v1/admin/dashboard', adminAuth, (req, res) => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString()
  res.json(ok({
    total_users: store.users.length,
    total_posts: store.posts.length,
    total_reports: store.reports.length,
    total_earnings: 50000,
    active_users_today: store.users.length,
    new_users_this_month: store.users.filter(u => u.created_at > thirtyDaysAgo).length,
    total_stories: store.stories.length,
    total_verified: store.users.filter(u => u.is_verified).length,
    daily_active_users: [45, 52, 38, 65, 42, 58, 61],
    revenue_chart: [10000, 15000, 12000, 18000, 22000, 20000, 25000, 30000, 28000, 35000, 40000, 50000],
    user_growth: [100, 120, 150, 180, 220, 280, 350, 420, 500, 580, 650, 750],
    top_users: store.users.slice(0, 5).map(({ password, ...u }) => u),
    quick_links: [
      { label: 'Manage Users', href: '/admin/users', icon: 'Users' },
      { label: 'Content Moderation', href: '/admin/content', icon: 'Shield' },
      { label: 'Verification Requests', href: '/admin/verification-requests', icon: 'BadgeCheck' },
      { label: 'Reports & Appeals', href: '/admin/reports', icon: 'Flag' },
    ],
  }))
})

app.get('/api/v1/admin/users', adminAuth, (req, res) => {
  const q = (req.query.search || '').toLowerCase()
  let users = store.users.map(({ password, ...u }) => u)
  if (q) users = users.filter(u => u.username.includes(q) || u.full_name.includes(q) || u.email.includes(q))
  res.json(ok(users))
})

app.put('/api/v1/admin/users/:id/ban', adminAuth, (req, res) => {
  res.json(ok({ message: 'User banned' }))
})

app.put('/api/v1/admin/users/:id/unban', adminAuth, (req, res) => {
  res.json(ok({ message: 'User unbanned' }))
})

app.put('/api/v1/admin/users/:id/verify', adminAuth, (req, res) => {
  const user = store.users.find(u => u.id === req.params.id)
  if (user) { user.is_verified = true; user.verification_type = req.body.badge_type || 'blue' }
  res.json(ok({ verified: true }))
})

app.delete('/api/v1/admin/users/:id/verify', adminAuth, (req, res) => {
  const user = store.users.find(u => u.id === req.params.id)
  if (user) { user.is_verified = false; user.verification_type = null }
  res.json(ok({ verified: false }))
})

app.put('/api/v1/admin/users/:id/badge', adminAuth, (req, res) => {
  const user = store.users.find(u => u.id === req.params.id)
  if (user) { user.is_verified = true; user.verification_type = req.body.badge_type }
  res.json(ok({ badge_type: req.body.badge_type }))
})

app.get('/api/v1/admin/posts', adminAuth, (req, res) => {
  const type = req.query.type
  let posts = store.posts
  if (type) posts = posts.filter(p => p.type === type)
  res.json(ok(posts))
})

app.delete('/api/v1/admin/posts/:id', adminAuth, (req, res) => {
  const idx = store.posts.findIndex(p => p.id === req.params.id)
  if (idx === -1) return res.status(404).json(err('Post not found'))
  store.posts.splice(idx, 1)
  res.json(ok({ message: 'Post deleted' }))
})

app.get('/api/v1/admin/reports', adminAuth, (req, res) => {
  const { status } = req.query
  let reports = store.reports
  if (status) reports = reports.filter(r => r.status === status)
  res.json(ok(reports))
})

app.put('/api/v1/admin/reports/:id/action', adminAuth, (req, res) => {
  const report = store.reports.find(r => r.id === req.params.id)
  if (report) {
    report.status = req.body.action === 'dismiss' ? 'dismissed' : req.body.action === 'delete' ? 'resolved' : report.status
    report.assigned_to = req.body.assigned_to || report.assigned_to
  }
  res.json(ok({ status: report?.status || 'updated' }))
})

app.get('/api/v1/admin/analytics/users', adminAuth, (req, res) => {
  res.json(ok({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [45, 52, 38, 65, 42, 58, 61],
    total: store.users.length,
  }))
})

app.get('/api/v1/admin/analytics/content', adminAuth, (req, res) => {
  res.json(ok({
    posts: store.posts.length,
    stories: store.stories.length,
    comments: store.comments.length,
    labels: ['Posts', 'Stories', 'Comments'],
    values: [store.posts.length, store.stories.length, store.comments.length],
  }))
})

app.get('/api/v1/admin/analytics/calls', adminAuth, (req, res) => {
  res.json(ok({ total: 0, labels: [], values: [] }))
})

app.get('/api/v1/admin/analytics/payments', adminAuth, (req, res) => {
  res.json(ok({
    total_transactions: 0,
    total_volume: 0,
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    values: [0, 0, 0, 0, 0, 0],
  }))
})

app.post('/api/v1/admin/notifications/broadcast', adminAuth, (req, res) => {
  const broadcast = {
    id: `broadcast${uuidv4().slice(0, 8)}`,
    title: req.body.title,
    body: req.body.body,
    target_type: req.body.target_type || 'all',
    created_at: new Date().toISOString(),
    sent_by: req.user.username,
  }
  if (req.body.target_type === 'all' || !req.body.target_type) {
    store.users.forEach(u => {
      store.notifications.unshift({
        id: uuidv4().slice(0, 12),
        type: 'broadcast',
        from_username: 'VAANJAY',
        text: req.body.body,
        is_read: false,
        to_username: u.username,
        created_at: new Date().toISOString(),
      })
    })
  } else if (req.body.target_type === 'username' && req.body.target_username) {
    store.notifications.unshift({
      id: uuidv4().slice(0, 12),
      type: 'broadcast',
      from_username: 'VAANJAY',
      text: req.body.body,
      is_read: false,
      to_username: req.body.target_username,
      created_at: new Date().toISOString(),
    })
  }
  res.status(201).json(ok(broadcast))
})

app.get('/api/v1/admin/verification-requests', adminAuth, (req, res) => {
  res.json(ok(store.verification_requests))
})

app.put('/api/v1/admin/verification-requests/:id', adminAuth, (req, res) => {
  const vr = store.verification_requests.find(v => v.id === req.params.id)
  if (!vr) return res.status(404).json(err('Request not found'))
  vr.status = req.body.status
  if (req.body.status === 'approved') {
    const user = findUser(vr.username)
    if (user) { user.is_verified = true; user.verification_type = req.body.badge_type || vr.badge_type }
  }
  res.json(ok(vr))
})

// ─── Admin payment endpoints ────────────────────────────
app.get('/api/v1/admin/payments', adminAuth, (req, res) => {
  res.json(ok([]))
})

app.put('/api/v1/admin/payments/:id/flag', adminAuth, (req, res) => {
  res.json(ok({ flagged: true }))
})

// ─── Districts ──────────────────────────────────────────
app.get('/api/v1/districts', (req, res) => {
  res.json(ok(store.districts))
})

// ─── Explore topics by name ─────────────────────────────
app.get('/api/v1/explore/topics/:topic', auth, (req, res) => {
  const topicName = req.params.topic.replace(/-/g, ' ').toLowerCase()
  const topic = store.explore_topics.find(t =>
    t.name.toLowerCase() === topicName || t.english_name.toLowerCase() === topicName
  )
  const posts = store.posts.filter(p =>
    p.hashtags.some(h => h.toLowerCase().includes(topicName)) ||
    p.caption.toLowerCase().includes(topicName)
  )
  res.json(ok({ topic: topic || null, posts }))
})

// ─── WebSocket ──────────────────────────────────────────
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, 'http://localhost')
  const path = url.pathname
  ws.isAlive = true

  ws.on('pong', () => { ws.isAlive = true })
  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data.toString())
      wss.clients.forEach(client => {
        if (client.readyState === 1 && client !== ws) {
          client.send(JSON.stringify(msg))
        }
      })
    } catch { /* ignore */ }
  })
  ws.send(JSON.stringify({ type: 'connected', message: 'WebSocket connected' }))
})

setInterval(() => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) return ws.terminate()
    ws.isAlive = false
    ws.ping()
  })
}, 30000)

// ─── Start ──────────────────────────────────────────────
server.listen(PORT, () => {
  console.log(`VAANJAY API running on http://localhost:${PORT}`)
  console.log(`WebSocket on ws://localhost:${PORT}`)
})
