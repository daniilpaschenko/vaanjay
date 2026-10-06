package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/vaanjay/api/internal/models"
)

type CallRepository struct{ db *sql.DB }
func NewCallRepository(db *sql.DB) *CallRepository { return &CallRepository{db: db} }

func (r *CallRepository) Create(ctx context.Context, call *models.Call) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO calls (id, caller_id, receiver_id, group_id, type, status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING created_at`,
		call.ID, call.CallerID, call.ReceiverID, call.GroupID, call.Type, "initiated").Scan(&call.CreatedAt)
}
func (r *CallRepository) UpdateStatus(ctx context.Context, id, status string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE calls SET status=$1, ended_at=NOW() WHERE id=$2`, status, id)
	return err
}
func (r *CallRepository) GetByID(ctx context.Context, id string) (*models.Call, error) {
	c := &models.Call{}
	err := r.db.QueryRowContext(ctx, `SELECT id,caller_id,receiver_id,group_id,type,status,started_at,ended_at,duration_seconds,created_at FROM calls WHERE id=$1`, id).
		Scan(&c.ID, &c.CallerID, &c.ReceiverID, &c.GroupID, &c.Type, &c.Status, &c.StartedAt, &c.EndedAt, &c.DurationSeconds, &c.CreatedAt)
	return c, err
}
func (r *CallRepository) GetHistory(ctx context.Context, userID string, page, limit int) ([]*models.Call, int, error) {
	offset := (page - 1) * limit
	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM calls WHERE caller_id=$1 OR receiver_id=$1`, userID).Scan(&total)
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, caller_id, receiver_id, type, status, started_at, ended_at, duration_seconds, created_at FROM calls WHERE caller_id=$1 OR receiver_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil { return nil, 0, err }
	defer rows.Close()
	var calls []*models.Call
	for rows.Next() {
		c := &models.Call{}
		rows.Scan(&c.ID, &c.CallerID, &c.ReceiverID, &c.Type, &c.Status, &c.StartedAt, &c.EndedAt, &c.DurationSeconds, &c.CreatedAt)
		calls = append(calls, c)
	}
	return calls, total, nil
}
func (r *CallRepository) GetActiveCallCount(ctx context.Context) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM calls WHERE status='ongoing'`).Scan(&count)
	return count, err
}

type NotificationRepository struct{ db *sql.DB }
func NewNotificationRepository(db *sql.DB) *NotificationRepository { return &NotificationRepository{db: db} }

func (r *NotificationRepository) Create(ctx context.Context, n *models.Notification) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO notifications (id, user_id, type, reference_id, reference_type, message, actor_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING created_at`,
		n.ID, n.UserID, n.Type, n.ReferenceID, n.ReferenceType, n.Message, n.ActorID).Scan(&n.CreatedAt)
}
func (r *NotificationRepository) GetByUser(ctx context.Context, userID string, page, limit int) ([]*models.Notification, int, error) {
	offset := (page - 1) * limit
	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM notifications WHERE user_id=$1`, userID).Scan(&total)
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, user_id, type, reference_id, reference_type, message, actor_id, is_read, created_at FROM notifications WHERE user_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil { return nil, 0, err }
	defer rows.Close()
	var notifs []*models.Notification
	for rows.Next() {
		n := &models.Notification{}
		rows.Scan(&n.ID, &n.UserID, &n.Type, &n.ReferenceID, &n.ReferenceType, &n.Message, &n.ActorID, &n.IsRead, &n.CreatedAt)
		notifs = append(notifs, n)
	}
	return notifs, total, nil
}
func (r *NotificationRepository) MarkRead(ctx context.Context, id, userID string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE notifications SET is_read=true WHERE id=$1 AND user_id=$2`, id, userID)
	return err
}
func (r *NotificationRepository) MarkAllRead(ctx context.Context, userID string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE notifications SET is_read=true WHERE user_id=$1`, userID)
	return err
}

type PaymentRepository struct{ db *sql.DB }
func NewPaymentRepository(db *sql.DB) *PaymentRepository { return &PaymentRepository{db: db} }

