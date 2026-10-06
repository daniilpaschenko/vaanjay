package repository

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	"github.com/lib/pq"
	"github.com/redis/go-redis/v9"
	"github.com/vaanjay/api/internal/models"
)

type Repositories struct {
	User         *UserRepository
	Post         *PostRepository
	Story        *StoryRepository
	Reel         *ReelRepository
	Comment      *CommentRepository
	Reaction     *ReactionRepository
	Follow       *FollowRepository
	Conversation *ConversationRepository
	Message      *MessageRepository
	Call         *CallRepository
	Notification *NotificationRepository
	Payment      *PaymentRepository
	Report       *ReportRepository
	Saved        *SavedPostRepository
	Repost       *RepostRepository
	Hashtag      *HashtagRepository
	Audio        *AudioRepository
	Poll         *PollRepository
	Broadcast    *BroadcastRepository
	Verify       *VerificationRepository
	Subscription *SubscriptionRepository
	LiveStream   *LiveStreamRepository
	Topic        *ExploreTopicRepository
	District     *DistrictRepository
}

func NewRepositories(db *sql.DB, rdb *redis.Client) *Repositories {
	return &Repositories{
		User:         NewUserRepository(db, rdb),
		Post:         NewPostRepository(db),
		Story:        NewStoryRepository(db),
		Reel:         NewReelRepository(db),
		Comment:      NewCommentRepository(db),
		Reaction:     NewReactionRepository(db),
		Follow:       NewFollowRepository(db),
		Conversation: NewConversationRepository(db),
		Message:      NewMessageRepository(db),
		Call:         NewCallRepository(db),
		Notification: NewNotificationRepository(db),
		Payment:      NewPaymentRepository(db),
		Report:       NewReportRepository(db),
		Saved:        NewSavedPostRepository(db),
		Repost:       NewRepostRepository(db),
		Hashtag:      NewHashtagRepository(db),
		Audio:        NewAudioRepository(db),
		Poll:         NewPollRepository(db),
		Broadcast:    NewBroadcastRepository(db),
		Verify:       NewVerificationRepository(db),
		Subscription: NewSubscriptionRepository(db),
		LiveStream:   NewLiveStreamRepository(db),
		Topic:        NewExploreTopicRepository(db),
		District:     NewDistrictRepository(db),
	}
}


func (r *UserRepository) DB() *sql.DB { return r.db }
func (r *PostRepository) DB() *sql.DB { return r.db }
func (r *ReelRepository) DB() *sql.DB { return r.db }
func (r *ConversationRepository) DB() *sql.DB { return r.db }
func (r *MessageRepository) DB() *sql.DB { return r.db }
func (r *CallRepository) DB() *sql.DB { return r.db }

func toNullString(s string) sql.NullString {
	if s == "" {
		return sql.NullString{Valid: false}
	}
	return sql.NullString{String: s, Valid: true}
}

func toNullTime(t time.Time) sql.NullTime {
	if t.IsZero() {
		return sql.NullTime{Valid: false}
	}
	return sql.NullTime{Time: t, Valid: true}
}
