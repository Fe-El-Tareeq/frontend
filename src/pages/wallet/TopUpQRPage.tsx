import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  Check,
  Download,
  QrCode,
  Smartphone,
  Send,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { usePayments } from "../../hooks/usePayments";
import { translateApiError } from "../../i18n";
import type { TokenPackage } from "./BuyTokensPackages";
import type { PaymentInvoice } from "../../types";

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

  // Tabs state
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

  // Masked phone format for confirmation: e.g. 0598877026 -> 26••••0598
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
      state: {
        package: pkg,
        method: activeTab === "QR" ? "QR" : "JAWWAL_PAY",
      },
    });
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">إتمام الدفع</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              امسح رمز QR بتطبيقك البنكي أو جوال باي
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* 4-Step Progress Bar (Step 3 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-slate-200/80 shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span>طريقة الدفع</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-[#123A68] font-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] text-white text-[10px]">
              3
            </span>
            <span>إتمام الدفع</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-1 text-text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">
              4
            </span>
            <span>تم الشراء</span>
          </div>
        </div>

        {/* Selected Package Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3.5 border border-slate-200/90 shadow-2xs">
          {/* Right in RTL: Package Name & Icon */}
          <div className="flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-[#F36F21] fill-[#F36F21]" />
            <span className="text-xs font-black text-[#123A68]">
              {pkg.name} — {pkg.tokens} توكن
            </span>
          </div>

          {/* Left in RTL: Price */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-black text-[#123A68]">
              {pkg.priceNis}
            </span>
            <span className="text-xs font-black text-[#123A68]">₪</span>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-xs space-y-4">
          {/* Top Payment Method Tabs matching Figma */}
          <div className="flex items-center rounded-2xl bg-slate-100 p-1 text-xs font-black">
            <button
              type="button"
              onClick={() => setActiveTab("QR")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === "QR"
                  ? "bg-[#123A68] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
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
                  ? "bg-[#123A68] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>جوال باي 📱</span>
            </button>
          </div>

          {/* ================= TAB 1: QR CODE ================= */}
          {activeTab === "QR" && (
            <div className="space-y-4 text-center">
              {/* Stylized QR Code matching Figma */}
              <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-3xl bg-[#F8FAFC] p-3 border border-slate-200 shadow-inner">
                <div className="relative flex h-full w-full items-center justify-center rounded-2xl bg-white p-2">
                  <svg
                    viewBox="0 0 100 100"
                    className="h-full w-full text-[#123A68] fill-current"
                  >
                    {/* Outer positioning squares */}
                    <rect
                      x="5"
                      y="5"
                      width="28"
                      height="28"
                      rx="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    <rect x="12" y="12" width="14" height="14" rx="2" />
                    <rect
                      x="67"
                      y="5"
                      width="28"
                      height="28"
                      rx="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    <rect x="74" y="12" width="14" height="14" rx="2" />
                    <rect
                      x="5"
                      y="67"
                      width="28"
                      height="28"
                      rx="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                    />
                    <rect x="12" y="74" width="14" height="14" rx="2" />
                    {/* Dense Pattern */}
                    <rect x="38" y="8" width="6" height="6" rx="1" />
                    <rect x="48" y="14" width="6" height="6" rx="1" />
                    <rect x="56" y="8" width="6" height="6" rx="1" />
                    <rect x="8" y="38" width="6" height="6" rx="1" />
                    <rect x="18" y="46" width="6" height="6" rx="1" />
                    <rect x="26" y="38" width="6" height="6" rx="1" />
                    <rect x="38" y="38" width="6" height="6" rx="1" />
                    <rect x="48" y="46" width="6" height="6" rx="1" />
                    <rect x="56" y="38" width="6" height="6" rx="1" />
                    <rect x="68" y="38" width="6" height="6" rx="1" />
                    <rect x="78" y="46" width="6" height="6" rx="1" />
                    <rect x="86" y="38" width="6" height="6" rx="1" />
                    <rect x="38" y="68" width="6" height="6" rx="1" />
                    <rect x="48" y="78" width="6" height="6" rx="1" />
                    <rect x="56" y="68" width="6" height="6" rx="1" />
                    <rect x="68" y="68" width="6" height="6" rx="1" />
                    <rect x="78" y="78" width="6" height="6" rx="1" />
                    <rect x="86" y="68" width="6" height="6" rx="1" />
                  </svg>

                  {/* Center Lightning Badge */}
                  <div className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md border border-orange-100">
                    <Zap className="h-5 w-5 text-[#F36F21] fill-[#F36F21]" />
                  </div>
                </div>
              </div>

              {/* Numbered Steps */}
              <div className="space-y-2.5 text-xs text-slate-700 text-right pt-1 font-bold">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    ١
                  </span>
                  <span>افتح تطبيق جوال باي أو البنك على هاتفك</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    ٢
                  </span>
                  <span>اختر «دفع برمز QR» أو «مسح رمز»</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    ٣
                  </span>
                  <span>وجّه الكاميرا نحو الباركود أعلاه</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    ٤
                  </span>
                  <span>راجع المبلغ وأكّد العملية</span>
                </div>
              </div>

              {/* Bottom Dual Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCompleted}
                  className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
                >
                  <Check className="h-4 w-4 stroke-[3]" />
                  <span>لقد أتممت الدفع</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert("تم حفظ رمز الـ QR في ألبوم الصور.")}
                  className="flex h-12 px-4 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white text-xs font-black text-[#123A68] hover:border-slate-300 active:scale-98 transition-all cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>حفظ 📥</span>
                </button>
              </div>
            </div>
          )}

          {/* ================= TAB 2: JAWWAL PAY DIRECT ================= */}
          {activeTab === "JAWWAL" && (
            <div className="space-y-3.5 text-right py-1">
              {/* Top Info Callout Box matching Figma */}
              <div className="flex items-center gap-2.5 rounded-2xl bg-[#F0F7FF] p-3 border border-blue-100/70 text-right">
                <div className="text-base">📱</div>
                <p className="text-[11.5px] font-bold text-[#123A68] leading-relaxed flex-1">
                  أدخل رقمك المسجّل في جوال باي وسيُرسل لك رمز تأكيد
                </p>
              </div>

              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-[#123A68]">
                  رقم جوال باي
                </label>
                <div className="flex items-center gap-2" dir="ltr">
                  <div className="flex h-11 items-center justify-center px-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] text-xs font-bold text-slate-500 shrink-0">
                    +970
                  </div>
                  <input
                    type="tel"
                    value={jawwalPhone}
                    onChange={(e) => setJawwalPhone(e.target.value)}
                    placeholder="0500000000"
                    disabled={isOtpSent}
                    className={`h-11 flex-1 rounded-2xl border border-slate-200 bg-[#F8FAFC] px-3.5 text-xs font-bold text-[#123A68] focus:border-[#123A68] focus:outline-hidden shadow-2xs ${
                      isOtpSent ? "opacity-80" : ""
                    }`}
                  />
                </div>
              </div>

              {/* STATE 1: Before OTP Sent -> Send OTP Button */}
              {!isOtpSent && (
                <div className="pt-2 space-y-2">
                  {errorMessage && (
                    <div className="rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-bold text-red-600 text-right">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={jawwalPhone.trim().length < 9 || isCreatingInvoice}
                    className={`flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-xs font-black transition-all cursor-pointer shadow-xs ${
                      jawwalPhone.trim().length >= 9 && !isCreatingInvoice
                        ? "bg-[#123A68] text-white hover:bg-[#0D2C50] active:scale-98"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {isCreatingInvoice ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 -rotate-45" />
                    )}
                    <span>
                      {isCreatingInvoice
                        ? "جاري إرسال الرمز..."
                        : "إرسال رمز التأكيد"}
                    </span>
                  </button>
                </div>
              )}

              {/* STATE 2: After OTP Sent -> Verification Form matching Figma */}
              {isOtpSent && (
                <div className="space-y-3.5 animate-fadeIn pt-1">
                  {/* Green Confirmation Pill */}
                  <div className="flex items-center justify-between rounded-2xl bg-[#E8F8F0] p-3 border border-[#D1F2E2] text-xs font-black text-[#10B981]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>أُرسل رمز التأكيد إلى {maskedPhone}</span>
                    </div>
                  </div>

                  {/* 6-Digit OTP Code Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black text-[#123A68]">
                      رمز التأكيد (6 أرقام)
                    </label>
                    <div className="flex items-center justify-between gap-1.5" dir="ltr">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <input
                          key={i}
                          ref={(el) => {
                            otpInputRefs.current[i] = el;
                          }}
                          type="text"
                          maxLength={1}
                          value={otpDigits[i]}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          placeholder="•"
                          className="h-11 w-11 rounded-2xl border border-slate-200 bg-[#F8FAFC] text-center text-base font-black text-[#123A68] focus:border-[#123A68] focus:outline-hidden shadow-2xs"
                        />
                      ))}
                    </div>

                    {/* Resend & Validity Timer Row */}
                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-slate-400 font-medium">
                        الرمز صالح لمدة 5 دقائق
                      </span>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResendingOtp}
                        className="font-black text-[#123A68] hover:text-[#F36F21] disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {isResendingOtp ? "جاري الإرسال..." : "إعادة الإرسال"}
                      </button>
                    </div>
                  </div>

                  {/* Deduction Summary Box */}
                  <div className="rounded-2xl bg-[#F8FAFC] p-3.5 border border-slate-100 flex items-center justify-between text-xs font-black text-[#123A68]">
                    <span className="text-slate-400 font-bold">
                      سيُسحب من حسابك
                    </span>
                    <span className="text-sm font-black text-[#123A68]">
                      {pkg.priceNis} ₪
                    </span>
                  </div>

                  {errorMessage && (
                    <div className="rounded-2xl bg-red-50 p-3.5 border border-red-200 text-xs font-bold text-red-600 text-right">
                      {errorMessage}
                    </div>
                  )}

                  {/* Direct Payment Confirmation Button */}
                  <div className="space-y-1.5 pt-1">
                    <button
                      type="button"
                      onClick={handleVerifyOtpPayment}
                      disabled={otpDigits.join("").length !== 6 || isVerifyingOtp}
                      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-white text-xs font-black hover:bg-[#0D2C50] active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                    >
                      {isVerifyingOtp ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4.5 w-4.5" />
                      )}
                      <span>
                        {isVerifyingOtp
                          ? "جاري تأكيد الدفع..."
                          : `تأكيد الدفع وسحب ${pkg.priceNis} ₪`}
                      </span>
                    </button>
                  </div>

                  {/* Security Footer */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>عملية مشفّرة وآمنة</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MobileContainer>
  );
}

