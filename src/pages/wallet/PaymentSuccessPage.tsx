import { useNavigate, useLocation } from "react-router-dom";
import { Check, Package, Wallet } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import type { TokenPackage } from "./BuyTokensPackages";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const pkg: TokenPackage = location.state?.package || {
    id: "pkg-pro",
    name: "الباقة الاحترافية",
    subtitle: "للمستخدمين الدائمين والنشطين",
    tokens: 50,
    priceUsd: 30,
    ratePerToken: "0.60$ لكل توكن",
    features: [],
  };

  const newBalance = 47 + pkg.tokens;

  return (
    <MobileContainer className="bg-[#F8FAFC] pb-24 text-right">
      <Header />

      <div className="px-4 pt-4 space-y-4">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-black text-[#123A68]">إتمام الدفع</h1>
        </div>

        {/* 4-Step Progress Bar (All Checked Green) */}
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 border border-border shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1 text-emerald-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              ✓
            </span>
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1 text-emerald-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              ✓
            </span>
            <span>طريقة الدفع</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1 text-emerald-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              ✓
            </span>
            <span>إتمام الدفع</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1 text-primary font-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] text-white text-[10px]">
              4
            </span>
            <span>تم الشراء</span>
          </div>
        </div>

        {/* Big Glowing Green Success Circle */}
        <div className="py-2 text-center space-y-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E6F9EE] shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981] text-white shadow-md">
              <Check className="h-7 w-7 stroke-[3]" />
            </div>
          </div>

          <h2 className="text-xl font-black text-[#123A68]">
            تمّ الشراء بنجاح! 🎉
          </h2>
          <p className="text-xs text-text-secondary">
            أضيف{" "}
            <strong className="text-[#F36F21] font-black">
              {pkg.tokens} توكن
            </strong>{" "}
            إلى رصيدك فوراً
          </p>
        </div>

        {/* Receipt Summary Card */}
        <div className="rounded-3xl bg-white p-5 border border-border shadow-xs space-y-3 text-xs text-right">
          <h3 className="text-sm font-black text-[#123A68] pb-1 border-b border-slate-100">
            ملخّص العملية
          </h3>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">{pkg.name}</span>
            <span className="text-text-muted">الباقة</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-black text-[#F36F21]">{pkg.tokens} توكن</span>
            <span className="text-text-muted">التوكنز المضافة</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-black text-[#123A68]">{pkg.priceUsd}$</span>
            <span className="text-text-muted">المبلغ المدفوع</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">رمز QR</span>
            <span className="text-text-muted">طريقة الدفع</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-slate-700">
              #TXN-MT8HEYO5
            </span>
            <span className="text-text-muted">رقم العملية</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <span className="font-bold text-slate-700">12:47 م</span>
            <span className="text-text-muted">الوقت</span>
          </div>
        </div>

        {/* Dark Navy New Balance Card */}
        <div className="rounded-3xl bg-[#123A68] p-5 text-white text-center space-y-1 shadow-md">
          <span className="text-[11px] text-white/70 block">رصيدك الجديد</span>
          <div className="text-3xl font-black text-white">{newBalance}</div>
          <span className="text-xs font-bold text-white/90">توكن</span>
          <p className="text-[11px] text-white/60 pt-0.5">
            يكفي لنشر {newBalance} طلب
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={() => navigate("/errands/new")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F36F21] text-xs font-black text-white hover:bg-[#E05E12] active:scale-98 transition-all cursor-pointer shadow-md"
          >
            <Package className="h-4 w-4" />
            <span>ابدأ بنشر طلب الآن</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/wallet")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F0F4F8] text-xs font-black text-[#123A68] hover:bg-slate-200 active:scale-98 transition-all cursor-pointer"
          >
            <Wallet className="h-4 w-4" />
            <span>العودة للمحفظة</span>
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => navigate("/wallet/buy-tokens")}
              className="text-xs font-bold text-text-muted hover:text-[#F36F21] transition-colors cursor-pointer"
            >
              شراء باقة أخرى
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
