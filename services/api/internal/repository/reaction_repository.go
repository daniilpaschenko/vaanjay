package repository

import (
	"context"
	"database/sql"

	"github.com/vaanjay/api/internal/models"
)

type ReactionRepository struct {
	db *sql.DB
}

func NewReactionRepository(db *sql.DB) *ReactionRepository {
	return &ReactionRepository{db: db}
}

func (r *ReactionRepository) Toggle(ctx context.Context, targetID, targetType, userID, reactionType string) (bool, error) {
	var existing string
	err := r.db.QueryRowContext(ctx,
		`SELECT reaction_type FROM reactions WHERE target_id = $1 AND target_type = $2 AND user_id = $3`,
		targetID, targetType, userID).Scan(&existing)

	if err == sql.ErrNoRows {
		_, err = r.db.ExecContext(ctx,
			`INSERT INTO reactions (id, target_id, target_type, user_id, reaction_type) VALUES (gen_random_uuid()::text, $1, $2, $3, $4)`,
			targetID, targetType, userID, reactionType)
		return true, err
	}
	if err != nil {
		return false, err
	}

	if existing == reactionType {
		_, err = r.db.ExecContext(ctx,
			`DELETE FROM reactions WHERE target_id = $1 AND target_type = $2 AND user_id = $3`,
			targetID, targetType, userID)
		return false, err
	}

	_, err = r.db.ExecContext(ctx,
		`UPDATE reactions SET reaction_type = $1 WHERE target_id = $2 AND target_type = $3 AND user_id = $4`,
		reactionType, targetID, targetType, userID)
	return true, err
}

func (r *ReactionRepository) HasLiked(ctx context.Context, targetID, targetType, userID string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM reactions WHERE target_id = $1 AND target_type = $2 AND user_id = $3 AND reaction_type = 'like'`,
		targetID, targetType, userID).Scan(&count)
	return count > 0, err
}

func (r *ReactionRepository) HasDisliked(ctx context.Context, targetID, targetType, userID string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM reactions WHERE target_id = $1 AND target_type = $2 AND user_id = $3 AND reaction_type = 'dislike'`,
		targetID, targetType, userID).Scan(&count)
	return count > 0, err
}
