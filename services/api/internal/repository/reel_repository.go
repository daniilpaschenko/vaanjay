package repository

import (
	"context"
	"database/sql"

	"github.com/vaanjay/api/internal/models"
)

type ReelRepository struct {
	db *sql.DB
}

func NewReelRepository(db *sql.DB) *ReelRepository {
	return &ReelRepository{db: db}
}

func (r *ReelRepository) Create(ctx context.Context, reel *models.Reel) error {
	query := `INSERT INTO reels (id, user_id, video_url, thumbnail_url, caption, audio_id, duration_seconds)
		VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING created_at`
	return r.db.QueryRowContext(ctx, query,
		reel.ID, reel.UserID, reel.VideoURL, reel.ThumbnailURL, reel.Caption, reel.AudioID, reel.DurationSeconds,
	).Scan(&reel.CreatedAt)
}

func (r *ReelRepository) GetFeed(ctx context.Context, userID string, page, limit int) ([]*models.Reel, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM reels r WHERE r.is_featured = true OR
		r.user_id IN (SELECT following_id FROM follows WHERE follower_id = $1 AND status = 'accepted')`, userID).Scan(&total)

	rows, err := r.db.QueryContext(ctx, `
		SELECT r.id, r.user_id, r.video_url, r.thumbnail_url, r.caption, r.audio_id,
			r.duration_seconds, r.view_count, r.like_count, r.dislike_count, r.comment_count, r.created_at
		FROM reels r
		WHERE r.is_featured = true OR r.user_id IN (SELECT following_id FROM follows WHERE follower_id = $1 AND status = 'accepted')
		ORDER BY r.like_count DESC, r.view_count DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var reels []*models.Reel
	for rows.Next() {
		r := &models.Reel{}
		rows.Scan(&r.ID, &r.UserID, &r.VideoURL, &r.ThumbnailURL, &r.Caption, &r.AudioID,
			&r.DurationSeconds, &r.ViewCount, &r.LikeCount, &r.DislikeCount, &r.CommentCount, &r.CreatedAt)
		reels = append(reels, r)
	}
	return reels, total, nil
}

func (r *ReelRepository) GetByID(ctx context.Context, id string) (*models.Reel, error) {
	reel := &models.Reel{}
	err := r.db.QueryRowContext(ctx, `
		SELECT id, user_id, video_url, thumbnail_url, caption, audio_id, duration_seconds,
			view_count, like_count, dislike_count, comment_count, is_featured, created_at
		FROM reels WHERE id = $1`, id).
		Scan(&reel.ID, &reel.UserID, &reel.VideoURL, &reel.ThumbnailURL, &reel.Caption,
			&reel.AudioID, &reel.DurationSeconds, &reel.ViewCount, &reel.LikeCount,
			&reel.DislikeCount, &reel.CommentCount, &reel.IsFeatured, &reel.CreatedAt)
	if err != nil {
		return nil, err
	}
	return reel, nil
}

func (r *ReelRepository) IncrementView(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE reels SET view_count = view_count + 1 WHERE id = $1`, id)
	return err
}

func (r *ReelRepository) IncrementLike(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE reels SET like_count = like_count + 1 WHERE id = $1`, id)
	return err
}

func (r *ReelRepository) IncrementDislike(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE reels SET dislike_count = dislike_count + 1 WHERE id = $1`, id)
	return err
}

func (r *ReelRepository) GetTrending(ctx context.Context, page, limit int) ([]*models.Reel, error) {
	offset := (page - 1) * limit
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, video_url, thumbnail_url, caption, duration_seconds, view_count, like_count, created_at
		FROM reels WHERE created_at > NOW() - INTERVAL '7 days'
		ORDER BY (view_count + like_count * 2) DESC LIMIT $1 OFFSET $2`, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reels []*models.Reel
	for rows.Next() {
		r := &models.Reel{}
		rows.Scan(&r.ID, &r.UserID, &r.VideoURL, &r.ThumbnailURL, &r.Caption,
			&r.DurationSeconds, &r.ViewCount, &r.LikeCount, &r.CreatedAt)
		reels = append(reels, r)
	}
	return reels, nil
}

func (r *ReelRepository) GetTotalCount(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM reels`).Scan(&count)
	return count, err
}
