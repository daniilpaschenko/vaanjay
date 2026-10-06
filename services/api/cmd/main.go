package main

import (
	"context"
	"database/sql"
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/limiter"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	_ "github.com/lib/pq"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
	"github.com/vaanjay/api/internal/handlers"
	"github.com/vaanjay/api/internal/middleware"
	"github.com/vaanjay/api/internal/repository"
	"github.com/vaanjay/api/internal/services"
	"github.com/vaanjay/api/internal/websocket"
)

func main() {
	// ─── Logger ───────────────────────────────────────────────
	logger := zerolog.New(os.Stderr).With().Timestamp().Logger()

	// ─── Database ─────────────────────────────────────────────
	dbHost := getEnv("DATABASE_HOST", "localhost")
	dbPort := getEnv("DATABASE_PORT", "5432")
	dbName := getEnv("DATABASE_NAME", "vaanjay")
	dbUser := getEnv("DATABASE_USER", "vaanjay_dev")
	dbPass := getEnv("DATABASE_PASSWORD", "change_me")
	dbSSLMode := getEnv("DATABASE_SSLMODE", "disable")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		dbHost, dbPort, dbUser, dbPass, dbName, dbSSLMode)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		logger.Fatal().Err(err).Msg("Failed to connect to database")
	}
	defer db.Close()

	db.SetMaxOpenConns(100)
	db.SetMaxIdleConns(25)
	db.SetConnMaxLifetime(5 * time.Minute)

	if err := db.Ping(); err != nil {
		logger.Fatal().Err(err).Msg("Failed to ping database")
	}
	logger.Info().Msg("Connected to PostgreSQL")

	// ─── Redis ────────────────────────────────────────────────
	rdb := redis.NewClient(&redis.Options{
		Addr:     getEnv("REDIS_HOST", "localhost") + ":" + getEnv("REDIS_PORT", "6379"),
		Password: getEnv("REDIS_PASSWORD", ""),
		DB:       0,
	})

	ctx := context.Background()
	if err := rdb.Ping(ctx).Err(); err != nil {
		logger.Fatal().Err(err).Msg("Failed to connect to Redis")
	}
	logger.Info().Msg("Connected to Redis")

	// ─── Repositories ─────────────────────────────────────────
	repos := repository.NewRepositories(db, rdb)

	// ─── Services ─────────────────────────────────────────────
	svcs := services.NewServices(repos, rdb, logger)

	// ─── WebSocket Hub ────────────────────────────────────────
	wsHub := websocket.NewHub()
	go wsHub.Run()

	// ─── Fiber App ────────────────────────────────────────────
	app := fiber.New(fiber.Config{
		AppName:      "VAANJAY API v1",
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		BodyLimit:    100 * 1024 * 1024, // 100MB for media uploads
	})

	// ─── Middleware ───────────────────────────────────────────
	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "[${time}] ${ip} ${status} ${latency} ${method} ${path}\n",
	}))
	app.Use(cors.New(cors.Config{
		AllowOrigins:     getEnv("CORS_ORIGINS", "http://localhost:3000,http://localhost:3001"),
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin,Content-Type,Accept,Authorization",
		AllowCredentials: true,
	}))

	// Rate limiting
	app.Use(limiter.New(limiter.Config{
		Max:        100,
		Expiration: 60 * time.Second,
		KeyGenerator: func(c *fiber.Ctx) string {
			return c.IP()
		},
		LimitReached: func(c *fiber.Ctx) error {
			return c.Status(429).JSON(fiber.Map{"error": "Too many requests"})
		},
	}))

	// Serve static files for uploaded media
	app.Static("/media", "./uploads")

	// ─── API Routes ───────────────────────────────────────────
	api := app.Group("/api/v1", func(c *fiber.Ctx) error {
		c.Set("X-API-Version", "1.0.0")
		return c.Next()
	})

	// Health check
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "ok",
			"app":     "VAANJAY",
			"version": "1.0.0",
			"time":    time.Now().Unix(),
		})
	})

	// ─── Auth Routes ─────────────────────────────────────────
	authHandler := handlers.NewAuthHandler(svcs.Auth)
	auth := api.Group("/auth")
	auth.Post("/register", authHandler.Register)
	auth.Post("/login", authHandler.Login)
	auth.Post("/otp/send", authHandler.SendOTP)
	auth.Post("/otp/verify", authHandler.VerifyOTP)
	auth.Post("/refresh-token", authHandler.RefreshToken)
	auth.Post("/logout", authHandler.Logout)
	auth.Post("/forgot-password", authHandler.ForgotPassword)
	auth.Post("/reset-password", authHandler.ResetPassword)

	// ─── Protected Routes ────────────────────────────────────
	protected := api.Group("", middleware.AuthMiddleware(svcs.Auth))

	// Users
	userHandler := handlers.NewUserHandler(svcs.User)
	protected.Get("/users/me", userHandler.GetMe)
	protected.Put("/users/me", userHandler.UpdateMe)
	protected.Get("/users/:username", userHandler.GetByUsername)
	protected.Post("/users/:id/follow", userHandler.Follow)
	protected.Delete("/users/:id/unfollow", userHandler.Unfollow)
	protected.Get("/users/:id/followers", userHandler.GetFollowers)
	protected.Get("/users/:id/following", userHandler.GetFollowing)
	protected.Get("/users/search", userHandler.Search)

	// Posts
	postHandler := handlers.NewPostHandler(svcs.Post)
	protected.Post("/posts", postHandler.Create)
	protected.Get("/posts/feed", postHandler.GetFeed)
	protected.Get("/posts/saved", postHandler.GetSaved)
	protected.Get("/posts/:id", postHandler.GetByID)
	protected.Delete("/posts/:id", postHandler.Delete)
	protected.Post("/posts/:id/like", postHandler.Like)
	protected.Post("/posts/:id/dislike", postHandler.Dislike)
	protected.Post("/posts/:id/repost", postHandler.Repost)
	protected.Post("/posts/:id/save", postHandler.Save)

	// Stories
	storyHandler := handlers.NewStoryHandler(svcs.Story)
	protected.Post("/stories", storyHandler.Create)
	protected.Get("/stories/feed", storyHandler.GetFeed)
	protected.Delete("/stories/:id", storyHandler.Delete)
	protected.Post("/stories/:id/view", storyHandler.View)

	// Reels
	reelHandler := handlers.NewReelHandler(svcs.Reel)
	protected.Post("/reels", reelHandler.Create)
	protected.Get("/reels/feed", reelHandler.GetFeed)
	protected.Get("/reels/:id", reelHandler.GetByID)
	protected.Post("/reels/:id/like", reelHandler.Like)
	protected.Post("/reels/:id/dislike", reelHandler.Dislike)

	// Comments
	commentHandler := handlers.NewCommentHandler(svcs.Comment)
	protected.Post("/comments", commentHandler.Create)
	protected.Get("/comments", commentHandler.GetByTarget)
	protected.Delete("/comments/:id", commentHandler.Delete)
	protected.Post("/comments/:id/like", commentHandler.Like)
	protected.Post("/comments/:id/reply", commentHandler.Reply)

	// Messages
	msgHandler := handlers.NewMessageHandler(svcs.Message)
	protected.Get("/messages/conversations", msgHandler.GetConversations)
	protected.Post("/messages/conversations", msgHandler.CreateConversation)
	protected.Get("/messages/conversations/:id", msgHandler.GetMessages)
	protected.Post("/messages/conversations/:id/send", msgHandler.SendMessage)
	protected.Delete("/messages/conversations/:id/messages/:msgId", msgHandler.DeleteMessage)
	protected.Post("/messages/conversations/:id/members/add", msgHandler.AddMember)
	protected.Delete("/messages/conversations/:id/members/remove", msgHandler.RemoveMember)
	protected.Put("/messages/conversations/:id/info", msgHandler.UpdateConversationInfo)

	// Calls
	callHandler := handlers.NewCallHandler(svcs.Call)
	protected.Post("/calls/initiate", callHandler.Initiate)
	protected.Post("/calls/accept/:callId", callHandler.Accept)
	protected.Post("/calls/reject/:callId", callHandler.Reject)
	protected.Post("/calls/end/:callId", callHandler.End)
	protected.Get("/calls/history", callHandler.GetHistory)

	// Explore
	exploreHandler := handlers.NewExploreHandler(svcs.Explore)
	protected.Get("/explore/trending", exploreHandler.GetTrending)
	protected.Get("/explore/hashtag/:tag", exploreHandler.GetByHashtag)
	protected.Get("/explore/topics", exploreHandler.GetTopics)
	protected.Get("/explore/search", exploreHandler.Search)

	// Notifications
	notifHandler := handlers.NewNotificationHandler(svcs.Notification)
	protected.Get("/notifications", notifHandler.GetAll)
	protected.Put("/notifications/:id/read", notifHandler.MarkRead)
	protected.Put("/notifications/read-all", notifHandler.MarkAllRead)

	// Payments
	paymentHandler := handlers.NewPaymentHandler(svcs.Payment)
	protected.Post("/payments/upi/send", paymentHandler.UPISend)
	protected.Get("/payments/upi/history", paymentHandler.UPIHistory)
	protected.Get("/payments/upi/profile", paymentHandler.UPIProfile)
	protected.Post("/payments/upi/request", paymentHandler.UPIRequest)

	// Reports
	reportHandler := handlers.NewReportHandler(svcs.Report)
	protected.Post("/reports", reportHandler.Create)

	// ─── Admin Routes ─────────────────────────────────────────
	adminHandler := handlers.NewAdminHandler(repos, svcs)
	admin := protected.Group("/admin", middleware.AdminMiddleware())
	admin.Get("/users", adminHandler.GetUsers)
	admin.Put("/users/:id/ban", adminHandler.BanUser)
	admin.Put("/users/:id/unban", adminHandler.UnbanUser)
	admin.Put("/users/:id/verify", adminHandler.VerifyUser)
	admin.Delete("/users/:id/verify", adminHandler.RemoveVerification)
	admin.Put("/users/:id/badge", adminHandler.AssignBadge)
	admin.Get("/posts", adminHandler.GetAllPosts)
	admin.Delete("/posts/:id", adminHandler.AdminDeletePost)
	admin.Get("/reports", adminHandler.GetAllReports)
	admin.Put("/reports/:id/action", adminHandler.TakeAction)
	admin.Get("/analytics/users", adminHandler.UserAnalytics)
	admin.Get("/analytics/content", adminHandler.ContentAnalytics)
	admin.Get("/analytics/calls", adminHandler.CallAnalytics)
	admin.Get("/analytics/payments", adminHandler.PaymentAnalytics)
	admin.Post("/notifications/broadcast", adminHandler.BroadcastNotification)
	admin.Get("/dashboard", adminHandler.Dashboard)
	admin.Get("/verification-requests", adminHandler.GetVerificationRequests)
	admin.Put("/verification-requests/:id", adminHandler.HandleVerificationRequest)

	// ─── WebSocket Routes ─────────────────────────────────────
	app.Get("/ws/messages", websocket.UpgradeHandler(wsHub, svcs.Auth))
	app.Get("/ws/notifications", websocket.NotificationHandler(wsHub, svcs.Auth))
	app.Get("/ws/stories-live", websocket.StoryLiveHandler(wsHub, svcs.Auth))
	app.Get("/ws/calls/signal", websocket.CallSignalHandler(wsHub, svcs.Auth))
	app.Get("/ws/presence", websocket.PresenceHandler(wsHub, svcs.Auth))

	// ─── Graceful Shutdown ────────────────────────────────────
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		port := getEnv("APP_PORT", "8080")
		logger.Info().Str("port", port).Msg("VAANJAY API starting")
		if err := app.Listen(":" + port); err != nil {
			logger.Fatal().Err(err).Msg("Server failed")
		}
	}()

	<-quit
	logger.Info().Msg("Shutting down server...")

	_, shutdown := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdown()

	if err := app.Shutdown(); err != nil {
		logger.Fatal().Err(err).Msg("Server shutdown failed")
	}

	logger.Info().Msg("Server stopped gracefully")
}

func getEnv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
