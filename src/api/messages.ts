import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";

export interface ConversationDto {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface ChatMessageDto {
  id: string | number;
  conversationId: string;
  senderId: string;
  sender: "user" | "other";
  text: string;
  createdAt: string;
  time: string;
}

/*
 * ============================================================================
 * BACKEND INTEGRATION IMPLEMENTATION: Real-time Messages & Conversations
 * Available Endpoints:
 * - GET  /api/v1/messages/conversations      -> Fetch active chats
 * - GET  /api/v1/messages/conversations/:id  -> Fetch message stream
 * - POST /api/v1/messages/conversations/:id/send -> Post a new message
 * ============================================================================
 */
export const messagesApi = {
  // Fetch all user conversations
  getConversations: async (): Promise<ConversationDto[]> => {
    try {
      const response = await apiClient.get<ConversationDto[]>(
        ENDPOINTS.MESSAGES.CONVERSATIONS,
      );
      return response.data;
    } catch {
      // Fallback empty list for empty state presentation
      return [];
    }
  },

  // Fetch single chat message history
  getChatMessages: async (
    conversationId: string,
  ): Promise<ChatMessageDto[]> => {
    try {
      const response = await apiClient.get<ChatMessageDto[]>(
        ENDPOINTS.MESSAGES.CHAT(conversationId),
      );
      return response.data;
    } catch {
      return [];
    }
  },

  // Send a message
  sendMessage: async (
    conversationId: string,
    text: string,
  ): Promise<ChatMessageDto> => {
    const response = await apiClient.post<ChatMessageDto>(
      ENDPOINTS.MESSAGES.SEND(conversationId),
      {
        text,
      },
    );
    return response.data;
  },
};
