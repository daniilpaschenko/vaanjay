package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/lib/pq"
	"github.com/redis/go-redis/v9"
	"github.com/vaanjay/api/internal/models"
)

type UserRepository struct {
	db  *sql.DB
	rdb *redis.Client
}

func NewUserRepository(db *sql.DB, rdb *redis.Client) *UserRepository {
	return &UserRepository{db: db, rdb: rdb}
}

func (r *UserRepository) Create(ctx context.Context, user *models.User) error {
	query := `
		INSERT INTO users (id, username, email, phone_number, password_hash, full_name, bio, profile_pic_url,
			website_url, language_preference, content_language_preference, gender, district)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
		RETURNING created_at, updated_at`

	return r.db.QueryRowContext(ctx, query,
		user.ID, user.Username, user.Email, user.PhoneNumber, user.PasswordHash,
		user.FullName, user.Bio, user.ProfilePicURL, user.WebsiteURL,
		user.LanguagePreference, user.ContentLanguagePreference,
		user.Gender, user.District,
	).Scan(&user.CreatedAt, &user.UpdatedAt)
}

func (r *UserRepository) GetByID(ctx context.Context, id string) (*models.User, error) {
	user := &models.User{}
	query := `
		SELECT id, username, email, phone_number, full_name, bio, profile_pic_url, website_url,
			is_verified, badge_type, is_admin, language_preference, content_language_preference,
			is_private, is_active, gender, district, follower_count, following_count, post_count,
			created_at, updated_at
		FROM users WHERE id = $1 AND is_active = true`

	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&user.ID, &user.Username, &user.Email, &user.PhoneNumber, &user.FullName,
		&user.Bio, &user.ProfilePicURL, &user.WebsiteURL, &user.IsVerified,
		&user.BadgeType, &user.IsAdmin, &user.LanguagePreference,
		&user.ContentLanguagePreference, &user.IsPrivate, &user.IsActive,
		&user.Gender, &user.District, &user.FollowerCount, &user.FollowingCount,
		&user.PostCount, &user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, username, email, phone_number, password_hash, full_name, is_verified, badge_type, is_admin, 
		is_private, is_active, language_preference, profile_pic_url, bio, follower_count, following_count, post_count,
		created_at, updated_at FROM users WHERE email = $1 AND is_active = true`

	err := r.db.QueryRowContext(ctx, query, email).Scan(
		&user.ID, &user.Username, &user.Email, &user.PhoneNumber, &user.PasswordHash,
		&user.FullName, &user.IsVerified, &user.BadgeType, &user.IsAdmin,
		&user.IsPrivate, &user.IsActive, &user.LanguagePreference,
		&user.ProfilePicURL, &user.Bio, &user.FollowerCount, &user.FollowingCount,
		&user.PostCount, &user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) GetByPhone(ctx context.Context, phone string) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, username, email, phone_number, password_hash, full_name, is_verified, badge_type, is_admin,
		is_private, is_active, language_preference, profile_pic_url, bio, follower_count, following_count, post_count,
		created_at, updated_at FROM users WHERE phone_number = $1 AND is_active = true`

	err := r.db.QueryRowContext(ctx, query, phone).Scan(
		&user.ID, &user.Username, &user.Email, &user.PhoneNumber, &user.PasswordHash,
		&user.FullName, &user.IsVerified, &user.BadgeType, &user.IsAdmin,
		&user.IsPrivate, &user.IsActive, &user.LanguagePreference,
		&user.ProfilePicURL, &user.Bio, &user.FollowerCount, &user.FollowingCount,
		&user.PostCount, &user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) GetByUsername(ctx context.Context, username string) (*models.User, error) {
	user := &models.User{}
	query := `SELECT id, username, email, phone_number, full_name, bio, profile_pic_url, website_url,
		is_verified, badge_type, is_admin, language_preference, is_private, is_active,
		gender, district, follower_count, following_count, post_count,
		created_at, updated_at FROM users WHERE username = $1 AND is_active = true`

	err := r.db.QueryRowContext(ctx, query, username).Scan(
		&user.ID, &user.Username, &user.Email, &user.PhoneNumber, &user.FullName,
		&user.Bio, &user.ProfilePicURL, &user.WebsiteURL, &user.IsVerified,
		&user.BadgeType, &user.IsAdmin, &user.LanguagePreference, &user.IsPrivate,
		&user.IsActive, &user.Gender, &user.District, &user.FollowerCount,
		&user.FollowingCount, &user.PostCount, &user.CreatedAt, &user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (r *UserRepository) Update(ctx context.Context, user *models.User) error {
	query := `UPDATE users SET full_name = COALESCE(NULLIF($2, ''), full_name),
		bio = $3, profile_pic_url = COALESCE(NULLIF($4, ''), profile_pic_url),
		website_url = $5, language_preference = COALESCE(NULLIF($6, ''), language_preference),
		content_language_preference = COALESCE(NULLIF($7, ''), content_language_preference),
		is_private = $8, gender = $9, district = $10, updated_at = NOW()
		WHERE id = $1`

	_, err := r.db.ExecContext(ctx, query,
		user.ID, user.FullName, user.Bio, user.ProfilePicURL, user.WebsiteURL,
		user.LanguagePreference, user.ContentLanguagePreference,
		user.IsPrivate, user.Gender, user.District)
	return err
}

func (r *UserRepository) UpdatePassword(ctx context.Context, id, passwordHash string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2`,
		passwordHash, id)
	return err
}

func (r *UserRepository) SetVerified(ctx context.Context, id string, verified bool, badgeType string) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE users SET is_verified = $1, badge_type = $2, updated_at = NOW() WHERE id = $3`,
		verified, toNullString(badgeType), id)
	return err
}

func (r *UserRepository) SetActive(ctx context.Context, id string, active bool) error {
	_, err := r.db.ExecContext(ctx, `UPDATE users SET is_active = $1, updated_at = NOW() WHERE id = $2`, active, id)
	return err
}

func (r *UserRepository) IsEmailTaken(ctx context.Context, email string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM users WHERE email = $1`, email).Scan(&count)
	return count > 0, err
}

func (r *UserRepository) IsPhoneTaken(ctx context.Context, phone string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM users WHERE phone_number = $1`, phone).Scan(&count)
	return count > 0, err
}

func (r *UserRepository) IsUsernameTaken(ctx context.Context, username string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM users WHERE username = $1`, username).Scan(&count)
	return count > 0, err
}

func (r *UserRepository) Search(ctx context.Context, query string, page, limit int) ([]*models.User, int, error) {
	offset := (page - 1) * limit
	searchQuery := `%` + query + `%`

	countQuery := `SELECT COUNT(*) FROM users WHERE is_active = true AND
		(username ILIKE $1 OR full_name ILIKE $1 OR email ILIKE $1)`
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, searchQuery).Scan(&total); err != nil {
		return nil, 0, err
	}

	rows, err := r.db.QueryContext(ctx, `
		SELECT id, username, full_name, profile_pic_url, is_verified, badge_type, bio,
		follower_count, created_at FROM users
		WHERE is_active = true AND (username ILIKE $1 OR full_name ILIKE $1 OR email ILIKE $1)
		ORDER BY follower_count DESC LIMIT $2 OFFSET $3`, searchQuery, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		u := &models.User{}
		if err := rows.Scan(&u.ID, &u.Username, &u.FullName, &u.ProfilePicURL,
			&u.IsVerified, &u.BadgeType, &u.Bio, &u.FollowerCount, &u.CreatedAt); err != nil {
			return nil, 0, err
		}
		users = append(users, u)
	}
	return users, total, nil
}

func (r *UserRepository) GetAll(ctx context.Context, page, limit int, filters map[string]string) ([]*models.User, int, error) {
	offset := (page - 1) * limit
	where := "WHERE is_active = true"
	args := []interface{}{}
	argIdx := 1

	if v, ok := filters["verified"]; ok && v == "true" {
		where += fmt.Sprintf(" AND is_verified = true")
	}
	if v, ok := filters["badge"]; ok && v != "" {
		where += fmt.Sprintf(" AND badge_type = $%d", argIdx)
		args = append(args, v)
		argIdx++
	}
	if v, ok := filters["search"]; ok && v != "" {
		where += fmt.Sprintf(" AND (username ILIKE $%d OR full_name ILIKE $%d OR email ILIKE $%d)", argIdx, argIdx, argIdx)
		args = append(args, "%"+v+"%")
		argIdx++
	}

	var total int
	countQuery := `SELECT COUNT(*) FROM users ` + where
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, err
	}

	query := `SELECT id, username, email, phone_number, full_name, profile_pic_url, is_verified, badge_type,
		is_admin, is_active, follower_count, following_count, post_count, created_at FROM users ` +
		where + ` ORDER BY created_at DESC LIMIT $` + fmt.Sprintf("%d", argIdx) + ` OFFSET $` + fmt.Sprintf("%d", argIdx+1)
	args = append(args, limit, offset)

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		u := &models.User{}
		if err := rows.Scan(&u.ID, &u.Username, &u.Email, &u.PhoneNumber, &u.FullName,
			&u.ProfilePicURL, &u.IsVerified, &u.BadgeType, &u.IsAdmin, &u.IsActive,
			&u.FollowerCount, &u.FollowingCount, &u.PostCount, &u.CreatedAt); err != nil {
			return nil, 0, err
		}
		users = append(users, u)
	}
	return users, total, nil
}

func (r *UserRepository) GetUserCount(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM users WHERE is_active = true`).Scan(&count)
	return count, err
}

