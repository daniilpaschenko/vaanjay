const { v4: uuidv4 } = require('uuid')

const now = Date.now()
const day = 86400000

const store = {
  users: [
    {
      id: 'admin', username: 'admin', email: 'admin@vaanjay.com', phone_number: '',
      full_name: 'Admin', bio: 'VAANJAY Administrator', profile_pic_url: '',
      is_verified: true, is_admin: true, language_preference: 'ta',
      district: 'Chennai', verification_type: 'official',
      password: '$2a$12$Admin@123', created_at: new Date(now - 90 * day).toISOString(),
    },
    {
      id: 'user1', username: 'vignesh', email: 'vignesh@vaanjay.com', phone_number: '9876543210',
      full_name: 'Vignesh', bio: 'சென்னை வாழ் கவிஞன்', profile_pic_url: '',
      is_verified: true, is_admin: false, language_preference: 'ta',
      district: 'Chennai', verification_type: 'blue',
      password: '$2a$12$user1', created_at: new Date(now - 60 * day).toISOString(),
    },
    {
      id: 'user2', username: 'priya_kavi', email: 'priya@vaanjay.com', phone_number: '9876543211',
      full_name: 'Priya', bio: 'நடிகை | மதுரை', profile_pic_url: '',
      is_verified: true, is_admin: false, language_preference: 'ta',
      district: 'Madurai', verification_type: 'gold',
      password: '$2a$12$user2', created_at: new Date(now - 45 * day).toISOString(),
    },
    {
      id: 'user3', username: 'raj_music', email: 'raj@vaanjay.com', phone_number: '9876543212',
      full_name: 'Raj', bio: 'இசையமைப்பாளர் | Coimbatore', profile_pic_url: '',
      is_verified: false, is_admin: false, language_preference: 'en',
      district: 'Coimbatore', verification_type: null,
      password: '$2a$12$user3', created_at: new Date(now - 30 * day).toISOString(),
    },
    {
      id: 'user4', username: 'tamil_selvi', email: 'selvi@vaanjay.com', phone_number: '9876543213',
      full_name: 'Selvi', bio: 'பயணி | உலகம் முழுவதும்', profile_pic_url: '',
      is_verified: false, is_admin: false, language_preference: 'ta',
      district: 'Trichy', verification_type: null,
      password: '$2a$12$user4', created_at: new Date(now - 15 * day).toISOString(),
    },
    {
      id: 'user5', username: 'tech_anand', email: 'anand@vaanjay.com', phone_number: '9876543214',
      full_name: 'Anand', bio: 'Tech enthusiast | AI & ML', profile_pic_url: '',
      is_verified: false, is_admin: false, language_preference: 'en',
      district: 'Bengaluru', verification_type: null,
      password: '$2a$12$user5', created_at: new Date(now - 7 * day).toISOString(),
    },
  ],

  posts: [],
  comments: [],
  stories: [],
  reels: [],
  conversations: [],
  messages: [],
  notifications: [],
  follows: {},
  liked: {},
  saved: {},
  reports: [],
  verification_requests: [],
  explore_topics: [
    { id: 't1', name: 'சினிமா', english_name: 'Cinema', icon: '🎬', post_count: 0 },
    { id: 't2', name: 'இசை', english_name: 'Music', icon: '🎵', post_count: 0 },
    { id: 't3', name: 'அரசியல்', english_name: 'Politics', icon: '📢', post_count: 0 },
    { id: 't4', name: 'தொழில்நுட்பம்', english_name: 'Technology', icon: '💻', post_count: 0 },
    { id: 't5', name: 'விளையாட்டு', english_name: 'Sports', icon: '🏏', post_count: 0 },
    { id: 't6', name: 'பயணம்', english_name: 'Travel', icon: '✈️', post_count: 0 },
    { id: 't7', name: 'சமையல்', english_name: 'Food', icon: '🍛', post_count: 0 },
    { id: 't8', name: 'கல்வி', english_name: 'Education', icon: '📚', post_count: 0 },
  ],
  districts: [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri',
    'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram', 'Karur', 'Krishnagiri',
    'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur',
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi',
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar',
  ],
  features: { stories: true, vibez: true, messages: true, calls: true, live: true, payments: true },
}

