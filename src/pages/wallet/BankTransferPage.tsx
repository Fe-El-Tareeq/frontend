import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ChevronRight,
  Zap,
  Check,
  AlertCircle,
  Copy,
  CheckCheck,
} from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import type { TokenPackage } from "./BuyTokensPackages";

export default function BankTransferPage() {
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

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const transferRef = "ORD-1-MT06H0QG";
  const accountNumber = "PS12 PALS 5678 1234 0000 1234";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleCompleted = () => {
    navigate("/wallet/payment-success", {
      state: { package: pkg, method: "BANK" },
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
              بيانات التحويل البنكي المباشر
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

        {/* Main Bank Details Card */}
        <div className="rounded-3xl bg-white p-5 border border-slate-200/90 shadow-xs space-y-4 text-xs text-right">
          {/* Yellow Warning Alert */}
          <div className="flex items-start gap-2.5 rounded-2xl bg-[#FFFBEB] p-3.5 border border-[#FDE68A] text-[#92400E]">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-[#D97706]" />
            <p className="text-xs font-bold leading-relaxed">
              يُفعّل رصيدك تلقائياً بعد التحقق من التحويل خلال 1–2 يوم عمل
            </p>
          </div>

          {/* Bank Info Fields */}
          <div className="space-y-3 pt-1 divide-y divide-slate-100">
            <div className="flex items-center justify-between pt-1">
              <span className="text-text-muted">اسم المستفيد</span>
              <span className="font-black text-[#123A68]">
                شركة وصيل للخدمات الرقمية
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-text-muted">رقم الحساب</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(accountNumber, "account")}
                  className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  title="نسخ رقم الحساب"
                >
                  {copiedField === "account" ? (
                    <CheckCheck className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <span className="font-mono font-bold text-[#123A68] text-[11px] dir-ltr">
                  PS12 PALS 5678 1234 .... ....
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-text-muted">اسم البنك</span>
              <span className="font-black text-[#123A68]">
                البنك الإسلامي الفلسطيني
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-text-muted">المبلغ المطلوب</span>
              <span className="font-black text-[#123A68]">
                {pkg.priceNis} شيكل اسرائيلي
              </span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-text-muted">مرجع التحويل</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(transferRef, "ref")}
                  className="p-1 text-slate-400 hover:text-primary transition-colors cursor-pointer"
                  title="نسخ مرجع التحويل"
                >
                  {copiedField === "ref" ? (
                    <CheckCheck className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
                <span className="font-mono font-black text-[#123A68] bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                  {transferRef}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={handleCompleted}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#123A68] text-xs font-black text-white hover:bg-[#0D2C50] active:scale-98 transition-all cursor-pointer shadow-md"
            >
              <Check className="h-4 w-4 stroke-[3]" />
              <span>أتممت التحويل</span>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