func (r *PaymentRepository) Create(ctx context.Context, txn *models.UPITransaction) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO upi_transactions (id, sender_id, receiver_id, amount, upi_ref_id, status, note) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING created_at`,
		txn.ID, txn.SenderID, txn.ReceiverID, txn.Amount, txn.UPIRefID, txn.Status, txn.Note).Scan(&txn.CreatedAt)
}
func (r *PaymentRepository) GetByUser(ctx context.Context, userID string, page, limit int) ([]*models.UPITransaction, int, error) {
	offset := (page - 1) * limit
	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM upi_transactions WHERE sender_id=$1 OR receiver_id=$1`, userID).Scan(&total)
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, sender_id, receiver_id, amount, upi_ref_id, status, note, created_at FROM upi_transactions WHERE sender_id=$1 OR receiver_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil { return nil, 0, err }
	defer rows.Close()
	var txns []*models.UPITransaction
	for rows.Next() {
		t := &models.UPITransaction{}
		rows.Scan(&t.ID, &t.SenderID, &t.ReceiverID, &t.Amount, &t.UPIRefID, &t.Status, &t.Note, &t.CreatedAt)
		txns = append(txns, t)
	}
	return txns, total, nil
}
func (r *PaymentRepository) GetRevenue(ctx context.Context) (float64, error) {
	var rev float64
	err := r.db.QueryRowContext(ctx, `SELECT COALESCE(SUM(amount), 0) FROM upi_transactions WHERE status='success'`).Scan(&rev)
	return rev, err
}

type ReportRepository struct{ db *sql.DB }
func NewReportRepository(db *sql.DB) *ReportRepository { return &ReportRepository{db: db} }

func (r *ReportRepository) Create(ctx context.Context, report *models.Report) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO reports (id, reporter_id, target_id, target_type, reason) VALUES ($1,$2,$3,$4,$5) RETURNING created_at`,
		report.ID, report.ReporterID, report.TargetID, report.TargetType, report.Reason).Scan(&report.CreatedAt)
}
func (r *ReportRepository) GetAll(ctx context.Context, page, limit int, status string) ([]*models.Report, int, error) {
	offset := (page - 1) * limit
	where := "WHERE 1=1"
	args := []interface{}{}
	argIdx := 1
	if status != "" {
		where += fmt.Sprintf(" AND status=$%d", argIdx)
		args = append(args, status)
		argIdx = 2
	}
	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM reports `+where, args...).Scan(&total)
	query := fmt.Sprintf(`SELECT id, reporter_id, target_id, target_type, reason, status, created_at FROM reports %s ORDER BY created_at DESC LIMIT $%d OFFSET $%d`, where, argIdx, argIdx+1)
	args = append(args, limit, offset)
	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil { return nil, 0, err }
	defer rows.Close()
	var reports []*models.Report
	for rows.Next() {
		rp := &models.Report{}
		rows.Scan(&rp.ID, &rp.ReporterID, &rp.TargetID, &rp.TargetType, &rp.Reason, &rp.Status, &rp.CreatedAt)
		reports = append(reports, rp)
	}
	return reports, total, nil
}
func (r *ReportRepository) UpdateStatus(ctx context.Context, id, status string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE reports SET status=$1 WHERE id=$2`, status, id)
	return err
}

type SavedPostRepository struct{ db *sql.DB }
func NewSavedPostRepository(db *sql.DB) *SavedPostRepository { return &SavedPostRepository{db: db} }
func (r *SavedPostRepository) Save(ctx context.Context, userID, postID, collection string) error {
	id := uuid.New().String()
	_, err := r.db.ExecContext(ctx, `INSERT INTO saved_posts (id, user_id, post_id, collection_name) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, id, userID, postID, collection)
	return err
}
func (r *SavedPostRepository) Unsave(ctx context.Context, userID, postID string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM saved_posts WHERE user_id=$1 AND post_id=$2`, userID, postID)
	return err
}
func (r *SavedPostRepository) IsSaved(ctx context.Context, userID, postID string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM saved_posts WHERE user_id=$1 AND post_id=$2`, userID, postID).Scan(&count)
	return count > 0, err
}
func (r *SavedPostRepository) GetByUser(ctx context.Context, userID string, page, limit int) ([]*models.SavedPost, int, error) {
	offset := (page - 1) * limit
	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM saved_posts WHERE user_id=$1`, userID).Scan(&total)
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, user_id, post_id, reel_id, collection_name, saved_at FROM saved_posts WHERE user_id=$1 ORDER BY saved_at DESC LIMIT $2 OFFSET $3`, userID, limit, offset)
	if err != nil { return nil, 0, err }
	defer rows.Close()
	var saved []*models.SavedPost
	for rows.Next() {
		s := &models.SavedPost{}
		rows.Scan(&s.ID, &s.UserID, &s.PostID, &s.ReelID, &s.CollectionName, &s.SavedAt)
		saved = append(saved, s)
	}
	return saved, total, nil
}

