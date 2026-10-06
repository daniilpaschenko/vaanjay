package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaanjay/api/internal/services"
)

type PostHandler struct{ svc *services.PostService }
type StoryHandler struct{ svc *services.StoryService }
type ReelHandler struct{ svc *services.ReelService }
type CommentHandler struct{ svc *services.CommentService }

func NewPostHandler(svc *services.PostService) *PostHandler { return &PostHandler{svc: svc} }
func NewStoryHandler(svc *services.StoryService) *StoryHandler { return &StoryHandler{svc: svc} }
func NewReelHandler(svc *services.ReelService) *ReelHandler { return &ReelHandler{svc: svc} }
func NewCommentHandler(svc *services.CommentService) *CommentHandler { return &CommentHandler{svc: svc} }

// ─── Post Handlers ─────────────────────────────────────────

func (h *PostHandler) Create(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		MediaURLs []string `json:"media_urls"`
		Caption   string   `json:"caption"`
		Location  string   `json:"location"`
		Type      string   `json:"type"`
		Audience  string   `json:"audience"`
		Hashtags  []string `json:"hashtags"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	post, err := h.svc.Create(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": post})
}

func (h *PostHandler) GetFeed(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)

	posts, total, err := h.svc.GetFeed(c.Context(), userID, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get feed"})
	}
	return c.JSON(fiber.Map{"success": true, "data": posts, "total": total, "page": page})
}

func (h *PostHandler) GetByID(c *fiber.Ctx) error {
	post, err := h.svc.GetByID(c.Context(), c.Params("id"))
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Post not found"})
	}
	return c.JSON(fiber.Map{"success": true, "data": post})
}

func (h *PostHandler) Delete(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Delete(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Post deleted"})
}

func (h *PostHandler) Like(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Like(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *PostHandler) Dislike(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Dislike(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *PostHandler) Repost(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct{ Caption string `json:"caption"` }
	c.BodyParser(&input)
	if err := h.svc.Repost(c.Context(), userID, c.Params("id"), input.Caption); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *PostHandler) Save(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Save(c.Context(), userID, c.Params("id")); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *PostHandler) GetSaved(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)
	saved, total, _ := h.svc.GetSaved(c.Context(), userID, page, limit)
	return c.JSON(fiber.Map{"success": true, "data": saved, "total": total})
}

// ─── Story Handlers ────────────────────────────────────────

func (h *StoryHandler) Create(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		MediaURL string `json:"media_url"`
		Caption  string `json:"caption"`
		Type     string `json:"type"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	story, err := h.svc.Create(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": story})
}

func (h *StoryHandler) GetFeed(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	stories, err := h.svc.GetFeed(c.Context(), userID)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get stories"})
	}
	return c.JSON(fiber.Map{"success": true, "data": stories})
}

func (h *StoryHandler) Delete(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Delete(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *StoryHandler) View(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.View(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

// ─── Reel Handlers ─────────────────────────────────────────

func (h *ReelHandler) Create(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		VideoURL        string   `json:"video_url"`
		ThumbnailURL    string   `json:"thumbnail_url"`
		Caption         string   `json:"caption"`
		AudioID         string   `json:"audio_id"`
		DurationSeconds int      `json:"duration_seconds"`
		Hashtags        []string `json:"hashtags"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	reel, err := h.svc.Create(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": reel})
}

func (h *ReelHandler) GetFeed(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 10)

	reels, total, err := h.svc.GetFeed(c.Context(), userID, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get reels"})
	}
	return c.JSON(fiber.Map{"success": true, "data": reels, "total": total})
}

func (h *ReelHandler) GetByID(c *fiber.Ctx) error {
	reel, err := h.svc.GetByID(c.Context(), c.Params("id"))
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Reel not found"})
	}
	return c.JSON(fiber.Map{"success": true, "data": reel})
}

func (h *ReelHandler) Like(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Like(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *ReelHandler) Dislike(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Dislike(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

// ─── Comment Handlers ──────────────────────────────────────

func (h *CommentHandler) Create(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		TargetID        string `json:"target_id"`
		TargetType      string `json:"target_type"`
		Content         string `json:"content"`
		ParentCommentID string `json:"parent_comment_id"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	comment, err := h.svc.Create(c.Context(), userID, input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": comment})
}

func (h *CommentHandler) GetByTarget(c *fiber.Ctx) error {
	targetID := c.Query("target_id")
	targetType := c.Query("target_type")
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)

	comments, total, err := h.svc.GetByTarget(c.Context(), targetID, targetType, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get comments"})
	}
	return c.JSON(fiber.Map{"success": true, "data": comments, "total": total})
}

func (h *CommentHandler) Delete(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Delete(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *CommentHandler) Like(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	if err := h.svc.Like(c.Context(), c.Params("id"), userID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true})
}

func (h *CommentHandler) Reply(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		TargetID   string `json:"target_id"`
		TargetType string `json:"target_type"`
		Content    string `json:"content"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	comment, err := h.svc.Reply(c.Context(), userID, struct {
		TargetID   string
		TargetType string
		Content    string
		ParentID   string
	}{TargetID: input.TargetID, TargetType: input.TargetType, Content: input.Content, ParentID: c.Params("id")})
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(fiber.Map{"success": true, "data": comment})
}
