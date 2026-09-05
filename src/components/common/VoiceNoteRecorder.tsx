import type { FC } from "react";
import { Mic, Square, Play, Pause, Trash2, Volume2, AlertCircle } from "lucide-react";
import { useVoiceRecorder, type VoiceNoteData } from "../../hooks/useVoiceRecorder";

export interface VoiceNoteRecorderProps {
  storageKey?: string;
  onVoiceNoteReady?: (note: VoiceNoteData | null) => void;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const VoiceNoteRecorder: FC<VoiceNoteRecorderProps> = ({
  storageKey = "default",
  onVoiceNoteReady,
  title = "تسجيل رسالة صوتية (اختياري)",
  subtitle = "اشرح تفاصيل طلبك بصوتك لمزيد من الوضوح",
  className = "",
}) => {
  const {
    isRecording,
    recordingDurationFormatted,
    voiceNote,
    isPlaying,
    playbackProgress,
    error,
    startRecording,
    stopRecording,
    deleteVoiceNote,
    togglePlayback,
    formatTime,
  } = useVoiceRecorder(storageKey);

  const handleDelete = () => {
    deleteVoiceNote();
    onVoiceNoteReady?.(null);
  };

  const handleStop = () => {
    stopRecording();
    // note ready will be updated via state
  };

  return (
    <div className={`rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-200 space-y-2.5 text-right ${className}`}>
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#F36F21]">
            <Volume2 className="h-4 w-4" />
          </div>
          <div className="text-right">
            <h4 className="text-xs font-black text-primary">{title}</h4>
            <p className="text-[10.5px] text-text-muted">{subtitle}</p>
          </div>
        </div>

        {voiceNote && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-black text-emerald-700 border border-emerald-200">
            تم التسجيل ✓
          </span>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 rounded-xl bg-red-50 p-2 text-[11px] font-bold text-red-600 border border-red-100">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Case 1: Currently Recording */}
      {isRecording ? (
        <div className="flex items-center justify-between rounded-xl bg-red-50 p-3 border border-red-200 animate-pulse">
          <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
            <span>جاري التسجيل... ({recordingDurationFormatted})</span>
          </div>

          <button
            type="button"
            onClick={handleStop}
            className="flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-black text-white hover:bg-red-700 active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            <Square className="h-3.5 w-3.5 fill-white" />
            <span>إيقاف</span>
          </button>
        </div>
      ) : voiceNote ? (
        /* Case 2: Voice Note Recorded & Available to Play / Delete */
        <div className="rounded-xl bg-white p-3 border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlayback}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123A68] text-white hover:bg-[#0D2C50] active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-white" />
                ) : (
                  <Play className="h-4 w-4 fill-white ml-0.5" />
                )}
              </button>

              <div className="text-right">
                <span className="text-xs font-black text-[#123A68] block">
                  ملاحظة صوتية مسجلة
                </span>
                <span className="text-[10px] text-text-muted">
                  المدة: {formatTime(voiceNote.durationSec)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              title="حذف التسجيل"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F36F21] rounded-full transition-all duration-200"
              style={{ width: `${playbackProgress}%` }}
            />
          </div>
        </div>
      ) : (
        /* Case 3: Initial State - Click to Record */
        <button
          type="button"
          onClick={startRecording}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-white text-xs font-bold text-primary hover:border-[#F36F21] hover:text-[#F36F21] active:scale-98 transition-all cursor-pointer shadow-2xs"
        >
          <Mic className="h-4 w-4 text-[#F36F21]" />
          <span>اضغط لتسجيل رسالة صوتية</span>
        </button>
      )}
    </div>
  );
};
