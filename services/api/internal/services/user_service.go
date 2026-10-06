package services

import (
	"context"
	"errors"

	"github.com/vaanjay/api/internal/models"
	"github.com/vaanjay/api/internal/repository"
	"github.com/redis/go-redis/v9"
)

type UserService struct {
	repos *repository.Repositories
	rdb   *redis.Client
}

func NewUserService(repos *repository.Repositories, rdb *redis.Client) *UserService {
	return &UserService{repos: repos, rdb: rdb}
}

func (s *UserService) GetByID(ctx context.Context, id string) (*models.User, error) {
	return s.repos.User.GetByID(ctx, id)
}

func (s *UserService) GetByUsername(ctx context.Context, username string) (*models.User, error) {
	return s.repos.User.GetByUsername(ctx, username)
}

func (s *UserService) Update(ctx context.Context, id string, input *models.User) error {
	input.ID = id
	return s.repos.User.Update(ctx, input)
}

func (s *UserService) Search(ctx context.Context, query string, page, limit int) ([]*models.User, int, error) {
	return s.repos.User.Search(ctx, query, page, limit)
}

func (s *UserService) Follow(ctx context.Context, followerID, followingID string) error {
	if followerID == followingID {
		return errors.New("cannot follow yourself")
	}
	return s.repos.Follow.Follow(ctx, followerID, followingID)
}

func (s *UserService) Unfollow(ctx context.Context, followerID, followingID string) error {
	return s.repos.Follow.Unfollow(ctx, followerID, followingID)
}

func (s *UserService) GetFollowers(ctx context.Context, userID string, page, limit int) ([]*models.User, int, error) {
	return s.repos.Follow.GetFollowers(ctx, userID, page, limit)
}

func (s *UserService) GetFollowing(ctx context.Context, userID string, page, limit int) ([]*models.User, int, error) {
	return s.repos.Follow.GetFollowing(ctx, userID, page, limit)
}

func (s *UserService) IsFollowing(ctx context.Context, followerID, followingID string) (bool, error) {
	return s.repos.Follow.IsFollowing(ctx, followerID, followingID)
}

func (s *UserService) SetOnline(ctx context.Context, userID string) error {
	return s.repos.User.SetOnlinePresence(ctx, userID)
}

func (s *UserService) SetOffline(ctx context.Context, userID string) error {
	return s.repos.User.SetOfflinePresence(ctx, userID)
}

func (s *UserService) IsOnline(ctx context.Context, userID string) (bool, error) {
	return s.repos.User.IsOnline(ctx, userID)
}