function seed() {
  const authors = ['vignesh', 'priya_kavi', 'raj_music', 'tamil_selvi', 'tech_anand']
  const captions = [
    { ta: 'இன்றைய சென்னை மழை 🌧️', en: 'Today\'s Chennai rain' },
    { ta: 'மதுரை மீனாட்சி அம்மன் கோவில்', en: 'Madurai Meenakshi Temple' },
    { ta: 'கோவை மலைகள் அழகு', en: 'Coimbatore hills beauty' },
    { ta: 'இசை நிகழ்ச்சி பின்னணி', en: 'Music concert behind the scenes' },
    { ta: 'புதிய தொழில்நுட்ப முயற்சி', en: 'New tech experiment' },
    { ta: 'தமிழ் மொழி தின வாழ்த்துக்கள்', en: 'Tamil Language Day wishes' },
    { ta: 'ஊட்டி சாலை பயணம்', en: 'Ooty road trip' },
    { ta: 'சென்னை பவுடர் பேக்கிங்', en: 'Chennai powder baking' },
    { ta: 'கோலம் போட்டோ', en: 'Kolam design photo' },
    { ta: 'பாரதியார் கவிதை', en: 'Bharathiyar poetry' },
    { ta: 'இன்று என்ன சமைக்கலாம்?', en: 'What to cook today?' },
    { ta: 'கிரிக்கெட் பயிற்சி', en: 'Cricket practice' },
  ]
  const media = [
    'https://picsum.photos/seed/vaanjay1/600/800',
    'https://picsum.photos/seed/vaanjay2/600/800',
    'https://picsum.photos/seed/vaanjay3/800/600',
    'https://picsum.photos/seed/vaanjay4/600/800',
    'https://picsum.photos/seed/vaanjay5/800/600',
    'https://picsum.photos/seed/vaanjay6/600/800',
    'https://picsum.photos/seed/vaanjay7/800/600',
    'https://picsum.photos/seed/vaanjay8/600/800',
    'https://picsum.photos/seed/vaanjay9/600/800',
    'https://picsum.photos/seed/vaanjay10/800/600',
    'https://picsum.photos/seed/vaanjay11/600/800',
    'https://picsum.photos/seed/vaanjay12/800/600',
  ]

  for (let i = 0; i < 24; i++) {
    const author = authors[i % authors.length]
    const cap = captions[i % captions.length]
    const post = {
      id: `post${i + 1}`,
      username: author,
      caption: `${cap.ta}\n\n${cap.en}`,
      media_url: [media[i % media.length]],
      media_type: 'image',
      hashtags: ['#TamilNadu', '#VAANJAY'].concat(i % 3 === 0 ? ['#சினிமா'] : i % 3 === 1 ? ['#இசை'] : ['#பயணம்']),
      location: ['Chennai', 'Madurai', 'Coimbatore', 'Ooty', 'Trichy'][i % 5],
      type: i % 5 === 0 ? 'vibez' : 'post',
      like_count: Math.floor(Math.random() * 500),
      comment_count: Math.floor(Math.random() * 50),
      repost_count: Math.floor(Math.random() * 20),
      is_liked: false, is_saved: false,
      created_at: new Date(now - i * 3600000).toISOString(),
    }
    store.posts.push(post)
  }

  store.reels = store.posts.filter(p => p.type === 'vibez').slice(0, 5)

  for (let i = 0; i < 3; i++) {
    store.stories.push({
      id: `story${i + 1}`,
      username: authors[i],
      media_url: `https://picsum.photos/seed/story${i + 1}/400/700`,
      media_type: 'image',
      created_at: new Date(now - i * 7200000).toISOString(),
      expires_at: new Date(now + (24 - i * 2) * 3600000).toISOString(),
      viewed: false,
    })
  }

  const convoId1 = `conv${uuidv4().slice(0, 8)}`
  const convoId2 = `conv${uuidv4().slice(0, 8)}`

  store.conversations = [
    { id: convoId1, type: 'direct', members: ['admin', 'vignesh'], last_message: 'Vanakkam! How are you?', last_message_at: new Date(now - 600000).toISOString(), unread: 1 },
    { id: convoId2, type: 'direct', members: ['admin', 'priya_kavi'], last_message: 'New video coming soon!', last_message_at: new Date(now - 1800000).toISOString(), unread: 0 },
  ]

  store.messages = [
    { id: 'm1', conversation_id: convoId1, sender_username: 'vignesh', text: 'Vanakkam!', created_at: new Date(now - 3600000).toISOString() },
    { id: 'm2', conversation_id: convoId1, sender_username: 'admin', text: 'Vanakkam! How are you?', created_at: new Date(now - 600000).toISOString() },
    { id: 'm3', conversation_id: convoId2, sender_username: 'priya_kavi', text: 'Hey admin!', created_at: new Date(now - 7200000).toISOString() },
    { id: 'm4', conversation_id: convoId2, sender_username: 'priya_kavi', text: 'New video coming soon!', created_at: new Date(now - 1800000).toISOString() },
  ]

  store.comments = [
    { id: 'c1', post_id: 'post1', username: 'priya_kavi', text: 'Super! 🔥', created_at: new Date(now - 1800000).toISOString(), like_count: 5, replies: [] },
    { id: 'c2', post_id: 'post1', username: 'raj_music', text: 'Semma da!', created_at: new Date(now - 900000).toISOString(), like_count: 3, replies: [] },
    { id: 'c3', post_id: 'post2', username: 'vignesh', text: 'Very nice photo', created_at: new Date(now - 3600000).toISOString(), like_count: 8, replies: [] },
  ]

  store.notifications = [
    { id: 'n1', type: 'like', from_username: 'vignesh', post_id: 'post1', text: 'liked your post', is_read: false, created_at: new Date(now - 300000).toISOString() },
    { id: 'n2', type: 'follow', from_username: 'priya_kavi', text: 'started following you', is_read: false, created_at: new Date(now - 600000).toISOString() },
    { id: 'n3', type: 'comment', from_username: 'raj_music', post_id: 'post1', text: 'commented on your post', is_read: true, created_at: new Date(now - 7200000).toISOString() },
  ]

  store.follows = {
    'vignesh': ['priya_kavi', 'raj_music', 'tech_anand'],
    'priya_kavi': ['vignesh', 'admin'],
    'raj_music': ['vignesh', 'tamil_selvi'],
    'tamil_selvi': ['priya_kavi'],
    'tech_anand': ['vignesh', 'raj_music'],
  }

  store.verification_requests = [
    { id: 'vr1', username: 'raj_music', full_name: 'Raj', email: 'raj@vaanjay.com', reason: 'Music composer with 10+ years experience', badge_type: 'blue', status: 'pending', created_at: new Date(now - 5 * day).toISOString() },
    { id: 'vr2', username: 'tamil_selvi', full_name: 'Selvi', email: 'selvi@vaanjay.com', reason: 'Travel blogger with 50K followers on other platforms', badge_type: 'gold', status: 'pending', created_at: new Date(now - 2 * day).toISOString() },
  ]

  store.reports = [
    { id: 'r1', type: 'post', target_id: 'post3', reported_by: 'vignesh', reason: 'Spam', status: 'pending', created_at: new Date(now - 86400000).toISOString() },
    { id: 'r2', type: 'user', target_id: 'user4', reported_by: 'priya_kavi', reason: 'Harassment', status: 'under_review', created_at: new Date(now - 43200000).toISOString(), assigned_to: 'admin' },
  ]

  store.users_by_username = {}
  store.users.forEach(u => { store.users_by_username[u.username] = u })
}

seed()

module.exports = { store }
