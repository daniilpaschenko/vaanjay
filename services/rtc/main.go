package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type PeerConnection struct {
	UserID string
	Conn   *websocket.Conn
}

type Room struct {
	ID      string
	Peers   map[string]*PeerConnection
	mu      sync.RWMutex
}

type SignalingServer struct {
	rooms map[string]*Room
	mu    sync.RWMutex
}

func NewSignalingServer() *SignalingServer {
	return &SignalingServer{
		rooms: make(map[string]*Room),
	}
}

func (s *SignalingServer) HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("WebSocket upgrade error: %v", err)
		return
	}

	userID := r.URL.Query().Get("user_id")
	roomID := r.URL.Query().Get("room_id")

	if userID == "" || roomID == "" {
		conn.WriteJSON(map[string]string{"error": "user_id and room_id required"})
		conn.Close()
		return
	}

	peer := &PeerConnection{
		UserID: userID,
		Conn:   conn,
	}

	s.mu.Lock()
	room, exists := s.rooms[roomID]
	if !exists {
		room = &Room{
			ID:    roomID,
			Peers: make(map[string]*PeerConnection),
		}
		s.rooms[roomID] = room
	}
	s.mu.Unlock()

	room.mu.Lock()
	room.Peers[userID] = peer
	room.mu.Unlock()

	defer func() {
		room.mu.Lock()
		delete(room.Peers, userID)
		if len(room.Peers) == 0 {
			s.mu.Lock()
			delete(s.rooms, roomID)
			s.mu.Unlock()
		}
		room.mu.Unlock()
		conn.Close()
	}()

	// Notify other peers
	room.mu.RLock()
	for id, p := range room.Peers {
		if id != userID {
			p.Conn.WriteJSON(map[string]interface{}{
				"type":    "peer_joined",
				"user_id": userID,
			})
		}
	}
	room.mu.RUnlock()

	// Read messages
	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}

		var signal map[string]interface{}
		if err := json.Unmarshal(message, &signal); err != nil {
			continue
		}

		signal["from_user_id"] = userID

		// Route signal to specific peer or broadcast
		targetID, hasTarget := signal["to_user_id"].(string)

		room.mu.RLock()
		if hasTarget {
			if target, ok := room.Peers[targetID]; ok {
				target.Conn.WriteJSON(signal)
			}
		} else {
			for id, p := range room.Peers {
				if id != userID {
					p.Conn.WriteJSON(signal)
				}
			}
		}
		room.mu.RUnlock()
	}
}

func main() {
	server := NewSignalingServer()

	http.HandleFunc("/ws/calls/signal", server.HandleWebSocket)
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	port := ":8082"
	log.Printf("VAANJAY WebRTC Signaling Server starting on %s", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
