# VAANJAY (வாஞ்செய்)

> **உங்கள் உலகம், உங்கள் குரல்** — *Your world, your voice*

VAANJAY is a production-ready social media super-app combining Instagram, WhatsApp, Facebook, Twitter, WeChat, and Reddit — designed specifically for Tamil Nadu and Tamil culture.

---

## 📋 Table of Contents

- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Mobile App](#-mobile-app)
- [Web App](#-web-app)
- [Admin Panel](#-admin-panel)
- [Deployment](#-deployment)
- [Tamil Culture Features](#-tamil-culture-features)

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Android  │  │   iOS    │  │  Web (Next.js 14)    │  │
│  │  (Expo)   │  │  (Expo)  │  │  SSR + Responsive    │  │
│  └────┬─────┘  └────┬─────┘  └──────────┬───────────┘  │
│       │             │                    │              │
│       └─────────────┼────────────────────┘              │
│                     │ HTTP/REST + WebSocket              │
├─────────────────────┼───────────────────────────────────┤
│               API Gateway (Fiber)                        │
│    ┌────────────────┼────────────────────────────┐      │
│    │           Go Backend (High Concurrency)     │      │
│    │    ┌─────────┐ ┌──────────┐ ┌───────────┐  │      │
│    │    │ REST    │ │WebSocket │ │ WebRTC    │  │      │
│    │    │ API     │ │Realtime  │ │Signaling  │  │      │
│    │    └────┬────┘ └────┬─────┘ └─────┬─────┘  │      │
│    └─────────┼───────────┼──────────────┼────────┘      │
├──────────────┼───────────┼──────────────┼───────────────┤
│              ▼           ▼              ▼               │
│    ┌─────────────────────────────────────────────┐      │
│    │         PostgreSQL + Redis                  │      │
│    │    (Primary DB)      (Caching/Sessions)     │      │
│    └─────────────────────────────────────────────┘      │
│                                                         │
│    ┌─────────────────────────────────────────────┐      │
│    │         Cloudflare R2 (Media Storage)       │      │
│    └─────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| **Mobile** | React Native (Expo bare workflow) | Single codebase for Android + iOS |
| **Web** | Next.js 14 (App Router) | SSR + SSG for performance |
| **Backend** | Go (Fiber framework) | Ultra-low memory, high concurrency |
| **Realtime** | Go + gorilla/websocket | High-performance WebSocket |
| **Calls** | WebRTC (Pion) | Peer-to-peer audio/video |
| **Database** | PostgreSQL 16 + Redis 7 | Relational + caching/sessions |
| **Media** | Cloudflare R2 | S3-compatible, cheap CDN |
| **Auth** | JWT (access + refresh) + OTP | Secure authentication |
| **Payments** | Razorpay | UPI, cards, netbanking |
| **Push** | Firebase Cloud Messaging | Cross-platform notifications |
| **State** | Zustand | Minimal memory, lightweight |

---

## ✨ Features

### Social Media Core
- 📸 **Posts** — Photo, video, text posts with likes, comments, reposts
- 🎬 **Reels** — Full-screen vertical video with audio, effects, auto-play
- 📖 **Stories** — 24-hour ephemeral content with viewer tracking
- 🔴 **Live Streams** — WebRTC-based live video with chat

### Messaging
- 💬 **Direct Messages** — Text, media, voice, documents, stickers
- 👥 **Group Chats** — Up to 500 members with admin roles
- 📞 **Audio/Video Calls** — WebRTC peer-to-peer, group calls up to 8

### Discovery
- 🔍 **Search** — Users, posts, reels, hashtags, audio
- 📈 **Explore** — Trending content, topics, hashtags
- 🏷️ **Hashtags** — Trackable, trending, searchable

### Tamil Culture
- 🏛️ **Tamil Calendar** — Traditional month display
- 🎉 **Festival Mode** — Pongal, Karthigai, Aadi Perukku themes
- 🎵 **Kollywood Audio** — Tamil movie songs for reels
- 📍 **District Communities** — TN district-based groups
- 🏷️ **Regional Topics** — #Chennai, #Madurai, #Kollywood etc.

### Monetization
- 💰 **Creator Earnings** — Reel views, tips, subscriptions
- 🎁 **Live Gifts** — Virtual gifts convertible to cash
- 🤝 **Brand Deals** — Marketplace for creators and brands
- 💳 **UPI Payments** — Send/receive money instantly

### Admin
- 📊 **Dashboard** — Real-time analytics (DAU, MAU, revenue)
- 👤 **User Management** — Ban, verify, assign badges
- 📝 **Content Moderation** — Review and remove content
- 🚩 **Report System** — User, post, and comment reports
- ✅ **Verification** — Blue tick, gold badge, official badge

---

## 📁 Project Structure

```
vaanjay/
├── apps/
│   ├── mobile/               # React Native (Expo)
│   │   ├── src/
│   │   │   ├── screens/      # All app screens
│   │   │   ├── components/   # Reusable components
│   │   │   ├── navigation/   # Stack + Tab navigators
│   │   │   ├── store/        # Zustand stores
│   │   │   ├── api/          # API client
│   │   │   ├── locales/      # i18n (Tamil first)
│   │   │   └── assets/       # Images, fonts
│   │   ├── android/
│   │   ├── ios/
│   │   └── app.json
│   │
│   ├── web/                  # Next.js 14
│   │   ├── app/
│   │   │   ├── (auth)/       # Login, Register, ForgotPassword
│   │   │   ├── (main)/       # Home, Explore, Reels, Messages
│   │   │   ├── admin/        # Admin dashboard
│   │   │   └── api/          # API proxy routes
│   │   ├── components/       # React components
│   │   ├── lib/              # Utilities
│   │   └── public/           # Static assets
│   │
├── services/
│   ├── api/                  # Go + Fiber backend
│   │   ├── cmd/main.go       # Entry point
│   │   ├── internal/
│   │   │   ├── handlers/     # HTTP handlers
│   │   │   ├── middleware/   # Auth + Admin middleware
│   │   │   ├── models/       # Data models
│   │   │   ├── repository/   # Database access layer
│   │   │   ├── services/     # Business logic
│   │   │   └── websocket/    # WebSocket hub
│   │   └── migrations/       # SQL migrations
│   │
│   └── rtc/                  # WebRTC signaling
│       ├── main.go
│       └── signaling/
│
├── packages/
│   ├── ui/                   # Shared React components
│   └── types/                # Shared TypeScript types
│
├── docker-compose.yml
├── .env.example
├── turbo.json
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- Go >= 1.22
- Docker & Docker Compose
- Expo CLI (`npm install -g expo-cli`)
- PostgreSQL 16 (if running locally)

### 1. Clone & Install

```bash
git clone https://github.com/vaanjay/vaanjay.git
cd vaanjay

# Install dependencies
npm install

# Install Go dependencies
cd services/api && go mod download && cd ../..
cd services/rtc && go mod download && cd ../..
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Infrastructure

```bash
docker compose up -d postgres redis
```

### 4. Run Database Migrations

```bash
npm run db:migrate
```

### 5. Start Backend API

```bash
npm run api:dev
```

### 6. Start Web App

```bash
npm run web:dev
```

The web app will be available at **http://localhost:3000**

### 7. Start Mobile App

```bash
npm run mobile:start

# For Android:
npm run mobile:android

# For iOS:
npm run mobile:ios
```

---

## 📖 API Documentation

All API endpoints are prefixed with `/api/v1`

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login (email/phone/username + password) |
| POST | `/auth/otp/send` | Send OTP to phone |
| POST | `/auth/otp/verify` | Verify OTP and login |
| POST | `/auth/refresh-token` | Refresh JWT tokens |
| POST | `/auth/logout` | Logout (invalidate tokens) |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/me` | Get current user |
| PUT | `/users/me` | Update profile |
| GET | `/users/:username` | Get public profile |
| POST | `/users/:id/follow` | Follow user |
| DELETE | `/users/:id/unfollow` | Unfollow user |
| GET | `/users/:id/followers` | Get followers list |
| GET | `/users/:id/following` | Get following list |
| GET | `/users/search?q=` | Search users |

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/posts` | Create post |
| GET | `/posts/feed` | Personalized feed |
| GET | `/posts/:id` | Get post by ID |
| DELETE | `/posts/:id` | Delete post |
| POST | `/posts/:id/like` | Like post |
| POST | `/posts/:id/dislike` | Dislike post |
| POST | `/posts/:id/repost` | Repost |
| POST | `/posts/:id/save` | Save post |
| GET | `/posts/saved` | Saved posts |

### Reels

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/reels` | Upload reel |
| GET | `/reels/feed` | Infinite scroll feed |
| GET | `/reels/:id` | Get reel |
| POST | `/reels/:id/like` | Like reel |
| POST | `/reels/:id/dislike` | Dislike reel |

### Messages

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/messages/conversations` | List conversations |
| POST | `/messages/conversations` | Create conversation |
| GET | `/messages/conversations/:id` | Get messages |
| POST | `/messages/conversations/:id/send` | Send message |

### WebSocket Endpoints

| Endpoint | Description |
|----------|-------------|
| `/ws/messages` | Realtime DMs and group chat |
| `/ws/notifications` | Push notifications |
| `/ws/calls/signal` | WebRTC signaling |
| `/ws/presence` | Online/offline status |

### Admin Endpoints

All admin endpoints require `Authorization: Bearer <token>` with admin role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/dashboard` | Summary statistics |
| GET | `/admin/users` | List all users |
| PUT | `/admin/users/:id/ban` | Ban user |
| PUT | `/admin/users/:id/unban` | Unban user |
| PUT | `/admin/users/:id/verify` | Grant blue tick |
| PUT | `/admin/users/:id/badge` | Assign badge type |
| GET | `/admin/reports` | All reports |
| PUT | `/admin/reports/:id/action` | Take action on report |
| GET | `/admin/analytics/users` | User growth chart |
| GET | `/admin/analytics/content` | Content activity chart |

---

## 📱 Mobile App

The mobile app is built with **React Native (Expo bare workflow)** and shares the same backend.

### Key Libraries

| Library | Purpose |
|---------|---------|
| react-native-vision-camera | Camera and video recording |
| ffmpeg-kit-react-native | On-device video compression |
| react-native-webrtc | Audio/video calls |
| react-native-video | Hardware-accelerated video playback |
| @react-native-firebase/messaging | Push notifications |
| Razorpay RN SDK | UPI payments |
| MMKV | Fast local storage |
| Zustand | State management |

### Build

```bash
# Android APK
cd apps/mobile
npx expo build:android

# iOS IPA
npx expo build:ios
```

---

## 🌐 Web App

The web app is built with **Next.js 14 (App Router)** and provides a fully responsive experience.

### Key Pages

| Route | Description |
|-------|-------------|
| `/` | Home feed |
| `/explore` | Explore trending content |
| `/reels` | Vertical scroll reels |
| `/messages` | DM interface |
| `/notifications` | Notification center |
| `/[username]` | User profile |
| `/admin/dashboard` | Admin dashboard |
| `/admin/users` | User management |
| `/admin/reports` | Report moderation |

---

## 🎨 Tamil Culture Features

### Tamil Calendar
The app displays traditional Tamil months (தை, மாசி, பங்குனி...) alongside the Gregorian date. Festival dates are highlighted with special themes.

### Language Priority
1. **Tamil (தமிழ்)** — Always first
2. English
3. Other Indian languages
4. International languages

### Festival Mode
On major Tamil festivals, the app automatically switches to festival-themed colors and displays celebration banners.

### Kollywood Audio
Pre-loaded Tamil movie audio tracks for reels, updated regularly with trending songs.

### District Communities
Auto-join groups based on user's registered Tamil Nadu district.

---

## 🛡 Security

- **Password Hashing:** bcrypt with cost factor 12
- **JWT:** Access tokens (15 min) + Refresh tokens (30 days)
- **OTP:** 6-digit, 5-minute expiry, max 3 attempts
- **Rate Limiting:** 5 req/min on auth endpoints
- **SQL Injection:** Parameterized queries only
- **CORS:** Whitelist-only origins
- **Admin Routes:** JWT + DB role check
- **Media Validation:** Server-side MIME type verification

---

## 📜 License

Copyright © 2024 VAANJAY. All rights reserved.

---

## 🙏 Acknowledgements

Built with ❤️ for Tamil Nadu and the global Tamil community.

**"உங்கள் உலகம், உங்கள் குரல்"** — Your world, your voice
