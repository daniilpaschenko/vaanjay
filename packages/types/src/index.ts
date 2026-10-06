// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VAANJAY (வாஞ்செய்) — Shared TypeScript Types
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── Users ──────────────────────────────────────────────────
export interface User {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  full_name: string;
  bio?: string;
  profile_pic_url?: string;
  is_verified: boolean;
  badge_type?: BadgeType;
  is_admin: boolean;
  language_preference: string;
  content_language_preference: string;
  is_private: boolean;
  is_active: boolean;
  follower_count?: number;
  following_count?: number;
  post_count?: number;
  created_at: string;
  updated_at: string;
}

export type BadgeType = 'blue' | 'gold' | 'official';

export interface UserProfile extends User {
  is_following?: boolean;
  is_follow_requested?: boolean;
  is_blocked?: boolean;
}

export interface RegisterInput {
  username: string;
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
}

export interface LoginInput {
  credential: string;
  password: string;
}

export interface UpdateProfileInput {
  full_name?: string;
  bio?: string;
  profile_pic_url?: string;
  language_preference?: string;
  content_language_preference?: string;
  is_private?: boolean;
}

// ─── Auth ──────────────────────────────────────────────────
export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface OTPResponse {
  success: boolean;
  message: string;
  retry_after?: number;
}

export interface TokenPayload {
  user_id: string;
  username: string;
  is_admin: boolean;
}

// ─── Posts ─────────────────────────────────────────────────
export type PostType = 'photo' | 'video' | 'reel' | 'story' | 'text';
export type AudienceType = 'public' | 'followers' | 'close_friends';

export interface Post {
  id: string;
  user_id: string;
  media_urls: string[];
  caption?: string;
  location?: string;
  type: PostType;
  audience: AudienceType;
  is_archived: boolean;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  repost_count: number;
  is_liked?: boolean;
  is_disliked?: boolean;
  is_saved?: boolean;
  is_reposted?: boolean;
  user?: UserProfile;
  hashtags?: string[];
  tagged_users?: string[];
  created_at: string;
}

export interface CreatePostInput {
  media_urls?: string[];
  caption?: string;
  location?: string;
  type: PostType;
  audience?: AudienceType;
  hashtags?: string[];
  tagged_user_ids?: string[];
  alt_text?: string;
}

// ─── Stories ───────────────────────────────────────────────
export interface Story {
  id: string;
  user_id: string;
  media_url: string;
  caption?: string;
  type: 'image' | 'video';
  expires_at: string;
  view_count: number;
  viewers?: string[];
  user?: UserProfile;
  created_at: string;
}

export interface CreateStoryInput {
  media_url: string;
  caption?: string;
  type: 'image' | 'video';
}

// ─── Reels ─────────────────────────────────────────────────
export interface Reel {
  id: string;
  user_id: string;
  video_url: string;
  thumbnail_url?: string;
  caption?: string;
  audio_id?: string;
  audio?: AudioTrack;
  duration_seconds: number;
  view_count: number;
  like_count: number;
  dislike_count: number;
  comment_count: number;
  is_liked?: boolean;
  is_disliked?: boolean;
  is_saved?: boolean;
  user?: UserProfile;
  hashtags?: string[];
  created_at: string;
}

export interface CreateReelInput {
  video_url: string;
  thumbnail_url?: string;
  caption?: string;
  audio_id?: string;
  duration_seconds: number;
  hashtags?: string[];
}

// ─── Comments ──────────────────────────────────────────────
export interface Comment {
  id: string;
  target_id: string;
  target_type: 'post' | 'reel';
  user_id: string;
  content: string;
  parent_comment_id?: string;
  like_count: number;
  is_liked?: boolean;
  user?: UserProfile;
  replies?: Comment[];
  created_at: string;
}

export interface CreateCommentInput {
  target_id: string;
  target_type: 'post' | 'reel';
  content: string;
  parent_comment_id?: string;
}

// ─── Reactions ─────────────────────────────────────────────
export type ReactionType = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry' | 'dislike';

