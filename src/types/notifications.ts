import type { PaginationMeta } from "./api";

export type NotificationType =
  | "TRIP_ALERT"
  | "ERRAND_ALERT"
  | "CHAT_MESSAGE"
  | "WALLET_TOP_UP"
  | "ASSIGNMENT_UPDATE"
  | "SYSTEM";

export interface AppNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  readAt?: string | null;
  data?: Record<string, unknown> | null;
  createdAt: string;
}

export interface NotificationsListResponseData {
  notifications: AppNotification[];
  pagination: PaginationMeta;
}

export interface UnreadCountResponseData {
  unreadCount: number;
}
