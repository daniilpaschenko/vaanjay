package repository

import (
	"context"
	"database/sql"

	"github.com/vaanjay/api/internal/models"
)

type ConversationRepository struct {
	db *sql.DB
}

func NewConversationRepository(db *sql.DB) *ConversationRepository {
	return &ConversationRepository{db: db}
}

func (r *ConversationRepository) Create(ctx context.Context, conv *models.Conversation) error {
	query := `INSERT INTO conversations (id, type, name, group_pic_url, created_by)
		VALUES ($1, $2, $3, $4, $5) RETURNING created_at`
	return r.db.QueryRowContext(ctx, query,
		conv.ID, conv.Type, conv.Name, conv.GroupPicURL, conv.CreatedBy).Scan(&conv.CreatedAt)
}

func (r *ConversationRepository) GetByUser(ctx context.Context, userID string) ([]*models.Conversation, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT c.id, c.type, c.name, c.group_pic_url, c.created_by, c.created_at
		FROM conversations c
		JOIN conversation_members cm ON cm.conversation_id = c.id
		WHERE cm.user_id = $1
		ORDER BY (SELECT MAX(created_at) FROM messages WHERE conversation_id = c.id) DESC NULLS LAST`, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var convs []*models.Conversation
	for rows.Next() {
		c := &models.Conversation{}
		rows.Scan(&c.ID, &c.Type, &c.Name, &c.GroupPicURL, &c.CreatedBy, &c.CreatedAt)
		convs = append(convs, c)
	}
	return convs, nil
}

func (r *ConversationRepository) GetByID(ctx context.Context, id string) (*models.Conversation, error) {
	c := &models.Conversation{}
	err := r.db.QueryRowContext(ctx,
		`SELECT id, type, name, group_pic_url, created_by, created_at FROM conversations WHERE id = $1`, id).
		Scan(&c.ID, &c.Type, &c.Name, &c.GroupPicURL, &c.CreatedBy, &c.CreatedAt)
	return c, err
}

func (r *ConversationRepository) AddMember(ctx context.Context, convID, userID, role string) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO conversation_members (conversation_id, user_id, role) VALUES ($1, $2, $3)
		ON CONFLICT DO NOTHING`, convID, userID, role)
	return err
}

func (r *ConversationRepository) RemoveMember(ctx context.Context, convID, userID string) error {
	_, err := r.db.ExecContext(ctx,
		`DELETE FROM conversation_members WHERE conversation_id = $1 AND user_id = $2`, convID, userID)
	return err
}

func (r *ConversationRepository) GetMembers(ctx context.Context, convID string) ([]*models.User, error) {
	rows, err := r.db.QueryContext(ctx, `
		SELECT u.id, u.username, u.full_name, u.profile_pic_url, u.is_verified, u.badge_type
		FROM conversation_members cm JOIN users u ON u.id = cm.user_id
		WHERE cm.conversation_id = $1`, convID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []*models.User
	for rows.Next() {
		u := &models.User{}
		rows.Scan(&u.ID, &u.Username, &u.FullName, &u.ProfilePicURL, &u.IsVerified, &u.BadgeType)
		users = append(users, u)
	}
	return users, nil
}

func (r *ConversationRepository) UpdateInfo(ctx context.Context, convID, name, groupPicURL string) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE conversations SET name = COALESCE(NULLIF($1, ''), name),
		group_pic_url = COALESCE(NULLIF($2, ''), group_pic_url) WHERE id = $3`,
		name, groupPicURL, convID)
	return err
}

func (r *ConversationRepository) GetOrCreatePrivate(ctx context.Context, user1ID, user2ID string) (string, error) {
	var convID string
	err := r.db.QueryRowContext(ctx, `
		SELECT c.id FROM conversations c
		JOIN conversation_members cm1 ON cm1.conversation_id = c.id AND cm1.user_id = $1
		JOIN conversation_members cm2 ON cm2.conversation_id = c.id AND cm2.user_id = $2
		WHERE c.type = 'private'`, user1ID, user2ID).Scan(&convID)
	if err == nil {
		return convID, nil
	}

	conv := &models.Conversation{
		ID:        generateID(),
		Type:      "private",
		CreatedBy: user1ID,
	}

	if err := r.Create(ctx, conv); err != nil {
		return "", err
	}

	r.AddMember(ctx, conv.ID, user1ID, "member")
	r.AddMember(ctx, conv.ID, user2ID, "member")
	return conv.ID, nil
}
