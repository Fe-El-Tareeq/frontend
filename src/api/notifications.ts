import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  NotificationsListResponseData,
  UnreadCountResponseData,
  NotificationTab,
} from "../types";

export const notificationsApi = {
  getNotifications: async (params?: { tab?: NotificationTab; skip?: number; take?: number }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<NotificationsListResponseData>
    >(ENDPOINTS.NOTIFICATIONS.LIST, { params });
    return res.data;
  },

  getUnreadCount: async () => {
    const res = await apiClient.get<
      ApiSuccessResponse<UnreadCountResponseData>
    >(ENDPOINTS.NOTIFICATIONS.UNREAD_COUNT);
    return res.data;
  },

  markAllAsRead: async () => {
    const res = await apiClient.post<
      ApiSuccessResponse<{ markedRead: number }>
    >(ENDPOINTS.NOTIFICATIONS.READ_ALL, {});
    return res.data;
  },

  markAsRead: async (id: string) => {
    const res = await apiClient.post<
      ApiSuccessResponse<{ success: boolean }>
    >(ENDPOINTS.NOTIFICATIONS.READ_ONE(id), {});
    return res.data;
  },
};
