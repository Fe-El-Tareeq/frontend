import { useState, useRef, useEffect, useCallback } from "react";

export interface VoiceNoteData {
  id: string;
  audioUrl: string;
  durationSec: number;
  blob?: Blob;
  base64?: string;
  createdAt: string;
}

export function useVoiceRecorder(storageKey?: string) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [voiceNote, setVoiceNote] = useState<VoiceNoteData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Restore cached voice note from local storage for offline browsing/drafting
  useEffect(() => {
    if (storageKey) {
      const cached = localStorage.getItem(`btareeqak_voice_${storageKey}`);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.base64) {
            setVoiceNote({
              id: parsed.id,
              audioUrl: parsed.base64,
              durationSec: parsed.durationSec,
              base64: parsed.base64,
              createdAt: parsed.createdAt,
            });
          }
        } catch {
          // ignore corrupted cache
        }
      }
    }
  }, [storageKey]);

  // Clean up audio URL on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
    };
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("المتصفح لا يدعم تسجيل الصوت أو الصلاحية مرفوضة.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        const duration = recordingDuration || 1;

        // Convert blob to base64 for offline storage
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          const base64Data = reader.result as string;
          const note: VoiceNoteData = {
            id: `vn-${Date.now()}`,
            audioUrl: url,
            durationSec: duration,
            blob: audioBlob,
            base64: base64Data,
            createdAt: new Date().toISOString(),
          };

          setVoiceNote(note);

          if (storageKey) {
            try {
              localStorage.setItem(
                `btareeqak_voice_${storageKey}`,
                JSON.stringify({
                  id: note.id,
                  base64: base64Data,
                  durationSec: duration,
                  createdAt: note.createdAt,
                })
              );
            } catch {
              // quota exceeded
            }
          }
        };

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = window.setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: unknown) {
      console.error(err);
      setError("يرجى منح صلاحية استخدام الميكروفون للتسجيل.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const deleteVoiceNote = useCallback(() => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    setIsPlaying(false);
    setPlaybackProgress(0);
    setVoiceNote(null);
    if (storageKey) {
      localStorage.removeItem(`btareeqak_voice_${storageKey}`);
    }
  }, [storageKey]);

  const togglePlayback = () => {
    if (!voiceNote?.audioUrl) return;

    if (!audioPlayerRef.current) {
      const audio = new Audio(voiceNote.audioUrl);
      audioPlayerRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          setPlaybackProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setPlaybackProgress(0);
      };
    }

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
    isRecording,
    recordingDuration,
    recordingDurationFormatted: formatTime(recordingDuration),
    voiceNote,
    isPlaying,
    playbackProgress,
    error,
    startRecording,
    stopRecording,
    deleteVoiceNote,
    togglePlayback,
    formatTime,
  };
}
