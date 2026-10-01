import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FC,
  type ChangeEvent,
} from "react";
import {
  X,
  Camera,
  RefreshCw,
  Check,
  RotateCcw,
  AlertTriangle,
  Sparkles,
  Smartphone,
} from "lucide-react";

export type CameraCaptureMode = "id_front" | "id_back" | "selfie";

interface LiveCameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
  mode: CameraCaptureMode;
}

export const LiveCameraCaptureModal: FC<LiveCameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  mode,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    mode === "selfie" ? "user" : "environment",
  );
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sync facing mode when capture mode changes
  useEffect(() => {
    setFacingMode(mode === "selfie" ? "user" : "environment");
  }, [mode]);

  // Stop camera media stream
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Start camera media stream with multi-level fallbacks
  const startCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    stopStream();

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setError(
        "الكاميرا المباشرة غير مدعومة في هذا المتصفح. يمكنك استخدام كاميرا الهاتف أو اختيار صورة من الملفات.",
      );
      setIsLoading(false);
      return;
    }

    try {
      let stream: MediaStream | null = null;

      try {
        // 1. Try with ideal constraints and selected facing mode
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch (firstErr) {
        console.warn("Targeted camera constraints failed, trying basic video:", firstErr);
        // 2. Fallback to general video
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;

      if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        videoRef.current.setAttribute("webkit-playsinline", "true");
        videoRef.current.muted = true;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            ?.play()
            .catch((playErr) => console.warn("Video playback error:", playErr));
          setIsLoading(false);
        };
      }
    } catch (err: any) {
      console.warn("Camera access error:", err);
      if (
        err.name === "NotAllowedError" ||
        err.name === "PermissionDeniedError"
      ) {
        setError(
          "تم رفض إذن الوصول للكاميرا. يرجى تفعيل إذن الكاميرا من إعدادات المتصفح أو التقاط الصورة بكاميرا النظام.",
        );
      } else if (
        err.name === "NotFoundError" ||
        err.name === "DevicesNotFoundError"
      ) {
        setError("لم يتم العثور على كاميرا متصلة بالجهاز.");
      } else {
        setError(
          "تعذر فتح الكاميرا المباشرة حالياً. يمكنك استخدام كاميرا الهاتف كبديل مباشر.",
        );
      }
      setIsLoading(false);
    }
  }, [facingMode, stopStream]);

  // Handle open/close lifecycle
  useEffect(() => {
    if (isOpen) {
      setCapturedPreview(null);
      setCapturedFile(null);
      startCamera();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, startCamera, stopStream]);

  // Flip camera between front and back
  const handleToggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  // Capture snapshot from live video stream onto canvas
  const handleTakeSnapshot = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // If using user front camera, mirror image for natural selfie feel
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const filename =
          mode === "id_front"
            ? "id_front_camera.jpg"
            : mode === "id_back"
              ? "id_back_camera.jpg"
              : "selfie_with_id_camera.jpg";

        const file = new File([blob], filename, { type: "image/jpeg" });
        const previewUrl = URL.createObjectURL(blob);

        setCapturedFile(file);
        setCapturedPreview(previewUrl);
        stopStream();
      },
      "image/jpeg",
      0.92,
    );
  };

  // Handle photo taken via native device camera input
  const handleNativeCameraCapture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setCapturedFile(file);
      setCapturedPreview(previewUrl);
      setError(null);
      stopStream();
    }
  };

  // Retake photo
  const handleRetake = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }
    setCapturedPreview(null);
    setCapturedFile(null);
    startCamera();
  };

  // Confirm photo
  const handleConfirm = () => {
    if (capturedFile) {
      onCapture(capturedFile);
      handleClose();
    }
  };

  const handleClose = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }
    stopStream();
    onClose();
  };

  if (!isOpen) return null;

  const modeTitle =
    mode === "id_front"
      ? "التقاط بطاقة الهوية — الوجه الأمامي"
      : mode === "id_back"
        ? "التقاط بطاقة الهوية — الوجه الخلفي"
        : "التقاط صورة سيلفي مع بطاقة الهوية";

  const modeGuide =
    mode === "id_front" || mode === "id_back"
      ? "وجّه الكاميرا وضع بطاقة الهوية كاملة داخل الإطار المستطيل بإضاءة واضحة"
      : "ضع وجهك وبطاقة الهوية داخل الإطار بجانب بعضهما بوضوح";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-md text-right animate-in fade-in duration-200"
    >
      {/* Hidden Native Camera Input Fallback */}
      <input
        ref={nativeInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture={facingMode === "user" ? "user" : "environment"}
        className="hidden"
        onChange={handleNativeCameraCapture}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between p-4 bg-slate-900/90 border-b border-slate-800 z-10 text-white">
          <button
            type="button"
            onClick={handleClose}
            aria-label="إغلاق الكاميرا"
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="text-right">
            <h3 className="text-sm sm:text-base font-black text-white">
              {modeTitle}
            </h3>
            <span className="text-[11px] text-slate-400 block">{modeGuide}</span>
          </div>
        </div>

        {/* Viewfinder / Preview Section */}
        <div className="relative flex-1 min-h-90 sm:min-h-105 bg-black flex items-center justify-center overflow-hidden">
          {error ? (
            <div className="p-6 text-center text-white space-y-4 max-w-sm">
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {error}
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => nativeInputRef.current?.click()}
                  className="px-4 py-2.5 bg-accent hover:bg-accent/90 text-white text-xs font-bold rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>فتح كاميرا الهاتف الآن</span>
                </button>

                <button
                  type="button"
                  onClick={startCamera}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>إعادة المحاولة</span>
                </button>
              </div>
            </div>
          ) : capturedPreview ? (
            /* Review captured photo */
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <img
                src={capturedPreview}
                alt="Captured Snapshot"
                className="max-h-[60vh] w-auto object-contain rounded-xl shadow-lg"
              />
              <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-2xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Check className="w-3 h-3" />
                <span>تم الالتقاط بنجاح</span>
              </div>
            </div>
          ) : (
            /* Live Camera Stream with Framing Guides */
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover max-h-[65vh] ${facingMode === "user" ? "-scale-x-100" : ""
                  }`}
              />

              {isLoading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-accent" />
                  <span>جاري تهيئة الكاميرا...</span>
                </div>
              )}

              {/* ID Card Rectangle Framing Overlay */}
              {(mode === "id_front" || mode === "id_back") && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                  <div className="w-full max-w-85 aspect-[1.58/1] rounded-2xl border-2 border-dashed border-accent/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] relative flex items-center justify-center">
                    {/* Corner Accent Brackets */}
                    <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-accent rounded-tl-lg" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-accent rounded-tr-lg" />
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-accent rounded-bl-lg" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-accent rounded-br-lg" />

                    <div className="bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full text-2xs font-bold text-white shadow-sm flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-accent" />
                      <span>ضع البطاقة هنا</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Selfie + ID Guide Overlay */}
              {mode === "selfie" && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                  <div className="w-full max-w-[320px] aspect-[1/1.2] rounded-[48px] border-2 border-dashed border-accent/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)] relative flex items-center justify-center">
                    <div className="bg-black/50 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-2xs font-bold text-white shadow-sm flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-accent" />
                      <span>الوجه + بطاقة الهوية</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-white">
          {capturedPreview ? (
            /* Action Buttons after snapshot */
            <div className="flex items-center gap-3 w-full">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-xs sm:text-sm rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-3" />
                <span>استخدام هذه الصورة</span>
              </button>

              <button
                type="button"
                onClick={handleRetake}
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 active:scale-98 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة الالتقاط</span>
              </button>
            </div>
          ) : (
            /* Live Camera Trigger Controls */
            <div className="flex items-center justify-between w-full px-2">
              <button
                type="button"
                onClick={handleToggleFacingMode}
                title="تبديل الكاميرا (الأمامية / الخلفية)"
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              {/* Shutter Capture Button */}
              <button
                type="button"
                disabled={isLoading || !!error}
                onClick={handleTakeSnapshot}
                aria-label="التقاط الصورة"
                className="w-16 h-16 rounded-full border-4 border-white bg-accent hover:bg-accent/90 active:scale-90 transition-all flex items-center justify-center shadow-2xl disabled:opacity-50 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => nativeInputRef.current?.click()}
                  title="التقاط بكاميرا النظام"
                  className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer border border-slate-700"
                >
                  <Smartphone className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3.5 py-2 text-xs font-bold text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
