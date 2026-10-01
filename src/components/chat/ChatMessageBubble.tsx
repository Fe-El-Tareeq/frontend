import { useState, useRef } from "react";
import type { FC } from "react";
import { CheckCheck, Play, Pause, Volume2 } from "lucide-react";

export interface MessageData {
  id: string | number;
  sender: "user" | "other" | "ME" | "THEM";
  text?: string;
  time: string;
  audioUrl?: string;
  audioDurationSec?: number;
}

interface ChatMessageBubbleProps {
  message: MessageData;
}

export const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user" || message.sender === "ME";
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayAudio = () => {
    if (!message.audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(message.audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className={`flex flex-col ${isUser ? "items-start" : "items-end"}`}>
      <div
        className={`max-w-[80%] rounded-3xl p-3.5 text-xs leading-relaxed shadow-2xs ${
          isUser
            ? "bg-[#123A68] text-white rounded-br-xs"
            : "bg-white text-primary border border-border/80 rounded-bl-xs"
        }`}
      >
        {message.text && <p className="text-right">{message.text}</p>}

        {message.audioUrl && (
          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={togglePlayAudio}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all cursor-pointer ${
                isUser
                  ? "bg-[#F36F21] text-white hover:bg-[#E05E12]"
                  : "bg-[#123A68] text-white hover:bg-[#0D2C50]"
              }`}
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 fill-white" />
              ) : (
                <Play className="h-3.5 w-3.5 fill-white ml-0.5" />
              )}
            </button>
            <div className="flex-1 text-right">
              <div className="flex items-center gap-1">
                <Volume2 className="h-3.5 w-3.5 opacity-80" />
                <span className="text-[11px] font-bold">رسالة صوتية</span>
              </div>
              <span className="text-[9.5px] opacity-70">
                {message.audioDurationSec
                  ? `${Math.floor(message.audioDurationSec / 60)}:${
                      message.audioDurationSec % 60 < 10 ? "0" : ""
                    }${message.audioDurationSec % 60}`
                  : "تشغيل"}
              </span>
            </div>
          </div>
        )}

        <div
          className={`mt-1.5 flex items-center gap-1 text-[10px] ${
            isUser ? "text-white/70 justify-start" : "text-text-muted justify-end"
          }`}
        >
          <span>{message.time}</span>
          {isUser && <CheckCheck className="h-3.5 w-3.5 text-accent" />}
        </div>
      </div>
    </div>
  );
};
