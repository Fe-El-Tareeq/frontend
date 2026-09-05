import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  Paperclip,
  Mic,
  Send,
  Package,
  MessageSquare,
  Square,
  Trash2,
} from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { EmptyState } from "../../components/ui/feedback/EmptyState";
import { ChatMessageBubble, type MessageData } from "../../components/chat/ChatMessageBubble";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";

export default function ChatPage() {
  const { id = "room-1" } = useParams<{ id: string }>();
  const navigate = useNavigate();

  /*
   * ============================================================================
   * BACKEND INTEGRATION: Room Messages & Real-Time Sync
   * Endpoints:
   *   - GET /api/v1/chat-rooms/:roomId/messages?limit=50
   *   - POST /api/v1/chat-rooms/:roomId/messages (Body: { clientMessageKey, type: "TEXT" | "VOICE", text, mediaUrl })
   *   - GET /api/v1/chat-rooms/:roomId/sync?since=...
   * Renders dynamic messages or EmptyState from design system without mock data.
   * ============================================================================
   */
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<MessageData[]>(() => {
    const cached = localStorage.getItem(`btareeqak_chat_msgs_${id}`);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return [];
      }
    }
    return [];
  });

  const {
    isRecording,
    recordingDurationFormatted,
    voiceNote,
    startRecording,
    stopRecording,
    deleteVoiceNote,
  } = useVoiceRecorder(`chat_${id}`);

  // Save chat messages locally for offline browsing on Web & PWA
  useEffect(() => {
    try {
      localStorage.setItem(`btareeqak_chat_msgs_${id}`, JSON.stringify(messages));
    } catch {
      // quota limit
    }
  }, [messages, id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !voiceNote) return;

    const time = new Date().toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (voiceNote) {
      const voiceMsg: MessageData = {
        id: `vn-${Date.now()}`,
        sender: "ME",
        time,
        audioUrl: voiceNote.base64 || voiceNote.audioUrl,
        audioDurationSec: voiceNote.durationSec,
      };
      setMessages((prev) => [...prev, voiceMsg]);
      deleteVoiceNote();
      return;
    }

    if (messageText.trim()) {
      const newMsg: MessageData = {
        id: `msg-${Date.now()}`,
        sender: "ME",
        text: messageText.trim(),
        time,
      };
      setMessages((prev) => [...prev, newMsg]);
      setMessageText("");
    }
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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] text-xs font-black text-white">
              م
            </div>
            <span className="absolute bottom-0 left-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="text-right">
            <h3 className="text-xs font-black text-[#123A68]">
              محادثة التوصيل
            </h3>
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
            غرفة محادثة التوصيل ({id})
          </span>
        </div>
        <span className="text-[10.5px] text-text-muted font-bold">
          محادثة آمنة
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="pt-8">
            <EmptyState
              icon={<MessageSquare className="h-7 w-7 text-[#123A68]" />}
              title="لا توجد رسائل سابقة"
              description="ابدأ المحادثة الآن للتنسيق حول موعد ومكان استلام وتسليم الأغراض."
            />
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))
        )}
      </div>

      {/* Active Recording / Voice Note Draft Bar */}
      {isRecording && (
        <div className="bg-red-50 px-4 py-2.5 border-t border-red-200 flex items-center justify-between text-red-600 text-xs font-bold animate-pulse">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
            <span>جاري تسجيل رسالة صوتية... ({recordingDurationFormatted})</span>
          </div>
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1 text-white font-black hover:bg-red-700 active:scale-95 transition-all cursor-pointer"
          >
            <Square className="h-3 w-3 fill-white" />
            <span>إيقاف</span>
          </button>
        </div>
      )}

      {voiceNote && !isRecording && (
        <div className="bg-orange-50 px-4 py-2 border-t border-orange-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Mic className="h-4 w-4 text-[#F36F21]" />
            <span>رسالة صوتية جاهزة للإرسال ({voiceNote.durationSec} ثانية)</span>
          </div>
          <button
            type="button"
            onClick={deleteVoiceNote}
            className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
            title="حذف"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Input Bar */}
      <div className="bg-white p-3 border-t border-border shadow-md">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 text-right"
        >
          <button
            type="submit"
            disabled={!messageText.trim() && !voiceNote}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F36F21] text-white shadow-md hover:bg-[#E05E12] active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="h-4.5 w-4.5 -rotate-45" />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isRecording}
            placeholder={
              voiceNote
                ? "اضغط إرسال لإرسال الرسالة الصوتية..."
                : "اكتب رسالتك..."
            }
            className="h-11 flex-1 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none text-right disabled:bg-slate-100"
          />

          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors cursor-pointer ${
              isRecording
                ? "bg-red-100 text-red-600 animate-pulse"
                : "text-text-muted hover:text-primary"
            }`}
            title="تسجيل صوتي"
          >
            <Mic className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => alert("سيتم إتاحة إرفاق الملفات والصور في التحديث القادم.")}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-muted hover:text-primary transition-colors cursor-pointer"
          >
            <Paperclip className="h-5 w-5" />
          </button>
        </form>
      </div>
    </MobileContainer>
  );
}
