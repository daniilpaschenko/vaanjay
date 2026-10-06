package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/lib/pq"
	"github.com/vaanjay/api/internal/models"
)

type PostRepository struct {
	db *sql.DB
}

func NewPostRepository(db *sql.DB) *PostRepository {
	return &PostRepository{db: db}
}

func (r *PostRepository) Create(ctx context.Context, post *models.Post) error {
	query := `
		INSERT INTO posts (id, user_id, media_urls, caption, location, type, audience, alt_text)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING created_at, updated_at`

	mediaJSON, _ := pq.Array(post.MediaURLs).Value()

	return r.db.QueryRowContext(ctx, query,
		post.ID, post.UserID, mediaJSON, post.Caption, post.Location,
		post.Type, post.Audience, post.AltText,
	).Scan(&post.CreatedAt, &post.UpdatedAt)
}

func (r *PostRepository) GetByID(ctx context.Context, id string) (*models.Post, error) {
	post := &models.Post{}
	query := `SELECT id, user_id, media_urls, caption, location, type, audience, alt_text,
		is_archived, is_pinned, like_count, dislike_count, comment_count, repost_count,
		created_at, updated_at FROM posts WHERE id = $1 AND is_archived = false`

	var mediaURLs []byte
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&post.ID, &post.UserID, &mediaURLs, &post.Caption, &post.Location,
		&post.Type, &post.Audience, &post.AltText, &post.IsArchived, &post.IsPinned,
		&post.LikeCount, &post.DislikeCount, &post.CommentCount, &post.RepostCount,
		&post.CreatedAt, &post.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	pq.Array(&post.MediaURLs).Scan(mediaURLs)
	return post, nil
}

func (r *PostRepository) GetFeed(ctx context.Context, userID string, page, limit int) ([]*models.Post, int, error) {
	offset := (page - 1) * limit

	var total int
	err := r.db.QueryRowContext(ctx, `
		SELECT COUNT(*) FROM posts p
		WHERE (p.user_id IN (SELECT following_id FROM follows WHERE follower_id = $1 AND status = 'accepted')
			OR p.user_id = $1)
		AND p.is_archived = false AND p.type != 'story'`, userID).Scan(&total)
	if err != nil {
		return nil, 0, err
	}

	rows, err := r.db.QueryContext(ctx, `
		SELECT p.id, p.user_id, p.media_urls, p.caption, p.location, p.type, p.audience,
			p.like_count, p.dislike_count, p.comment_count, p.repost_count, p.created_at
		FROM posts p
		WHERE (p.user_id IN (SELECT following_id FROM follows WHERE follower_id = $1 AND status = 'accepted')
			OR p.user_id = $1)
		AND p.is_archived = false AND p.type != 'story'
		ORDER BY p.created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var posts []*models.Post
	for rows.Next() {
		p := &models.Post{}
		var mediaURLs []byte
		if err := rows.Scan(&p.ID, &p.UserID, &mediaURLs, &p.Caption, &p.Location,
			&p.Type, &p.Audience, &p.LikeCount, &p.DislikeCount, &p.CommentCount,
			&p.RepostCount, &p.CreatedAt); err != nil {
			return nil, 0, err
		}
		pq.Array(&p.MediaURLs).Scan(mediaURLs)
		posts = append(posts, p)
	}
	return posts, total, nil
}

func (r *PostRepository) GetByUserID(ctx context.Context, userID string, page, limit int) ([]*models.Post, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM posts WHERE user_id = $1 AND is_archived = false`, userID).Scan(&total)

	rows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, media_urls, caption, location, type, like_count, comment_count, repost_count, created_at
		FROM posts WHERE user_id = $1 AND is_archived = false
		ORDER BY created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var posts []*models.Post
	for rows.Next() {
		p := &models.Post{}
		if err := rows.Scan(&p.ID, &p.UserID, pq.Array(&p.MediaURLs), &p.Caption, &p.Location,
			&p.Type, &p.LikeCount, &p.CommentCount, &p.RepostCount, &p.CreatedAt); err != nil {
			return nil, 0, err
		}
		posts = append(posts, p)
	}
	return posts, total, nil
}

