import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronRight,
  Phone,
  Mic,
  Send,
  Package,
  Square,
  Trash2,
  RefreshCw,
  Clock,
  Wifi,
  Home,
} from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";
import {
  ChatMessageBubble,
  type MessageData,
} from "../../components/chat/ChatMessageBubble";
import { useVoiceRecorder } from "../../hooks/useVoiceRecorder";
import { useChatRoom } from "../../hooks/useChat";
import { useRealtimeChat } from "../../hooks/useRealtimeChat";
import { useAuthStore } from "../../store/useAuthStore";
import { queueOfflineAction } from "../../api/client";
import { ENDPOINTS } from "../../api/endpoints";
import type { ChatMessage } from "../../types";

export default function ChatPage() {
  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const currentUserId = useAuthStore((s) => s.user?.id);

  const {
    room,
    messages: backendMessages = [],
    isLoadingMessages,
    sendMessage,
    isSending,
    markAsRead,
  } = useChatRoom(id);

  // Real-time synchronization hook (WebSockets & Polling)
  const { isConnected } = useRealtimeChat(id);

  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    isRecording,
    recordingDurationFormatted,
    voiceNote,
    startRecording,
    stopRecording,
    deleteVoiceNote,
  } = useVoiceRecorder(`chat_${id}`);

  // Mark room messages as read on mount / when room changes
  useEffect(() => {
    if (id) {
      markAsRead().catch(() => {});
    }
  }, [id, markAsRead]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [backendMessages]);

  // Determine peer user details
  const requester = room?.participants?.requester || null;
  const traveler = room?.participants?.traveler || null;
  const peer =
    currentUserId === requester?.id
      ? traveler
      : requester || room?.peer || null;

  const peerName = peer?.fullName || "طرف المحادثة";
  const initials =
    peerName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2) || "مح";

  const errandTitle =
    room?.assignment?.errand?.title || "تنسيق استلام وتوصيل الطلب";

  // Convert backend ChatMessage items into ChatMessageBubble format
  const displayMessages: MessageData[] = (
    Array.isArray(backendMessages) ? backendMessages : []
  ).map((m: ChatMessage) => {
    const isMe = m.senderId === currentUserId;
    const timeFormatted = m.sentAt
      ? new Date(m.sentAt).toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "الآن";

    return {
      id: m.id,
      sender: isMe ? "ME" : "THEM",
      text: m.text || undefined,
      time: timeFormatted,
      audioUrl: m.voiceNoteUrl || undefined,
      audioDurationSec: m.voiceNoteDurationSec || undefined,
    };
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && !voiceNote) return;

    const clientMessageKey = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    // If voice note attached
    if (voiceNote) {
      const voicePayload = {
        clientMessageKey,
        type: "VOICE" as const,
        voiceNoteUrl: voiceNote.base64 || voiceNote.audioUrl || "",
        voiceNoteDurationSec: voiceNote.durationSec || 5,
      };

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        await queueOfflineAction({
          type: "SEND_CHAT_MESSAGE",
          endpoint: ENDPOINTS.CHAT.SEND_MESSAGE(id),
          method: "POST",
          payload: voicePayload,
          descriptionAr: "إرسال تسجيل صوتي بالمحادثة",
        });
      } else {
        await sendMessage(voicePayload);
      }

      deleteVoiceNote();
      return;
    }

    // If text message
    if (messageText.trim()) {
      const textPayload = {
        clientMessageKey,
        type: "TEXT" as const,
        text: messageText.trim(),
      };

      const textToSend = messageText.trim();
      setMessageText("");

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        await queueOfflineAction({
          type: "SEND_CHAT_MESSAGE",
          endpoint: ENDPOINTS.CHAT.SEND_MESSAGE(id),
          method: "POST",
          payload: textPayload,
          descriptionAr: `إرسال رسالة: ${textToSend.slice(0, 20)}...`,
        });
      } else {
        await sendMessage(textPayload);
      }
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] flex flex-col h-screen max-h-screen text-right">
      <div className="w-full max-w-5xl mx-auto flex flex-col flex-1 h-full overflow-hidden bg-white dark:bg-[#0B1E36] shadow-xs md:border-x md:border-border/60 dark:md:border-white/10">
        {/* Top Chat Header */}
        <header className="flex items-center justify-between border-b border-border dark:border-white/10 bg-white dark:bg-[#102A4C] px-4 md:px-6 py-3 shadow-2xs z-10 shrink-0">
          {/* Peer Info & Back Button on RIGHT */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
              aria-label="الرجوع"
              className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-xs font-black text-white shadow-xs shrink-0">
              {initials}
            </div>

            <div className="text-right">
              <h2 className="text-xs font-black text-primary dark:text-white flex items-center gap-1.5">
                <span>{peerName}</span>
                {isConnected ? (
                  <span title="متصل بالبث المباشر">
                    <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                  </span>
                ) : (
                  <span title="مزامنة تلقائية">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                )}
              </h2>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block font-bold">
                متصل الآن
              </span>
            </div>
          </div>

          {/* Action on LEFT: Phone & Home */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/home")}
              aria-label="الصفحة الرئيسية"
              title="الصفحة الرئيسية"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10 text-[#123A68] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-accent transition-colors cursor-pointer"
            >
              <Home className="h-4 w-4" />
            </button>

            <a
              href={`tel:0590000000`}
              aria-label="الاتصال بطرف المحادثة"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 dark:bg-[#0B1E36] border border-slate-200 dark:border-white/10 text-[#123A68] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Phone className="h-4 w-4" />
            </a>
          </div>
        </header>

        {/* Associated Errand Information Banner */}
        <div className="flex items-center justify-between bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100/70 dark:border-blue-900/30 px-4 py-2 shrink-0 text-right">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#123A68] dark:text-blue-300 shrink-0">
              <Package className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] font-bold text-[#123A68] dark:text-blue-200 line-clamp-1 max-w-55">
              {errandTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {room?.assignment?.id && (
              <button
                type="button"
                onClick={() =>
                  navigate(`/errands/${room?.assignment?.errandId || id}/tracking`)
                }
                className="text-[10.5px] font-black text-accent hover:underline cursor-pointer"
              >
                تتبع الطلب
              </button>
            )}
          </div>
        </div>

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isLoadingMessages ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-accent" />
            <span className="text-xs font-bold">جاري تحميل الرسائل...</span>
          </div>
        ) : displayMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-[#102A4C] flex items-center justify-center text-[#123A68] dark:text-accent shadow-2xs">
              <Package className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-black text-[#123A68] dark:text-white">
                مرحباً بك في المحادثة المباشرة!
              </h3>
              <p className="text-xs text-text-muted dark:text-slate-400 max-w-60 mx-auto leading-relaxed">
                يمكنك الآن التنسيق مع {peerName} بخصوص تفاصيل الاستلام والتوصيل.
              </p>
            </div>
          </div>
        ) : (
          displayMessages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Note Recording Preview Bar */}
      {isRecording && (
        <div className="flex items-center justify-between bg-red-50 dark:bg-red-950/40 border-t border-red-200 dark:border-red-900/40 px-4 py-2.5 shrink-0 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
            <span className="h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
            <span>جاري التسجيل: {recordingDurationFormatted}</span>
          </div>
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1.5 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            <Square className="w-3.5 h-3.5 fill-white" />
            <span>إيقاف</span>
          </button>
        </div>
      )}

      {/* Recorded Voice Note Ready Bar */}
      {voiceNote && !isRecording && (
        <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/40 border-t border-blue-200 dark:border-blue-900/40 px-4 py-2.5 shrink-0">
          <div className="flex items-center gap-2 text-xs font-bold text-[#123A68] dark:text-blue-300">
            <Mic className="w-4 h-4 text-[#F36F21]" />
            <span>تم تسجيل مقطع صوتي ({voiceNote.durationSec} ثانية)</span>
          </div>
          <button
            type="button"
            onClick={deleteVoiceNote}
            className="p-1.5 text-red-500 hover:text-red-700 rounded-lg cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Message Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t border-border dark:border-white/10 bg-white dark:bg-[#102A4C] p-3 shrink-0"
      >
        <button
          type="submit"
          disabled={(!messageText.trim() && !voiceNote) || isSending}
          aria-label="إرسال"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-white shadow-xs hover:bg-[#E05E12] transition-colors cursor-pointer disabled:opacity-40"
        >
          {isSending ? (
            <RefreshCw className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5 ml-0.5" />
          )}
        </button>

        <input
          type="text"
          value={messageText}
          disabled={Boolean(voiceNote) || isRecording}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={
            voiceNote
              ? "اضغط إرسال لنشر التسجيل الصوتي..."
              : isRecording
                ? "جاري تسجيل الصوت..."
                : "اكتب رسالتك هنا..."
          }
          className="h-11 flex-1 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-4 text-xs text-primary dark:text-white placeholder:text-text-muted dark:placeholder:text-slate-500 focus:border-accent focus:outline-none text-right disabled:bg-slate-100 dark:disabled:bg-[#132F54]"
        />

        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          aria-label="تسجيل صوتي"
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors cursor-pointer ${
            isRecording
              ? "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 animate-pulse"
              : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:text-[#123A68] dark:hover:text-white hover:border-slate-300 bg-[#F8FAFC] dark:bg-[#0B1E36]"
          }`}
        >
          <Mic className="h-5 w-5" />
        </button>
      </form>
      </div>
    </MobileContainer>
  );
}
