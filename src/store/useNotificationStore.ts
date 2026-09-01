import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type NotificationType = "TRIP" | "MESSAGE" | "ERRAND" | "WALLET" | "SYSTEM";

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  timeAgo: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

interface NotificationStoreState {
  notifications: AppNotification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<AppNotification, "id" | "createdAt" | "isRead">) => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

// Initial seed data strictly matching the Figma / Uploaded Design
const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    title: "رحلة جديدة قريبة منك",
    body: "أحمد خالد يسافر من غزة إلى رفح غداً ١٠:٠٠ ص",
    type: "TRIP",
    timeAgo: "منذ ٥ دقائق",
    isRead: false,
    actionUrl: "/trips",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-2",
    title: "رسالة جديدة",
    body: "سارة عمر: شكراً جزيلاً على المساعدة!",
    type: "MESSAGE",
    timeAgo: "منذ ٢٠ دقيقة",
    isRead: false,
    actionUrl: "/messages",
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-3",
    title: "تم قبول طلبك",
    body: "تم تطابق طلبك مع مسافر متجه لنفس الوجهة",
    type: "ERRAND",
    timeAgo: "أمس",
    isRead: true,
    actionUrl: "/errands/incoming-offers",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-4",
    title: "تم شراء التوكنز",
    body: "تم إضافة ٢٠ توكن إلى رصيدك بنجاح",
    type: "WALLET",
    timeAgo: "منذ ٣ أيام",
    isRead: true,
    actionUrl: "/wallet",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useNotificationStore = create<NotificationStoreState>()(
  persist(
    (set) => ({
      notifications: INITIAL_NOTIFICATIONS,

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, isRead: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        })),

      addNotification: (item) =>
        set((state) => ({
          notifications: [
            {
              ...item,
              id: `notif-${Date.now()}`,
              isRead: false,
              createdAt: new Date().toISOString(),
            },
            ...state.notifications,
          ],
        })),

      deleteNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearAll: () =>
        set({
          notifications: [],
        }),
    }),
    {
      name: "bitareeqak-notifications",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
