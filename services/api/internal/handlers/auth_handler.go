package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vaanjay/api/internal/services"
)

type AuthHandler struct {
	svc *services.AuthService
}

func NewAuthHandler(svc *services.AuthService) *AuthHandler {
	return &AuthHandler{svc: svc}
}

func (h *AuthHandler) Register(c *fiber.Ctx) error {
	var input struct {
		Username  string `json:"username"`
		Email     string `json:"email"`
		Phone     string `json:"phone_number"`
		FullName  string `json:"full_name"`
		Password  string `json:"password"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	result, err := h.svc.Register(c.Context(), input)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(201).JSON(fiber.Map{"success": true, "data": result})
}

func (h *AuthHandler) Login(c *fiber.Ctx) error {
	var input struct {
		Credential string `json:"credential"`
		Password   string `json:"password"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	result, err := h.svc.Login(c.Context(), input.Credential, input.Password)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "data": result})
}

func (h *AuthHandler) SendOTP(c *fiber.Ctx) error {
	var input struct {
		Phone string `json:"phone_number"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if err := h.svc.SendOTP(c.Context(), input.Phone); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "message": "OTP sent successfully"})
}

func (h *AuthHandler) VerifyOTP(c *fiber.Ctx) error {
	var input struct {
		Phone string `json:"phone_number"`
		OTP   string `json:"otp"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	result, err := h.svc.VerifyOTP(c.Context(), input.Phone, input.OTP)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "data": result})
}

func (h *AuthHandler) RefreshToken(c *fiber.Ctx) error {
	var input struct {
		RefreshToken string `json:"refresh_token"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	tokens, err := h.svc.RefreshToken(c.Context(), input.RefreshToken)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "data": tokens})
}

func (h *AuthHandler) Logout(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	var input struct {
		RefreshToken string `json:"refresh_token"`
	}
	c.BodyParser(&input)

	h.svc.Logout(c.Context(), userID, input.RefreshToken)
	return c.JSON(fiber.Map{"success": true, "message": "Logged out"})
}

func (h *AuthHandler) ForgotPassword(c *fiber.Ctx) error {
	var input struct {
		Email string `json:"email"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if err := h.svc.ForgotPassword(c.Context(), input.Email); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "message": "Reset link sent if email exists"})
}

func (h *AuthHandler) ResetPassword(c *fiber.Ctx) error {
	var input struct {
		Token       string `json:"token"`
		NewPassword string `json:"new_password"`
	}
	if err := c.BodyParser(&input); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request body"})
	}

	if err := h.svc.ResetPassword(c.Context(), input.Token, input.NewPassword); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"success": true, "message": "Password reset successfully"})
}
