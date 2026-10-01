import { useState, useEffect, useCallback } from "react";
import {
  useNotificationStore,
  type NotificationType,
} from "../store/useNotificationStore";

export function useNotifications() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");
  const [isSupported, setIsSupported] = useState(false);

  const {
    notifications,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification,
    clearAll,
  } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  // Request browser/phone permission for notifications
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return false;
    }

    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      return res === "granted";
    } catch {
      return false;
    }
  }, []);

  // Send a native phone / browser notification + store in in-app store
  const sendNotification = useCallback(
    async (options: {
      title: string;
      body: string;
      type: NotificationType;
      actionUrl?: string;
      timeAgo?: string;
    }) => {
      // 1. Add to in-app store
      addNotification({
        title: options.title,
        body: options.body,
        type: options.type,
        timeAgo: options.timeAgo || "الآن",
        actionUrl: options.actionUrl,
      });

      // 2. Trigger native device/PWA notification if supported and permitted
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        try {
          // If Service Worker is ready, use showNotification for better mobile PWA support
          if (
            "serviceWorker" in navigator &&
            navigator.serviceWorker.controller
          ) {
            const reg = await navigator.serviceWorker.ready;
            reg.showNotification(options.title, {
              body: options.body,
              icon: "/logo.png",
              badge: "/logo.png",
              dir: "rtl",
              lang: "ar",
              data: {
                url: options.actionUrl || "/notifications",
              },
            });
          } else {
            // Standard Web Notification fallback
            const notif = new Notification(options.title, {
              body: options.body,
              icon: "/logo.png",
              dir: "rtl",
              lang: "ar",
            });

            notif.onclick = () => {
              window.focus();
              if (options.actionUrl) {
                window.location.href = options.actionUrl;
              }
              notif.close();
            };
          }
        } catch (e) {
          console.warn("Could not display native notification:", e);
        }
      }
    },
    [addNotification],
  );

  return {
    notifications,
    unreadCount,
    isSupported,
    permission,
    requestPermission,
    sendNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };
}