func (r *UserRepository) GetDAU(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(DISTINCT user_id) FROM (
		SELECT user_id FROM posts WHERE created_at > NOW() - INTERVAL '24 hours'
		UNION SELECT user_id FROM comments WHERE created_at > NOW() - INTERVAL '24 hours'
		UNION SELECT sender_id FROM messages WHERE created_at > NOW() - INTERVAL '24 hours'
	) active_users`).Scan(&count)
	return count, err
}

func (r *UserRepository) GetMAU(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(DISTINCT user_id) FROM (
		SELECT user_id FROM posts WHERE created_at > NOW() - INTERVAL '30 days'
		UNION SELECT user_id FROM comments WHERE created_at > NOW() - INTERVAL '30 days'
		UNION SELECT sender_id FROM messages WHERE created_at > NOW() - INTERVAL '30 days'
	) active_users`).Scan(&count)
	return count, err
}

func (r *UserRepository) GetLanguageDistribution(ctx context.Context) (map[string]int, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT language_preference, COUNT(*) as count FROM users GROUP BY language_preference ORDER BY count DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	dist := make(map[string]int)
	for rows.Next() {
		var lang string
		var count int
		if err := rows.Scan(&lang, &count); err != nil {
			return nil, err
		}
		dist[lang] = count
	}
	return dist, nil
}

