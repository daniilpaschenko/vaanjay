package repository

import (
	"context"
	"database/sql"

	"github.com/lib/pq"
	"github.com/vaanjay/api/internal/models"
)

type StoryRepository struct {
	db *sql.DB
}

func NewStoryRepository(db *sql.DB) *StoryRepository {
	return &StoryRepository{db: db}
}

func (r *StoryRepository) Create(ctx context.Context, story *models.Story) error {
	query := `INSERT INTO stories (id, user_id, media_url, caption, type, expires_at)
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING created_at`
	return r.db.QueryRowContext(ctx, query,
		story.ID, story.UserID, story.MediaURL, story.Caption, story.Type, story.ExpiresAt,
	).Scan(&story.CreatedAt)
}

func (r *StoryRepository) GetActiveFeed(ctx context.Context, userID string) ([]*models.Story, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT s.id, s.user_id, s.media_url, s.caption, s.type, s.expires_at, s.view_count, s.created_at
		FROM stories s
		WHERE s.user_id IN (SELECT following_id FROM follows WHERE follower_id = $1 AND status = 'accepted')
		AND s.expires_at > NOW() ORDER BY s.created_at DESC`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var stories []*models.Story
	for rows.Next() {
		s := &models.Story{}
		rows.Scan(&s.ID, &s.UserID, &s.MediaURL, &s.Caption, &s.Type, &s.ExpiresAt, &s.ViewCount, &s.CreatedAt)
		stories = append(stories, s)
	}
	return stories, nil
}

func (r *StoryRepository) GetByID(ctx context.Context, id string) (*models.Story, error) {
	s := &models.Story{}
	err := r.db.QueryRowContext(ctx,
		`SELECT id, user_id, media_url, caption, type, expires_at, view_count, created_at
		FROM stories WHERE id = $1 AND expires_at > NOW()`, id).
		Scan(&s.ID, &s.UserID, &s.MediaURL, &s.Caption, &s.Type, &s.ExpiresAt, &s.ViewCount, &s.CreatedAt)
	if err != nil {
		return nil, err
	}
	return s, nil
}

func (r *StoryRepository) Delete(ctx context.Context, id, userID string) error {
	result, err := r.db.ExecContext(ctx,
		`DELETE FROM stories WHERE id = $1 AND user_id = $2`, id, userID)
	if err != nil {
		return err
	}
	rows, _ := result.RowsAffected()
	if rows == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (r *StoryRepository) AddViewer(ctx context.Context, storyID, userID string) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE stories SET view_count = view_count + 1,
		viewers = array_append(COALESCE(viewers, '{}'), $1)
		WHERE id = $2 AND NOT ($1 = ANY(COALESCE(viewers, '{}')))`,
		userID, storyID)
	return err
}