func (r *PostRepository) Delete(ctx context.Context, id, userID string) error {
	result, err := r.db.ExecContext(ctx,
		`UPDATE posts SET is_archived = true WHERE id = $1 AND user_id = $2`, id, userID)
	if err != nil {
		return err
	}
	rows, _ := result.RowsAffected()
	if rows == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (r *PostRepository) AdminDelete(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE posts SET is_archived = true WHERE id = $1`, id)
	return err
}

func (r *PostRepository) IncrementLike(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE posts SET like_count = like_count + 1 WHERE id = $1`, id)
	return err
}

func (r *PostRepository) IncrementDislike(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE posts SET dislike_count = dislike_count + 1 WHERE id = $1`, id)
	return err
}

func (r *PostRepository) IncrementCommentCount(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE posts SET comment_count = comment_count + 1 WHERE id = $1`, id)
	return err
}

func (r *PostRepository) IncrementRepostCount(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE posts SET repost_count = repost_count + 1 WHERE id = $1`, id)
	return err
}

func (r *PostRepository) GetAll(ctx context.Context, page, limit int, filters map[string]string) ([]*models.Post, int, error) {
	offset := (page - 1) * limit
	where := "WHERE is_archived = false"
	args := []interface{}{}
	argIdx := 1

	if v, ok := filters["type"]; ok && v != "" {
		where += fmt.Sprintf(" AND type = $%d", argIdx)
		args = append(args, v)
		argIdx++
	}
	if v, ok := filters["user_id"]; ok && v != "" {
		where += fmt.Sprintf(" AND user_id = $%d", argIdx)
		args = append(args, v)
		argIdx++
	}

	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM posts `+where, args...).Scan(&total)

	query := `SELECT id, user_id, type, like_count, comment_count, repost_count, created_at
		FROM posts ` + where + ` ORDER BY created_at DESC LIMIT $` + fmt.Sprintf("%d", argIdx) +
		` OFFSET $` + fmt.Sprintf("%d", argIdx+1)
	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var posts []*models.Post
	for rows.Next() {
		p := &models.Post{}
		if err := rows.Scan(&p.ID, &p.UserID, &p.Type, &p.LikeCount, &p.CommentCount, &p.RepostCount, &p.CreatedAt); err != nil {
			return nil, 0, err
		}
		posts = append(posts, p)
	}
	return posts, total, nil
}

func (r *PostRepository) GetTrending(ctx context.Context, page, limit int) ([]*models.Post, error) {
	offset := (page - 1) * limit
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, user_id, media_urls, caption, type, like_count, comment_count, repost_count, created_at
		FROM posts WHERE is_archived = false AND created_at > NOW() - INTERVAL '7 days'
		ORDER BY (like_count + comment_count * 2 + repost_count * 3) DESC LIMIT $1 OFFSET $2`, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var posts []*models.Post
	for rows.Next() {
		p := &models.Post{}
		if err := rows.Scan(&p.ID, &p.UserID, pq.Array(&p.MediaURLs), &p.Caption, &p.Type,
			&p.LikeCount, &p.CommentCount, &p.RepostCount, &p.CreatedAt); err != nil {
			return nil, err
		}
		posts = append(posts, p)
	}
	return posts, nil
}

func (r *PostRepository) GetContentPostedChart(ctx context.Context) ([]map[string]interface{}, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT DATE_TRUNC('day', created_at) as date, COUNT(*) as count
		FROM posts WHERE created_at > NOW() - INTERVAL '30 days'
		GROUP BY DATE_TRUNC('day', created_at) ORDER BY date`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var points []map[string]interface{}
	for rows.Next() {
		var date time.Time
		var count int
		if err := rows.Scan(&date, &count); err != nil {
			return nil, err
		}
		points = append(points, map[string]interface{}{"date": date.Format("2006-01-02"), "value": count})
	}
	return points, nil
}

func (r *PostRepository) GetTotalCount(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM posts WHERE is_archived = false`).Scan(&count)
	return count, err
}
