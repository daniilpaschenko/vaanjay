package repository

import (
	"context"
	"database/sql"

	"github.com/vaanjay/api/internal/models"
)

type CommentRepository struct {
	db *sql.DB
}

func NewCommentRepository(db *sql.DB) *CommentRepository {
	return &CommentRepository{db: db}
}

func (r *CommentRepository) Create(ctx context.Context, comment *models.Comment) error {
	query := `INSERT INTO comments (id, target_id, target_type, user_id, content, parent_comment_id)
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING created_at`
	return r.db.QueryRowContext(ctx, query,
		comment.ID, comment.TargetID, comment.TargetType, comment.UserID,
		comment.Content, comment.ParentCommentID).Scan(&comment.CreatedAt)
}

func (r *CommentRepository) GetByTarget(ctx context.Context, targetID, targetType string, page, limit int) ([]*models.Comment, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM comments WHERE target_id = $1 AND target_type = $2 AND parent_comment_id IS NULL`,
		targetID, targetType).Scan(&total)

	rows, err := r.db.QueryContext(ctx, `
		SELECT id, target_id, target_type, user_id, content, parent_comment_id, like_count, created_at
		FROM comments WHERE target_id = $1 AND target_type = $2 AND parent_comment_id IS NULL
		ORDER BY created_at ASC LIMIT $3 OFFSET $4`, targetID, targetType, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var comments []*models.Comment
	for rows.Next() {
		c := &models.Comment{}
		rows.Scan(&c.ID, &c.TargetID, &c.TargetType, &c.UserID, &c.Content, &c.ParentCommentID, &c.LikeCount, &c.CreatedAt)
		comments = append(comments, c)
	}
	return comments, total, nil
}

func (r *CommentRepository) GetReplies(ctx context.Context, parentID string) ([]*models.Comment, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, target_id, target_type, user_id, content, parent_comment_id, like_count, created_at
		FROM comments WHERE parent_comment_id = $1 ORDER BY created_at ASC`, parentID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var comments []*models.Comment
	for rows.Next() {
		c := &models.Comment{}
		rows.Scan(&c.ID, &c.TargetID, &c.TargetType, &c.UserID, &c.Content, &c.ParentCommentID, &c.LikeCount, &c.CreatedAt)
		comments = append(comments, c)
	}
	return comments, nil
}

func (r *CommentRepository) GetByID(ctx context.Context, id string) (*models.Comment, error) {
	c := &models.Comment{}
	err := r.db.QueryRowContext(ctx,
		`SELECT id, target_id, target_type, user_id, content, parent_comment_id, like_count, created_at
		FROM comments WHERE id = $1`, id).
		Scan(&c.ID, &c.TargetID, &c.TargetType, &c.UserID, &c.Content, &c.ParentCommentID, &c.LikeCount, &c.CreatedAt)
	return c, err
}

func (r *CommentRepository) Delete(ctx context.Context, id, userID string) error {
	result, err := r.db.ExecContext(ctx, `DELETE FROM comments WHERE id = $1 AND user_id = $2`, id, userID)
	if err != nil {
		return err
	}
	rows, _ := result.RowsAffected()
	if rows == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (r *CommentRepository) IncrementLike(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE comments SET like_count = like_count + 1 WHERE id = $1`, id)
	return err
}
