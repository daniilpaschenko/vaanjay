package models

import (
	"database/sql"
	"time"
)

// ─── User ────────────────────────────────────────────────────
type User struct {
	ID                         string         `json:"id" db:"id"`
	Username                   string         `json:"username" db:"username"`
	Email                      string         `json:"email" db:"email"`
	PhoneNumber                string         `json:"phone_number" db:"phone_number"`
	PasswordHash               string         `json:"-" db:"password_hash"`
	FullName                   string         `json:"full_name" db:"full_name"`
	Bio                        sql.NullString `json:"bio" db:"bio"`
	ProfilePicURL              sql.NullString `json:"profile_pic_url" db:"profile_pic_url"`
	WebsiteURL                 sql.NullString `json:"website_url" db:"website_url"`
	IsVerified                 bool           `json:"is_verified" db:"is_verified"`
	BadgeType                  sql.NullString `json:"badge_type" db:"badge_type"`
	IsAdmin                    bool           `json:"is_admin" db:"is_admin"`
	LanguagePreference         string         `json:"language_preference" db:"language_preference"`
	ContentLanguagePreference  string         `json:"content_language_preference" db:"content_language_preference"`
	IsPrivate                  bool           `json:"is_private" db:"is_private"`
	IsActive                   bool           `json:"is_active" db:"is_active"`
	Gender                     sql.NullString `json:"gender" db:"gender"`
	District                   sql.NullString `json:"district" db:"district"`
	LastSeen                   sql.NullTime   `json:"last_seen" db:"last_seen"`
	FollowerCount              int            `json:"follower_count" db:"follower_count"`
	FollowingCount             int            `json:"following_count" db:"following_count"`
	PostCount                  int            `json:"post_count" db:"post_count"`
	CreatedAt                  time.Time      `json:"created_at" db:"created_at"`
	UpdatedAt                  time.Time      `json:"updated_at" db:"updated_at"`
}

// ─── Post ────────────────────────────────────────────────────
type Post struct {
	ID           string         `json:"id" db:"id"`
	UserID       string         `json:"user_id" db:"user_id"`
	MediaURLs    []string       `json:"media_urls" db:"media_urls"`
	Caption      sql.NullString `json:"caption" db:"caption"`
	Location     sql.NullString `json:"location" db:"location"`
	Type         string         `json:"type" db:"type"`
	Audience     string         `json:"audience" db:"audience"`
	AltText      sql.NullString `json:"alt_text" db:"alt_text"`
	IsArchived   bool           `json:"is_archived" db:"is_archived"`
	IsPinned     bool           `json:"is_pinned" db:"is_pinned"`
	LikeCount    int            `json:"like_count" db:"like_count"`
	DislikeCount int            `json:"dislike_count" db:"dislike_count"`
	CommentCount int            `json:"comment_count" db:"comment_count"`
	RepostCount  int            `json:"repost_count" db:"repost_count"`
	CreatedAt    time.Time      `json:"created_at" db:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at" db:"updated_at"`
}

// ─── Story ───────────────────────────────────────────────────
type Story struct {
	ID        string         `json:"id" db:"id"`
	UserID    string         `json:"user_id" db:"user_id"`
	MediaURL  string         `json:"media_url" db:"media_url"`
	Caption   sql.NullString `json:"caption" db:"caption"`
	Type      string         `json:"type" db:"type"`
	ExpiresAt time.Time      `json:"expires_at" db:"expires_at"`
	ViewCount int            `json:"view_count" db:"view_count"`
	CreatedAt time.Time      `json:"created_at" db:"created_at"`
}

// ─── Reel ────────────────────────────────────────────────────
type Reel struct {
	ID              string         `json:"id" db:"id"`
	UserID          string         `json:"user_id" db:"user_id"`
	VideoURL        string         `json:"video_url" db:"video_url"`
	ThumbnailURL    sql.NullString `json:"thumbnail_url" db:"thumbnail_url"`
	Caption         sql.NullString `json:"caption" db:"caption"`
	AudioID         sql.NullString `json:"audio_id" db:"audio_id"`
	DurationSeconds int            `json:"duration_seconds" db:"duration_seconds"`
	ViewCount       int            `json:"view_count" db:"view_count"`
	LikeCount       int            `json:"like_count" db:"like_count"`
	DislikeCount    int            `json:"dislike_count" db:"dislike_count"`
	CommentCount    int            `json:"comment_count" db:"comment_count"`
	IsFeatured      bool           `json:"is_featured" db:"is_featured"`
	CreatedAt       time.Time      `json:"created_at" db:"created_at"`
}

// ─── Comment ─────────────────────────────────────────────────
type Comment struct {
	ID               string         `json:"id" db:"id"`
	TargetID         string         `json:"target_id" db:"target_id"`
	TargetType       string         `json:"target_type" db:"target_type"`
	UserID           string         `json:"user_id" db:"user_id"`
	Content          string         `json:"content" db:"content"`
	ParentCommentID  sql.NullString `json:"parent_comment_id" db:"parent_comment_id"`
	LikeCount        int            `json:"like_count" db:"like_count"`
	CreatedAt        time.Time      `json:"created_at" db:"created_at"`
}

