import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  QrCode,
  Smartphone,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { usePayments } from "../../hooks/usePayments";
import { translateApiError } from "../../i18n";
import type { TokenPackage } from "./BuyTokensPackages";
import type { PaymentInvoice } from "../../types";

// Modular sub-components
import { PaymentStepper } from "../../components/wallet/PaymentStepper";
import { TopUpQrTab } from "../../components/wallet/TopUpQrTab";
import { TopUpJawwalPayTab } from "../../components/wallet/TopUpJawwalPayTab";

export default function TopUpQRPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    createInvoice,
    verifyOtp,
    resendOtp,
    isCreatingInvoice,
    isVerifyingOtp,
    isResendingOtp,
  } = usePayments();

  const pkg: TokenPackage = location.state?.package || {
    id: "pkg-pro",
    name: "الباقة الاحترافية",
    subtitle: "للمستخدمين الدائمين والنشطين",
    tokens: 50,
    priceNis: 15,
    ratePerToken: "2 ₪ لكل توكن نسبة التوفير 40%",
    features: [],
  };

  const [activeTab, setActiveTab] = useState<"QR" | "JAWWAL">("QR");

  // Jawwal Pay Form States
  const [jawwalPhone, setJawwalPhone] = useState("0598877026");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [invoice, setInvoice] = useState<PaymentInvoice | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [otpDigits, setOtpDigits] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const maskedPhone = (() => {
    const raw = jawwalPhone.trim();
    if (raw.length < 6) return raw;
    const start = raw.slice(0, 4);
    const end = raw.slice(-2);
    return `${end}••••${start}`;
  })();

  const handleSendOtp = async () => {
    if (jawwalPhone.trim().length >= 9) {
      setErrorMessage(null);
      try {
        const res = await createInvoice({
          packageId: pkg.id,
          method: "OTP",
          paymentPhone: jawwalPhone.trim(),
        });
        setInvoice(res.data.invoice);
        setIsOtpSent(true);
      } catch (err: unknown) {
        setErrorMessage(translateApiError(err));
      }
    }
  };

  const handleResendOtp = async () => {
    if (!invoice?.id) return;
    setErrorMessage(null);
    try {
      await resendOtp(invoice.id);
      setOtpDigits(["", "", "", "", "", ""]);
      otpInputRefs.current[0]?.focus();
    } catch (err: unknown) {
      setErrorMessage(translateApiError(err));
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    if (/^\d?$/.test(val)) {
      const next = [...otpDigits];
      next[index] = val;
      setOtpDigits(next);
      if (val && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtpPayment = async () => {
    const otpCode = otpDigits.join("");
    if (otpCode.length !== 6 || !invoice?.id) return;

    setErrorMessage(null);
    try {
      await verifyOtp({
        invoiceId: invoice.id,
        otpCode,
      });
      navigate("/wallet/payment-success", {
        state: {
          package: pkg,
          method: "JAWWAL_PAY",
          invoiceId: invoice.id,
        },
      });
    } catch (err: unknown) {
      setErrorMessage(translateApiError(err));
    }
  };

  const handleCompleted = () => {
    navigate("/wallet/payment-success", {
      state: { package: pkg, method: "QR" },
    });
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">إتمام الدفع</h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              مسح باركود الـ QR أو الخصم المباشر
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* 4-Step Stepper */}
        <PaymentStepper currentStep={3} />

        {/* Selected Package Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#102A4C] px-4 py-3.5 border border-slate-200/90 dark:border-white/10 shadow-2xs">
          <div className="flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-[#F36F21] fill-[#F36F21]" />
            <span className="text-xs font-black text-[#123A68] dark:text-white">
              {pkg.name} — {pkg.tokens} توكن
            </span>
          </div>

          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-black text-[#123A68] dark:text-white">
              {pkg.priceNis}
            </span>
            <span className="text-xs font-black text-[#123A68] dark:text-white">₪</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-4">
          {/* Top Payment Method Tabs */}
          <div className="flex items-center rounded-2xl bg-slate-100 dark:bg-[#0B1E36] p-1 text-xs font-black">
            <button
              type="button"
              onClick={() => setActiveTab("QR")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "QR"
                  ? "bg-[#123A68] dark:bg-accent text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <QrCode className="h-4 w-4" />
              <span>باركود QR</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("JAWWAL")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "JAWWAL"
                  ? "bg-[#123A68] dark:bg-accent text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>جوال باي 📱</span>
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200">
              {errorMessage}
            </div>
          )}

          {activeTab === "QR" ? (
            <TopUpQrTab
              onCompleted={handleCompleted}
              onSaveQr={() => alert("تم حفظ رمز الـ QR في ألبوم الصور.")}
            />
          ) : (
            <TopUpJawwalPayTab
              jawwalPhone={jawwalPhone}
              setJawwalPhone={setJawwalPhone}
              isOtpSent={isOtpSent}
              setIsOtpSent={setIsOtpSent}
              maskedPhone={maskedPhone}
              otpDigits={otpDigits}
              otpInputRefs={otpInputRefs}
              handleOtpChange={handleOtpChange}
              handleOtpKeyDown={handleOtpKeyDown}
              handleSendOtp={handleSendOtp}
              handleResendOtp={handleResendOtp}
              handleVerifyOtpPayment={handleVerifyOtpPayment}
              isCreatingInvoice={isCreatingInvoice}
              isVerifyingOtp={isVerifyingOtp}
              isResendingOtp={isResendingOtp}
            />
          )}
        </div>

        {/* Security Footer Note */}
        <div className="flex items-center justify-center gap-2 text-center text-xs font-bold text-text-muted">
          <Lock className="h-3.5 w-3.5 text-slate-400" />
          <span>عملية دفع آمنة ومشفرة بالكامل 100%</span>
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        </div>
      </div>
    </MobileContainer>
  );
}
