package services

import (
	"context"
	"errors"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/vaanjay/api/internal/models"
	"github.com/vaanjay/api/internal/repository"
)

type PostService struct {
	repos *repository.Repositories
}

func NewPostService(repos *repository.Repositories) *PostService { return &PostService{repos: repos} }

func (s *PostService) Create(ctx context.Context, userID string, input struct {
	MediaURLs []string `json:"media_urls"`
	Caption   string   `json:"caption"`
	Location  string   `json:"location"`
	Type      string   `json:"type"`
	Audience  string   `json:"audience"`
	Hashtags  []string `json:"hashtags"`
}) (*models.Post, error) {
	if input.Audience == "" {
		input.Audience = "public"
	}
	if input.Type == "" {
		input.Type = "text"
	}

	post := &models.Post{
		ID:       uuid.New().String(),
		UserID:   userID,
		Caption:  toNullString(input.Caption),
		Location: toNullString(input.Location),
		Type:     input.Type,
		Audience: input.Audience,
	}

	if len(input.MediaURLs) > 0 {
		post.MediaURLs = input.MediaURLs
	}

	if err := s.repos.Post.Create(ctx, post); err != nil {
		return nil, errors.New("failed to create post")
	}

	s.repos.Post.DB().ExecContext(ctx, `UPDATE users SET post_count = post_count + 1 WHERE id = $1`, userID)

	// Process hashtags
	for _, tag := range input.Hashtags {
		tag = strings.TrimSpace(tag)
		if tag != "" {
			s.repos.Hashtag.CreateOrUpdate(ctx, strings.ToLower(tag))
			s.repos.Post.db.ExecContext(ctx,
				`INSERT INTO post_hashtags (post_id, hashtag_id) VALUES ($1, (SELECT id FROM hashtags WHERE tag = $2)) ON CONFLICT DO NOTHING`,
				post.ID, strings.ToLower(tag))
		}
	}

	return post, nil
}

func (s *PostService) GetFeed(ctx context.Context, userID string, page, limit int) ([]*models.Post, int, error) {
	return s.repos.Post.GetFeed(ctx, userID, page, limit)
}

func (s *PostService) GetByID(ctx context.Context, id string) (*models.Post, error) {
	return s.repos.Post.GetByID(ctx, id)
}

func (s *PostService) Delete(ctx context.Context, id, userID string) error {
	return s.repos.Post.Delete(ctx, id, userID)
}

func (s *PostService) Like(ctx context.Context, postID, userID string) error {
	liked, err := s.repos.Reaction.Toggle(ctx, postID, "post", userID, "like")
	if err != nil {
		return err
	}
	if liked {
		s.repos.Post.IncrementLike(ctx, postID)
	}
	return nil
}

func (s *PostService) Dislike(ctx context.Context, postID, userID string) error {
	disliked, err := s.repos.Reaction.Toggle(ctx, postID, "post", userID, "dislike")
	if err != nil {
		return err
	}
	if disliked {
		s.repos.Post.IncrementDislike(ctx, postID)
	}
	return nil
}

func (s *PostService) Repost(ctx context.Context, userID, postID, caption string) error {
	repost := &models.Repost{
		ID:             uuid.New().String(),
		OriginalPostID: postID,
		UserID:         userID,
		Caption:        toNullString(caption),
	}
	if err := s.repos.Repost.Create(ctx, repost); err != nil {
		return err
	}
	return s.repos.Post.IncrementRepostCount(ctx, postID)
}

func (s *PostService) Save(ctx context.Context, userID, postID string) error {
	return s.repos.Saved.Save(ctx, userID, postID, "default")
}

func (s *PostService) GetSaved(ctx context.Context, userID string, page, limit int) ([]*models.SavedPost, int, error) {
	return s.repos.Saved.GetByUser(ctx, userID, page, limit)
}

type StoryService struct{ repos *repository.Repositories }
func NewStoryService(repos *repository.Repositories) *StoryService { return &StoryService{repos: repos} }

func (s *StoryService) Create(ctx context.Context, userID string, input struct {
	MediaURL string `json:"media_url"`
	Caption  string `json:"caption"`
	Type     string `json:"type"`
}) (*models.Story, error) {
	story := &models.Story{
		ID:        uuid.New().String(),
		UserID:    userID,
		MediaURL:  input.MediaURL,
		Caption:   toNullString(input.Caption),
		Type:      input.Type,
		ExpiresAt: time.Now().Add(24 * time.Hour),
	}
	if err := s.repos.Story.Create(ctx, story); err != nil {
		return nil, errors.New("failed to create story")
	}
	return story, nil
}

func (s *StoryService) GetFeed(ctx context.Context, userID string) ([]*models.Story, error) {
	return s.repos.Story.GetActiveFeed(ctx, userID)
}

func (s *StoryService) Delete(ctx context.Context, id, userID string) error {
	return s.repos.Story.Delete(ctx, id, userID)
}

func (s *StoryService) View(ctx context.Context, storyID, userID string) error {
	return s.repos.Story.AddViewer(ctx, storyID, userID)
}

