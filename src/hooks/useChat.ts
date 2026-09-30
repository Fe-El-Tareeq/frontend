import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../api/chat";
import type { ChatSendMessageRequest, ChatRoom, ChatMessage } from "../types";

export const CHAT_KEYS = {
  all: ["chat"] as const,
  rooms: () => [...CHAT_KEYS.all, "rooms"] as const,
  room: (id: string) => [...CHAT_KEYS.all, "room", id] as const,
  messages: (roomId: string, params?: { limit?: number; before?: string }) =>
    params
      ? ([...CHAT_KEYS.all, "messages", roomId, params] as const)
      : ([...CHAT_KEYS.all, "messages", roomId] as const),
};

export function useChatRooms() {
  const roomsQuery = useQuery({
    queryKey: CHAT_KEYS.rooms(),
    queryFn: async () => {
      const res = await chatApi.getRooms();
      return res?.data?.rooms ?? [];
    },
  });

  return {
    rooms: roomsQuery.data ?? [],
    isLoading: roomsQuery.isLoading,
    isError: roomsQuery.isError,
    error: roomsQuery.error,
    refetch: roomsQuery.refetch,
  };
}

export function useChatRoom(roomId: string) {
  const queryClient = useQueryClient();

  const roomQuery = useQuery({
    queryKey: CHAT_KEYS.room(roomId),
    queryFn: async () => {
      const res = await chatApi.getRoomById(roomId);
      return res?.data?.room as ChatRoom | undefined;
    },
    enabled: Boolean(roomId),
  });

  const messagesQuery = useQuery({
    queryKey: CHAT_KEYS.messages(roomId),
    queryFn: async () => {
      const res = await chatApi.getMessages(roomId);
      return {
        messages: (res?.data?.messages ?? []) as ChatMessage[],
        pagination: res?.data?.pagination,
      };
    },
    enabled: Boolean(roomId),
  });

  const sendMessageMutation = useMutation({
    mutationFn: (payload: ChatSendMessageRequest | string) => {
      const req: ChatSendMessageRequest =
        typeof payload === "string"
          ? {
              clientMessageKey: `cmk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
              type: "TEXT",
              text: payload,
            }
          : {
              ...payload,
              clientMessageKey:
                payload.clientMessageKey ||
                `cmk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
            };
      return chatApi.sendMessage(roomId, req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.messages(roomId) });
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.rooms() });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: () => chatApi.markAsRead(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.rooms() });
    },
  });

  return {
    room: roomQuery.data,
    isLoadingRoom: roomQuery.isLoading,
    messages: messagesQuery.data?.messages ?? [],
    pagination: messagesQuery.data?.pagination,
    isLoadingMessages: messagesQuery.isLoading,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
    markAsRead: markReadMutation.mutateAsync,
  };
}

// Named aliases for flexibility across codebase imports
export const useChat = useChatRoom;
export const useChats = useChatRooms;
