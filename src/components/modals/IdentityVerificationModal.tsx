import { useState, useRef, type FC, type ChangeEvent } from "react";
import {
  X,
  Shield,
  FileText,
  Camera,
  User,
  Check,
  ArrowLeft,
  FileCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  LiveCameraCaptureModal,
  type CameraCaptureMode,
} from "../camera/LiveCameraCaptureModal";
import { authApi } from "../../api/auth";
import { getApiErrorMessage } from "../../utils/apiError";
import { usePWA } from "../../hooks/usePWA";

interface IdentityVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const IdentityVerificationModal: FC<IdentityVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { isInstalled, isIOS } = usePWA();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [holdingIdImage, setHoldingIdImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Live Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<CameraCaptureMode>("id_front");

  // Gallery / File browsing inputs (no capture attribute)
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const holdingIdInputRef = useRef<HTMLInputElement>(null);

  // Direct native camera inputs for PWA standalone / iOS / mobile hardware triggers
  const frontCameraInputRef = useRef<HTMLInputElement>(null);
  const backCameraInputRef = useRef<HTMLInputElement>(null);
  const holdingIdCameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleOpenLiveCamera = (mode: CameraCaptureMode) => {
    // In standalone PWA or iOS WebKit sandbox, trigger native camera directly to avoid WebRTC sandbox blocks
    const shouldUseNativeCameraDirectly =
      isInstalled ||
      isIOS ||
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia;

    if (shouldUseNativeCameraDirectly) {
      if (mode === "id_front") {
        frontCameraInputRef.current?.click();
      } else if (mode === "id_back") {
        backCameraInputRef.current?.click();
      } else if (mode === "selfie") {
        holdingIdCameraInputRef.current?.click();
      }
      return;
    }

    setCameraMode(mode);
    setIsCameraOpen(true);
  };

  const handleCameraCapture = (file: File) => {
    if (cameraMode === "id_front") {
      setFrontImage(file);
    } else if (cameraMode === "id_back") {
      setBackImage(file);
    } else if (cameraMode === "selfie") {
      setHoldingIdImage(file);
    }
    setIsCameraOpen(false);
  };

  const handleFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFrontImage(e.target.files[0]);
    }
  };

  const handleBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBackImage(e.target.files[0]);
    }
  };

  const handleHoldingIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHoldingIdImage(e.target.files[0]);
    }
  };

  const handleSubmitAll = async () => {
    if (!frontImage || !backImage || !holdingIdImage) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await authApi.submitIdentityVerification({
        idFrontImage: frontImage,
        idBackImage: backImage,
        selfieImage: holdingIdImage,
      });

      setStep(4);
      onSuccess?.();
    } catch (err: unknown) {
      const msg = getApiErrorMessage(
        err,
        "تعذر إرسال مستندات التحقق، يرجى التأكد من وضوح الصور والمحاولة مجدداً.",
      );
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    setStep(1);
    setFrontImage(null);
    setBackImage(null);
    setHoldingIdImage(null);
    setSubmitError(null);
    onClose();
  };

  return (
    <>
      {/* Dedicated Live In-App Camera Modal */}
      <LiveCameraCaptureModal
        isOpen={isCameraOpen}
        mode={cameraMode}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs text-right">
        <div className="w-full max-w-sm rounded-3xl bg-[#F8FAFC] shadow-2xl p-5 border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
          {/* Header (steps 1, 2, 3) */}
          {step !== 4 && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                aria-label="إغلاق"
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h3 className="text-sm font-black text-[#123A68]">
                    التحقق من الهوية
                  </h3>
                  <span className="text-[10px] text-text-muted block">
                    {step === 1 && "الخطوة 1 من 3 — بطاقة الهوية"}
                    {step === 2 && "الخطوة 2 من 3 — صورة شخصية مع الهوية"}
                    {step === 3 && "الخطوة 3 من 3 — مراجعة وتأكيد المستندات"}
                  </span>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-[#123A68] border border-blue-100 shadow-xs">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
            </div>
          )}

          {/* 3-Step Progress Indicator (steps 1-3) */}
          {step !== 4 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10.5px] font-bold text-center">
                <span
                  className={
                    step === 1 ? "text-[#F36F21] font-black" : "text-text-muted"
                  }
                >
                  1. بطاقة الهوية
                </span>
                <span
                  className={
                    step === 2 ? "text-[#F36F21] font-black" : "text-text-muted"
                  }
                >
                  2. سيلفي مع الهوية
                </span>
                <span
                  className={
                    step === 3 ? "text-[#F36F21] font-black" : "text-text-muted"
                  }
                >
                  3. تأكيد وإرسال
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div
                  className={`h-1.5 rounded-full ${
                    step >= 1 ? "bg-[#F36F21]" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full ${
                    step >= 2 ? "bg-[#F36F21]" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-1.5 rounded-full ${
                    step >= 3 ? "bg-[#F36F21]" : "bg-slate-200"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2 text-xs font-bold text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{submitError}</span>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 1: Front and Back ID Upload */}
          {/* ========================================================================= */}
          {step === 1 && (
            <div className="space-y-3.5">
              {/* Info Banner */}
              <div className="flex items-start gap-2.5 rounded-2xl bg-blue-50/70 p-3.5 border border-blue-200/70 text-right">
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-100 text-[#123A68] shrink-0">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="text-[11px] font-bold text-[#123A68] leading-relaxed">
                  ارفع صورة واضحة من بطاقة هويتك الوطنية — الوجهين — في إضاءة جيدة أو التقطها مباشرة بالكاميرا.
                </p>
              </div>

              {/* 1. Front Side */}
              <div className="rounded-2xl bg-white p-4 border border-slate-200/90 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    1
                  </span>
                  <span className="text-xs font-black text-[#123A68]">
                    بطاقة الهوية — الوجه الأمامي *
                  </span>
                </div>

                <input
                  ref={frontInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  className="hidden"
                  onChange={handleFrontChange}
                />
                <input
                  ref={frontCameraInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFrontChange}
                />

                {!frontImage ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenLiveCamera("id_front")}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-dashed border-[#123A68]/30 hover:border-[#123A68] bg-blue-50/40 text-center transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123A68] text-white shadow-xs">
                        <Camera className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-[#123A68]">
                        فتح الكاميرا
                      </span>
                      <span className="text-[9.5px] text-text-muted">
                        التقاط مباشر
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => frontInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-[#F8FAFC] text-center transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        اختيار ملف
                      </span>
                      <span className="text-[9.5px] text-text-muted">
                        PNG أو JPG
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <button
                      type="button"
                      onClick={() => setFrontImage(null)}
                      className="text-[10.5px] text-red-500 hover:underline cursor-pointer"
                    >
                      حذف
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 truncate max-w-[150px]">
                        {frontImage.name}
                      </span>
                      <FileCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Back Side */}
              <div className="rounded-2xl bg-white p-4 border border-slate-200/90 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    2
                  </span>
                  <span className="text-xs font-black text-[#123A68]">
                    بطاقة الهوية — الوجه الخلفي *
                  </span>
                </div>

                <input
                  ref={backInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  className="hidden"
                  onChange={handleBackChange}
                />
                <input
                  ref={backCameraInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleBackChange}
                />

                {!backImage ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenLiveCamera("id_back")}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-dashed border-[#123A68]/30 hover:border-[#123A68] bg-blue-50/40 text-center transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#123A68] text-white shadow-xs">
                        <Camera className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-[#123A68]">
                        فتح الكاميرا
                      </span>
                      <span className="text-[9.5px] text-text-muted">
                        التقاط مباشر
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => backInputRef.current?.click()}
                      className="flex flex-col items-center justify-center p-3.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-[#F8FAFC] text-center transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        اختيار ملف
                      </span>
                      <span className="text-[9.5px] text-text-muted">
                        PNG أو JPG
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    <button
                      type="button"
                      onClick={() => setBackImage(null)}
                      className="text-[10.5px] text-red-500 hover:underline cursor-pointer"
                    >
                      حذف
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 truncate max-w-[150px]">
                        {backImage.name}
                      </span>
                      <FileCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Next Button */}
              <button
                type="button"
                disabled={!frontImage || !backImage}
                onClick={() => setStep(2)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 disabled:opacity-50 transition-all cursor-pointer shadow-md"
              >
                <span>المتابعة لصورة السيلفي مع الهوية</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2: Picture of person while holding the ID */}
          {/* ========================================================================= */}
          {step === 2 && (
            <div className="space-y-3.5">
              {/* Info Banner */}
              <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 p-3.5 border border-amber-200 text-right text-amber-900">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                <div className="space-y-0.5">
                  <span className="text-xs font-black block">
                    صورة شخصية وأنت تحمل بطاقة الهوية
                  </span>
                  <p className="text-[10.5px] leading-relaxed">
                    التقط صورة واضحة لوجهك ممسكاً ببطاقة الهوية بجانب وجهك بحيث
                    تكون ملامحك وبيانات الهوية مقروءة وواضحة تماماً.
                  </p>
                </div>
              </div>

              {/* Upload Box for Selfie with ID */}
              <div className="rounded-2xl bg-white p-4 border border-slate-200/90 shadow-2xs space-y-2.5">
                <input
                  ref={holdingIdInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  className="hidden"
                  onChange={handleHoldingIdChange}
                />
                <input
                  ref={holdingIdCameraInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/*"
                  capture="user"
                  className="hidden"
                  onChange={handleHoldingIdChange}
                />

                {!holdingIdImage ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => handleOpenLiveCamera("selfie")}
                      className="w-full flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-[#123A68]/40 hover:border-[#123A68] bg-blue-50/50 text-center transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-md">
                        <Camera className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-black text-[#123A68]">
                        التقاط سيلفي بالكاميرا الآن
                      </span>
                      <span className="text-[10px] text-text-muted">
                        مع توجيه وإطار مخصص للوجه والهوية
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => holdingIdInputRef.current?.click()}
                      className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                    >
                      أو اختيار صورة من الجهاز
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                    <button
                      type="button"
                      onClick={() => setHoldingIdImage(null)}
                      className="text-[10.5px] text-red-500 hover:underline cursor-pointer"
                    >
                      حذف
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 truncate max-w-[170px]">
                        {holdingIdImage.name}
                      </span>
                      <FileCheck className="h-5 w-5 text-emerald-600" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={!holdingIdImage}
                  onClick={() => setStep(3)}
                  className="flex-1 flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  <span>مراجعة المستندات</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 h-12 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-black text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  رجوع
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3: Confirmation page for all 3 images to be reviewed & submitted */}
          {/* ========================================================================= */}
          {step === 3 && (
            <div className="space-y-3.5 text-right">
              <div className="text-right space-y-0.5">
                <h4 className="text-sm font-black text-[#123A68]">
                  مراجعة المستندات الثلاثة قبل الإرسال
                </h4>
                <p className="text-[11px] text-text-muted">
                  تأكد من إرفاق جميع الصور المطلوبة بشكل واضح وصحيح
                </p>
              </div>

              {/* Summary List of 3 Documents */}
              <div className="space-y-2">
                {/* Doc 1 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black">
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>تم الإرفاق</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#123A68] block">
                        1. بطاقة الهوية — الوجه الأمامي
                      </span>
                      <span className="text-[10px] text-text-muted block truncate max-w-[160px]">
                        {frontImage?.name || "front_id.jpg"}
                      </span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                      <FileCheck className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Doc 2 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black">
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>تم الإرفاق</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#123A68] block">
                        2. بطاقة الهوية — الوجه الخلفي
                      </span>
                      <span className="text-[10px] text-text-muted block truncate max-w-[160px]">
                        {backImage?.name || "back_id.jpg"}
                      </span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                      <FileCheck className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Doc 3 */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black">
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>تم الإرفاق</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#123A68] block">
                        3. صورة سيلفي ممسكاً بالهوية
                      </span>
                      <span className="text-[10px] text-text-muted block truncate max-w-[160px]">
                        {holdingIdImage?.name || "selfie_with_id.jpg"}
                      </span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#123A68]">
                      <FileCheck className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notice Alert */}
              <div className="rounded-2xl bg-blue-50/70 p-3 text-[11px] text-[#123A68] border border-blue-200/70 font-bold leading-relaxed">
                ℹ️ سيقوم فريق إدارة منصة بطريقك بمراجعة المستندات بدقة والتحقق من
                الهوية خلال 24 ساعة.
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitAll}
                  className="flex-1 flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#059669] text-xs font-black text-white hover:bg-emerald-700 active:scale-98 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>
                    {isSubmitting ? "جاري الإرسال..." : "إرسال المستندات للتحقق"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 h-12 flex items-center justify-center rounded-2xl border border-slate-200 bg-white text-xs font-black text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  رجوع
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4: Success Modal / Popup after submission */}
          {/* ========================================================================= */}
          {step === 4 && (
            <div className="space-y-4 py-2 text-center">
              {/* Big Green Success Badge */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 shadow-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981] text-white shadow-lg">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-[#123A68] flex items-center justify-center gap-1.5">
                  <span>تم استلام مستندات التحقق!</span>
                  <Sparkles className="h-5 w-5 text-[#F36F21]" />
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed px-2">
                  يقوم فريق منصة بطريقك بمراجعة المستندات وتدقيقها. سيتم إشعارك فور
                  اعتماد توثيق الحساب خلال 24–48 ساعة.
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-3.5 border border-emerald-200 text-xs font-bold text-emerald-900 text-right space-y-1">
                <span className="block font-black text-emerald-800">
                  ✓ يمكنك متابعة استخدام المنصة
                </span>
                <p className="text-[10.5px] text-emerald-700 leading-relaxed font-normal">
                  يمكنك تصفح الرحلات ونشر طلبات التوصيل، بينما ستتاح ميزة نشر
                  الرحلات كمسافر فور اكتمال التوثيق.
                </p>
              </div>

              {/* Continue using platform button */}
              <button
                type="button"
                onClick={handleFinish}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
              >
                <span>متابعة استخدام المنصة</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
