import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  Paperclip,
  Mic,
  Send,
  Package,
} from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";

export default function ChatPage() {
  const navigate = useNavigate();

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "m-1",
      sender: "OTHER",
      text: "مرحباً! شفت طلبك لتوصيل الدواء من رفح إلى الرمال.",
      time: "10:30 ص",
    },
    {
      id: "m-2",
      sender: "OTHER",
      text: "رحلتي بكرة الصبح الساعة 9:00، بقدر أوصلك إياه.",
      time: "10:31 ص",
    },
    {
      id: "m-3",
      sender: "ME",
      text: "أهلاً أحمد! ممتاز، الدواء جاهز في الصيدلية، كم بدك للتوصيل؟",
      time: "10:33 ص",
    },
    {
      id: "m-4",
      sender: "OTHER",
      text: "بما إنه بطريقي، 5 شيكل بس ثمن المواصلات.",
      time: "10:35 ص",
    },
    {
      id: "m-5",
      sender: "ME",
      text: "تمام، متفقين! رح أبعتلك تفاصيل الصيدلية ورقم الوصفة.",
      time: "10:36 ص",
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        sender: "ME",
        text: messageText.trim(),
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setMessageText("");
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] flex flex-col h-screen max-h-screen text-right">
      {/* Top Chat Header */}
      <div className="flex items-center justify-between bg-white px-4 py-3.5 border-b border-border shadow-2xs">
        <div className="flex items-center gap-2.5">
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
            <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="text-right">
            <h3 className="text-xs font-black text-[#123A68]">أحمد خالد</h3>
            <span className="text-[10px] text-emerald-600 font-bold block">
              متصل الآن
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <a
            href="tel:0591234567"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-primary hover:bg-slate-200 transition-colors"
          >
            <Phone className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Context Errand Summary Banner */}
      <div className="bg-[#FFF5EE] px-4 py-2 border-b border-orange-100 flex items-center justify-between text-xs text-right">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-[#F36F21]" />
          <span className="font-bold text-[#123A68] text-[11px] truncate">
            طلب توصيل: توصيل دواء من صيدلية في رفح
          </span>
        </div>
        <span className="text-[10.5px] text-text-muted font-bold">
          غزة ➔ رفح
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => {
          const isMe = msg.sender === "ME";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isMe ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`max-w-[78%] rounded-3xl p-3.5 text-xs leading-relaxed text-right shadow-2xs ${
                  isMe
                    ? "bg-[#123A68] text-white rounded-tr-xs"
                    : "bg-white text-[#123A68] border border-slate-200 rounded-tl-xs"
                }`}
              >
                <p>{msg.text}</p>
                <span
                  className={`text-[9.5px] mt-1 block font-bold ${
                    isMe ? "text-white/60 text-left" : "text-text-muted text-left"
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <div className="bg-white p-3 border-t border-border shadow-md">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 text-right"
        >
          <button
            type="submit"
            disabled={!messageText.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F36F21] text-white shadow-md hover:bg-[#E05E12] active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="h-4.5 w-4.5 -rotate-45" />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="h-11 flex-1 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right"
          />

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <Mic className="h-5 w-5" />
          </button>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <Paperclip className="h-5 w-5" />
          </button>
        </form>
      </div>
    </MobileContainer>
  );
}
