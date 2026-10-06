package services

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/vaanjay/api/internal/models"
	"github.com/vaanjay/api/internal/repository"
)

type MessageService struct {
	repos *repository.Repositories
}

func NewMessageService(repos *repository.Repositories) *MessageService {
	return &MessageService{repos: repos}
}

func (s *MessageService) GetConversations(ctx context.Context, userID string) ([]*models.Conversation, error) {
	convs, err := s.repos.Conversation.GetByUser(ctx, userID)
	if err != nil {
		return nil, err
	}
	for _, conv := range convs {
		lastMsg, _ := s.repos.Message.GetLastMessage(ctx, conv.ID)
		if lastMsg != nil {
			convName := "last_message"
			_ = convName
		}
		unreadCount, _ := s.repos.Message.GetUnreadCount(ctx, conv.ID, userID)
		convUnreadCount := unreadCount
		_ = convUnreadCount
	}
	return convs, nil
}

func (s *MessageService) CreateConversation(ctx context.Context, userID string, input struct {
	Type        string   `json:"type"`
	Name        string   `json:"name"`
	MemberIDs   []string `json:"member_ids"`
}) (*models.Conversation, error) {
	if input.Type == "private" && len(input.MemberIDs) == 1 {
		convID, err := s.repos.Conversation.GetOrCreatePrivate(ctx, userID, input.MemberIDs[0])
		if err != nil {
			return nil, err
		}
		return s.repos.Conversation.GetByID(ctx, convID)
	}

	conv := &models.Conversation{
		ID:        uuid.New().String(),
		Type:      input.Type,
		Name:      toNullString(input.Name),
		CreatedBy: userID,
	}
	if err := s.repos.Conversation.Create(ctx, conv); err != nil {
		return nil, errors.New("failed to create conversation")
	}

	s.repos.Conversation.AddMember(ctx, conv.ID, userID, "admin")
	for _, memberID := range input.MemberIDs {
		s.repos.Conversation.AddMember(ctx, conv.ID, memberID, "member")
	}
	return conv, nil
}

func (s *MessageService) GetMessages(ctx context.Context, convID, userID string, page, limit int) ([]*models.Message, int, error) {
	isMember, _ := s.repos.Conversation.DB().ExecContext(ctx,
		`SELECT 1 FROM conversation_members WHERE conversation_id=$1 AND user_id=$2`, convID, userID)
	if isMember == nil {
		return nil, 0, errors.New("not a member of this conversation")
	}
	s.repos.Message.MarkAllAsRead(ctx, convID, userID)
	return s.repos.Message.GetByConversation(ctx, convID, page, limit)
}

func (s *MessageService) SendMessage(ctx context.Context, senderID string, input struct {
	ConversationID string `json:"conversation_id"`
	Content        string `json:"content"`
	MediaURL       string `json:"media_url"`
	MessageType    string `json:"message_type"`
	ReplyToID      string `json:"reply_to_id"`
}) (*models.Message, error) {
	msg := &models.Message{
		ID:             uuid.New().String(),
		ConversationID: input.ConversationID,
		SenderID:       senderID,
		Content:        toNullString(input.Content),
		MediaURL:       toNullString(input.MediaURL),
		MessageType:    input.MessageType,
		ReplyToID:      toNullString(input.ReplyToID),
	}
	if err := s.repos.Message.Create(ctx, msg); err != nil {
		return nil, errors.New("failed to send message")
	}
	return msg, nil
}

func (s *MessageService) DeleteMessage(ctx context.Context, msgID, userID string) error {
	return s.repos.Message.Delete(ctx, msgID, userID)
}

func (s *MessageService) AddMember(ctx context.Context, convID, userID, requesterID string) error {
	return s.repos.Conversation.AddMember(ctx, convID, userID, "member")
}

func (s *MessageService) RemoveMember(ctx context.Context, convID, userID, requesterID string) error {
	return s.repos.Conversation.RemoveMember(ctx, convID, userID)
}

func (s *MessageService) UpdateConversationInfo(ctx context.Context, convID, name, groupPicURL string) error {
	return s.repos.Conversation.UpdateInfo(ctx, convID, name, groupPicURL)
}

type CallService struct{ repos *repository.Repositories }
func NewCallService(repos *repository.Repositories) *CallService { return &CallService{repos: repos} }

func (s *CallService) Initiate(ctx context.Context, callerID string, input struct {
	ReceiverID string `json:"receiver_id"`
	GroupID    string `json:"group_id"`
	Type       string `json:"type"`
}) (*models.Call, error) {
	call := &models.Call{
		ID:         uuid.New().String(),
		CallerID:   callerID,
		ReceiverID: toNullString(input.ReceiverID),
		GroupID:    toNullString(input.GroupID),
		Type:       input.Type,
	}
	if err := s.repos.Call.Create(ctx, call); err != nil {
		return nil, errors.New("failed to initiate call")
	}
	return call, nil
}

func (s *CallService) Accept(ctx context.Context, callID, userID string) error {
	return s.repos.Call.UpdateStatus(ctx, callID, "ongoing")
}

