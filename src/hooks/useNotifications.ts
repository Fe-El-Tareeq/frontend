import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notifications";
import { useOfflineStatus } from "../offline/offlineContext";
import { useAuthStore } from "../store/useAuthStore";
import type { AppNotification, NotificationTab } from "../types";

export const NOTIFICATION_KEYS = {
  all: ["notifications"] as const,
  list: (tab: NotificationTab) => ["notifications", "list", tab] as const,
};

const ERRAND_TYPES = new Set([
  "NEW_PROPOSAL",
  "ASSIGNMENT_ACCEPTED",
  "ASSIGNMENT_STATUS_CHANGED",
  "ASSIGNMENT_CANCELLED",
]);

export function filterNotifications(items: AppNotification[], tab: NotificationTab) {
  if (tab === "unread") return items.filter((item) => !item.isRead);
  if (tab === "trips") return items.filter((item) => item.type === "NEW_TRIP_IN_AREA");
  if (tab === "errands") return items.filter((item) => ERRAND_TYPES.has(item.type));
  if (tab === "messages") return items.filter((item) => item.type === "NEW_CHAT_MESSAGE");
  return items;
}

export function useNotifications(tab: NotificationTab = "all") {
  const queryClient = useQueryClient();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { isOffline, lastSyncedAt } = useOfflineStatus();
  const allQuery = useQuery({
    queryKey: NOTIFICATION_KEYS.list("all"),
    queryFn: () => notificationsApi.getNotifications({ tab: "all", take: 50 }),
    enabled: isAuthenticated && !isOffline,
    select: (response) => response.data,
  });
  const tabQuery = useQuery({
    queryKey: NOTIFICATION_KEYS.list(tab),
    queryFn: () => notificationsApi.getNotifications({ tab, take: 50 }),
    enabled: isAuthenticated && !isOffline && tab !== "all",
    select: (response) => response.data,
  });

  const source = isOffline || tab === "all" ? allQuery.data : tabQuery.data;
  const notifications = isOffline
    ? filterNotifications(allQuery.data?.notifications ?? [], tab)
    : source?.notifications ?? [];
  const invalidate = () => queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
  const markRead = useMutation({ mutationFn: notificationsApi.markAsRead, onSuccess: invalidate });
  const markAllRead = useMutation({ mutationFn: notificationsApi.markAllAsRead, onSuccess: invalidate });

  return {
    notifications,
    unreadCount: source?.unreadCount ?? allQuery.data?.unreadCount ?? 0,
    isLoading: allQuery.isLoading || (tab !== "all" && tabQuery.isLoading),
    isError: allQuery.isError || tabQuery.isError,
    isOffline,
    lastSyncedAt,
    markAsRead: (id: string) => markRead.mutateAsync(id),
    markAllAsRead: () => markAllRead.mutateAsync(),
  };
}
