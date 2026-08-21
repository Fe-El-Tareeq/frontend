import type { FC } from "react";
import { Plus, Send } from "lucide-react";

interface ChatBottomInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}

export const ChatBottomInput: FC<ChatBottomInputProps> = ({
  value,
  onChange,
  onSend,
}) => {
  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-border p-3">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onSend}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white shadow-md active:scale-95 transition-all"
        >
          <Send className="h-4.5 w-4.5 -rotate-45" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="اكتب رسالتك..."
            className="h-11 w-full rounded-full border border-slate-200 bg-[#F8FAFC] pr-10 pl-4 text-xs text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted hover:text-primary"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
