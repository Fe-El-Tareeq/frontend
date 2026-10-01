import { useState, useEffect, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../api/chat";
import { useAuthStore } from "../store/useAuthStore";
import { CHAT_KEYS } from "./useChat";
import type { ChatMessage } from "../types";

export function useRealtimeChat(roomId: string) {
  const queryClient = useQueryClient();
  const token = useAuthStore((s) => s.accessToken);

  const [isConnected, setIsConnected] = useState(false);
  const lastSyncTimeRef = useRef<string>(new Date().toISOString());
  const socketRef = useRef<WebSocket | null>(null);
  const syncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync new messages via HTTP /sync endpoint
  const performSync = useCallback(async () => {
    if (!roomId || typeof navigator === "undefined" || !navigator.onLine) return;

    try {
      const res = await chatApi.syncMessages(roomId, {
        since: lastSyncTimeRef.current,
      });

      if (res.data?.messages && res.data.messages.length > 0) {
        lastSyncTimeRef.current =
          res.data.sync.serverTime || new Date().toISOString();

        // Invalidate and merge messages into query cache
        queryClient.setQueryData(
          CHAT_KEYS.messages(roomId),
          (old: { messages?: ChatMessage[]; pagination?: unknown } | undefined) => {
            if (!old || !old.messages) {
              return { messages: res.data.messages, pagination: {} };
            }

            const existingIds = new Set(old.messages.map((m) => m.id));
            const newMsgs = res.data.messages.filter((m) => !existingIds.has(m.id));

            return {
              ...old,
              messages: [...old.messages, ...newMsgs],
            };
          },
        );

        queryClient.invalidateQueries({ queryKey: CHAT_KEYS.rooms() });
      }
    } catch {
      // Background sync silent fail
    }
  }, [roomId, queryClient]);

  // Setup WebSocket connection with automatic HTTP fallback
  useEffect(() => {
    if (!roomId) return;

    let isMounted = true;
    lastSyncTimeRef.current = new Date().toISOString();

    const wsUrl = import.meta.env.VITE_WS_BASE_URL;

    if (wsUrl && token) {
      try {
        const fullWsUrl = `${wsUrl.replace(/^http/, "ws")}/chat?token=${token}&roomId=${roomId}`;
        const ws = new WebSocket(fullWsUrl);
        socketRef.current = ws;

        ws.onopen = () => {
          if (isMounted) setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "NEW_MESSAGE" && data.message) {
              queryClient.setQueryData(
                CHAT_KEYS.messages(roomId),
                (old: { messages?: ChatMessage[]; pagination?: unknown } | undefined) => {
                  if (!old || !old.messages) {
                    return { messages: [data.message], pagination: {} };
                  }
                  if (old.messages.some((m) => m.id === data.message.id)) {
                    return old;
                  }
                  return {
                    ...old,
                    messages: [...old.messages, data.message],
                  };
                },
              );
              queryClient.invalidateQueries({ queryKey: CHAT_KEYS.rooms() });
            }
          } catch {
            // Ignore non-json ws messages
          }
        };

        ws.onclose = () => {
          if (isMounted) setIsConnected(false);
        };

        ws.onerror = () => {
          if (isMounted) setIsConnected(false);
        };
      } catch {
        setIsConnected(false);
      }
    }

    // Adaptive short polling sync (every 3 seconds) for real-time live messages
    syncIntervalRef.current = setInterval(() => {
      performSync();
    }, 3000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        performSync();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }

      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [roomId, token, performSync, queryClient]);

  return {
    isConnected,
    triggerSync: performSync,
  };
}
