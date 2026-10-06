package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/vaanjay/api/internal/services"
)

func AuthMiddleware(authSvc *services.AuthService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return c.Status(401).JSON(fiber.Map{"error": "Missing authorization header"})
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid authorization header"})
		}

		tokenString := parts[1]
		user, err := authSvc.ValidateToken(tokenString)
		if err != nil {
			return c.Status(401).JSON(fiber.Map{"error": "Invalid or expired token"})
		}

		c.Locals("user_id", user.ID)
		c.Locals("username", user.Username)
		c.Locals("is_admin", user.IsAdmin)

		return c.Next()
	}
}

func AdminMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		isAdmin, ok := c.Locals("is_admin").(bool)
		if !ok || !isAdmin {
			return c.Status(403).JSON(fiber.Map{"error": "Admin access required"})
		}
		return c.Next()
	}
}
