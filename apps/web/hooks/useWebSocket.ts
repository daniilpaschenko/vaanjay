'use client'

import { useEffect, useRef, useCallback } from 'react'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8080'

type WSEvent = {
  type: string
  data?: any
  [key: string]: any
}

type MessageHandler = (event: WSEvent) => void

export function useWebSocket(onMessage?: MessageHandler) {
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const handlersRef = useRef<Map<string, MessageHandler[]>>(new Map())
  const isConnectedRef = useRef(false)

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    try {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onopen = () => {
        isConnectedRef.current = true
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const type = data.type || data.event || 'message'
          if (onMessage) onMessage(data)
          const handlers = handlersRef.current.get(type) || []
          handlers.forEach(fn => fn(data))
          const allHandlers = handlersRef.current.get('*') || []
          allHandlers.forEach(fn => fn(data))
        } catch {}
      }

      ws.onclose = () => {
        isConnectedRef.current = false
        reconnectTimeoutRef.current = setTimeout(connect, 3000)
      }

      ws.onerror = () => {
        ws.close()
      }
    } catch {}
  }, [onMessage])

  const subscribe = useCallback((type: string, handler: MessageHandler) => {
    if (!handlersRef.current.has(type)) handlersRef.current.set(type, [])
    handlersRef.current.get(type)!.push(handler)
    return () => {
      const handlers = handlersRef.current.get(type)
      if (handlers) {
        const idx = handlers.indexOf(handler)
        if (idx >= 0) handlers.splice(idx, 1)
      }
    }
  }, [])

  const send = useCallback((event: WSEvent) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(event))
    }
  }, [])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current)
    wsRef.current?.close()
    wsRef.current = null
    isConnectedRef.current = false
  }, [])

  useEffect(() => {
    connect()
    return () => disconnect()
  }, [connect, disconnect])

  return { send, subscribe, isConnected: isConnectedRef.current, disconnect }
}
