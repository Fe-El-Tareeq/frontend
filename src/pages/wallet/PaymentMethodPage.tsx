import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  QrCode,
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
    subtitle: "للاستخدام الخفيف و التجريب",
    tokens: 10,
    priceNis: 5,
    ratePerToken: "2 ₪ لكل توكن مع 2 توكن هدية من منصة بطريقك",
    features: [],
  };

  const [selectedMethod, setSelectedMethod] = useState<"QR" | "BANK">("QR");

  const handleProceed = () => {
    if (selectedMethod === "QR") {
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
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div className="text-right">
            <h1 className="text-xl font-black text-[#123A68]">طريقة الدفع</h1>
            <p className="text-xs text-text-secondary mt-0.5">
              اختر الطريقة الأنسب لك
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

        {/* 4-Step Progress Bar (Step 2 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3 border border-slate-200/80 shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-[3]" />
            </span>
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-[#123A68] font-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] text-white text-[10px]">
              2
            </span>
            <span>طريقة الدفع</span>
          </div>
          <span className="text-slate-300">──</span>
          <div className="flex items-center gap-1 text-text-muted">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px]">
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

        {/* Selected Package Summary Card */}
        <div className="flex items-center justify-between rounded-3xl bg-white p-4.5 border border-slate-200/90 shadow-xs">
          <div className="text-left space-y-0.5">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-[#F36F21]">
                {pkg.tokens}
              </span>
              <span className="text-xs font-black text-[#F36F21]">توكن</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-sm font-black text-[#123A68]">
                {pkg.priceNis}
              </span>
              <span className="text-xs font-bold text-[#123A68]">₪</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <h3 className="text-sm font-black text-[#123A68]">{pkg.name}</h3>
              <p className="text-[11px] text-text-muted">{pkg.subtitle}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-xs">
              <Zap className="h-5 w-5 fill-white" />
            </div>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-3 pt-1">
          {/* Method 1: QR Code */}
          <button
            type="button"
            onClick={() => setSelectedMethod("QR")}
            className={`w-full flex items-center justify-between rounded-3xl p-4.5 border transition-all cursor-pointer text-right ${
              selectedMethod === "QR"
                ? "border-[#123A68] bg-white ring-2 ring-[#123A68]/15 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs ${
                  selectedMethod === "QR"
                    ? "bg-[#123A68] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <QrCode className="h-6 w-6" />
              </div>
              <div className="text-right">
                <h4 className="text-sm font-black text-[#123A68]">رمز QR</h4>
                <p className="text-[11px] text-text-muted mt-0.5">
                  ادفع بمسح رمز QR من تطبيقك البنكي
                </p>
              </div>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                selectedMethod === "QR"
                  ? "border-[#123A68] bg-[#123A68] text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {selectedMethod === "QR" && (
                <Check className="h-3 w-3 stroke-[3]" />
              )}
            </div>
          </button>

          {/* Method 2: Bank Transfer */}
          <button
            type="button"
            onClick={() => setSelectedMethod("BANK")}
            className={`w-full flex items-center justify-between rounded-3xl p-4.5 border transition-all cursor-pointer text-right ${
              selectedMethod === "BANK"
                ? "border-[#123A68] bg-white ring-2 ring-[#123A68]/15 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-xs ${
                  selectedMethod === "BANK"
                    ? "bg-[#123A68] text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Building2 className="h-6 w-6" />
              </div>
              <div className="text-right">
                <h4 className="text-sm font-black text-[#123A68]">تحويل بنكي</h4>
                <p className="text-[11px] text-text-muted mt-0.5">
                  تحويل مباشر لحساب المنصة
                </p>
              </div>
            </div>

            <div
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                selectedMethod === "BANK"
                  ? "border-[#123A68] bg-[#123A68] text-white"
                  : "border-slate-300 bg-white"
              }`}
            >
              {selectedMethod === "BANK" && (
                <Check className="h-3 w-3 stroke-[3]" />
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
