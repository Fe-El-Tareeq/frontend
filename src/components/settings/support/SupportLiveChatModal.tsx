import type { FC } from "react";
import { X, Send } from "lucide-react";

interface SupportLiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chatMessages: Array<{ sender: "bot" | "user"; text: string; time: string }>;
  chatInput: string;
  setChatInput: (v: string) => void;
  onSendMessage: (text?: string) => void;
}

export const SupportLiveChatModal: FC<SupportLiveChatModalProps> = ({
  isOpen,
  onClose,
  chatMessages,
  chatInput,
  setChatInput,
  onSendMessage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div
        className="relative max-w-md w-full bg-white dark:bg-[#102A4C] rounded-3xl shadow-xl flex flex-col h-[520px] overflow-hidden animate-in zoom-in-95 duration-200 border border-transparent dark:border-white/10"
        dir="rtl"
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 bg-[#123A68] dark:bg-[#0B1E36] text-white border-b border-transparent dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 text-white">
              <span>💬</span>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#123A68] dark:ring-[#0B1E36]" />
            </div>
            <div>
              <h3 className="text-sm font-black">الدعم الفني المباشر</h3>
              <p className="text-[10px] text-white/70">متصل الآن • رد فوري</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC] dark:bg-[#0B1E36]/50">
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                msg.sender === "user" ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#123A68] dark:bg-[#1E4E8C] text-white rounded-tr-xs"
                    : "bg-white dark:bg-[#102A4C] text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-white/10 shadow-2xs rounded-tl-xs"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[9px] text-text-muted dark:text-slate-400 mt-1 px-1">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2 bg-white dark:bg-[#102A4C] border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto text-[10.5px]">
          <button
            type="button"
            onClick={() => onSendMessage("أريد استرداد توكنز")}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0B1E36] text-[#123A68] dark:text-[#38BDF8] font-bold hover:bg-slate-200 dark:hover:bg-[#132F54] transition-colors cursor-pointer shrink-0 border border-transparent dark:border-white/10"
          >
            استرداد توكنز 💸
          </button>
          <button
            type="button"
            onClick={() => onSendMessage("مشكلة في تتبع شحنة")}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#0B1E36] text-[#123A68] dark:text-[#38BDF8] font-bold hover:bg-slate-200 dark:hover:bg-[#132F54] transition-colors cursor-pointer shrink-0 border border-transparent dark:border-white/10"
          >
            تتبع شحنة 📦
          </button>
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white dark:bg-[#102A4C] border-t border-slate-200 dark:border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSendMessage();
            }}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 h-11 px-3.5 rounded-2xl bg-slate-100 dark:bg-[#0B1E36] text-xs font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-[#0B1E36] focus:ring-2 focus:ring-[#123A68]/20 dark:focus:ring-[#38BDF8]/20 focus:outline-none border border-transparent dark:border-white/10 transition-all"
          />
          <button
            type="button"
            onClick={() => onSendMessage()}
            className="h-11 w-11 flex items-center justify-center rounded-2xl bg-[#F36F21] text-white hover:bg-[#E05E12] active:scale-95 transition-all cursor-pointer shadow-xs shrink-0"
          >
            <Send className="h-4 w-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};
