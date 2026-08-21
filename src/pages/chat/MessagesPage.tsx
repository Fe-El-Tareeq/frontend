import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ConversationCard } from "../../components/chat/ConversationCard";
import type { ConversationItemData } from "../../components/chat/ConversationCard";

export default function MessagesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: ConversationItemData[] = [
    {
      id: "conv-1",
      name: "أحمد خالد",
      avatarInitials: "أخ",
      avatarBg: "bg-[#F36F21]",
      lastMessage: "موافق، سأكون هناك الساعة العاشرة",
      time: "الآن",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "conv-2",
      name: "سارة عمر",
      avatarInitials: "سع",
      avatarBg: "bg-[#E11D48]",
      lastMessage: "شكراً جزيلاً على المساعدة",
      time: "منذ 5 د",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "conv-3",
      name: "محمد يوسف",
      avatarInitials: "مي",
      avatarBg: "bg-[#0D9488]",
      lastMessage: "هل يمكنك التأكيد على الموعد؟",
      time: "أمس",
      unreadCount: 1,
      isOnline: true,
    },
    {
      id: "conv-4",
      name: "ليلى حسن",
      avatarInitials: "لح",
      avatarBg: "bg-[#8B5CF6]",
      lastMessage: "وصل الغرض بأمان، شكراً",
      time: "أمس",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "conv-5",
      name: "عمر نبيل",
      avatarInitials: "عن",
      avatarBg: "bg-[#F36F21]",
      lastMessage: "سأكون في الموعد المحدد",
      time: "الأسبوع الماضي",
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const filteredConversations = conversations.filter((c) =>
    c.name.includes(searchQuery) || c.lastMessage.includes(searchQuery)
  );

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-16 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-3">
        {/* Search Bar */}
        <div className="rounded-3xl bg-white p-2.5 border border-border shadow-2xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في المحادثات..."
            className="h-10 w-full rounded-2xl bg-[#F8FAFC] px-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
        </div>

        {/* Conversations List */}
        <div className="rounded-3xl bg-white border border-border shadow-xs divide-y divide-slate-100 overflow-hidden">
          {filteredConversations.map((item) => (
            <ConversationCard
              key={item.id}
              conversation={item}
              onSelect={(id) => navigate(`/chat/${id}`)}
            />
          ))}
        </div>
      </div>
    </MobileContainer>
  );
}
