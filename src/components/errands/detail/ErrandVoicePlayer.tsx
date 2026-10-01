import type { FC, MouseEvent } from "react";
import { Play, Pause } from "lucide-react";

interface ErrandVoicePlayerProps {
  hasVoiceNote: boolean;
  isPlaying: boolean;
  activeAudioSec: number;
  totalDuration: number;
  onTogglePlay: () => void;
  onSeek: (e: MouseEvent<HTMLDivElement>) => void;
  formatSeconds: (sec: number) => string;
}

export const ErrandVoicePlayer: FC<ErrandVoicePlayerProps> = ({
  hasVoiceNote,
  isPlaying,
  activeAudioSec,
  totalDuration,
  onTogglePlay,
  onSeek,
  formatSeconds,
}) => {
  if (!hasVoiceNote) return null;

  return (
    <>
      <hr className="border-t border-slate-100 dark:border-white/10 my-2" />
      <div className="space-y-1.5 text-right">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
          رسالة صوتية
        </span>
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#F8FAFC] dark:bg-[#102A4C] p-3 border border-slate-100/80 dark:border-white/10">
          {/* Play / Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs hover:bg-[#E05E12] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            {isPlaying ? (
              <Pause className="h-4.5 w-4.5 fill-current" />
            ) : (
              <Play className="h-4.5 w-4.5 fill-current mr-0.5" />
            )}
          </button>

          {/* Progress Bar */}
          <div
            className="flex-1 h-1.5 bg-slate-200 dark:bg-white/20 rounded-full overflow-hidden cursor-pointer"
            onClick={onSeek}
          >
            <div
              className="h-full bg-[#F36F21] rounded-full transition-all duration-150"
              style={{
                width: `${Math.min(
                  100,
                  (activeAudioSec / (totalDuration || 1)) * 100,
                )}%`,
              }}
            />
          </div>

          {/* Duration */}
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 min-w-10 text-left">
            {formatSeconds(activeAudioSec || totalDuration)}
          </span>
        </div>
      </div>
    </>
  );
};