func (s *CallService) Reject(ctx context.Context, callID, userID string) error {
	return s.repos.Call.UpdateStatus(ctx, callID, "missed")
}

func (s *CallService) End(ctx context.Context, callID, userID string) error {
	call, err := s.repos.Call.GetByID(ctx, callID)
	if err != nil { return err }
	duration := int64(time.Since(call.CreatedAt).Seconds())
	s.repos.Call.DB().ExecContext(ctx, `UPDATE calls SET status='ended', duration_seconds=$1, ended_at=NOW() WHERE id=$2`, duration, callID)
	return nil
}

func (s *CallService) GetHistory(ctx context.Context, userID string, page, limit int) ([]*models.Call, int, error) {
	return s.repos.Call.GetHistory(ctx, userID, page, limit)
}

type NotificationService struct{ repos *repository.Repositories }
func NewNotificationService(repos *repository.Repositories) *NotificationService { return &NotificationService{repos: repos} }

func (s *NotificationService) GetAll(ctx context.Context, userID string, page, limit int) ([]*models.Notification, int, error) {
	return s.repos.Notification.GetByUser(ctx, userID, page, limit)
}

func (s *NotificationService) MarkRead(ctx context.Context, id, userID string) error {
	return s.repos.Notification.MarkRead(ctx, id, userID)
}

func (s *NotificationService) MarkAllRead(ctx context.Context, userID string) error {
	return s.repos.Notification.MarkAllRead(ctx, userID)
}

type PaymentService struct{ repos *repository.Repositories }
func NewPaymentService(repos *repository.Repositories) *PaymentService { return &PaymentService{repos: repos} }

func (s *PaymentService) UPISend(ctx context.Context, senderID string, input struct {
	ReceiverID string  `json:"receiver_id"`
	Amount     float64 `json:"amount"`
	Note       string  `json:"note"`
}) (*models.UPITransaction, error) {
	if input.Amount <= 0 {
		return nil, errors.New("invalid amount")
	}
	txn := &models.UPITransaction{
		ID:         uuid.New().String(),
		SenderID:   senderID,
		ReceiverID: input.ReceiverID,
		Amount:     input.Amount,
		UPIRefID:   "UPI" + uuid.New().String()[:8],
		Status:     "success",
		Note:       toNullString(input.Note),
	}
	if err := s.repos.Payment.Create(ctx, txn); err != nil {
		return nil, errors.New("payment failed")
	}
	return txn, nil
}

func (s *PaymentService) GetHistory(ctx context.Context, userID string, page, limit int) ([]*models.UPITransaction, int, error) {
	return s.repos.Payment.GetByUser(ctx, userID, page, limit)
}

type ReportService struct{ repos *repository.Repositories }
func NewReportService(repos *repository.Repositories) *ReportService { return &ReportService{repos: repos} }

func (s *ReportService) Create(ctx context.Context, reporterID string, input struct {
	TargetID   string `json:"target_id"`
	TargetType string `json:"target_type"`
	Reason     string `json:"reason"`
}) (*models.Report, error) {
	report := &models.Report{
		ID:         uuid.New().String(),
		ReporterID: reporterID,
		TargetID:   input.TargetID,
		TargetType: input.TargetType,
		Reason:     input.Reason,
		Status:     "pending",
	}
	if err := s.repos.Report.Create(ctx, report); err != nil {
		return nil, errors.New("failed to submit report")
	}
	return report, nil
}

type ExploreService struct{ repos *repository.Repositories }
func NewExploreService(repos *repository.Repositories) *ExploreService { return &ExploreService{repos: repos} }

func (s *ExploreService) GetTrending(ctx context.Context, page, limit int) (map[string]interface{}, error) {
	posts, err := s.repos.Post.GetTrending(ctx, page, limit)
	if err != nil { return nil, err }
	reels, err := s.repos.Reel.GetTrending(ctx, page, limit)
	if err != nil { return nil, err }
	hashtags, err := s.repos.Hashtag.GetTrending(ctx, 10)
	if err != nil { return nil, err }
	audio, err := s.repos.Audio.GetTrending(ctx, 10)
	if err != nil { return nil, err }
	return map[string]interface{}{
		"posts":    posts,
		"reels":    reels,
		"hashtags": hashtags,
		"audio":    audio,
	}, nil
}

func (s *ExploreService) GetByHashtag(ctx context.Context, tag string, page, limit int) (*models.Hashtag, error) {
	return s.repos.Hashtag.GetByTag(ctx, tag)
}

func (s *ExploreService) GetTopics(ctx context.Context) ([]*models.ExploreTopic, error) {
	return s.repos.Topic.GetAll(ctx)
}

func (s *ExploreService) Search(ctx context.Context, query, searchType string, page, limit int) (map[string]interface{}, error) {
	result := make(map[string]interface{})
	if searchType == "" || searchType == "all" || searchType == "users" {
		users, _, _ := s.repos.User.Search(ctx, query, page, limit)
		result["users"] = users
	}
	if searchType == "" || searchType == "all" || searchType == "hashtags" {
		tags, _ := s.repos.Hashtag.Search(ctx, query, limit)
		result["hashtags"] = tags
	}
	return result, nil
}
