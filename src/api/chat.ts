import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  ChatRoom,
  ChatRoomSummary,
  ChatMessage,
  ChatSendMessageRequest,
  ChatMessagesResponseData,
  ChatSyncResponseData,
  ChatReadResponseData,
} from "../types";

export const chatApi = {
  getRooms: async () => {
    const res = await apiClient.get<ApiSuccessResponse<{ rooms: ChatRoomSummary[] }>>(
      ENDPOINTS.CHAT.ROOMS,
    );
    return res.data;
  },

  getRoomById: async (roomId: string) => {
    const res = await apiClient.get<ApiSuccessResponse<{ room: ChatRoom }>>(
      ENDPOINTS.CHAT.ROOM_DETAIL(roomId),
    );
    return res.data;
  },

  getMessages: async (
    roomId: string,
    params?: { limit?: number; before?: string },
  ) => {
    const res = await apiClient.get<ApiSuccessResponse<ChatMessagesResponseData>>(
      ENDPOINTS.CHAT.MESSAGES(roomId),
      { params },
    );
    return res.data;
  },

  sendMessage: async (roomId: string, payload: ChatSendMessageRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ message: ChatMessage }>>(
      ENDPOINTS.CHAT.SEND_MESSAGE(roomId),
      payload,
    );
    return res.data;
  },

  syncMessages: async (roomId: string, params: { since: string; limit?: number }) => {
    const res = await apiClient.get<ApiSuccessResponse<ChatSyncResponseData>>(
      ENDPOINTS.CHAT.SYNC(roomId),
      { params },
    );
    return res.data;
  },

  markAsRead: async (roomId: string) => {
    const res = await apiClient.post<ApiSuccessResponse<ChatReadResponseData>>(
      ENDPOINTS.CHAT.READ(roomId),
      {},
    );
    return res.data;
  },
};