export interface Reaction {
  id: string;
  target_id: string;
  target_type: 'post' | 'reel' | 'comment' | 'story';
  user_id: string;
  reaction_type: ReactionType;
  created_at: string;
}

// ─── Reposts ───────────────────────────────────────────────
export interface Repost {
  id: string;
  original_post_id: string;
  original_post?: Post;
  user_id: string;
  user?: UserProfile;
  caption?: string;
  created_at: string;
}

// ─── Follows ───────────────────────────────────────────────
export type FollowStatus = 'pending' | 'accepted';

export interface Follow {
  follower_id: string;
  following_id: string;
  status: FollowStatus;
  created_at: string;
}

// ─── Messages & Conversations ──────────────────────────────
export type ConversationType = 'private' | 'group';
export type MessageType = 'text' | 'image' | 'video' | 'audio' | 'doc' | 'sticker' | 'call_log';
export type MemberRole = 'admin' | 'member';

export interface Conversation {
  id: string;
  type: ConversationType;
  name?: string;
  group_pic_url?: string;
  created_by: string;
  last_message?: Message;
  unread_count?: number;
  members?: ConversationMember[];
  created_at: string;
}

export interface ConversationMember {
  conversation_id: string;
  user_id: string;
  role: MemberRole;
  joined_at: string;
  user?: UserProfile;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender?: UserProfile;
  content?: string;
  media_url?: string;
  message_type: MessageType;
  is_read: boolean;
  reply_to_id?: string;
  reply_to?: Message;
  reactions?: MessageReaction[];
  created_at: string;
}

export interface MessageReaction {
  emoji: string;
  user_id: string;
}

export interface SendMessageInput {
  content?: string;
  media_url?: string;
  message_type: MessageType;
  reply_to_id?: string;
}

// ─── Calls ─────────────────────────────────────────────────
export type CallType = 'audio' | 'video';
export type CallStatus = 'initiated' | 'ongoing' | 'ended' | 'missed';

export interface Call {
  id: string;
  caller_id: string;
  caller?: UserProfile;
  receiver_id?: string;
  receiver?: UserProfile;
  group_id?: string;
  type: CallType;
  status: CallStatus;
  started_at?: string;
  ended_at?: string;
  duration_seconds?: number;
  created_at: string;
}

// ─── Notifications ─────────────────────────────────────────
export type NotificationType =
  | 'follow'
  | 'like'
  | 'comment'
  | 'mention'
  | 'repost'
  | 'message'
  | 'call_missed'
  | 'payment_received'
  | 'payment_request'
  | 'reel_milestone'
  | 'subscription'
  | 'tip'
  | 'live_start'
  | 'badge_granted'
  | 'admin_broadcast';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  reference_id?: string;
  reference_type?: string;
  message: string;
  is_read: boolean;
  actor?: UserProfile;
  created_at: string;
}

// ─── Payments ──────────────────────────────────────────────
export type PaymentStatus = 'pending' | 'success' | 'failed' | 'refunded';

export interface UPITransaction {
  id: string;
  sender_id: string;
  sender?: UserProfile;
  receiver_id: string;
  receiver?: UserProfile;
  amount: number;
  upi_ref_id: string;
  status: PaymentStatus;
  note?: string;
  created_at: string;
}

export interface UPIPaymentInput {
  receiver_id: string;
  amount: number;
  note?: string;
}

// ─── Reports ───────────────────────────────────────────────
export type ReportStatus = 'pending' | 'reviewed' | 'action_taken';
export type ReportTargetType = 'user' | 'post' | 'reel' | 'comment';

export interface Report {
  id: string;
  reporter_id: string;
  target_id: string;
  target_type: ReportTargetType;
  reason: string;
  status: ReportStatus;
  created_at: string;
}

export interface CreateReportInput {
  target_id: string;
  target_type: ReportTargetType;
  reason: string;
}

// ─── Saved Posts ───────────────────────────────────────────
export interface SavedPost {
  id: string;
  user_id: string;
  post_id?: string;
  reel_id?: string;
  collection_name: string;
  saved_at: string;
  post?: Post;
  reel?: Reel;
}

