import { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { Header } from "../../components/layout/Header";
import {
  LiveCameraCaptureModal,
  type CameraCaptureMode,
} from "../../components/camera/LiveCameraCaptureModal";
import { authApi } from "../../api/auth";
import { getApiErrorMessage } from "../../utils/apiError";
import { usePWA } from "../../hooks/usePWA";

// Modular sub-components
import { VerificationHeader } from "../../components/profile/verification/VerificationHeader";
import { VerificationSidebar } from "../../components/profile/verification/VerificationSidebar";
import { Step1DocumentsUpload } from "../../components/profile/verification/Step1DocumentsUpload";
import { Step2FaceVerification } from "../../components/profile/verification/Step2FaceVerification";
import { Step3ReviewSubmission } from "../../components/profile/verification/Step3ReviewSubmission";
import { Step4UnderReviewState } from "../../components/profile/verification/Step4UnderReviewState";

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
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      {/* Dedicated Live In-App Camera Modal */}
      <LiveCameraCaptureModal
        isOpen={isCameraOpen}
        mode={cameraMode}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6 text-right">
        {step === 4 ? (
          <Step4UnderReviewState onGoHome={() => navigate("/home")} />
        ) : (
          <>
            <VerificationHeader
              step={step as 1 | 2 | 3}
              onBack={() => navigate("/profile")}
            />

            {/* Error Banner */}
            {submitError && (
              <div className="p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-red-700 dark:text-red-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Responsive Desktop 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Desktop Verification Sidebar (Right column in RTL) */}
              <div className="hidden lg:block lg:col-span-4 sticky top-24">
                <VerificationSidebar currentStep={step as 1 | 2 | 3} />
              </div>

              {/* Main Interactive Step Area (Left column in RTL) */}
              <div className="lg:col-span-8 space-y-6">
                {step === 1 && (
                  <Step1DocumentsUpload
                    frontImage={frontImage}
                    frontPreview={frontPreview}
                    backImage={backImage}
                    backPreview={backPreview}
                    frontInputRef={frontInputRef}
                    frontCameraInputRef={frontCameraInputRef}
                    backInputRef={backInputRef}
                    backCameraInputRef={backCameraInputRef}
                    onFrontChange={handleFrontChange}
                    onBackChange={handleBackChange}
                    onRemoveFront={removeFrontImage}
                    onRemoveBack={removeBackImage}
                    onOpenLiveCamera={handleOpenLiveCamera}
                    onNext={() => setStep(2)}
                  />
                )}

                {step === 2 && (
                  <Step2FaceVerification
                    holdingIdImage={holdingIdImage}
                    holdingIdPreview={holdingIdPreview}
                    holdingIdInputRef={holdingIdInputRef}
                    holdingIdCameraInputRef={holdingIdCameraInputRef}
                    onHoldingIdChange={handleHoldingIdChange}
                    onRemoveHoldingId={removeHoldingIdImage}
                    onOpenLiveCamera={handleOpenLiveCamera}
                    onPrev={() => setStep(1)}
                    onNext={() => setStep(3)}
                  />
                )}

                {step === 3 && (
                  <Step3ReviewSubmission
                    frontPreview={frontPreview}
                    backPreview={backPreview}
                    holdingIdPreview={holdingIdPreview}
                    isSubmitting={isSubmitting}
                    onEditStep={(s) => setStep(s)}
                    onSubmit={handleSubmitAll}
                    onPrev={() => setStep(2)}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </MobileContainer>
  );
}
export default IdentityVerificationPage;
