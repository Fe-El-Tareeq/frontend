import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MessagesPage from "../pages/chat/MessagesPage";
import ChatPage from "../pages/chat/ChatPage";
import { chatApi } from "../api/chat";

vi.mock("../api/chat", () => ({
  chatApi: {
    getRooms: vi.fn(),
    getRoomById: vi.fn(),
    getMessages: vi.fn(),
    sendMessage: vi.fn(),
    syncMessages: vi.fn(),
    markAsRead: vi.fn(),
  },
}));

describe("Chat & Real-Time Messaging System", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    vi.restoreAllMocks();
  });

  it("should render MessagesPage without crashing and display empty state when no conversations exist", async () => {
    vi.mocked(chatApi.getRooms).mockResolvedValueOnce({
      success: true,
      message: "Chat rooms retrieved",
      data: { rooms: [] },
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MessagesPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("الرسائل والمحادثات")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("لا توجد محادثات نشطة")).toBeInTheDocument();
    });
  });

  it("should render active conversations list when rooms exist", async () => {
    vi.mocked(chatApi.getRooms).mockResolvedValueOnce({
      success: true,
      message: "Chat rooms retrieved",
      data: {
        rooms: [
          {
            id: "room-101",
            assignmentId: "asg-1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            participants: {
              requester: { id: "u1", fullName: "أحمد النجار", trustScore: 4.9 },
              traveler: { id: "u2", fullName: "محمود خليل", trustScore: 5 },
            },
            latestMessage: {
              id: "m1",
              type: "TEXT",
              text: "أنا في الطريق للاستلام",
              sentAt: new Date().toISOString(),
            },
            unreadCount: 2,
          },
        ],
      },
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MessagesPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("أنا في الطريق للاستلام")).toBeInTheDocument();
    });
  });

  it("should render ChatPage, load messages, and allow sending messages", async () => {
    vi.mocked(chatApi.getRoomById).mockResolvedValue({
      success: true,
      message: "Room retrieved",
      data: {
        room: {
          id: "room-101",
          assignmentId: "asg-1",
          assignment: {
            id: "asg-1",
            errand: { id: "e-1", title: "توصيل طرد أدوية" },
          },
          participants: {
            requester: { id: "u1", fullName: "أحمد النجار" },
            traveler: { id: "u2", fullName: "محمود خليل" },
          },
        },
      },
    } as any);

    vi.mocked(chatApi.getMessages).mockResolvedValue({
      success: true,
      message: "Messages retrieved",
      data: {
        messages: [
          {
            id: "m-1",
            roomId: "room-101",
            senderId: "u2",
            type: "TEXT",
            text: "مرحباً، تم استلام الطلب بنجاح",
            sentAt: new Date().toISOString(),
            isRead: true,
          },
        ],
        pagination: { order: "desc", limit: 50, hasMore: false },
      },
    } as any);

    vi.mocked(chatApi.markAsRead).mockResolvedValueOnce({
      success: true,
      message: "Marked read",
      data: { read: { count: 1, readAt: new Date().toISOString() } },
    } as any);

    vi.mocked(chatApi.sendMessage).mockResolvedValueOnce({
      success: true,
      message: "Message sent",
      data: {
        message: {
          id: "m-2",
          roomId: "room-101",
          senderId: "u1",
          type: "TEXT",
          text: "شكراً جزيلاً لك!",
          sentAt: new Date().toISOString(),
          isRead: false,
        },
      },
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/chat/room-101"]}>
          <Routes>
            <Route path="/chat/:id" element={<ChatPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("مرحباً، تم استلام الطلب بنجاح"),
      ).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("اكتب رسالتك هنا...");
    fireEvent.change(input, { target: { value: "شكراً جزيلاً لك!" } });

    const submitBtn = screen.getByLabelText("إرسال");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(chatApi.sendMessage).toHaveBeenCalledWith(
        "room-101",
        expect.objectContaining({
          type: "TEXT",
          text: "شكراً جزيلاً لك!",
        }),
      );
    });
  });
});
