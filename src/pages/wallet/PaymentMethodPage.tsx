import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Smartphone,
  Building2,
  Check,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import type { TokenPackage } from "./BuyTokensPackages";

export default function PaymentMethodPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const pkg: TokenPackage = location.state?.package || {
    id: "pkg-basic",
    name: "الباقة الأساسية",
    subtitle: "للاستخدام الخفيف والتجريب",
    tokens: 10,
    priceNis: 5,
    ratePerToken: "2 ₪ لكل توكن مع 2 توكن هدية من منصة بطريقك",
    features: [],
  };

  const [selectedMethod, setSelectedMethod] = useState<"JAWWAL_PAY" | "BANK">(
    "JAWWAL_PAY",
  );

  const handleProceed = () => {
    if (selectedMethod === "JAWWAL_PAY") {
      navigate("/wallet/topup-qr", {
        state: { package: pkg, method: selectedMethod },
      });
    } else {
      navigate("/wallet/bank-transfer", {
        state: { package: pkg, method: selectedMethod },
      });
    }
  };

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="الرجوع للخلف"
            className="p-1 text-primary dark:text-white hover:text-accent transition-colors cursor-pointer"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">طريقة الدفع</h1>
            <p className="text-xs text-text-secondary dark:text-slate-400 mt-0.5">
              اختر الطريقة الأنسب لك
            </p>
          </div>
        </div>

        {/* 4-Step Progress Bar (Step 2 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#102A4C] p-3 border border-slate-200/80 dark:border-white/10 shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-3" />
            </span>
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500 dark:text-emerald-600">──</span>
          <div className="flex items-center gap-1.5 text-[#123A68] dark:text-white font-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] dark:bg-[#1E4E8C] text-white text-[10px]">
              2
            </span>
            <span>طريقة الدفع</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">──</span>
          <div className="flex items-center gap-1 text-text-muted dark:text-slate-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-[#132F54] text-[10px] text-slate-600 dark:text-slate-300">
              3
            </span>
            <span>إتمام الدفع</span>
          </div>
          <span className="text-slate-300 dark:text-slate-600">──</span>
          <div className="flex items-center gap-1 text-text-muted dark:text-slate-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 dark:bg-[#132F54] text-[10px] text-slate-600 dark:text-slate-300">
              4
            </span>
            <span>تم الشراء</span>
          </div>
        </div>

        {/* Selected Package Summary Card */}
        <div className="flex items-center justify-between rounded-3xl bg-white dark:bg-[#102A4C] p-4.5 border border-slate-200/90 dark:border-white/10 shadow-xs">
          {/* Package Info on RIGHT */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123A68] dark:bg-[#132F54] text-white shadow-xs shrink-0">
              <Zap className="h-5 w-5 fill-white" />
            </div>
            <div className="text-right">
              <h3 className="text-sm font-black text-[#123A68] dark:text-white">{pkg.name}</h3>
              <p className="text-[11px] text-text-muted dark:text-slate-400">{pkg.subtitle}</p>
            </div>
          </div>

          {/* Tokens & Price on LEFT */}
          <div className="text-left space-y-0.5 shrink-0">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-lg font-black text-[#F36F21]">
                {pkg.tokens}
              </span>
              <span className="text-xs font-black text-[#F36F21]">توكن</span>
            </div>
            <div className="flex items-baseline gap-0.5 justify-end">
              <span className="text-sm font-black text-[#123A68] dark:text-white">
                {pkg.priceNis}
              </span>
              <span className="text-xs font-bold text-[#123A68] dark:text-white">₪</span>
            </div>
          </div>
        </div>

        {/* Payment Methods List matching Figma */}
        <div className="space-y-3 pt-1">
          {/* Method 1: Jawwal Pay */}
          <button
            type="button"
            onClick={() => setSelectedMethod("JAWWAL_PAY")}
            className={`w-full flex items-center justify-between rounded-3xl p-4.5 border transition-all cursor-pointer text-right ${selectedMethod === "JAWWAL_PAY"
              ? "border-[#123A68] dark:border-accent bg-white dark:bg-[#102A4C] ring-2 ring-[#123A68]/15 dark:ring-accent/20 shadow-sm"
              : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#102A4C] hover:border-slate-300 dark:hover:border-white/20"
              }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs font-black text-xs ${selectedMethod === "JAWWAL_PAY"
                  ? "bg-[#059669] text-white"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                  }`}
              >
                <div className="flex flex-col items-center leading-none">
                  <Smartphone className="h-5 w-5 mb-0.5" />
                  <span className="text-[9px] font-black">PAY</span>
                </div>
              </div>
              <div className="text-right">
                <h4 className="text-sm font-black text-[#123A68] dark:text-white">جوال باي</h4>
                <p className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">
                  تحويل مباشر لحساب المنصة
                </p>
              </div>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${selectedMethod === "JAWWAL_PAY"
                ? "border-[#123A68] dark:border-accent bg-[#123A68] dark:bg-accent text-white"
                : "border-slate-300 dark:border-white/20 bg-white dark:bg-[#0B1E36]"
                }`}
            >
              {selectedMethod === "JAWWAL_PAY" && (
                <Check className="h-3 w-3 stroke-3" />
              )}
            </div>
          </button>

          {/* Method 2: Bank Transfer */}
          <button
            type="button"
            onClick={() => setSelectedMethod("BANK")}
            className={`w-full flex items-center justify-between rounded-3xl p-4.5 border transition-all cursor-pointer text-right ${selectedMethod === "BANK"
              ? "border-[#123A68] dark:border-accent bg-white dark:bg-[#102A4C] ring-2 ring-[#123A68]/15 dark:ring-accent/20 shadow-sm"
              : "border-slate-200 dark:border-white/10 bg-white dark:bg-[#102A4C] hover:border-slate-300 dark:hover:border-white/20"
              }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs ${selectedMethod === "BANK"
                  ? "bg-[#123A68] dark:bg-[#1E4E8C] text-white"
                  : "bg-slate-100 dark:bg-[#132F54] text-slate-600 dark:text-slate-300"
                  }`}
              >
                <Building2 className="h-6 w-6" />
              </div>
              <div className="text-right">
                <h4 className="text-sm font-black text-[#123A68] dark:text-white">تحويل بنكي</h4>
                <p className="text-[11px] text-text-muted dark:text-slate-400 mt-0.5">
                  تحويل مباشر لحساب المنصة
                </p>
              </div>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${selectedMethod === "BANK"
                ? "border-[#123A68] dark:border-accent bg-[#123A68] dark:bg-accent text-white"
                : "border-slate-300 dark:border-white/20 bg-white dark:bg-[#0B1E36]"
                }`}
            >
              {selectedMethod === "BANK" && (
                <Check className="h-3 w-3 stroke-3" />
              )}
            </div>
          </button>
        </div>

        {/* Proceed Button */}
        <div className="pt-3">
          <button
            type="button"
            onClick={handleProceed}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white shadow-md active:scale-98 transition-all cursor-pointer hover:bg-[#0D2C50]"
          >
            <span>متابعة للدفع</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
