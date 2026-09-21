import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  Check,
  Download,
  Copy,
  CheckCheck,
  QrCode,
  Smartphone,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import type { TokenPackage } from "./BuyTokensPackages";

export default function TopUpQRPage() {
  const navigate = useNavigate();
  const location = useLocation();

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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const jawwalPayNumber = "0599 123 456";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCompleted = () => {
    navigate("/wallet/payment-success", {
      state: { package: pkg, method: activeTab === "QR" ? "QR" : "JAWWAL_PAY" },
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
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-black text-[#123A68]">
              {pkg.priceNis}
            </span>
            <span className="text-xs font-black text-[#123A68]">₪</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#123A68]">
              {pkg.name} — {pkg.tokens} توكن
            </span>
            <Zap className="h-4.5 w-4.5 text-[#F36F21] fill-[#F36F21]" />
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-xs text-center space-y-4">
          {/* Inner Tabs matching Figma */}
          <div className="flex items-center rounded-2xl bg-slate-100 p-1 text-xs font-black">
            <button
              type="button"
              onClick={() => setActiveTab("QR")}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${
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
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === "JAWWAL"
                  ? "bg-[#123A68] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              <span>جوال باي 📱</span>
            </button>
          </div>

          {activeTab === "QR" ? (
            <>
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
                    1
                  </span>
                  <span>افتح تطبيق جوال باي أو تطبيقك البنكي</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    2
                  </span>
                  <span>اختر «دفع برمز QR» أو «مسح رمز»</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    3
                  </span>
                  <span>وجّه الكاميرا نحو الباركود أعلاه</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                    4
                  </span>
                  <span>راجع المبلغ وأكّد العملية</span>
                </div>
              </div>
            </>
          ) : (
            /* Jawwal Pay Direct Details */
            <div className="space-y-3.5 text-xs text-right py-2">
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-900 font-bold">اسم الحساب:</span>
                  <span className="font-black text-[#123A68]">منصة بطريقك</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-emerald-900 font-bold">
                    رقم جوال باي:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(jawwalPayNumber, "phone")}
                      className="p-1 text-slate-400 hover:text-emerald-700 transition-colors cursor-pointer"
                      title="نسخ رقم الجوال"
                    >
                      {copiedField === "phone" ? (
                        <CheckCheck className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                    <span className="font-mono font-black text-[#123A68] text-sm dir-ltr">
                      {jawwalPayNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-emerald-900 font-bold">
                    المبلغ المطلوب:
                  </span>
                  <span className="font-black text-[#123A68] text-sm">
                    {pkg.priceNis} ₪
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1.5 leading-relaxed font-bold">
                <p>1. افتح تطبيق جوال باي واختر "تحويل لمستفيد".</p>
                <p>2. أدخل الرقم أعلاه والمبلغ المطلوب بدقة.</p>
                <p>3. بعد إتمام التحويل اضغط على الزر أدناه لتأكيد شحن الرصيد.</p>
              </div>
            </div>
          )}

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
      </div>
    </MobileContainer>
  );
}
