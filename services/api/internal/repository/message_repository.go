package repository

import (
	"context"
	"database/sql"

	"github.com/vaanjay/api/internal/models"
)

type MessageRepository struct {
	db *sql.DB
}

func NewMessageRepository(db *sql.DB) *MessageRepository {
	return &MessageRepository{db: db}
}

func (r *MessageRepository) Create(ctx context.Context, msg *models.Message) error {
	query := `INSERT INTO messages (id, conversation_id, sender_id, content, media_url, message_type, reply_to_id)
		VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING created_at`
	return r.db.QueryRowContext(ctx, query,
		msg.ID, msg.ConversationID, msg.SenderID, msg.Content, msg.MediaURL,
		msg.MessageType, msg.ReplyToID).Scan(&msg.CreatedAt)
}

func (r *MessageRepository) GetByConversation(ctx context.Context, convID string, page, limit int) ([]*models.Message, int, error) {
	offset := (page - 1) * limit

	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM messages WHERE conversation_id = $1`, convID).Scan(&total)

	rows, err := r.db.QueryContext(ctx, `
		SELECT id, conversation_id, sender_id, content, media_url, message_type, is_read, reply_to_id, created_at
		FROM messages WHERE conversation_id = $1
		ORDER BY created_at DESC LIMIT $2 OFFSET $3`, convID, limit, offset)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var msgs []*models.Message
	for rows.Next() {
		m := &models.Message{}
		rows.Scan(&m.ID, &m.ConversationID, &m.SenderID, &m.Content, &m.MediaURL,
			&m.MessageType, &m.IsRead, &m.ReplyToID, &m.CreatedAt)
		msgs = append(msgs, m)
	}
	return msgs, total, nil
}

func (r *MessageRepository) MarkAsRead(ctx context.Context, msgID string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE messages SET is_read = true WHERE id = $1`, msgID)
	return err
}

func (r *MessageRepository) MarkAllAsRead(ctx context.Context, convID, userID string) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE messages SET is_read = true WHERE conversation_id = $1 AND sender_id != $2 AND is_read = false`,
		convID, userID)
	return err
}

func (r *MessageRepository) Delete(ctx context.Context, msgID, userID string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM messages WHERE id = $1 AND sender_id = $2`, msgID, userID)
	return err
}

func (r *MessageRepository) GetUnreadCount(ctx context.Context, convID, userID string) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM messages WHERE conversation_id = $1 AND sender_id != $2 AND is_read = false`,
		convID, userID).Scan(&count)
	return count, err
}

func (r *MessageRepository) GetTotalMessageCount(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM messages`).Scan(&count)
	return count, err
}

func (r *MessageRepository) GetLastMessage(ctx context.Context, convID string) (*models.Message, error) {
	m := &models.Message{}
	err := r.db.QueryRowContext(ctx, `
		SELECT id, conversation_id, sender_id, content, message_type, created_at
		FROM messages WHERE conversation_id = $1 ORDER BY created_at DESC LIMIT 1`, convID).
		Scan(&m.ID, &m.ConversationID, &m.SenderID, &m.Content, &m.MessageType, &m.CreatedAt)
	return m, err
}