type RepostRepository struct{ db *sql.DB }
func NewRepostRepository(db *sql.DB) *RepostRepository { return &RepostRepository{db: db} }
func (r *RepostRepository) Create(ctx context.Context, repost *models.Repost) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO reposts (id, original_post_id, user_id, caption) VALUES ($1,$2,$3,$4) RETURNING created_at`,
		repost.ID, repost.OriginalPostID, repost.UserID, repost.Caption).Scan(&repost.CreatedAt)
}

type HashtagRepository struct{ db *sql.DB }
func NewHashtagRepository(db *sql.DB) *HashtagRepository { return &HashtagRepository{db: db} }
func (r *HashtagRepository) CreateOrUpdate(ctx context.Context, tag string) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO hashtags (id, tag) VALUES (gen_random_uuid()::text, $1) ON CONFLICT (tag) DO UPDATE SET usage_count = hashtags.usage_count + 1`, tag)
	return err
}
func (r *HashtagRepository) GetTrending(ctx context.Context, limit int) ([]*models.Hashtag, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, tag, usage_count, is_trending, category, created_at FROM hashtags ORDER BY usage_count DESC LIMIT $1`, limit)
	if err != nil { return nil, err }
	defer rows.Close()
	var tags []*models.Hashtag
	for rows.Next() {
		t := &models.Hashtag{}
		rows.Scan(&t.ID, &t.Tag, &t.UsageCount, &t.IsTrending, &t.Category, &t.CreatedAt)
		tags = append(tags, t)
	}
	return tags, nil
}
func (r *HashtagRepository) GetByTag(ctx context.Context, tag string) (*models.Hashtag, error) {
	t := &models.Hashtag{}
	err := r.db.QueryRowContext(ctx, `SELECT id, tag, usage_count, is_trending, category, created_at FROM hashtags WHERE tag=$1`, tag).
		Scan(&t.ID, &t.Tag, &t.UsageCount, &t.IsTrending, &t.Category, &t.CreatedAt)
	return t, err
}
func (r *HashtagRepository) Search(ctx context.Context, query string, limit int) ([]*models.Hashtag, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, tag, usage_count FROM hashtags WHERE tag ILIKE $1 ORDER BY usage_count DESC LIMIT $2`, "%"+query+"%", limit)
	if err != nil { return nil, err }
	defer rows.Close()
	var tags []*models.Hashtag
	for rows.Next() {
		t := &models.Hashtag{}
		rows.Scan(&t.ID, &t.Tag, &t.UsageCount)
		tags = append(tags, t)
	}
	return tags, nil
}

