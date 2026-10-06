package services

import (
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
	"github.com/vaanjay/api/internal/repository"
)

type Services struct {
	Auth         *AuthService
	User         *UserService
	Post         *PostService
	Story        *StoryService
	Reel         *ReelService
	Comment      *CommentService
	Message      *MessageService
	Call         *CallService
	Notification *NotificationService
	Payment      *PaymentService
	Report       *ReportService
	Explore      *ExploreService
}

func NewServices(repos *repository.Repositories, rdb *redis.Client, logger zerolog.Logger) *Services {
	return &Services{
		Auth:         NewAuthService(repos, rdb, logger),
		User:         NewUserService(repos, rdb),
		Post:         NewPostService(repos),
		Story:        NewStoryService(repos),
		Reel:         NewReelService(repos),
		Comment:      NewCommentService(repos),
		Message:      NewMessageService(repos),
		Call:         NewCallService(repos),
		Notification: NewNotificationService(repos),
		Payment:      NewPaymentService(repos),
		Report:       NewReportService(repos),
		Explore:      NewExploreService(repos),
	}
}
