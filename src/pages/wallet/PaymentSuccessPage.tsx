import { useNavigate, useLocation } from "react-router-dom";
import { Check, Wallet, Home, ChevronRight } from "lucide-react";
import { Header } from "../../components/layout/Header";
import { MobileContainer } from "../../components/layout/MobileContainer";
import { useWallet } from "../../hooks/useWallet";
import type { TokenPackage } from "./BuyTokensPackages";

export default function PaymentSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenBalance } = useWallet();

  const pkg: TokenPackage = location.state?.package || {
    id: "pkg-pro",
    name: "الباقة الاحترافية",
    subtitle: "للمستخدمين الدائمين والنشطين",
    tokens: 50,
    priceNis: 15,
    ratePerToken: "2 ₪ لكل توكن نسبة التوفير 40%",
    features: [],
  };

  const paymentMethod =
    location.state?.method === "BANK" ? "تحويل بنكي" : "رمز QR";

  const currentBal = tokenBalance ?? 47;
  const newBalance = currentBal + pkg.tokens;

  return (
    <MobileContainer className="bg-[#F8FAFC] dark:bg-[#0B1E36] pb-24 lg:pb-12 text-right">
      <Header />

      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 space-y-6">
        {/* Title */}
        <div className="text-center">
        </div>
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
            <h1 className="text-xl font-black text-[#123A68] dark:text-white">إتمام الدفع</h1>
          </div>
        </div>

        {/* 4-Step Progress Bar (Step 4 Active, 1-3 Checked Green) */}
        <div className="flex items-center justify-between rounded-2xl bg-white dark:bg-[#102A4C] p-3 border border-slate-200/80 dark:border-white/10 shadow-2xs text-[11px] font-bold text-center">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-3" />
            </span>
            <span>اختر الباقة</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-3" />
            </span>
            <span>طريقة الدفع</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white text-[10px]">
              <Check className="h-3 w-3 stroke-3" />
            </span>
            <span>إتمام الدفع</span>
          </div>
          <span className="text-emerald-500">──</span>
          <div className="flex items-center gap-1.5 text-[#123A68] dark:text-white font-black">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#123A68] dark:bg-accent text-white text-[10px]">
              4
            </span>
            <span>تم الشراء</span>
          </div>
        </div>

        {/* Big Glowing Green Success Circle */}
        <div className="py-2 text-center space-y-2">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100/70 dark:bg-emerald-950/40 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981] text-white shadow-md">
              <Check className="h-8 w-8 stroke-3" />
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#123A68] dark:text-white flex items-center justify-center gap-1.5">
            <span>تمّ الشراء بنجاح!</span>
            <span>🎉</span>
          </h2>
          <p className="text-xs text-text-secondary dark:text-slate-300">
            أُضيف{" "}
            <strong className="text-[#F36F21] font-black">
              {pkg.tokens} توكن
            </strong>{" "}
            إلى رصيدك فوراً
          </p>
        </div>

        {/* Receipt Summary Card */}
        <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-3 text-xs text-right">
          <h3 className="text-sm font-black text-[#123A68] dark:text-white pb-1">
            ملخّص العملية
          </h3>

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/10 pt-2.5">
            <span className="text-text-muted dark:text-slate-400">الباقة</span>
            <span className="font-bold text-primary dark:text-white">{pkg.name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-muted dark:text-slate-400">التوكنز المضافة</span>
            <span className="font-black text-[#F36F21]">{pkg.tokens} توكن</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-muted dark:text-slate-400">المبلغ المدفوع</span>
            <span className="font-black text-[#123A68] dark:text-white">{pkg.priceNis} ₪</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-muted dark:text-slate-400">طريقة الدفع</span>
            <span className="font-bold text-primary dark:text-white">{paymentMethod}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-muted dark:text-slate-400">رقم العملية</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              #TXN-MT8HEYO5
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-muted dark:text-slate-400">الوقت</span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {new Date().toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Dark Navy New Balance Card */}
        <div className="rounded-3xl bg-[#123A68] dark:bg-[#132F54] dark:border dark:border-white/10 p-5 text-white text-center space-y-1 shadow-md">
          <span className="text-[11px] text-white/70 block">رصيدك الجديد</span>
          <div className="text-4xl font-black text-white">{newBalance}</div>
          <span className="text-xs font-bold text-white/90">توكن</span>
          <p className="text-[11px] text-white/60 pt-0.5">
            يكفي لنشر {newBalance} طلب
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            type="button"
            onClick={() => navigate("/wallet")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F0F4F8] dark:bg-[#132F54] text-xs font-black text-[#123A68] dark:text-white hover:bg-slate-200 dark:hover:bg-[#183B6B] active:scale-98 transition-all cursor-pointer border border-transparent dark:border-white/10"
          >
            <Wallet className="h-4 w-4" />
            <span>العودة للمحفظة</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/home")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#102A4C] text-xs font-black text-[#123A68] dark:text-white hover:bg-slate-50 dark:hover:bg-[#132F54] active:scale-98 transition-all cursor-pointer shadow-2xs"
          >
            <Home className="h-4 w-4" />
            <span>العودة للرئيسية</span>
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