type AudioRepository struct{ db *sql.DB }
func NewAudioRepository(db *sql.DB) *AudioRepository { return &AudioRepository{db: db} }
func (r *AudioRepository) GetTrending(ctx context.Context, limit int) ([]*models.AudioTrack, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, title, artist, url, duration, usage_count, is_tamil, movie_name, thumbnail_url FROM audio_tracks ORDER BY usage_count DESC LIMIT $1`, limit)
	if err != nil { return nil, err }
	defer rows.Close()
	var tracks []*models.AudioTrack
	for rows.Next() {
		a := &models.AudioTrack{}
		rows.Scan(&a.ID, &a.Title, &a.Artist, &a.URL, &a.Duration, &a.UsageCount, &a.IsTamil, &a.MovieName, &a.ThumbnailURL)
		tracks = append(tracks, a)
	}
	return tracks, nil
}
func (r *AudioRepository) GetByID(ctx context.Context, id string) (*models.AudioTrack, error) {
	a := &models.AudioTrack{}
	err := r.db.QueryRowContext(ctx, `SELECT id, title, artist, url, duration, usage_count, is_tamil, movie_name, thumbnail_url FROM audio_tracks WHERE id=$1`, id).
		Scan(&a.ID, &a.Title, &a.Artist, &a.URL, &a.Duration, &a.UsageCount, &a.IsTamil, &a.MovieName, &a.ThumbnailURL)
	return a, err
}
func (r *AudioRepository) IncrementUsage(ctx context.Context, id string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE audio_tracks SET usage_count = usage_count + 1 WHERE id=$1`, id)
	return err
}

type PollRepository struct{ db *sql.DB }
func NewPollRepository(db *sql.DB) *PollRepository { return &PollRepository{db: db} }
func (r *PollRepository) Create(ctx context.Context, poll *models.Poll) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO polls (id, post_id, question, expires_at) VALUES ($1,$2,$3,$4) RETURNING created_at`,
		poll.ID, poll.PostID, poll.Question, poll.ExpiresAt).Scan(&poll.CreatedAt)
}
func (r *PollRepository) CreateOption(ctx context.Context, opt *models.PollOption) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO poll_options (id, poll_id, text) VALUES ($1,$2,$3)`, opt.ID, opt.PollID, opt.Text)
	return err
}
func (r *PollRepository) Vote(ctx context.Context, pollID, optionID string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE poll_options SET vote_count = vote_count + 1 WHERE id = $1`, optionID)
	if err != nil { return err }
	_, err = r.db.ExecContext(ctx, `UPDATE polls SET total_votes = total_votes + 1 WHERE id = $1`, pollID)
	return err
}

type BroadcastRepository struct{ db *sql.DB }
func NewBroadcastRepository(db *sql.DB) *BroadcastRepository { return &BroadcastRepository{db: db} }
func (r *BroadcastRepository) Create(ctx context.Context, b *models.Broadcast) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO broadcasts (id, name, created_by) VALUES ($1,$2,$3) RETURNING created_at`,
		b.ID, b.Name, b.CreatedBy).Scan(&b.CreatedAt)
}

type VerificationRepository struct{ db *sql.DB }
func NewVerificationRepository(db *sql.DB) *VerificationRepository { return &VerificationRepository{db: db} }
func (r *VerificationRepository) Create(ctx context.Context, vr *models.VerificationRequest) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO verification_requests (id, user_id, category, document_url, reason) VALUES ($1,$2,$3,$4,$5) RETURNING created_at`,
		vr.ID, vr.UserID, vr.Category, vr.DocumentURL, vr.Reason).Scan(&vr.CreatedAt)
}
func (r *VerificationRepository) GetAll(ctx context.Context, page, limit int) ([]*models.VerificationRequest, int, error) {
	offset := (page - 1) * limit
	var total int
	r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM verification_requests`).Scan(&total)
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, user_id, category, document_url, reason, status, reviewed_by, reviewed_at, created_at FROM verification_requests ORDER BY created_at DESC LIMIT $1 OFFSET $2`, limit, offset)
	if err != nil { return nil, 0, err }
	defer rows.Close()
	var reqs []*models.VerificationRequest
	for rows.Next() {
		v := &models.VerificationRequest{}
		rows.Scan(&v.ID, &v.UserID, &v.Category, &v.DocumentURL, &v.Reason, &v.Status, &v.ReviewedBy, &v.ReviewedAt, &v.CreatedAt)
		reqs = append(reqs, v)
	}
	return reqs, total, nil
}
func (r *VerificationRepository) UpdateStatus(ctx context.Context, id, status, reviewedBy string) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE verification_requests SET status=$1, reviewed_by=$2, reviewed_at=NOW() WHERE id=$3`,
		status, reviewedBy, id)
	return err
}

