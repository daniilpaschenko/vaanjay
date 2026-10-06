package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaanjay/api/internal/services"
)

type MessageHandler struct{ svc *services.MessageService }
type CallHandler struct{ svc *services.CallService }
type NotificationHandler struct{ svc *services.NotificationService }
type PaymentHandler struct{ svc *services.PaymentService }
type ReportHandler struct{ svc *services.ReportService }
type ExploreHandler struct{ svc *services.ExploreService }

func NewMessageHandler(svc *services.MessageService) *MessageHandler { return &MessageHandler{svc: svc} }
func NewCallHandler(svc *services.CallService) *CallHandler { return &CallHandler{svc: svc} }
func NewNotificationHandler(svc *services.NotificationService) *NotificationHandler { return &NotificationHandler{svc: svc} }
func NewPaymentHandler(svc *services.PaymentService) *PaymentHandler { return &PaymentHandler{svc: svc} }
func NewReportHandler(svc *services.ReportService) *ReportHandler { return &ReportHandler{svc: svc} }
func NewExploreHandler(svc *services.ExploreService) *ExploreHandler { return &ExploreHandler{svc: svc} }

// ─── Message Handlers ──────────────────────────────────────

func (h *MessageHandler) GetConversations(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	convs, err := h.svc.GetConversations(c.Context(), userID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": convs})
}

func (h *MessageHandler) CreateConversation(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		Type      string   `json:"type"`
		Name      string   `json:"name"`
		MemberIDs []string `json:"member_ids"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	conv, err := h.svc.CreateConversation(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": conv})
}

func (h *MessageHandler) GetMessages(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 50)

	msgs, total, err := h.svc.GetMessages(c.Context(), c.Params("id"), userID, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "data": msgs, "total": total})
}

func (h *MessageHandler) SendMessage(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		Content     string `json:"content"`
		MediaURL    string `json:"media_url"`
		MessageType string `json:"message_type"`
		ReplyToID   string `json:"reply_to_id"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	msg, err := h.svc.SendMessage(c.Context(), userID, struct {
		ConversationID string
		Content        string
		MediaURL       string
		MessageType    string
		ReplyToID      string
	}{ConversationID: c.Params("id"), Content: input.Content, MediaURL: input.MediaURL, MessageType: input.MessageType, ReplyToID: input.ReplyToID})
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": msg})
}

func (h *MessageHandler) DeleteMessage(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.DeleteMessage(c.Context(), c.Params("msgId"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *MessageHandler) AddMember(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct{ UserID string `json:"user_id"` }
	c.BodyParser(&input)
	if err := h.svc.AddMember(c.Context(), c.Params("id"), input.UserID, userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *MessageHandler) RemoveMember(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct{ UserID string `json:"user_id"` }
	c.BodyParser(&input)
	if err := h.svc.RemoveMember(c.Context(), c.Params("id"), input.UserID, userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *MessageHandler) UpdateConversationInfo(c *fiber.Ctx) error {
	var input struct {
		Name        string `json:"name"`
		GroupPicURL string `json:"group_pic_url"`
	}
	c.BodyParser(&input)
	if err := h.svc.UpdateConversationInfo(c.Context(), c.Params("id"), input.Name, input.GroupPicURL); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

// ─── Call Handlers ─────────────────────────────────────────

func (h *CallHandler) Initiate(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		ReceiverID string `json:"receiver_id"`
		GroupID    string `json:"group_id"`
		Type       string `json:"type"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	call, err := h.svc.Initiate(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": call})
}

func (h *CallHandler) Accept(c *fiber.Ctx) error {
	if err := h.svc.Accept(c.Context(), c.Params("callId"), c.Locals("user_id").(string)); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *CallHandler) Reject(c *fiber.Ctx) error {
	if err := h.svc.Reject(c.Context(), c.Params("callId"), c.Locals("user_id").(string)); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *CallHandler) End(c *fiber.Ctx) error {
	if err := h.svc.End(c.Context(), c.Params("callId"), c.Locals("user_id").(string)); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *CallHandler) GetHistory(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)
	calls, total, _ := h.svc.GetHistory(c.Context(), userID, page, limit)
	return c.JSON(fiber.Map{"success": true, "data": calls, "total": total})
}

// ─── Notification Handlers ─────────────────────────────────

func (h *NotificationHandler) GetAll(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 50)
	notifs, total, _ := h.svc.GetAll(c.Context(), userID, page, limit)
	return c.JSON(fiber.Map{"success": true, "data": notifs, "total": total})
}

func (h *NotificationHandler) MarkRead(c *fiber.Ctx) error {
	if err := h.svc.MarkRead(c.Context(), c.Params("id"), c.Locals("user_id").(string)); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *NotificationHandler) MarkAllRead(c *fiber.Ctx) error {
	h.svc.MarkAllRead(c.Context(), c.Locals("user_id").(string))
	return c.JSON(fiber.Map{"success": true})
}

// ─── Payment Handlers ──────────────────────────────────────

func (h *PaymentHandler) UPISend(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		ReceiverID string  `json:"receiver_id"`
		Amount     float64 `json:"amount"`
		Note       string  `json:"note"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	txn, err := h.svc.UPISend(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": txn})
}

func (h *PaymentHandler) UPIHistory(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)
	txns, total, _ := h.svc.GetHistory(c.Context(), userID, page, limit)
	return c.JSON(fiber.Map{"success": true, "data": txns, "total": total})
}

func (h *PaymentHandler) UPIProfile(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	username := c.Locals("username").(string)
	return c.JSON(fiber.Map{"success": true, "data": fiber.Map{
		"upi_id":   username + "@vaanjay",
		"user_id":  userID,
		"linked":   []string{},
	}})
}

func (h *PaymentHandler) UPIRequest(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		ReceiverID string  `json:"receiver_id"`
		Amount     float64 `json:"amount"`
		Note       string  `json:"note"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	txn, err := h.svc.UPISend(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": txn})
}

// ─── Report Handlers ───────────────────────────────────────

func (h *ReportHandler) Create(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		TargetID   string `json:"target_id"`
		TargetType string `json:"target_type"`
		Reason     string `json:"reason"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	report, err := h.svc.Create(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": report})
}

// ─── Explore Handlers ──────────────────────────────────────

func (h *ExploreHandler) GetTrending(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)
	data, err := h.svc.GetTrending(c.Context(), page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get trending"})
	}
	return c.JSON(fiber.Map{"success": true, "data": data})
}

func (h *ExploreHandler) GetByHashtag(c *fiber.Ctx) error {
	hashtag, err := h.svc.GetByHashtag(c.Context(), c.Params("tag"), 1, 20)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Hashtag not found"})
	}
	return c.JSON(fiber.Map{"success": true, "data": hashtag})
}

func (h *ExploreHandler) GetTopics(c *fiber.Ctx) error {
	topics, err := h.svc.GetTopics(c.Context())
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get topics"})
	}
	return c.JSON(fiber.Map{"success": true, "data": topics})
}

func (h *ExploreHandler) Search(c *fiber.Ctx) error {
	query := c.Query("q")
	searchType := c.Query("type")
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)

	if query == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Query required"})
	}

	result, err := h.svc.Search(c.Context(), query, searchType, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Search failed"})
	}
	return c.JSON(fiber.Map{"success": true, "data": result})
}
