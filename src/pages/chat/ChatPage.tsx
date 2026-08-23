import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Phone, MoreHorizontal } from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { ChatMessageBubble } from "../../components/chat/ChatMessageBubble";
import type { MessageData } from "../../components/chat/ChatMessageBubble";
import { ChatBottomInput } from "../../components/chat/ChatBottomInput";

export default function ChatPage() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");

  /*
   * ============================================================================
   * BACKEND INTEGRATION PLACEHOLDER: Real-time Messages & Chat Stream
   * Pending Endpoints:
   * - GET  /api/v1/messages/conversations/:id      (Fetch chat history)
   * - POST /api/v1/messages/conversations/:id/send (Post new message)
   * - WS   /ws/chat                                (Real-time live WebSocket)
   *
   * Once backend chat endpoints are live, connect using useChat(id):
   * const { messages: liveMessages, sendMessage, isSending } = useChat(id);
   * ============================================================================
   */
  const [messages, setMessages] = useState<MessageData[]>([
    {
      id: 1,
      sender: "user",
      text: "السلام عليكم، هل لا تزال الرحلة متاحة؟",
      time: "9:30",
    },
    {
      id: 2,
      sender: "other",
      text: "وعليكم السلام، نعم ما زالت متاحة يا أخي",
      time: "9:32",
    },
    {
      id: 3,
      sender: "user",
      text: "ممتاز، أحتاج إرسال دواء لوالدتي في رفح",
      time: "9:33",
    },
    {
      id: 4,
      sender: "other",
      text: "بكل سرور، ما هو حجم الدواء تقريباً؟",
      time: "9:35",
    },
    {
      id: 5,
      sender: "user",
      text: "علبة صغيرة فقط، لا تتجاوز كيلو واحد",
      time: "9:36",
    },
    {
      id: 6,
      sender: "other",
      text: "لا مشكلة إطلاقاً، يمكنني أخذها معي بكل سعادة",
      time: "9:38",
    },
    {
      id: 7,
      sender: "user",
      text: "شكراً جزيلاً، سأكون في موقعك قبل الرحلة بنصف ساعة",
      time: "9:40",
    },
    {
      id: 8,
      sender: "other",
      text: "موافق، سأكون هناك الساعة العاشرة",
      time: "9:41",
    },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "user",
        text: inputText,
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInputText("");
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] flex flex-col justify-between min-h-screen">
      {/* Header: RTL Order (Right: Back Button + Avatar + Name | Left: Actions) */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white px-4 border-b border-border shadow-2xs">
        {/* Right side in RTL: Back chevron + Avatar + User info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F36F21] text-xs font-black text-white">
              أخ
            </div>
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="text-right">
            <h2 className="text-xs font-black text-primary leading-tight">
              أحمد خالد
            </h2>
            <span className="text-[10px] text-emerald-600 font-bold">
              متصل الآن
            </span>
          </div>
        </div>

        {/* Left side in RTL: Phone and More options */}
        <div className="flex items-center gap-2">
          <a
            href="tel:0591234567"
            className="p-1.5 text-text-muted hover:text-primary transition-colors"
          >
            <Phone className="h-5 w-5" />
          </a>
          <button className="p-1.5 text-text-muted hover:text-primary transition-colors cursor-pointer">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Message Stream */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Bottom Input */}
      <ChatBottomInput
        value={inputText}
        onChange={setInputText}
        onSend={handleSend}
      />
    </MobileContainer>
  );
}
