import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageSquare } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ConversationCard } from "../../components/chat/ConversationCard";
import type { ConversationItemData } from "../../components/chat/ConversationCard";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ErrorState } from "../../components/ui/feedback/ErrorState";
import { useConversations } from "../../hooks/useMessages";

export default function MessagesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  /*
   * ============================================================================
   * BACKEND INTEGRATION PLACEHOLDER: Active Conversations List
   * Endpoint: GET /api/v1/messages/conversations
   * Handles: Loading, Error (ErrorState with retry), Empty (EmptyState).
   * ============================================================================
   */
  const { conversations: backendConversations, isLoading, isError, refetch } =
    useConversations();

  const staticFallbackConversations: ConversationItemData[] = [
    {
      id: "1",
      name: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      lastMessage: "شكراً، سأكون في موقعك قبل الرحلة بنصف ساعة",
      time: "9:41 ص",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      name: "سارة خليل",
      avatarInitials: "سخ",
      avatarBg: "bg-[#123A68]",
      lastMessage: "تم تسليم الطلب بنجاح، شكراً جزيلاً",
      time: "أمس",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "3",
      name: "محمد أبو ريدة",
      avatarInitials: "مر",
      avatarBg: "bg-emerald-600",
      lastMessage: "سأنطلق الساعة 9:30 صباحاً إن شاء الله",
      time: "20 يوليو",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "4",
      name: "محمود عادل",
      avatarInitials: "مع",
      avatarBg: "bg-purple-600",
      lastMessage: "هل يمكن توصيل طرد إضافي؟",
      time: "18 يوليو",
      unreadCount: 0,
      isOnline: true,
    },
  ];

  // Map Backend DTO if endpoint is available, otherwise use static fallback
  const displayConversations: ConversationItemData[] =
    backendConversations && backendConversations.length > 0
      ? backendConversations.map((c) => ({
          id: c.id,
          name: c.recipientName || "مستخدم",
          avatarInitials: c.recipientName
            ? c.recipientName.slice(0, 2)
            : "مس",
          avatarBg: "bg-[#123A68]",
          lastMessage: c.lastMessage || "بدء محادثة جديدة",
          time: new Date(c.lastMessageAt).toLocaleTimeString("ar-EG", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          unreadCount: c.unreadCount || 0,
          isOnline: c.isOnline || false,
        }))
      : staticFallbackConversations;

  const filteredConversations = displayConversations.filter(
    (c) =>
      c.name.includes(searchQuery) ||
      c.lastMessage.includes(searchQuery)
  );

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <h1 className="text-xl font-black text-[#123A68]">الرسائل</h1>

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
          /* Structured Empty State from Design System */
          <EmptyState
            icon={<MessageSquare className="h-7 w-7 text-[#123A68]" />}
            title="لا توجد محادثات نشطة"
            description="ستظهر محادثاتك مع المسافرين وأصحاب الطلبات هنا عند التواصل معهم بشأن التوصيل."
            actionText="تصفح الطلبات"
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
