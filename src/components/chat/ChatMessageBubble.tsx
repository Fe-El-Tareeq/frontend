import type { FC } from "react";
import { CheckCheck } from "lucide-react";

export interface MessageData {
  id: number;
  sender: "user" | "other";
  text: string;
  time: string;
}

interface ChatMessageBubbleProps {
  message: MessageData;
}

export const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div className={`flex flex-col ${isUser ? "items-start" : "items-end"}`}>
      <div
        className={`max-w-[78%] rounded-3xl p-3.5 text-xs leading-relaxed shadow-2xs ${
          isUser
            ? "bg-[#123A68] text-white rounded-br-xs"
            : "bg-white text-primary border border-border/80 rounded-bl-xs"
        }`}
      >
        <p className="text-right">{message.text}</p>
        <div
          className={`mt-1 flex items-center gap-1 text-[10px] ${
            isUser
              ? "text-white/70 justify-start"
              : "text-text-muted justify-end"
          }`}
        >
          <span>{message.time}</span>
          {isUser && <CheckCheck className="h-3.5 w-3.5 text-accent" />}
        </div>
      </div>
    </div>
  );
};
