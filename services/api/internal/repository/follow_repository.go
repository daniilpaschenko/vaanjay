package repository

import (
	"context"
	"database/sql"

	"github.com/vaanjay/api/internal/models"
)

type FollowRepository struct {
	db *sql.DB
}

func NewFollowRepository(db *sql.DB) *FollowRepository {
	return &FollowRepository{db: db}
}

func (r *FollowRepository) Follow(ctx context.Context, followerID, followingID string) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO follows (follower_id, following_id, status)
		VALUES ($1, $2, $3)
		ON CONFLICT (follower_id, following_id) DO UPDATE SET status = $3`,
		followerID, followingID, "accepted")
	if err != nil {
		return err
	}
	r.db.ExecContext(ctx, `UPDATE users SET follower_count = follower_count + 1 WHERE id = $1`, followingID)
	r.db.ExecContext(ctx, `UPDATE users SET following_count = following_count + 1 WHERE id = $1`, followerID)
	return nil
}

func (r *FollowRepository) Unfollow(ctx context.Context, followerID, followingID string) error {
	result, err := r.db.ExecContext(ctx,
		`DELETE FROM follows WHERE follower_id = $1 AND following_id = $2`,
		followerID, followingID)
	if err != nil {
		return err
	}
	rows, _ := result.RowsAffected()
	if rows > 0 {
		r.db.ExecContext(ctx, `UPDATE users SET follower_count = GREATEST(follower_count - 1, 0) WHERE id = $1`, followingID)
		r.db.ExecContext(ctx, `UPDATE users SET following_count = GREATEST(following_count - 1, 0) WHERE id = $1`, followerID)
	}
	return nil
}

func (r *FollowRepository) IsFollowing(ctx context.Context, followerID, followingID string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM follows WHERE follower_id = $1 AND following_id = $2 AND status = 'accepted'`,
		followerID, followingID).Scan(&count)
	return count > 0, err
}

func (r *FollowRepository) GetFollowers(ctx context.Context, userID string, page, limit int) ([]*models.User, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM follows WHERE following_id = $1 AND status = 'accepted'`, userID).Scan(&total)

	rows, err := r.db.QueryContext(ctx, `
		SELECT u.id, u.username, u.full_name, u.profile_pic_url, u.is_verified, u.badge_type, u.bio
		FROM follows f JOIN users u ON u.id = f.follower_id
		WHERE f.following_id = $1 AND f.status = 'accepted'
		ORDER BY f.created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		u := &models.User{}
		rows.Scan(&u.ID, &u.Username, &u.FullName, &u.ProfilePicURL, &u.IsVerified, &u.BadgeType, &u.Bio)
		users = append(users, u)
	}
	return users, total, nil
}

func (r *FollowRepository) GetFollowing(ctx context.Context, userID string, page, limit int) ([]*models.User, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM follows WHERE follower_id = $1 AND status = 'accepted'`, userID).Scan(&total)

	rows, err := r.db.QueryContext(ctx, `
		SELECT u.id, u.username, u.full_name, u.profile_pic_url, u.is_verified, u.badge_type, u.bio
		FROM follows f JOIN users u ON u.id = f.following_id
		WHERE f.follower_id = $1 AND f.status = 'accepted'
		ORDER BY f.created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		u := &models.User{}
		rows.Scan(&u.ID, &u.Username, &u.FullName, &u.ProfilePicURL, &u.IsVerified, &u.BadgeType, &u.Bio)
		users = append(users, u)
	}
	return users, total, nil
}
