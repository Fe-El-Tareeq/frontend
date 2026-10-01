import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { legalApi } from "../../api/legal";
import { getApiErrorMessage } from "../../utils/apiError";
import type { LegalVersionMetadata } from "../../types/legal";

// Modular sub-components
import { TermsOfServiceContent } from "../../components/legal/TermsOfServiceContent";
import { PrivacyPolicyContent } from "../../components/legal/PrivacyPolicyContent";
import { LegalAgreementFooter } from "../../components/legal/LegalAgreementFooter";

export default function TermsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"TERMS" | "PRIVACY">("TERMS");
  const [isAgreed, setIsAgreed] = useState(false);
  const [legalMetadata, setLegalMetadata] =
    useState<LegalVersionMetadata | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    legalApi
      .getCurrentLegal()
      .then((res) => {
        if (isMounted && res.data) {
          setLegalMetadata(res.data);
        }
      })
      .catch(() => {
        // Fallback to static text
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAgreeAndBack = async () => {
    if (!isAgreed || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const termsVersion =
        legalMetadata?.termsVersion || legalMetadata?.version || "1.0";
      const privacyVersion =
        legalMetadata?.privacyVersion || legalMetadata?.version || "1.0";
      await legalApi.acceptLegal({ termsVersion, privacyVersion });
      setSubmitSuccess("تم حفظ موافقتك على الشروط بنجاح");
      setTimeout(() => {
        navigate(-1);
      }, 700);
    } catch (err) {
      setSubmitError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentVersion =
    legalMetadata?.termsVersion || legalMetadata?.version || "1.0";
  const effectiveDate = legalMetadata?.effectiveDate || "1 يوليو 2026";

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">
              الشروط القانونية والخصوصية
            </h1>
            <p className="text-[11px] text-text-secondary dark:text-slate-400 mt-0.5">
              آخر تحديث: {effectiveDate} • الإصدار {currentVersion}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
              title="الصفحة الرئيسية"
            >
              <Home className="h-4 w-4" />
              <span>الرئيسية</span>
            </button>
            <button
              type="button"
              onClick={() => typeof window !== "undefined" && window.history.length > 1 ? navigate(-1) : navigate("/home")}
              aria-label="الرجوع للخلف"
              className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-white dark:bg-[#102A4C] p-1 border border-slate-200/90 dark:border-white/10 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab("PRIVACY")}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "PRIVACY"
                ? "bg-[#123A68] dark:bg-[#1E4E8C] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-[#123A68] dark:hover:text-white"
            }`}
          >
            سياسة الخصوصية
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("TERMS")}
            className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === "TERMS"
                ? "bg-[#123A68] dark:bg-[#1E4E8C] text-white shadow-xs"
                : "text-slate-600 dark:text-slate-300 hover:text-[#123A68] dark:hover:text-white"
            }`}
          >
            شروط الاستخدام
          </button>
        </div>

        {activeTab === "TERMS" ? (
          <TermsOfServiceContent />
        ) : (
          <PrivacyPolicyContent />
        )}

        <LegalAgreementFooter
          isAgreed={isAgreed}
          setIsAgreed={setIsAgreed}
          isSubmitting={isSubmitting}
          submitError={submitError}
          submitSuccess={submitSuccess}
          onAgreeAndBack={handleAgreeAndBack}
          onBack={() => navigate(-1)}
        />
      </div>
    </MobileContainer>
  );
}
