import type { PaginationMeta } from "./api";

export type NotificationType =
  | "NEW_TRIP_IN_AREA"
  | "NEW_PROPOSAL"
  | "ASSIGNMENT_ACCEPTED"
  | "ASSIGNMENT_STATUS_CHANGED"
  | "ASSIGNMENT_CANCELLED"
  | "NEW_CHAT_MESSAGE"
  | "PAYMENT_CONFIRMED"
  | string;

export type NotificationTab = "all" | "unread" | "trips" | "errands" | "messages";

export interface AppNotification {
  id: string;
  type: NotificationType;
  channel: string;
  title: string;
  message: string;
  status: "PENDING" | "SENT" | "FAILED" | "READ";
  isRead: boolean;
  readAt?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
}

export interface NotificationsListResponseData {
  notifications: AppNotification[];
  unreadCount: number;
  pagination: PaginationMeta;
}

export interface UnreadCountResponseData {
  unreadCount: number;
}