type ReelService struct{ repos *repository.Repositories }
func NewReelService(repos *repository.Repositories) *ReelService { return &ReelService{repos: repos} }

func (s *ReelService) Create(ctx context.Context, userID string, input struct {
	VideoURL        string   `json:"video_url"`
	ThumbnailURL    string   `json:"thumbnail_url"`
	Caption         string   `json:"caption"`
	AudioID         string   `json:"audio_id"`
	DurationSeconds int      `json:"duration_seconds"`
	Hashtags        []string `json:"hashtags"`
}) (*models.Reel, error) {
	reel := &models.Reel{
		ID:              uuid.New().String(),
		UserID:          userID,
		VideoURL:        input.VideoURL,
		ThumbnailURL:    toNullString(input.ThumbnailURL),
		Caption:         toNullString(input.Caption),
		AudioID:         toNullString(input.AudioID),
		DurationSeconds: input.DurationSeconds,
	}
	if err := s.repos.Reel.Create(ctx, reel); err != nil {
		return nil, errors.New("failed to create reel")
	}
	if input.AudioID != "" {
		s.repos.Audio.IncrementUsage(ctx, input.AudioID)
	}
	for _, tag := range input.Hashtags {
		tag = strings.TrimSpace(tag)
		if tag != "" {
			s.repos.Hashtag.CreateOrUpdate(ctx, strings.ToLower(tag))
		}
	}
	return reel, nil
}

func (s *ReelService) GetFeed(ctx context.Context, userID string, page, limit int) ([]*models.Reel, int, error) {
	return s.repos.Reel.GetFeed(ctx, userID, page, limit)
}

func (s *ReelService) GetByID(ctx context.Context, id string) (*models.Reel, error) {
	s.repos.Reel.IncrementView(ctx, id)
	return s.repos.Reel.GetByID(ctx, id)
}

func (s *ReelService) Like(ctx context.Context, reelID, userID string) error {
	liked, err := s.repos.Reaction.Toggle(ctx, reelID, "reel", userID, "like")
	if err != nil { return err }
	if liked { s.repos.Reel.IncrementLike(ctx, reelID) }
	return nil
}

func (s *ReelService) Dislike(ctx context.Context, reelID, userID string) error {
	disliked, err := s.repos.Reaction.Toggle(ctx, reelID, "reel", userID, "dislike")
	if err != nil { return err }
	if disliked { s.repos.Reel.IncrementDislike(ctx, reelID) }
	return nil
}

type CommentService struct{ repos *repository.Repositories }
func NewCommentService(repos *repository.Repositories) *CommentService { return &CommentService{repos: repos} }

func (s *CommentService) Create(ctx context.Context, userID string, input struct {
	TargetID         string `json:"target_id"`
	TargetType       string `json:"target_type"`
	Content          string `json:"content"`
	ParentCommentID  string `json:"parent_comment_id"`
}) (*models.Comment, error) {
	if input.Content == "" {
		return nil, errors.New("comment content is required")
	}
	comment := &models.Comment{
		ID:              uuid.New().String(),
		TargetID:        input.TargetID,
		TargetType:      input.TargetType,
		UserID:          userID,
		Content:         input.Content,
		ParentCommentID: toNullString(input.ParentCommentID),
	}
	if err := s.repos.Comment.Create(ctx, comment); err != nil {
		return nil, errors.New("failed to create comment")
	}
	if input.TargetType == "post" {
		s.repos.Post.IncrementCommentCount(ctx, input.TargetID)
	} else if input.TargetType == "reel" {
		s.repos.Reel.DB().ExecContext(ctx, `UPDATE reels SET comment_count = comment_count + 1 WHERE id = $1`, input.TargetID)
	}
	return comment, nil
}

func (s *CommentService) GetByTarget(ctx context.Context, targetID, targetType string, page, limit int) ([]*models.Comment, int, error) {
	return s.repos.Comment.GetByTarget(ctx, targetID, targetType, page, limit)
}

func (s *CommentService) Delete(ctx context.Context, id, userID string) error {
	return s.repos.Comment.Delete(ctx, id, userID)
}

func (s *CommentService) Like(ctx context.Context, commentID, userID string) error {
	liked, err := s.repos.Reaction.Toggle(ctx, commentID, "comment", userID, "like")
	if err != nil { return err }
	if liked { s.repos.Comment.IncrementLike(ctx, commentID) }
	return nil
}

func (s *CommentService) Reply(ctx context.Context, userID string, input struct {
	TargetID    string `json:"target_id"`
	TargetType  string `json:"target_type"`
	Content     string `json:"content"`
	ParentID    string `json:"parent_comment_id"`
}) (*models.Comment, error) {
	return s.Create(ctx, userID, struct {
		TargetID         string
		TargetType       string
		Content          string
		ParentCommentID  string
	}{TargetID: input.TargetID, TargetType: input.TargetType, Content: input.Content, ParentCommentID: input.ParentID})
}