// ─── Audio Tracks ──────────────────────────────────────────
export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  url: string;
  duration: number;
  usage_count: number;
  is_tamil?: boolean;
  movie_name?: string;
  thumbnail_url?: string;
  created_at: string;
}

// ─── Hashtags ──────────────────────────────────────────────
export interface Hashtag {
  id: string;
  tag: string;
  usage_count: number;
  is_trending: boolean;
  category?: string;
  created_at: string;
}

// ─── Explore ───────────────────────────────────────────────
export interface ExploreTopic {
  id: string;
  name: string;
  name_ta?: string;
  icon: string;
  post_count: number;
  category: string;
}

export interface TrendingItem {
  type: 'post' | 'reel' | 'hashtag' | 'topic';
  id?: string;
  tag?: string;
  post?: Post;
  reel?: Reel;
  hashtag?: Hashtag;
  topic?: ExploreTopic;
  score: number;
}

// ─── Polls ─────────────────────────────────────────────────
export interface Poll {
  id: string;
  post_id: string;
  question: string;
  options: PollOption[];
  total_votes: number;
  expires_at?: string;
  created_at: string;
}

export interface PollOption {
  id: string;
  poll_id: string;
  text: string;
  vote_count: number;
}

// ─── Broadcasts ────────────────────────────────────────────
export interface Broadcast {
  id: string;
  name: string;
  created_by: string;
  members: string[];
  created_at: string;
}

// ─── Creator Monetization ──────────────────────────────────
export interface CreatorEarnings {
  total_earnings: number;
  pending_payout: number;
  paid_out: number;
  reel_revenue: number;
  tips_received: number;
  subscription_revenue: number;
  live_gifts_revenue: number;
}

export interface Subscription {
  id: string;
  creator_id: string;
  subscriber_id: string;
  tier: string;
  price: number;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

export interface BrandDeal {
  id: string;
  brand_id: string;
  creator_id?: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'applied' | 'approved' | 'completed';
  created_at: string;
}

// ─── Live Stream ───────────────────────────────────────────
export interface LiveStream {
  id: string;
  user_id: string;
  user?: UserProfile;
  title?: string;
  topic_tag?: string;
  viewer_count: number;
  is_active: boolean;
  started_at: string;
  ended_at?: string;
  co_host_id?: string;
  replay_url?: string;
}

// ─── Admin ─────────────────────────────────────────────────
export interface AdminDashboard {
  total_users: number;
  dau: number;
  mau: number;
  total_posts: number;
  total_reels: number;
  active_calls: number;
  total_dm_messages: number;
  revenue: number;
  user_growth: ChartDataPoint[];
  content_posted: ChartDataPoint[];
  language_distribution: Record<string, number>;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface VerificationRequest {
  id: string;
  user_id: string;
  user?: UserProfile;
  category: string;
  document_url?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'more_info';
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

// ─── Pagination ────────────────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  has_more: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

// ─── API Responses ─────────────────────────────────────────
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ─── WebSocket Events ──────────────────────────────────────
export interface WSEvent {
  type: string;
  payload: any;
  timestamp: string;
}

export interface WSPresenceEvent {
  user_id: string;
  status: 'online' | 'offline' | 'away';
  last_seen?: string;
}

export interface WSMessageEvent {
  type: 'new_message' | 'message_read' | 'message_deleted' | 'typing';
  conversation_id: string;
  message?: Message;
  user_id?: string;
}

export interface WSCallSignalEvent {
  type: 'offer' | 'answer' | 'ice_candidate' | 'call_ended';
  call_id: string;
  from_user_id: string;
  to_user_id?: string;
  sdp?: string;
  ice_candidate?: string;
}

// ─── Tamil Calendar ────────────────────────────────────────
export interface TamilDate {
  day: number;
  month: string;
  month_ta: string;
  year: number;
  thirunal?: string;
  is_festival: boolean;
  festival_name?: string;
  festival_name_ta?: string;
}

// ─── District ──────────────────────────────────────────────
export interface District {
  id: string;
  name: string;
  name_ta: string;
  region: string;
}
