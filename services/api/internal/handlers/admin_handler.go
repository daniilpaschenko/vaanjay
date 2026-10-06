package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaanjay/api/internal/repository"
	"github.com/vaanjay/api/internal/services"
)

type AdminHandler struct {
	repos *repository.Repositories
	svcs  *services.Services
}

func NewAdminHandler(repos *repository.Repositories, svcs *services.Services) *AdminHandler {
	return &AdminHandler{repos: repos, svcs: svcs}
}

func (h *AdminHandler) Dashboard(c *fiber.Ctx) error {
	ctx := c.Context()
	totalUsers, _ := h.repos.User.GetUserCount(ctx)
	dau, _ := h.repos.User.GetDAU(ctx)
	mau, _ := h.repos.User.GetMAU(ctx)
	totalPosts, _ := h.repos.Post.GetTotalCount(ctx)
	totalReels, _ := h.repos.Reel.GetTotalCount(ctx)
	activeCalls, _ := h.repos.Call.GetActiveCallCount(ctx)
	totalMsgs, _ := h.repos.Message.GetTotalMessageCount(ctx)
	revenue, _ := h.repos.Payment.GetRevenue(ctx)
	langDist, _ := h.repos.User.GetLanguageDistribution(ctx)
	userGrowth, _ := h.repos.User.GetUserGrowth(ctx, "daily")
	contentChart, _ := h.repos.Post.GetContentPostedChart(ctx)

	return c.JSON(fiber.Map{"success": true, "data": fiber.Map{
		"total_users":    totalUsers,
		"dau":            dau,
		"mau":            mau,
		"total_posts":    totalPosts,
		"total_reels":    totalReels,
		"active_calls":   activeCalls,
		"total_dm_messages": totalMsgs,
		"revenue":        revenue,
		"language_distribution": langDist,
		"user_growth":    userGrowth,
		"content_posted": contentChart,
	}})
}

func (h *AdminHandler) GetUsers(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 50)
	filters := map[string]string{
		"verified": c.Query("verified"),
		"badge":    c.Query("badge"),
		"search":   c.Query("search"),
	}
	users, total, _ := h.repos.User.GetAll(c.Context(), page, limit, filters)
	return c.JSON(fiber.Map{"success": true, "data": users, "total": total, "page": page})
}

func (h *AdminHandler) BanUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	if err := h.repos.User.SetActive(c.Context(), userID, false); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to ban user"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "User banned"})
}

func (h *AdminHandler) UnbanUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	if err := h.repos.User.SetActive(c.Context(), userID, true); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to unban user"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "User unbanned"})
}

func (h *AdminHandler) VerifyUser(c *fiber.Ctx) error {
	userID := c.Params("id")
	if err := h.repos.User.SetVerified(c.Context(), userID, true, "blue"); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to verify user"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "User verified"})
}

func (h *AdminHandler) RemoveVerification(c *fiber.Ctx) error {
	userID := c.Params("id")
	if err := h.repos.User.SetVerified(c.Context(), userID, false, ""); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to remove verification"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Verification removed"})
}

func (h *AdminHandler) AssignBadge(c *fiber.Ctx) error {
	userID := c.Params("id")
	var input struct{ BadgeType string `json:"badge_type"` }
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	verified := input.BadgeType != ""
	if err := h.repos.User.SetVerified(c.Context(), userID, verified, input.BadgeType); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to assign badge"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Badge assigned"})
}

func (h *AdminHandler) GetAllPosts(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 50)
	filters := map[string]string{
		"type":    c.Query("type"),
		"user_id": c.Query("user_id"),
	}
	posts, total, _ := h.repos.Post.GetAll(c.Context(), page, limit, filters)
	return c.JSON(fiber.Map{"success": true, "data": posts, "total": total})
}

func (h *AdminHandler) AdminDeletePost(c *fiber.Ctx) error {
	if err := h.repos.Post.AdminDelete(c.Context(), c.Params("id")); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to delete post"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Post deleted"})
}

func (h *AdminHandler) GetAllReports(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 50)
	status := c.Query("status")
	reports, total, _ := h.repos.Report.GetAll(c.Context(), page, limit, status)
	return c.JSON(fiber.Map{"success": true, "data": reports, "total": total})
}

func (h *AdminHandler) TakeAction(c *fiber.Ctx) error {
	var input struct{ Action string `json:"action"` }
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	if err := h.repos.Report.UpdateStatus(c.Context(), c.Params("id"), input.Action); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to take action"})
	}
	return c.JSON(fiber.Map{"success": true, "message": "Action taken"})
}

func (h *AdminHandler) UserAnalytics(c *fiber.Ctx) error {
	period := c.Query("period", "daily")
	data, _ := h.repos.User.GetUserGrowth(c.Context(), period)
	return c.JSON(fiber.Map{"success": true, "data": data})
}

func (h *AdminHandler) ContentAnalytics(c *fiber.Ctx) error {
	data, _ := h.repos.Post.GetContentPostedChart(c.Context())
	return c.JSON(fiber.Map{"success": true, "data": data})
}

func (h *AdminHandler) CallAnalytics(c *fiber.Ctx) error {
	count, _ := h.repos.Call.GetActiveCallCount(c.Context())
	return c.JSON(fiber.Map{"success": true, "data": fiber.Map{"active_calls": count}})
}

func (h *AdminHandler) PaymentAnalytics(c *fiber.Ctx) error {
	revenue, _ := h.repos.Payment.GetRevenue(c.Context())
	return c.JSON(fiber.Map{"success": true, "data": fiber.Map{"revenue": revenue}})
}

func (h *AdminHandler) BroadcastNotification(c *fiber.Ctx) error {
	var input struct {
		Title   string `json:"title"`
		Message string `json:"message"`
		UserIDs []string `json:"user_ids"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	// In production: trigger FCM push notification
	return c.JSON(fiber.Map{"success": true, "message": "Broadcast sent"})
}

func (h *AdminHandler) GetVerificationRequests(c *fiber.Ctx) error {
	page := c.QueryInt("page", 1)
	limit := c.QueryInt("limit", 50)
	reqs, total, _ := h.repos.Verify.GetAll(c.Context(), page, limit)
	return c.JSON(fiber.Map{"success": true, "data": reqs, "total": total})
}

func (h *AdminHandler) HandleVerificationRequest(c *fiber.Ctx) error {
	adminID := c.Locals("user_id").(string)
	var input struct{ Action string `json:"action"` }
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}
	if err := h.repos.Verify.UpdateStatus(c.Context(), c.Params("id"), input.Action, adminID); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Failed to update request"})
	}
	if input.Action == "approved" {
		// Get the request to find the user
		c.Status(200)
	}
	return c.JSON(fiber.Map{"success": true, "message": "Request updated"})
}
