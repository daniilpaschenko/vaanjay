package services

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"os"
	"regexp"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"github.com/rs/zerolog"
	"github.com/vaanjay/api/internal/models"
	"github.com/vaanjay/api/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repos  *repository.Repositories
	rdb    *redis.Client
	logger zerolog.Logger
	jwtAccessSecret  string
	jwtRefreshSecret string
	accessExpiry     time.Duration
	refreshExpiry    time.Duration
}

func NewAuthService(repos *repository.Repositories, rdb *redis.Client, logger zerolog.Logger) *AuthService {
	return &AuthService{
		repos:  repos,
		rdb:    rdb,
		logger: logger,
		jwtAccessSecret:  getEnvDefault("JWT_ACCESS_SECRET", "vaanjay-access-secret-change-in-prod"),
		jwtRefreshSecret: getEnvDefault("JWT_REFRESH_SECRET", "vaanjay-refresh-secret-change-in-prod"),
		accessExpiry:     15 * time.Minute,
		refreshExpiry:    30 * 24 * time.Hour,
	}
}

var usernameRegex = regexp.MustCompile(`^[a-zA-Z0-9@_\-.]{3,30}$`)

type TokenPair struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	ExpiresIn    int    `json:"expires_in"`
}

type AuthResponse struct {
	User         *models.User `json:"user"`
	AccessToken  string       `json:"access_token"`
	RefreshToken string       `json:"refresh_token"`
	ExpiresIn    int          `json:"expires_in"`
}

func (s *AuthService) Register(ctx context.Context, input struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	Phone     string `json:"phone_number"`
	FullName  string `json:"full_name"`
	Password  string `json:"password"`
}) (*AuthResponse, error) {
	input.Username = strings.TrimSpace(input.Username)
	input.Email = strings.TrimSpace(strings.ToLower(input.Email))
	input.Phone = strings.TrimSpace(input.Phone)

	if !usernameRegex.MatchString(input.Username) {
		return nil, errors.New("username must be 3-30 characters and can only contain letters, numbers, @, _, -, .")
	}
	if len(input.Password) < 8 {
		return nil, errors.New("password must be at least 8 characters")
	}
	if !strings.Contains(input.Email, "@") {
		return nil, errors.New("invalid email format")
	}

	taken, err := s.repos.User.IsUsernameTaken(ctx, input.Username)
	if err != nil {
		return nil, errors.New("internal error checking username")
	}
	if taken {
		return nil, errors.New("username not available")
	}

	taken, err = s.repos.User.IsEmailTaken(ctx, input.Email)
	if err != nil {
		return nil, errors.New("internal error checking email")
	}
	if taken {
		return nil, errors.New("email already in use")
	}

	taken, err = s.repos.User.IsPhoneTaken(ctx, input.Phone)
	if err != nil {
		return nil, errors.New("internal error checking phone")
	}
	if taken {
		return nil, errors.New("phone number already in use")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(input.Password), 12)
	if err != nil {
		return nil, errors.New("failed to hash password")
	}

	user := &models.User{
		ID:                   uuid.New().String(),
		Username:             input.Username,
		Email:                input.Email,
		PhoneNumber:          input.Phone,
		PasswordHash:         string(hash),
		FullName:             input.FullName,
		LanguagePreference:   "ta",
		ContentLanguagePreference: "ta",
		IsActive:             true,
	}

	if err := s.repos.User.Create(ctx, user); err != nil {
		s.logger.Error().Err(err).Msg("Failed to create user")
		return nil, errors.New("failed to create user")
	}

	tokens, err := s.generateTokens(user)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		User:         user,
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
		ExpiresIn:    int(s.accessExpiry.Seconds()),
	}, nil
}

func (s *AuthService) Login(ctx context.Context, credential, password string) (*AuthResponse, error) {
	var user *models.User
	var err error

	if strings.Contains(credential, "@") {
		user, err = s.repos.User.GetByEmail(ctx, credential)
	} else if strings.HasPrefix(credential, "+") || len(credential) == 10 && isAllDigits(credential) {
		user, err = s.repos.User.GetByPhone(ctx, credential)
	} else {
		user, err = s.repos.User.GetByUsername(ctx, credential)
	}

	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		return nil, errors.New("invalid credentials")
	}

	tokens, err := s.generateTokens(user)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		User:         user,
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
		ExpiresIn:    int(s.accessExpiry.Seconds()),
	}, nil
}

func (s *AuthService) SendOTP(ctx context.Context, phone string) error {
	if len(phone) < 10 {
		return errors.New("invalid phone number")
	}

	otp := fmt.Sprintf("%06d", rand.Intn(1000000))

	if err := s.repos.User.CacheOTP(ctx, phone, otp, 5*time.Minute); err != nil {
		return errors.New("failed to send OTP")
	}

	// In production, integrate MSG91 or Twilio here
	s.logger.Info().Str("phone", phone).Str("otp", otp).Msg("OTP sent")
	return nil
}

