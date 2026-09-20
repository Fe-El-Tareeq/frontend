import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";
import { notificationsApi } from "../api/notifications";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import { filterNotifications } from "../hooks/useNotifications";
import { server } from "./msw/server";
import type { AppNotification } from "../types";

const notifications: AppNotification[] = [
  { id: "1", type: "NEW_TRIP_IN_AREA", channel: "IN_APP", title: "Trip", message: "Trip body", status: "PENDING", isRead: false, createdAt: "2026-01-01T00:00:00Z" },
  { id: "2", type: "NEW_PROPOSAL", channel: "IN_APP", title: "Proposal", message: "Proposal body", status: "READ", isRead: true, createdAt: "2026-01-01T00:00:00Z" },
  { id: "3", type: "NEW_CHAT_MESSAGE", channel: "IN_APP", title: "Chat", message: "Chat body", status: "SENT", isRead: false, createdAt: "2026-01-01T00:00:00Z" },
];

describe("BE-NOTIF-01 frontend integration", () => {
  it("sends the selected backend tab and consumes global unreadCount", async () => {
    server.use(
      http.get(`${API_BASE_URL}${ENDPOINTS.NOTIFICATIONS.LIST}`, ({ request }) => {
        expect(new URL(request.url).searchParams.get("tab")).toBe("messages");
        return HttpResponse.json({
          success: true,
          message: "ok",
          data: { notifications: [notifications[2]], unreadCount: 2, pagination: { skip: 0, take: 50, total: 1 } },
        });
      }),
    );
    const response = await notificationsApi.getNotifications({ tab: "messages", take: 50 });
    expect(response.data.notifications).toEqual([notifications[2]]);
    expect(response.data.unreadCount).toBe(2);
  });

  it("filters a cached all-tab response locally while offline", () => {
    expect(filterNotifications(notifications, "unread").map((item) => item.id)).toEqual(["1", "3"]);
    expect(filterNotifications(notifications, "trips").map((item) => item.id)).toEqual(["1"]);
    expect(filterNotifications(notifications, "errands").map((item) => item.id)).toEqual(["2"]);
    expect(filterNotifications(notifications, "messages").map((item) => item.id)).toEqual(["3"]);
  });
});
