import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  QrCode,
  Building2,
  CheckCircle,
  Zap,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import type { TokenPackage } from "./BuyTokensPackages";

export default function PaymentMethodPage() {
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

  const [selectedMethod] = useState<"QR" | "BANK">("QR");

  const handleProceed = () => {
    navigate("/wallet/topup-qr", {
      state: { package: pkg, method: selectedMethod },
    });
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
            <h1 className="text-xl font-black text-[#123A68]">طريقة الدفع</h1>
            <p className="text-xs text-text-secondary">
              اختر الطريقة الأنسب لك
            </p>
          </div>
        </div>

        {/* 4-Step Progress Bar (Step 2 Active) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <CheckCircle className="h-4.5 w-4.5" />
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-primary font-black">
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
        <div className="flex items-center justify-between rounded-3xl bg-white p-4.5 border border-border shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#123A68] text-white">
              <Zap className="h-5 w-5 fill-white" />
            </div>
            <div className="text-right">
              <h3 className="text-sm font-black text-[#123A68]">{pkg.name}</h3>
              <p className="text-[11px] text-text-muted">{pkg.subtitle}</p>
            </div>
          </div>

          <div className="text-left">
            <span className="text-lg font-black text-[#F36F21] block">
              {pkg.tokens} توكن
            </span>
            <span className="text-xs font-bold text-text-muted">
              {pkg.priceNis} شيكل
            </span>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="space-y-3 pt-1">
          {/* Method 1: QR Code - Jawwal Pay (Active) */}
          <div
            className="flex items-center justify-between rounded-3xl p-4.5 border border-[#123A68] bg-white ring-2 ring-[#123A68]/15 shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#123A68] text-white shadow-xs">
                <QrCode className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-black text-[#123A68]">
                    محفظة جوال باي (QR Code)
                  </h4>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-black text-emerald-700 border border-emerald-200">
                    متاح الآن
                  </span>
                </div>
                <p className="text-[11px] text-text-muted mt-0.5">
                  امسح رمز QR السريع من تطبيق جوال باي للدفع المباشر
                </p>
              </div>
            </div>

            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#123A68] bg-[#123A68] text-white">
              <CheckCircle className="h-3.5 w-3.5 fill-white text-[#123A68]" />
            </div>
          </div>

          {/* Method 2: Bank Transfer (Disabled until screen is ready) */}
          <div
            className="flex items-center justify-between rounded-3xl p-4.5 border border-slate-200 bg-slate-50/70 opacity-60 cursor-not-allowed select-none transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-200 text-slate-500">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-slate-500">تحويل بنكي</h4>
                  <span className="flex items-center gap-1 rounded-full bg-slate-200 px-2 py-0.5 text-[9.5px] font-bold text-slate-600">
                    <Lock className="h-2.5 w-2.5" />
                    قريباً
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  التحويل المباشر عبر الحسابات البنكية (فلسطين / الإسلامي)
                </p>
              </div>
            </div>

            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-slate-300" />
          </div>
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
