package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaanjay/api/internal/services"
)

type UserHandler struct {
	svc *services.UserService
}

func NewUserHandler(svc *services.UserService) *UserHandler {
	return &UserHandler{svc: svc}
}

func (h *UserHandler) GetMe(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	user, err := h.svc.GetByID(c.Context(), userID)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}
	return c.JSON(fiber.Map{"success": true, "data": user})
}

func (h *UserHandler) UpdateMe(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		FullName        string `json:"full_name"`
		Bio             string `json:"bio"`
		ProfilePicURL   string `json:"profile_pic_url"`
		LanguagePref    string `json:"language_preference"`
		ContentLangPref string `json:"content_language_preference"`
		IsPrivate       *bool  `json:"is_private"`
		Gender          string `json:"gender"`
		District        string `json:"district"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	user, _ := h.svc.GetByID(c.Context(), userID)
	if input.FullName != "" {
		user.FullName = input.FullName
	}
	user.Bio = toNullString(input.Bio)
	if input.ProfilePicURL != "" {
		user.ProfilePicURL = toNullString(input.ProfilePicURL)
	}
	if input.LanguagePref != "" {
		user.LanguagePreference = input.LanguagePref
	}
	if input.ContentLangPref != "" {
		user.ContentLanguagePreference = input.ContentLangPref
	}
	if input.IsPrivate != nil {
		user.IsPrivate = *input.IsPrivate
	}
	user.Gender = toNullString(input.Gender)
	user.District = toNullString(input.District)

	if err := h.svc.Update(c.Context(), userID, user); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Profile updated"})
}

func (h *UserHandler) GetByUsername(c *fiber.Ctx) error {
	username := c.Params("username")
	currentUserID := c.Locals("user_id").(string)

	user, err := h.svc.GetByUsername(c.Context(), username)
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "User not found"})
	}

	isFollowing, _ := h.svc.IsFollowing(c.Context(), currentUserID, user.ID)
	isOnline, _ := h.svc.IsOnline(c.Context(), user.ID)

	return c.JSON(fiber.Map{"success": true, "data": fiber.Map{
		"user":         user,
		"is_following": isFollowing,
		"is_online":    isOnline,
	}})
}

func (h *UserHandler) Follow(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	targetID := c.Params("id")

	if err := h.svc.Follow(c.Context(), userID, targetID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Followed"})
}

func (h *UserHandler) Unfollow(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	targetID := c.Params("id")

	if err := h.svc.Unfollow(c.Context(), userID, targetID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Unfollowed"})
}

func (h *UserHandler) GetFollowers(c *fiber.Ctx) error {
	userID := c.Params("id")
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)

	users, total, err := h.svc.GetFollowers(c.Context(), userID, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get followers"})
	}
	return c.JSON(fiber.Map{"success": true, "data": users, "total": total, "page": page})
}

func (h *UserHandler) GetFollowing(c *fiber.Ctx) error {
	userID := c.Params("id")
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)

	users, total, err := h.svc.GetFollowing(c.Context(), userID, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to get following"})
	}
	return c.JSON(fiber.Map{"success": true, "data": users, "total": total, "page": page})
}

func (h *UserHandler) Search(c *fiber.Ctx) error {
	query := c.Query("q")
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 20)

	if query == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Query required"})
	}

	users, total, err := h.svc.Search(c.Context(), query, page, limit)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Search failed"})
	}
	return c.JSON(fiber.Map{"success": true, "data": users, "total": total})
}
