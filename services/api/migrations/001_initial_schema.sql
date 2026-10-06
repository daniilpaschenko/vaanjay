-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
-- VAANJAY (வாஞ்செய்) — Initial Database Schema
-- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ─────────────────────────────────────────────────
CREATE TABLE users (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_pic_url TEXT,
    website_url TEXT,
    is_verified BOOLEAN DEFAULT false,
    badge_type VARCHAR(20) CHECK (badge_type IN ('blue', 'gold', 'official')),
    is_admin BOOLEAN DEFAULT false,
    language_preference VARCHAR(10) DEFAULT 'ta',
    content_language_preference VARCHAR(10) DEFAULT 'ta',
    is_private BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    gender VARCHAR(20),
    district VARCHAR(50),
    last_seen TIMESTAMPTZ,
    follower_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    post_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_users_language ON users(language_preference);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ─── Posts ─────────────────────────────────────────────────
CREATE TABLE posts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    media_urls TEXT[] DEFAULT '{}',
    caption TEXT,
    location VARCHAR(255),
    type VARCHAR(20) NOT NULL DEFAULT 'text' CHECK (type IN ('photo', 'video', 'reel', 'story', 'text')),
    audience VARCHAR(20) DEFAULT 'public' CHECK (audience IN ('public', 'followers', 'close_friends')),
    alt_text TEXT,
    is_archived BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    like_count INTEGER DEFAULT 0,
    dislike_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    repost_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_audience ON posts(audience);

-- ─── Stories ───────────────────────────────────────────────
CREATE TABLE stories (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    caption TEXT,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
    viewers TEXT[] DEFAULT '{}',
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stories_user_id ON stories(user_id);
CREATE INDEX idx_stories_expires ON stories(expires_at);

-- ─── Reels ─────────────────────────────────────────────────
CREATE TABLE reels (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    audio_id TEXT REFERENCES audio_tracks(id),
    duration_seconds INTEGER NOT NULL,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    dislike_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reels_user_id ON reels(user_id);
CREATE INDEX idx_reels_created_at ON reels(created_at DESC);

-- ─── Comments ──────────────────────────────────────────────
CREATE TABLE comments (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    target_id TEXT NOT NULL,
    target_type VARCHAR(10) NOT NULL CHECK (target_type IN ('post', 'reel')),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_comment_id TEXT REFERENCES comments(id) ON DELETE CASCADE,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_comments_target ON comments(target_id, target_type);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);
CREATE INDEX idx_comments_user ON comments(user_id);

-- ─── Reactions ─────────────────────────────────────────────
CREATE TABLE reactions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    target_id TEXT NOT NULL,
    target_type VARCHAR(10) NOT NULL CHECK (target_type IN ('post', 'reel', 'comment', 'story')),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reaction_type VARCHAR(10) NOT NULL CHECK (reaction_type IN ('like', 'love', 'haha', 'wow', 'sad', 'angry', 'dislike')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(target_id, target_type, user_id)
);

CREATE INDEX idx_reactions_target ON reactions(target_id, target_type);
CREATE INDEX idx_reactions_user ON reactions(user_id);

-- ─── Reposts ───────────────────────────────────────────────
CREATE TABLE reposts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    original_post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(original_post_id, user_id)
);

-- ─── Follows ───────────────────────────────────────────────
CREATE TABLE follows (
    follower_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (follower_id, following_id)
);

CREATE INDEX idx_follows_follower ON follows(follower_id);
CREATE INDEX idx_follows_following ON follows(following_id);

-- ─── Conversations ─────────────────────────────────────────
CREATE TABLE conversations (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    type VARCHAR(10) NOT NULL CHECK (type IN ('private', 'group')),
    name VARCHAR(100),
    group_pic_url TEXT,
    created_by TEXT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_created ON conversations(created_at DESC);

-- ─── Conversation Members ──────────────────────────────────
CREATE TABLE conversation_members (
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(10) DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (conversation_id, user_id)
);

-- ─── Messages ──────────────────────────────────────────────
CREATE TABLE messages (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    conversation_id TEXT NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    media_url TEXT,
    message_type VARCHAR(10) NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'audio', 'doc', 'sticker', 'call_log')),
    is_read BOOLEAN DEFAULT false,
    reply_to_id TEXT REFERENCES messages(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conv ON messages(conversation_id, created_at DESC);

-- ─── Calls ─────────────────────────────────────────────────
CREATE TABLE calls (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    caller_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id TEXT REFERENCES users(id),
    group_id TEXT,
    type VARCHAR(10) NOT NULL CHECK (type IN ('audio', 'video')),
    status VARCHAR(20) NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'ongoing', 'ended', 'missed')),
    started_at TIMESTAMPTZ,
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calls_caller ON calls(caller_id);
CREATE INDEX idx_calls_status ON calls(status);

-- ─── Notifications ─────────────────────────────────────────
CREATE TABLE notifications (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    reference_id TEXT,
    reference_type VARCHAR(20),
    message TEXT NOT NULL,
    actor_id TEXT REFERENCES users(id),
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

-- ─── Verified Badges ───────────────────────────────────────
CREATE TABLE verified_badges (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_type VARCHAR(20) NOT NULL CHECK (badge_type IN ('blue', 'gold', 'official')),
    granted_by TEXT NOT NULL REFERENCES users(id),
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    reason TEXT
);

-- ─── UPI Transactions ──────────────────────────────────────
CREATE TABLE upi_transactions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    upi_ref_id TEXT UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_upi_sender ON upi_transactions(sender_id);
CREATE INDEX idx_upi_receiver ON upi_transactions(receiver_id);

-- ─── Reports ───────────────────────────────────────────────
CREATE TABLE reports (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    reporter_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    target_id TEXT NOT NULL,
    target_type VARCHAR(10) NOT NULL CHECK (target_type IN ('user', 'post', 'reel', 'comment')),
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'action_taken')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_status ON reports(status);

-- ─── Saved Posts ───────────────────────────────────────────
CREATE TABLE saved_posts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id TEXT REFERENCES posts(id) ON DELETE CASCADE,
    reel_id TEXT REFERENCES reels(id) ON DELETE CASCADE,
    collection_name VARCHAR(100) DEFAULT 'default',
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

CREATE INDEX idx_saved_user ON saved_posts(user_id);

-- ─── Audio Tracks ──────────────────────────────────────────
CREATE TABLE audio_tracks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    duration INTEGER NOT NULL,
    usage_count INTEGER DEFAULT 0,
    is_tamil BOOLEAN DEFAULT false,
    movie_name VARCHAR(255),
    thumbnail_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audio_usage ON audio_tracks(usage_count DESC);
CREATE INDEX idx_audio_tamil ON audio_tracks(is_tamil) WHERE is_tamil = true;

-- ─── Hashtags ──────────────────────────────────────────────
CREATE TABLE hashtags (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    tag VARCHAR(100) UNIQUE NOT NULL,
    usage_count INTEGER DEFAULT 0,
    is_trending BOOLEAN DEFAULT false,
    category VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_hashtags_tag ON hashtags(tag);
CREATE INDEX idx_hashtags_usage ON hashtags(usage_count DESC);

-- ─── Post-Hashtag Junction ─────────────────────────────────
CREATE TABLE post_hashtags (
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    hashtag_id TEXT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, hashtag_id)
);

-- ─── Explore Topics ────────────────────────────────────────
CREATE TABLE explore_topics (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(100) NOT NULL,
    name_ta VARCHAR(100),
    icon VARCHAR(50),
    post_count INTEGER DEFAULT 0,
    category VARCHAR(50) NOT NULL
);

-- ─── User Topic Interests ──────────────────────────────────
CREATE TABLE user_topic_interests (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id TEXT NOT NULL REFERENCES explore_topics(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, topic_id)
);

-- ─── Polls ─────────────────────────────────────────────────
CREATE TABLE polls (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    total_votes INTEGER DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE poll_options (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    vote_count INTEGER DEFAULT 0
);

CREATE TABLE poll_votes (
    poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    option_id TEXT NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    voted_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(poll_id, user_id)
);

-- ─── Broadcast Lists ───────────────────────────────────────
CREATE TABLE broadcasts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(100) NOT NULL,
    created_by TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE broadcast_members (
    broadcast_id TEXT NOT NULL REFERENCES broadcasts(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (broadcast_id, user_id)
);

-- ─── Verification Requests ─────────────────────────────────
CREATE TABLE verification_requests (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    document_url TEXT,
    reason TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'more_info')),
    reviewed_by TEXT REFERENCES users(id),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Subscriptions (Creator Monetization) ──────────────────
CREATE TABLE subscriptions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    creator_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscriber_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tier VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(creator_id, subscriber_id)
);

-- ─── Live Streams ──────────────────────────────────────────
CREATE TABLE live_streams (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT,
    topic_tag VARCHAR(100),
    viewer_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    started_at TIMESTAMPTZ DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    co_host_id TEXT REFERENCES users(id),
    replay_url TEXT
);

CREATE INDEX idx_live_active ON live_streams(is_active) WHERE is_active = true;

-- ─── Creator Earnings ──────────────────────────────────────
CREATE TABLE creator_earnings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(12, 2) NOT NULL,
    type VARCHAR(30) NOT NULL CHECK (type IN ('reel_revenue', 'tip', 'subscription', 'live_gift', 'brand_deal')),
    reference_id TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Brand Deals Marketplace ───────────────────────────────
CREATE TABLE brand_deals (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    brand_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    creator_id TEXT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    budget DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'applied', 'approved', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE brand_deal_applications (
    deal_id TEXT NOT NULL REFERENCES brand_deals(id) ON DELETE CASCADE,
    creator_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proposal TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (deal_id, creator_id)
);

-- ─── Districts (Tamil Nadu) ────────────────────────────────
CREATE TABLE districts (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name VARCHAR(100) NOT NULL,
    name_ta VARCHAR(100),
    region VARCHAR(50) NOT NULL
);

INSERT INTO districts (name, name_ta, region) VALUES
    ('Ariyalur', 'அரியலூர்', 'Central'),
    ('Chengalpattu', 'செங்கல்பட்டு', 'North'),
    ('Chennai', 'சென்னை', 'North'),
    ('Coimbatore', 'கோயம்புத்தூர்', 'West'),
    ('Cuddalore', 'கடலூர்', 'Central'),
    ('Dharmapuri', 'தருமபுரி', 'West'),
    ('Dindigul', 'திண்டுக்கல்', 'South'),
    ('Erode', 'ஈரோடு', 'West'),
    ('Kallakurichi', 'கள்ளக்குறிச்சி', 'Central'),
    ('Kancheepuram', 'காஞ்சிபுரம்', 'North'),
    ('Karur', 'கரூர்', 'West'),
    ('Krishnagiri', 'கிருஷ்ணகிரி', 'West'),
    ('Madurai', 'மதுரை', 'South'),
    ('Mayiladuthurai', 'மயிலாடுதுறை', 'Central'),
    ('Nagapattinam', 'நாகப்பட்டினம்', 'Central'),
    ('Kanniyakumari', 'கன்னியாகுமரி', 'South'),
    ('Namakkal', 'நாமக்கல்', 'West'),
    ('Nilgiris', 'நீலகிரி', 'West'),
    ('Perambalur', 'பெரம்பலூர்', 'Central'),
    ('Pudukkottai', 'புதுக்கோட்டை', 'South'),
    ('Ramanathapuram', 'இராமநாதபுரம்', 'South'),
    ('Ranipet', 'இராணிப்பேட்டை', 'North'),
    ('Salem', 'சேலம்', 'West'),
    ('Sivaganga', 'சிவகங்கை', 'South'),
    ('Tenkasi', 'தென்காசி', 'South'),
    ('Thanjavur', 'தஞ்சாவூர்', 'Central'),
    ('Theni', 'தேனி', 'South'),
    ('Thoothukudi', 'தூத்துக்குடி', 'South'),
    ('Tiruchirappalli', 'திருச்சிராப்பள்ளி', 'Central'),
    ('Tirunelveli', 'திருநெல்வேலி', 'South'),
    ('Tirupathur', 'திருப்பத்தூர்', 'North'),
    ('Tiruppur', 'திருப்பூர்', 'West'),
    ('Tiruvallur', 'திருவள்ளூர்', 'North'),
    ('Tiruvannamalai', 'திருவண்ணாமலை', 'North'),
    ('Tiruvarur', 'திருவாரூர்', 'Central'),
    ('Vellore', 'வேலூர்', 'North'),
    ('Viluppuram', 'விழுப்புரம்', 'Central'),
    ('Virudhunagar', 'விருதுநகர்', 'South');

-- ─── Explore Topics Seed Data ──────────────────────────────
INSERT INTO explore_topics (id, name, name_ta, icon, category) VALUES
    (gen_random_uuid()::text, 'Science & Tech', 'அறிவியல் & தொழில்நுட்பம்', '🔬', 'Education'),
    (gen_random_uuid()::text, 'Geopolitics', 'புவிசார் அரசியல்', '🌍', 'News'),
    (gen_random_uuid()::text, 'Tamil Culture', 'தமிழ் பண்பாடு', '🏛️', 'Culture'),
    (gen_random_uuid()::text, 'Entertainment', 'பொழுதுபோக்கு', '🎬', 'Entertainment'),
    (gen_random_uuid()::text, 'Sports', 'விளையாட்டு', '⚽', 'Sports'),
    (gen_random_uuid()::text, 'Finance', 'நிதி', '💰', 'Education'),
    (gen_random_uuid()::text, 'Memes', 'மீம்கள்', '😂', 'Entertainment'),
    (gen_random_uuid()::text, 'Food', 'உணவு', '🍛', 'Lifestyle'),
    (gen_random_uuid()::text, 'Travel', 'சுற்றுலா', '✈️', 'Lifestyle'),
    (gen_random_uuid()::text, 'Fashion', 'நாகரிகம்', '👗', 'Lifestyle'),
    (gen_random_uuid()::text, 'Music', 'இசை', '🎵', 'Entertainment'),
    (gen_random_uuid()::text, 'Kollywood', 'கோலிவுட்', '🎥', 'Entertainment');

-- ─── Tamil Audio Seed Data ─────────────────────────────────
INSERT INTO audio_tracks (id, title, artist, url, duration, is_tamil, movie_name) VALUES
    (gen_random_uuid()::text, 'Why This Kolaveri Di', 'Anirudh Ravichander', '/audio/kolaveri.mp3', 240, true, '3'),
    (gen_random_uuid()::text, 'Rowdy Baby', 'Dhanush, Dhee', '/audio/rowdy_baby.mp3', 255, true, 'Maari 2'),
    (gen_random_uuid()::text, 'Vaathi Coming', 'Anirudh Ravichander', '/audio/vaathi_coming.mp3', 210, true, 'Master'),
    (gen_random_uuid()::text, 'Arabic Kuthu', 'Anirudh Ravichander', '/audio/arabic_kuthu.mp3', 198, true, 'Beast'),
    (gen_random_uuid()::text, 'Megham Karukatha', 'Anirudh Ravichander', '/audio/megham.mp3', 240, true, 'Thiruchitrambalam'),
    (gen_random_uuid()::text, 'Enjoy Enjaami', 'Dhee, Arivu', '/audio/enjoy_enjaami.mp3', 228, true, 'Single'),
    (gen_random_uuid()::text, 'Kutty Pattas', 'Santhosh Dhayanidhi', '/audio/kutty_pattas.mp3', 215, true, 'Kutty Pattas'),
    (gen_random_uuid()::text, 'Adipoli', 'Santhosh Narayanan', '/audio/adipoli.mp3', 235, true, 'Think Indie');

-- ─── Seed Admin User ───────────────────────────────────────
-- Password: admin123 (hash below is placeholder, generate proper hash)
-- INSERT INTO users (username, email, phone_number, password_hash, full_name, is_admin, language_preference)
-- VALUES ('vaanjay_admin', 'admin@vaanjay.com', '+919999999999', '$2a$12$...', 'VAANJAY Admin', true, 'ta');