type SubscriptionRepository struct{ db *sql.DB }
func NewSubscriptionRepository(db *sql.DB) *SubscriptionRepository { return &SubscriptionRepository{db: db} }
func (r *SubscriptionRepository) Create(ctx context.Context, sub *models.Subscription) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO subscriptions (id, creator_id, subscriber_id, tier, price, expires_at) VALUES ($1,$2,$3,$4,$5,$6) RETURNING created_at`,
		sub.ID, sub.CreatorID, sub.SubscriberID, sub.Tier, sub.Price, sub.ExpiresAt).Scan(&sub.CreatedAt)
}
func (r *SubscriptionRepository) IsSubscribed(ctx context.Context, creatorID, subscriberID string) (bool, error) {
	var count int
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM subscriptions WHERE creator_id=$1 AND subscriber_id=$2 AND is_active=true AND expires_at > NOW()`,
		creatorID, subscriberID).Scan(&count)
	return count > 0, err
}

type LiveStreamRepository struct{ db *sql.DB }
func NewLiveStreamRepository(db *sql.DB) *LiveStreamRepository { return &LiveStreamRepository{db: db} }
func (r *LiveStreamRepository) Create(ctx context.Context, ls *models.LiveStream) error {
	return r.db.QueryRowContext(ctx,
		`INSERT INTO live_streams (id, user_id, title, topic_tag) VALUES ($1,$2,$3,$4) RETURNING started_at`,
		ls.ID, ls.UserID, ls.Title, ls.TopicTag).Scan(&ls.StartedAt)
}
func (r *LiveStreamRepository) GetActive(ctx context.Context) ([]*models.LiveStream, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, user_id, title, topic_tag, viewer_count, started_at FROM live_streams WHERE is_active=true AND ended_at IS NULL ORDER BY viewer_count DESC`)
	if err != nil { return nil, err }
	defer rows.Close()
	var streams []*models.LiveStream
	for rows.Next() {
		l := &models.LiveStream{}
		rows.Scan(&l.ID, &l.UserID, &l.Title, &l.TopicTag, &l.ViewerCount, &l.StartedAt)
		streams = append(streams, l)
	}
	return streams, nil
}
func (r *LiveStreamRepository) EndStream(ctx context.Context, id, userID string) error {
	_, err := r.db.ExecContext(ctx, `UPDATE live_streams SET is_active=false, ended_at=NOW() WHERE id=$1 AND user_id=$2`, id, userID)
	return err
}

type ExploreTopicRepository struct{ db *sql.DB }
func NewExploreTopicRepository(db *sql.DB) *ExploreTopicRepository { return &ExploreTopicRepository{db: db} }
func (r *ExploreTopicRepository) GetAll(ctx context.Context) ([]*models.ExploreTopic, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, name, name_ta, icon, post_count, category FROM explore_topics ORDER BY post_count DESC`)
	if err != nil { return nil, err }
	defer rows.Close()
	var topics []*models.ExploreTopic
	for rows.Next() {
		t := &models.ExploreTopic{}
		rows.Scan(&t.ID, &t.Name, &t.NameTA, &t.Icon, &t.PostCount, &t.Category)
		topics = append(topics, t)
	}
	return topics, nil
}

type DistrictRepository struct{ db *sql.DB }
func NewDistrictRepository(db *sql.DB) *DistrictRepository { return &DistrictRepository{db: db} }
func (r *DistrictRepository) GetAll(ctx context.Context) ([]*models.District, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT id, name, name_ta, region FROM districts ORDER BY name`)
	if err != nil { return nil, err }
	defer rows.Close()
	var dists []*models.District
	for rows.Next() {
		d := &models.District{}
		rows.Scan(&d.ID, &d.Name, &d.NameTA, &d.Region)
		dists = append(dists, d)
	}
	return dists, nil
}
