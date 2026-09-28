import { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
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
  Clock,
  Trash2,
  Loader2,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { Header } from "../../components/layout/Header";
import {
  LiveCameraCaptureModal,
  type CameraCaptureMode,
} from "../../components/camera/LiveCameraCaptureModal";
import { authApi } from "../../api/auth";
import { getApiErrorMessage } from "../../utils/apiError";
import { usePWA } from "../../hooks/usePWA";

export function IdentityVerificationPage() {
  const navigate = useNavigate();
  const { isInstalled, isIOS } = usePWA();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [holdingIdImage, setHoldingIdImage] = useState<File | null>(null);

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [holdingIdPreview, setHoldingIdPreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Live Camera state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState<CameraCaptureMode>("id_front");

  // Gallery file browsing inputs (no capture attribute)
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const holdingIdInputRef = useRef<HTMLInputElement>(null);

  // Direct native camera inputs for PWA / iOS hardware triggers
  const frontCameraInputRef = useRef<HTMLInputElement>(null);
  const backCameraInputRef = useRef<HTMLInputElement>(null);
  const holdingIdCameraInputRef = useRef<HTMLInputElement>(null);

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
    const url = URL.createObjectURL(file);
    if (cameraMode === "id_front") {
      setFrontImage(file);
      setFrontPreview(url);
    } else if (cameraMode === "id_back") {
      setBackImage(file);
      setBackPreview(url);
    } else if (cameraMode === "selfie") {
      setHoldingIdImage(file);
      setHoldingIdPreview(url);
    }
    setIsCameraOpen(false);
  };

  const handleFrontChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFrontImage(file);
      setFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleBackChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBackImage(file);
      setBackPreview(URL.createObjectURL(file));
    }
  };

  const handleHoldingIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHoldingIdImage(file);
      setHoldingIdPreview(URL.createObjectURL(file));
    }
  };

  const removeFrontImage = () => {
    if (frontPreview) URL.revokeObjectURL(frontPreview);
    setFrontImage(null);
    setFrontPreview(null);
  };

  const removeBackImage = () => {
    if (backPreview) URL.revokeObjectURL(backPreview);
    setBackImage(null);
    setBackPreview(null);
  };

  const removeHoldingIdImage = () => {
    if (holdingIdPreview) URL.revokeObjectURL(holdingIdPreview);
    setHoldingIdImage(null);
    setHoldingIdPreview(null);
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

  return (
    <MobileContainer>
      <Header />

      {/* Dedicated Live In-App Camera Modal */}
      <LiveCameraCaptureModal
        isOpen={isCameraOpen}
        mode={cameraMode}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <div className="p-4 space-y-4 text-right">
        {/* ========================================================================= */}
        {/* STEP 4: Success / Under Review State matching Confirmation Modal (4).png */}
        {/* ========================================================================= */}
        {step === 4 ? (
          <div className="py-8 px-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Green Checkmark Badge */}
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Check className="w-7 h-7 stroke-3" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-xl font-black text-[#123A68]">
                تم إرسال طلبك للمراجعة
              </h2>
              <p className="text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
                استلمنا مستنداتك بنجاح، وسيقوم فريقنا بمراجعتها والتحقق من هويتك
                خلال 24 ساعة كحد أقصى
              </p>
            </div>

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>قيد المراجعة</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/home")}
                className="w-full py-3.5 rounded-2xl bg-[#F36F21] hover:bg-[#E05E12] active:scale-98 text-white font-black text-sm shadow-md transition-all cursor-pointer"
              >
                الرجوع للرئيسية
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-text-muted">
                <Clock className="w-3.5 h-3.5" />
                <span>سنرسل إشعاراً فور انتهاء المراجعة</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* ========================================================================= */}
            {/* Page Header (Title + Steps) matching التحقق من الهوية (1).png */}
            {/* ========================================================================= */}
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 shadow-2xs">
              <button
                type="button"
                onClick={() => navigate("/profile")}
                aria-label="رجوع"
                className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <h1 className="text-base font-black text-[#123A68]">
                    التحقق من الهوية
                  </h1>
                  <span className="text-xs text-text-muted font-bold block">
                    الخطوة {step} من 3
                  </span>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#123A68] border border-blue-100 shadow-2xs">
                  <Shield className="h-5 w-5" />
                </div>
              </div>
            </div>

            {/* 3 Step Tabs matching Design */}
            <div className="flex items-center justify-between border-b border-slate-200 px-2 text-xs font-bold">
              <div
                className={`flex-1 py-2 text-center transition-all ${
                  step === 1
                    ? "text-[#F36F21] font-black border-b-2 border-[#F36F21]"
                    : "text-text-muted"
                }`}
              >
                تحميل المستندات
              </div>
              <div
                className={`flex-1 py-2 text-center transition-all ${
                  step === 2
                    ? "text-[#F36F21] font-black border-b-2 border-[#F36F21]"
                    : "text-text-muted"
                }`}
              >
                التحقق من الوجه
              </div>
              <div
                className={`flex-1 py-2 text-center transition-all ${
                  step === 3
                    ? "text-[#F36F21] font-black border-b-2 border-[#F36F21]"
                    : "text-text-muted"
                }`}
              >
                المراجعة
              </div>
            </div>

            {/* Error Banner */}
            {submitError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{submitError}</span>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 1: Front and Back ID Upload */}
            {/* ========================================================================= */}
            {step === 1 && (
              <div className="space-y-4">
                {/* Blue Info Banner matching Figma */}
                <div className="flex items-start gap-2.5 rounded-2xl bg-blue-50/70 p-4 border border-blue-200/70 text-right">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-100 text-[#123A68] shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-bold text-[#123A68] leading-relaxed">
                    ارفع صورة واضحة من بطاقة هويتك الوطنية — الوجهين — في إضاءة
                    جيدة
                  </p>
                </div>

                {/* 1. Front Side Card */}
                <div className="rounded-3xl bg-white p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#123A68]">
                      1
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-[#123A68]">
                      بطاقة الهوية — الوجه الأمامي
                    </h3>
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
                    <div className="space-y-2.5">
                      {/* Large Dashed Dropzone matching Design */}
                      <button
                        type="button"
                        onClick={() => frontInputRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#123A68]/40 bg-slate-50/50 hover:bg-blue-50/30 text-center transition-all cursor-pointer space-y-2"
                      >
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <User className="h-6 w-6" />
                          <div className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs">
                            <Plus className="h-3 w-3 stroke-3" />
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xs font-black text-[#123A68] block">
                            اضغط لرفع الصورة
                          </span>
                          <span className="text-[10.5px] text-text-muted">
                            واضحة وغير مقطوعة — JPG أو PNG
                          </span>
                        </div>
                      </button>

                      {/* Camera Button below matching Design */}
                      <button
                        type="button"
                        onClick={() => handleOpenLiveCamera("id_front")}
                        className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#123A68] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Camera className="h-4 w-4 text-[#F36F21]" />
                        <span>التقاط بالكاميرا</span>
                      </button>
                    </div>
                  ) : (
                    /* Image Uploaded Preview */
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={removeFrontImage}
                        className="p-1.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                        title="حذف الصورة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-2.5">
                        {frontPreview && (
                          <img
                            src={frontPreview}
                            alt="Front ID Preview"
                            className="w-12 h-9 object-cover rounded-lg border border-emerald-300 shadow-xs"
                          />
                        )}
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-900 block truncate max-w-[140px]">
                            {frontImage.name}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                            <Check className="w-3 h-3" />
                            <span>تم الرفع بنجاح</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Back Side Card */}
                <div className="rounded-3xl bg-white p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#123A68]">
                      2
                    </span>
                    <h3 className="text-xs sm:text-sm font-black text-[#123A68]">
                      بطاقة الهوية — الوجه الخلفي
                    </h3>
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
                    <div className="space-y-2.5">
                      {/* Large Dashed Dropzone matching Design */}
                      <button
                        type="button"
                        onClick={() => backInputRef.current?.click()}
                        className="w-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#123A68]/40 bg-slate-50/50 hover:bg-blue-50/30 text-center transition-all cursor-pointer space-y-2"
                      >
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <FileText className="h-6 w-6" />
                          <div className="absolute -bottom-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#F36F21] text-white shadow-xs">
                            <Plus className="h-3 w-3 stroke-3" />
                          </div>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xs font-black text-[#123A68] block">
                            اضغط لرفع الصورة
                          </span>
                          <span className="text-[10.5px] text-text-muted">
                            واضحة وغير مقطوعة — JPG أو PNG
                          </span>
                        </div>
                      </button>

                      {/* Camera Button below matching Design */}
                      <button
                        type="button"
                        onClick={() => handleOpenLiveCamera("id_back")}
                        className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#123A68] hover:bg-blue-50/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Camera className="h-4 w-4 text-[#F36F21]" />
                        <span>التقاط بالكاميرا</span>
                      </button>
                    </div>
                  ) : (
                    /* Image Uploaded Preview */
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={removeBackImage}
                        className="p-1.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                        title="حذف الصورة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-2.5">
                        {backPreview && (
                          <img
                            src={backPreview}
                            alt="Back ID Preview"
                            className="w-12 h-9 object-cover rounded-lg border border-emerald-300 shadow-xs"
                          />
                        )}
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-900 block truncate max-w-[140px]">
                            {backImage.name}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                            <Check className="w-3 h-3" />
                            <span>تم الرفع بنجاح</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Button */}
                <button
                  type="button"
                  disabled={!frontImage || !backImage}
                  onClick={() => setStep(2)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
                >
                  <span>التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: Selfie Holding the ID Card */}
            {/* ========================================================================= */}
            {step === 2 && (
              <div className="space-y-4">
                {/* Info Banner */}
                <div className="flex items-start gap-2.5 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-right text-amber-900">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-black block">
                      صورة شخصية وأنت تحمل بطاقة الهوية
                    </span>
                    <p className="text-[11px] leading-relaxed text-amber-800">
                      التقط صورة واضحة لوجهك ممسكاً ببطاقة الهوية بجانب وجهك بحيث
                      تكون ملامحك وبيانات الهوية مقروءة وواضحة تماماً.
                    </p>
                  </div>
                </div>

                {/* Selfie Card */}
                <div className="rounded-3xl bg-white p-5 border border-slate-200 shadow-2xs space-y-3">
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
                    <div className="space-y-3">
                      {/* Large Camera Button */}
                      <button
                        type="button"
                        onClick={() => handleOpenLiveCamera("selfie")}
                        className="w-full flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-[#123A68]/30 hover:border-[#123A68] bg-blue-50/40 text-center transition-all cursor-pointer space-y-2"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-md">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xs font-black text-[#123A68]">
                          التقاط سيلفي بالكاميرا الآن
                        </span>
                        <span className="text-[10px] text-text-muted">
                          مع إطار توجيه مخصص للوجه والبطاقة
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => holdingIdInputRef.current?.click()}
                        className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                      >
                        أو اختيار صورة من الجهاز
                      </button>
                    </div>
                  ) : (
                    /* Image Uploaded Preview */
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={removeHoldingIdImage}
                        className="p-1.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors cursor-pointer"
                        title="حذف الصورة"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-2.5">
                        {holdingIdPreview && (
                          <img
                            src={holdingIdPreview}
                            alt="Selfie ID Preview"
                            className="w-12 h-12 object-cover rounded-lg border border-emerald-300 shadow-xs"
                          />
                        )}
                        <div className="text-right">
                          <span className="text-xs font-bold text-emerald-900 block truncate max-w-[140px]">
                            {holdingIdImage.name}
                          </span>
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 justify-end">
                            <Check className="w-3 h-3" />
                            <span>تم الالتقاط بنجاح</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="py-3 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    السابق
                  </button>

                  <button
                    type="button"
                    disabled={!holdingIdImage}
                    onClick={() => setStep(3)}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
                  >
                    <span>التالي</span>
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: Review & Submit */}
            {/* ========================================================================= */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Info Banner */}
                <div className="flex items-start gap-2.5 rounded-2xl bg-blue-50/70 p-4 border border-blue-200/70 text-right">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-100 text-[#123A68] shrink-0">
                    <FileCheck className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-bold text-[#123A68] leading-relaxed">
                    تأكد من وضوح جميع المستندات المرفوعة قبل إرسال طلب التحقق
                  </p>
                </div>

                {/* 3 Summary Review Cards */}
                <div className="rounded-3xl bg-white p-4 border border-slate-200 shadow-2xs space-y-3">
                  {/* Front ID Review */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[10.5px] font-bold text-[#123A68] hover:underline cursor-pointer"
                    >
                      تغيير
                    </button>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[#123A68]">
                        بطاقة الهوية — الوجه الأمامي
                      </span>
                      {frontPreview ? (
                        <img
                          src={frontPreview}
                          alt="Front ID"
                          className="w-9 h-7 object-cover rounded-md border border-slate-300"
                        />
                      ) : (
                        <FileText className="h-4 w-4 text-emerald-600" />
                      )}
                    </div>
                  </div>

                  {/* Back ID Review */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[10.5px] font-bold text-[#123A68] hover:underline cursor-pointer"
                    >
                      تغيير
                    </button>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[#123A68]">
                        بطاقة الهوية — الوجه الخلفي
                      </span>
                      {backPreview ? (
                        <img
                          src={backPreview}
                          alt="Back ID"
                          className="w-9 h-7 object-cover rounded-md border border-slate-300"
                        />
                      ) : (
                        <FileText className="h-4 w-4 text-emerald-600" />
                      )}
                    </div>
                  </div>

                  {/* Selfie Review */}
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-[10.5px] font-bold text-[#123A68] hover:underline cursor-pointer"
                    >
                      تغيير
                    </button>
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-[#123A68]">
                        صورة السيلفي مع الهوية
                      </span>
                      {holdingIdPreview ? (
                        <img
                          src={holdingIdPreview}
                          alt="Selfie"
                          className="w-8 h-8 object-cover rounded-full border border-slate-300"
                        />
                      ) : (
                        <User className="h-4 w-4 text-emerald-600" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Trust & Privacy Notice */}
                <div className="flex items-start gap-2 p-3 rounded-2xl bg-slate-100/80 text-[11px] text-text-muted">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-[#123A68] mt-0.5" />
                  <p>
                    تُحفظ مستنداتك في خوادم مشفرة وآمنة تماماً، وتُستخدم فقط للتحقق من
                    الحساب وفقاً لسياسة الخصوصية.
                  </p>
                </div>

                {/* Submit / Back Action Buttons */}
                <div className="space-y-2.5 pt-1">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitAll}
                    className="w-full h-12 rounded-2xl bg-[#F36F21] hover:bg-[#E05E12] active:scale-98 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>جاري إرسال المستندات...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        <span>إرسال طلب التحقق للمراجعة</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setStep(2)}
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors text-center cursor-pointer"
                  >
                    السابق
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </MobileContainer>
  );
}