func (r *UserRepository) GetUserGrowth(ctx context.Context, period string) ([]map[string]interface{}, error) {
	var interval string
	switch period {
	case "daily":
		interval = "day"
	case "weekly":
		interval = "week"
	case "monthly":
		interval = "month"
	default:
		interval = "day"
	}

	rows, err := r.db.QueryContext(ctx, fmt.Sprintf(`
		SELECT DATE_TRUNC('%s', created_at) as date, COUNT(*) as count
		FROM users WHERE created_at > NOW() - INTERVAL '90 days'
		GROUP BY DATE_TRUNC('%s', created_at) ORDER BY date`, interval, interval))
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
		points = append(points, map[string]interface{}{
			"date":  date.Format("2006-01-02"),
			"value": count,
		})
	}
	return points, nil
}

// Cache operations
func (r *UserRepository) CacheOTP(ctx context.Context, phone, otp string, ttl time.Duration) error {
	return r.rdb.Set(ctx, "otp:"+phone, otp, ttl).Err()
}

func (r *UserRepository) GetCachedOTP(ctx context.Context, phone string) (string, error) {
	return r.rdb.Get(ctx, "otp:"+phone).Result()
}

func (r *UserRepository) DeleteCachedOTP(ctx context.Context, phone string) error {
	return r.rdb.Del(ctx, "otp:"+phone).Err()
}

func (r *UserRepository) CacheRefreshToken(ctx context.Context, userID, token string, ttl time.Duration) error {
	return r.rdb.Set(ctx, "refresh:"+userID+":"+token, "1", ttl).Err()
}

func (r *UserRepository) DeleteRefreshToken(ctx context.Context, userID, token string) error {
	return r.rdb.Del(ctx, "refresh:"+userID+":"+token).Err()
}

func (r *UserRepository) SetOnlinePresence(ctx context.Context, userID string) error {
	return r.rdb.Set(ctx, "online:"+userID, "1", 5*time.Minute).Err()
}

func (r *UserRepository) SetOfflinePresence(ctx context.Context, userID string) error {
	return r.rdb.Del(ctx, "online:"+userID).Err()
}

func (r *UserRepository) IsOnline(ctx context.Context, userID string) (bool, error) {
	_, err := r.rdb.Get(ctx, "online:"+userID).Result()
	if err == redis.Nil {
		return false, nil
	}
	return err == nil, err
}