func (s *AuthService) VerifyOTP(ctx context.Context, phone, otp string) (*AuthResponse, error) {
	cachedOTP, err := s.repos.User.GetCachedOTP(ctx, phone)
	if err == redis.Nil {
		return nil, errors.New("OTP expired or not sent")
	}
	if err != nil {
		return nil, errors.New("failed to verify OTP")
	}

	if cachedOTP != otp {
		return nil, errors.New("invalid OTP")
	}

	s.repos.User.DeleteCachedOTP(ctx, phone)

	user, err := s.repos.User.GetByPhone(ctx, phone)
	if err != nil {
		// Auto-register new user on OTP verification
		user = &models.User{
			ID:           uuid.New().String(),
			PhoneNumber:  phone,
			Username:     "user_" + phone[len(phone)-6:],
			FullName:     "User",
			IsActive:     true,
			LanguagePreference: "ta",
		}
		hash, _ := bcrypt.GenerateFromPassword([]byte(uuid.New().String()), 12)
		user.PasswordHash = string(hash)
		if err := s.repos.User.Create(ctx, user); err != nil {
			return nil, errors.New("failed to create user")
		}
	}

	tokens, err := s.generateTokens(user)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{
		User:         user,
		AccessToken:  tokens.AccessToken,
		RefreshToken: tokens.RefreshToken,
		ExpiresIn:    int(s.accessExpiry.Seconds()),
	}, nil
}

func (s *AuthService) RefreshToken(ctx context.Context, refreshToken string) (*TokenPair, error) {
	token, err := jwt.Parse(refreshToken, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(s.jwtRefreshSecret), nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("invalid refresh token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("invalid token claims")
	}

	userID := claims["user_id"].(string)

	user, err := s.repos.User.GetByID(ctx, userID)
	if err != nil {
		return nil, errors.New("user not found")
	}

	return s.generateTokens(user)
}

func (s *AuthService) Logout(ctx context.Context, userID, refreshToken string) error {
	return s.repos.User.DeleteRefreshToken(ctx, userID, refreshToken)
}

func (s *AuthService) ForgotPassword(ctx context.Context, email string) error {
	user, err := s.repos.User.GetByEmail(ctx, email)
	if err != nil {
		return errors.New("if the email exists, a reset link has been sent")
	}

	resetToken := uuid.New().String()
	s.rdb.Set(ctx, "reset:"+resetToken, user.ID, 15*time.Minute)

	s.logger.Info().Str("email", email).Str("reset_token", resetToken).Msg("Password reset requested")
	return nil
}

func (s *AuthService) ResetPassword(ctx context.Context, resetToken, newPassword string) error {
	userID, err := s.rdb.Get(ctx, "reset:"+resetToken).Result()
	if err == redis.Nil {
		return errors.New("invalid or expired reset token")
	}
	if err != nil {
		return errors.New("failed to reset password")
	}

	if len(newPassword) < 8 {
		return errors.New("password must be at least 8 characters")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(newPassword), 12)
	if err != nil {
		return errors.New("failed to hash password")
	}

	if err := s.repos.User.UpdatePassword(ctx, userID, string(hash)); err != nil {
		return errors.New("failed to update password")
	}

	s.rdb.Del(ctx, "reset:"+resetToken)
	return nil
}

func (s *AuthService) ValidateToken(tokenString string) (*models.User, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(s.jwtAccessSecret), nil
	})
	if err != nil || !token.Valid {
		return nil, errors.New("invalid or expired token")
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return nil, errors.New("invalid token claims")
	}

	userID := claims["user_id"].(string)
	user, err := s.repos.User.GetByID(context.Background(), userID)
	if err != nil {
		return nil, errors.New("user not found")
	}
	return user, nil
}

func (s *AuthService) generateTokens(user *models.User) (*TokenPair, error) {
	now := time.Now()

	accessClaims := jwt.MapClaims{
		"user_id":  user.ID,
		"username": user.Username,
		"is_admin": user.IsAdmin,
		"exp":      now.Add(s.accessExpiry).Unix(),
		"iat":      now.Unix(),
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
	accessStr, err := accessToken.SignedString([]byte(s.jwtAccessSecret))
	if err != nil {
		return nil, errors.New("failed to generate access token")
	}

	refreshClaims := jwt.MapClaims{
		"user_id": user.ID,
		"exp":     now.Add(s.refreshExpiry).Unix(),
		"iat":     now.Unix(),
	}

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
	refreshStr, err := refreshToken.SignedString([]byte(s.jwtRefreshSecret))
	if err != nil {
		return nil, errors.New("failed to generate refresh token")
	}

	s.repos.User.CacheRefreshToken(context.Background(), user.ID, refreshStr, s.refreshExpiry)

	return &TokenPair{
		AccessToken:  accessStr,
		RefreshToken: refreshStr,
		ExpiresIn:    int(s.accessExpiry.Seconds()),
	}, nil
}

func isAllDigits(s string) bool {
	for _, c := range s {
		if c < '0' || c > '9' {
			return false
		}
	}
	return len(s) > 0
}

func getEnvDefault(key, def string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return def
}