// ─── Reaction ────────────────────────────────────────────────
type Reaction struct {
	ID           string    `json:"id" db:"id"`
	TargetID     string    `json:"target_id" db:"target_id"`
	TargetType   string    `json:"target_type" db:"target_type"`
	UserID       string    `json:"user_id" db:"user_id"`
	ReactionType string    `json:"reaction_type" db:"reaction_type"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
}

// ─── Follow ──────────────────────────────────────────────────
type Follow struct {
	FollowerID  string    `json:"follower_id" db:"follower_id"`
	FollowingID string    `json:"following_id" db:"following_id"`
	Status      string    `json:"status" db:"status"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

// ─── Conversation ────────────────────────────────────────────
type Conversation struct {
	ID          string         `json:"id" db:"id"`
	Type        string         `json:"type" db:"type"`
	Name        sql.NullString `json:"name" db:"name"`
	GroupPicURL sql.NullString `json:"group_pic_url" db:"group_pic_url"`
	CreatedBy   string         `json:"created_by" db:"created_by"`
	CreatedAt   time.Time      `json:"created_at" db:"created_at"`
}

// ─── Message ─────────────────────────────────────────────────
type Message struct {
	ID             string         `json:"id" db:"id"`
	ConversationID string         `json:"conversation_id" db:"conversation_id"`
	SenderID       string         `json:"sender_id" db:"sender_id"`
	Content        sql.NullString `json:"content" db:"content"`
	MediaURL       sql.NullString `json:"media_url" db:"media_url"`
	MessageType    string         `json:"message_type" db:"message_type"`
	IsRead         bool           `json:"is_read" db:"is_read"`
	ReplyToID      sql.NullString `json:"reply_to_id" db:"reply_to_id"`
	CreatedAt      time.Time      `json:"created_at" db:"created_at"`
}

// ─── Call ────────────────────────────────────────────────────
type Call struct {
	ID              string         `json:"id" db:"id"`
	CallerID        string         `json:"caller_id" db:"caller_id"`
	ReceiverID      sql.NullString `json:"receiver_id" db:"receiver_id"`
	GroupID         sql.NullString `json:"group_id" db:"group_id"`
	Type            string         `json:"type" db:"type"`
	Status          string         `json:"status" db:"status"`
	StartedAt       sql.NullTime   `json:"started_at" db:"started_at"`
	EndedAt         sql.NullTime   `json:"ended_at" db:"ended_at"`
	DurationSeconds sql.NullInt64  `json:"duration_seconds" db:"duration_seconds"`
	CreatedAt       time.Time      `json:"created_at" db:"created_at"`
}

// ─── Notification ────────────────────────────────────────────
type Notification struct {
	ID            string         `json:"id" db:"id"`
	UserID        string         `json:"user_id" db:"user_id"`
	Type          string         `json:"type" db:"type"`
	ReferenceID   sql.NullString `json:"reference_id" db:"reference_id"`
	ReferenceType sql.NullString `json:"reference_type" db:"reference_type"`
	Message       string         `json:"message" db:"message"`
	ActorID       sql.NullString `json:"actor_id" db:"actor_id"`
	IsRead        bool           `json:"is_read" db:"is_read"`
	CreatedAt     time.Time      `json:"created_at" db:"created_at"`
}

// ─── UPITransaction ──────────────────────────────────────────
type UPITransaction struct {
	ID         string         `json:"id" db:"id"`
	SenderID   string         `json:"sender_id" db:"sender_id"`
	ReceiverID string         `json:"receiver_id" db:"receiver_id"`
	Amount     float64        `json:"amount" db:"amount"`
	UPIRefID   string         `json:"upi_ref_id" db:"upi_ref_id"`
	Status     string         `json:"status" db:"status"`
	Note       sql.NullString `json:"note" db:"note"`
	CreatedAt  time.Time      `json:"created_at" db:"created_at"`
}

// ─── Report ──────────────────────────────────────────────────
type Report struct {
	ID         string    `json:"id" db:"id"`
	ReporterID string    `json:"reporter_id" db:"reporter_id"`
	TargetID   string    `json:"target_id" db:"target_id"`
	TargetType string    `json:"target_type" db:"target_type"`
	Reason     string    `json:"reason" db:"reason"`
	Status     string    `json:"status" db:"status"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
}

// ─── SavedPost ───────────────────────────────────────────────
type SavedPost struct {
	ID             string    `json:"id" db:"id"`
	UserID         string    `json:"user_id" db:"user_id"`
	PostID         sql.NullString `json:"post_id" db:"post_id"`
	ReelID         sql.NullString `json:"reel_id" db:"reel_id"`
	CollectionName string    `json:"collection_name" db:"collection_name"`
	SavedAt        time.Time `json:"saved_at" db:"saved_at"`
}

// ─── Repost ──────────────────────────────────────────────────
type Repost struct {
	ID             string         `json:"id" db:"id"`
	OriginalPostID string         `json:"original_post_id" db:"original_post_id"`
	UserID         string         `json:"user_id" db:"user_id"`
	Caption        sql.NullString `json:"caption" db:"caption"`
	CreatedAt      time.Time      `json:"created_at" db:"created_at"`
}

// ─── Hashtag ─────────────────────────────────────────────────
type Hashtag struct {
	ID         string `json:"id" db:"id"`
	Tag        string `json:"tag" db:"tag"`
	UsageCount int    `json:"usage_count" db:"usage_count"`
	IsTrending bool   `json:"is_trending" db:"is_trending"`
	Category   sql.NullString `json:"category" db:"category"`
	CreatedAt  time.Time `json:"created_at" db:"created_at"`
}

// ─── AudioTrack ──────────────────────────────────────────────
type AudioTrack struct {
	ID          string `json:"id" db:"id"`
	Title       string `json:"title" db:"title"`
	Artist      string `json:"artist" db:"artist"`
	URL         string `json:"url" db:"url"`
	Duration    int    `json:"duration" db:"duration"`
	UsageCount  int    `json:"usage_count" db:"usage_count"`
	IsTamil     bool   `json:"is_tamil" db:"is_tamil"`
	MovieName   sql.NullString `json:"movie_name" db:"movie_name"`
	ThumbnailURL sql.NullString `json:"thumbnail_url" db:"thumbnail_url"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

// ─── Poll ────────────────────────────────────────────────────
type Poll struct {
	ID        string         `json:"id" db:"id"`
	PostID    string         `json:"post_id" db:"post_id"`
	Question  string         `json:"question" db:"question"`
	TotalVotes int           `json:"total_votes" db:"total_votes"`
	ExpiresAt sql.NullTime   `json:"expires_at" db:"expires_at"`
	CreatedAt time.Time      `json:"created_at" db:"created_at"`
}

type PollOption struct {
	ID        string `json:"id" db:"id"`
	PollID    string `json:"poll_id" db:"poll_id"`
	Text      string `json:"text" db:"text"`
	VoteCount int    `json:"vote_count" db:"vote_count"`
}

// ─── Broadcast ───────────────────────────────────────────────
type Broadcast struct {
	ID        string    `json:"id" db:"id"`
	Name      string    `json:"name" db:"name"`
	CreatedBy string    `json:"created_by" db:"created_by"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// ─── VerificationRequest ─────────────────────────────────────
type VerificationRequest struct {
	ID          string         `json:"id" db:"id"`
	UserID      string         `json:"user_id" db:"user_id"`
	Category    string         `json:"category" db:"category"`
	DocumentURL sql.NullString `json:"document_url" db:"document_url"`
	Reason      string         `json:"reason" db:"reason"`
	Status      string         `json:"status" db:"status"`
	ReviewedBy  sql.NullString `json:"reviewed_by" db:"reviewed_by"`
	ReviewedAt  sql.NullTime   `json:"reviewed_at" db:"reviewed_at"`
	CreatedAt   time.Time      `json:"created_at" db:"created_at"`
}

// ─── Subscription ────────────────────────────────────────────
type Subscription struct {
	ID           string    `json:"id" db:"id"`
	CreatorID    string    `json:"creator_id" db:"creator_id"`
	SubscriberID string    `json:"subscriber_id" db:"subscriber_id"`
	Tier         string    `json:"tier" db:"tier"`
	Price        float64   `json:"price" db:"price"`
	IsActive     bool      `json:"is_active" db:"is_active"`
	ExpiresAt    time.Time `json:"expires_at" db:"expires_at"`
	CreatedAt    time.Time `json:"created_at" db:"created_at"`
}

// ─── LiveStream ──────────────────────────────────────────────
type LiveStream struct {
	ID          string         `json:"id" db:"id"`
	UserID      string         `json:"user_id" db:"user_id"`
	Title       sql.NullString `json:"title" db:"title"`
	TopicTag    sql.NullString `json:"topic_tag" db:"topic_tag"`
	ViewerCount int            `json:"viewer_count" db:"viewer_count"`
	IsActive    bool           `json:"is_active" db:"is_active"`
	StartedAt   time.Time      `json:"started_at" db:"started_at"`
	EndedAt     sql.NullTime   `json:"ended_at" db:"ended_at"`
	CoHostID    sql.NullString `json:"co_host_id" db:"co_host_id"`
	ReplayURL   sql.NullString `json:"replay_url" db:"replay_url"`
}

// ─── ExploreTopic ────────────────────────────────────────────
type ExploreTopic struct {
	ID        string `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	NameTA    string `json:"name_ta" db:"name_ta"`
	Icon      string `json:"icon" db:"icon"`
	PostCount int    `json:"post_count" db:"post_count"`
	Category  string `json:"category" db:"category"`
}

// ─── District ────────────────────────────────────────────────
type District struct {
	ID     string `json:"id" db:"id"`
	Name   string `json:"name" db:"name"`
	NameTA string `json:"name_ta" db:"name_ta"`
	Region string `json:"region" db:"region"`
}
