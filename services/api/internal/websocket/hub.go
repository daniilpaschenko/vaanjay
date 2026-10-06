package websocket

import (
	"encoding/json"
	"log"
	"sync"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/vaanjay/api/internal/services"
)

type Client struct {
	UserID string
	Conn   *websocket.Conn
	Send   chan []byte
}

type Hub struct {
	clients    map[string]map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
	mu         sync.RWMutex
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[string]map[*Client]bool),
		broadcast:  make(chan []byte, 256),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.mu.Lock()
			if h.clients[client.UserID] == nil {
				h.clients[client.UserID] = make(map[*Client]bool)
			}
			h.clients[client.UserID][client] = true
			h.mu.Unlock()

		case client := <-h.unregister:
			h.mu.Lock()
			if clients, ok := h.clients[client.UserID]; ok {
				if _, ok := clients[client]; ok {
					delete(clients, client)
					close(client.Send)
					if len(clients) == 0 {
						delete(h.clients, client.UserID)
					}
				}
			}
			h.mu.Unlock()

		case message := <-h.broadcast:
			h.mu.RLock()
			for _, clients := range h.clients {
				for client := range clients {
					select {
					case client.Send <- message:
					default:
						close(client.Send)
						delete(clients, client)
					}
				}
			}
			h.mu.RUnlock()
		}
	}
}

func (h *Hub) SendToUser(userID string, message []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	if clients, ok := h.clients[userID]; ok {
		for client := range clients {
			select {
			case client.Send <- message:
			default:
				close(client.Send)
				delete(clients, client)
			}
		}
	}
}

func (h *Hub) SendToUsers(userIDs []string, message []byte) {
	for _, userID := range userIDs {
		h.SendToUser(userID, message)
	}
}

func authenticateAndUpgrade(authSvc *services.AuthService, c *fiber.Ctx) error {
	token := c.Query("token")
	if token == "" {
		return c.Status(401).JSON(fiber.Map{"error": "Missing token"})
	}

	user, err := authSvc.ValidateToken(token)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid token"})
	}

	c.Locals("user_id", user.ID)
	c.Locals("username", user.Username)

	return nil
}

func handleWebSocket(hub *Hub, c *websocket.Conn, userID string) {
	client := &Client{
		UserID: userID,
		Conn:   c,
		Send:   make(chan []byte, 256),
	}

	hub.register <- client
	defer func() { hub.unregister <- client }()

	go func() {
		for message := range client.Send {
			if err := client.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
				return
			}
		}
	}()

	for {
		_, message, err := c.ReadMessage()
		if err != nil {
			break
		}

		var event map[string]interface{}
		if err := json.Unmarshal(message, &event); err != nil {
			continue
		}

		hub.broadcast <- message
	}
}

func UpgradeHandler(hub *Hub, authSvc *services.AuthService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		if err := authenticateAndUpgrade(authSvc, c); err != nil {
			return err
		}
		return websocket.New(func(conn *websocket.Conn) {
			userID := c.Locals("user_id").(string)
			handleWebSocket(hub, conn, userID)
		})(c)
	}
}

func NotificationHandler(hub *Hub, authSvc *services.AuthService) fiber.Handler {
	return UpgradeHandler(hub, authSvc)
}

func StoryLiveHandler(hub *Hub, authSvc *services.AuthService) fiber.Handler {
	return UpgradeHandler(hub, authSvc)
}

func CallSignalHandler(hub *Hub, authSvc *services.AuthService) fiber.Handler {
	return func(c *fiber.Ctx) error {
		if err := authenticateAndUpgrade(authSvc, c); err != nil {
			return err
		}
		return websocket.New(func(conn *websocket.Conn) {
			userID := c.Locals("user_id").(string)
			client := &Client{UserID: userID, Conn: conn, Send: make(chan []byte, 256)}
			hub.register <- client
			defer func() { hub.unregister <- client }()

			go func() {
				for message := range client.Send {
					if err := client.Conn.WriteMessage(websocket.TextMessage, message); err != nil {
						return
					}
				}
			}()

			for {
				_, message, err := conn.ReadMessage()
				if err != nil {
					break
				}

				var signal map[string]interface{}
				json.Unmarshal(message, &signal)

				if targetID, ok := signal["to_user_id"].(string); ok {
					hub.SendToUser(targetID, message)
				}
			}
		})(c)
	}
}

func PresenceHandler(hub *Hub, authSvc *services.AuthService) fiber.Handler {
	return UpgradeHandler(hub, authSvc)
}
