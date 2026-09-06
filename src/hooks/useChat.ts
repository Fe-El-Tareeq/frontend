import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../api/chat";
import type { ChatSendMessageRequest } from "../types";

export const CHAT_KEYS = {
  all: ["chat"] as const,
  rooms: () => [...CHAT_KEYS.all, "rooms"] as const,
  room: (id: string) => [...CHAT_KEYS.all, "room", id] as const,
  messages: (roomId: string, params?: { limit?: number; before?: string }) =>
    [...CHAT_KEYS.all, "messages", roomId, params] as const,
};

export function useChatRooms() {
  const roomsQuery = useQuery({
    queryKey: CHAT_KEYS.rooms(),
    queryFn: () => chatApi.getRooms(),
    select: (res) => res.data.rooms,
  });

  return {
    rooms: roomsQuery.data || [],
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
    queryFn: () => chatApi.getRoomById(roomId),
    enabled: Boolean(roomId),
    select: (res) => res.data.room,
  });

  const messagesQuery = useQuery({
    queryKey: CHAT_KEYS.messages(roomId),
    queryFn: () => chatApi.getMessages(roomId),
    enabled: Boolean(roomId),
    select: (res) => res.data,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (payload: ChatSendMessageRequest) =>
      chatApi.sendMessage(roomId, payload),
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
    messages: messagesQuery.data?.messages || [],
    pagination: messagesQuery.data?.pagination,
    isLoadingMessages: messagesQuery.isLoading,
    sendMessage: sendMessageMutation.mutateAsync,
    isSending: sendMessageMutation.isPending,
    markAsRead: markReadMutation.mutateAsync,
  };
}
