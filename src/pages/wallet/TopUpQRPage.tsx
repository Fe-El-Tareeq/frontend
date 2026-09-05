import { useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, Zap, CheckCircle, Download } from "lucide-react";
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
    priceNis: 30,
    ratePerToken: "0.60 شيكل لكل توكن",
    features: [],
  };

  const handleCompleted = () => {
    navigate("/wallet/payment-success", { state: { package: pkg } });
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1 text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-black text-[#123A68]">إتمام الدفع</h1>
            <p className="text-xs text-text-secondary">
              امسح رمز QR بتطبيق جوال باي
            </p>
          </div>
        </div>

        {/* 4-Step Progress Bar (Step 3 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1 text-emerald-600">
            <CheckCircle className="h-4.5 w-4.5" />
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1 text-emerald-600">
            <CheckCircle className="h-4.5 w-4.5" />
            <span>طريقة الدفع</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1 text-primary font-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] text-white text-[10px] shadow-xs">
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
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-border shadow-2xs">
          <div className="flex items-center gap-2">
            <Zap className="h-4.5 w-4.5 text-[#F36F21] fill-[#F36F21]" />
            <span className="text-xs font-black text-[#123A68]">
              {pkg.name} — {pkg.tokens} توكن
            </span>
          </div>
          <span className="text-sm font-black text-[#123A68]">
            {pkg.priceNis} شيكل
          </span>
        </div>

        {/* Main QR Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs text-center space-y-4">
          {/* Stylized QR Code matching Figma */}
          <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-3xl bg-[#F8FAFC] p-3 border border-slate-200 shadow-inner">
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

          {/* Numbered Steps in dark navy circles */}
          <div className="space-y-2.5 text-xs text-text-secondary text-right pt-1">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                1
              </span>
              <span>افتح تطبيق البنك أو جوال باي على هاتفك</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                2
              </span>
              <span>اختر "دفع برمز QR" أو "مسح رمز"</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                3
              </span>
              <span>وجّه الكاميرا نحو رمز QR أعلاه</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#123A68] text-white font-black text-[11px]">
                4
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
              <CheckCircle className="h-4 w-4" />
              <span>لقد أتممت الدفع</span>
            </button>

            <button
              type="button"
              onClick={() => alert("تم حفظ رمز الـ QR في ألبوم الصور.")}
              className="flex h-12 px-4 items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white text-xs font-black text-primary hover:border-accent active:scale-98 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>حفظ QR</span>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
