import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import { useNotificationStore } from "../store/useNotificationStore";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderWithProviders(ui: React.ReactNode) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("Notifications Domain & Card Design System", () => {
  it("should display the exact Figma notification cards", () => {
    renderWithProviders(<NotificationsPage />);

    expect(screen.getByText("بطاقات الإشعارات")).toBeInTheDocument();
    expect(screen.getByText("رحلة جديدة قريبة منك")).toBeInTheDocument();
    expect(screen.getByText("رسالة جديدة")).toBeInTheDocument();
    expect(screen.getByText("تم قبول طلبك")).toBeInTheDocument();
    expect(screen.getByText("تم شراء التوكنز")).toBeInTheDocument();
  });

  it("should filter notifications by unread tab", () => {
    renderWithProviders(<NotificationsPage />);

    const unreadTab = screen.getByText(/غير مقروءة/i);
    fireEvent.click(unreadTab);

    expect(screen.getByText("رحلة جديدة قريبة منك")).toBeInTheDocument();
    expect(screen.getByText("رسالة جديدة")).toBeInTheDocument();
    expect(screen.queryByText("تم قبول طلبك")).not.toBeInTheDocument();
  });

  it("should mark all notifications as read when clicking mark all button", () => {
    renderWithProviders(<NotificationsPage />);

    const markAllBtn = screen.getByText("تحديد الكل كمقروء");
    fireEvent.click(markAllBtn);

    const unreadNotifications = useNotificationStore
      .getState()
      .notifications.filter((n) => !n.isRead);

    expect(unreadNotifications.length).toBe(0);
  });
});
