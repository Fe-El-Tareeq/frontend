import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageSquare } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ConversationCard } from "../../components/chat/ConversationCard";
import type { ConversationItemData } from "../../components/chat/ConversationCard";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useChatRooms } from "../../hooks/useChat";
import { useAuthStore } from "../../store/useAuthStore";
import type { ChatRoomSummary } from "../../types";

export default function MessagesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const currentUserId = useAuthStore((s) => s.user?.id);

  const {
    rooms: backendRooms = [],
    isLoading,
    isError,
    refetch,
  } = useChatRooms();

  const displayConversations: ConversationItemData[] = (
    Array.isArray(backendRooms) ? backendRooms : []
  ).map((room: ChatRoomSummary) => {
    // Identify peer user
    const requester = room.participants?.requester;
    const traveler = room.participants?.traveler;
    const peer =
      currentUserId === requester?.id
        ? traveler
        : requester || room.peer || null;

    const peerName = peer?.fullName || "طرف المحادثة";
    const initials = peerName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2) || "مح";

    let lastMsgText = "بدء محادثة جديدة";
    if (room.latestMessage) {
      if (room.latestMessage.type === "VOICE") {
        lastMsgText = "🎙️ رسالة صوتية";
      } else if (room.latestMessage.type === "IMAGE") {
        lastMsgText = "📷 صورة";
      } else if (room.latestMessage.text) {
        lastMsgText = room.latestMessage.text;
      }
    } else if (room.lastMessage?.text) {
      lastMsgText = room.lastMessage.text;
    }

    const timeStr = room.lastMessageAt || room.latestMessage?.sentAt || room.updatedAt;
    const formattedTime = timeStr
      ? new Date(timeStr).toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "الآن";

    return {
      id: room.id,
      name: peerName,
      avatarInitials: initials,
      avatarBg: "bg-[#123A68]",
      lastMessage: lastMsgText,
      time: formattedTime,
      unreadCount: room.unreadCount || 0,
      isOnline: true,
    };
  });

  const filteredConversations = displayConversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <h1 className="text-xl font-black text-[#123A68]">الرسائل والمحادثات</h1>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث في الرسائل..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white pr-10 pl-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none shadow-2xs text-right"
          />
          <Search className="absolute right-3.5 top-3 h-5 w-5 text-text-muted" />
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-18 w-full animate-pulse rounded-2xl bg-white border border-border"
              />
            ))}
          </div>
        ) : isError ? (
          /* Error State with Retry */
          <ErrorState
            title="تعذر تحميل المحادثات"
            message="حدث خطأ أثناء جلب الرسائل، يرجى المحاولة مرة أخرى."
            onRetry={() => refetch()}
          />
        ) : filteredConversations.length === 0 ? (
          /* Empty State from Design System */
          <EmptyState
            icon={<MessageSquare className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد محادثات نشطة"
            description="ستظهر محادثاتك مع المسافرين وأصحاب الطلبات هنا فور قبول الطلبات وبدء التنسيق والتوصيل."
            actionText="تصفح الطلبات والرحلات"
            onAction={() => navigate("/errands")}
          />
        ) : (
          /* Conversations List */
          <div className="rounded-3xl bg-white border border-border shadow-xs divide-y divide-slate-100 overflow-hidden">
            {filteredConversations.map((convo) => (
              <ConversationCard
                key={convo.id}
                conversation={convo}
                onSelect={(id) => navigate(`/chat/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </MobileContainer>
  );
}
