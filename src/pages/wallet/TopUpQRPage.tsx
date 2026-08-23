import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  QrCode,
  Clock,
  Copy,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { AppLayout } from "../../components/layout/AppLayout";
import { Card } from "../../components/ui/card/Card";
import { Button } from "../../components/ui/button/Button";

export default function TopUpQRPage() {
  const navigate = useNavigate();

  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  const packages = [
    { nis: 5, tokens: 5, bonus: 0 },
    { nis: 10, tokens: 10, bonus: 1, isPopular: true },
    { nis: 20, tokens: 20, bonus: 3 },
  ];

  // Expiry countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const invoiceId = `INV-JP-${selectedAmount * 100}-839210`;

  const copyInvoice = () => {
    navigator.clipboard.writeText(invoiceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout
      headerProps={{
        title: "شحن رصيد التوكنز",
        subtitle: "الدفع المباشر عبر محفظة جوال باي (Jawwal Pay)",
        showBack: true,
      }}
      showBottomNav={false}
    >
      <div className="space-y-4 pb-8 text-right">
        {/* Jawwal Pay Dedicated Provider Banner */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-border shadow-xs text-right">
          <div className="text-right">
            <span className="text-[11px] text-text-muted block">طريقة الدفع المعتمدة</span>
            <h3 className="text-sm font-black text-[#123A68] mt-0.5">
              جوال باي (Jawwal Pay)
            </h3>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Package Selector */}
        <div>
          <label className="block text-[13px] font-bold text-primary mb-2 text-right">
            اختر باقة التوكنز:
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {packages.map((pkg) => {
              const isSelected = selectedAmount === pkg.nis;
              return (
                <button
                  key={pkg.nis}
                  type="button"
                  onClick={() => setSelectedAmount(pkg.nis)}
                  className={`relative p-3 rounded-[16px] border-2 text-center transition-all cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent-light shadow-sm"
                      : "border-border bg-white hover:border-text-muted"
                  }`}
                >
                  {pkg.bonus > 0 && (
                    <span className="absolute -top-2.5 right-2 rounded-pill bg-[#F36F21] px-1.5 py-0.5 text-[9px] font-black text-white shadow-sm">
                      +{pkg.bonus} مجاناً
                    </span>
                  )}
                  <span className="text-[17px] font-black text-primary block">
                    {pkg.tokens + pkg.bonus} توكن
                  </span>
                  <span className="text-[12px] font-bold text-accent">
                    {pkg.nis} شيكل ₪
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic QR Display Card */}
        <Card variant="elevated">
          <div className="text-center">
            {/* Invoice Countdown */}
            <div className="inline-flex items-center gap-1.5 rounded-pill bg-amber-50 px-3 py-1 text-[12px] font-bold text-amber-700 border border-amber-200 mb-3">
              <Clock className="h-3.5 w-3.5" />
              <span>صلاحية الفاتورة: {formatTimer(timeLeft)}</span>
            </div>

            {/* Generated QR Code Simulation */}
            <div className="mx-auto my-2 flex h-52 w-52 items-center justify-center rounded-xl bg-white p-4 border-2 border-dashed border-accent/40 shadow-inner">
              <div className="flex flex-col items-center justify-center text-primary">
                <QrCode className="h-36 w-36 text-primary" />
                <span className="text-[11px] font-mono text-text-muted mt-1">
                  Jawwal Pay • {selectedAmount} NIS
                </span>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="mt-3 flex items-center justify-between rounded-[14px] bg-[#F8FAFC] p-3 border border-border/70 text-[12px]">
              <span className="text-text-secondary">رقم الفاتورة:</span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-primary">
                <span>{invoiceId}</span>
                <button
                  type="button"
                  onClick={copyInvoice}
                  className="text-text-muted hover:text-accent cursor-pointer"
                  title="نسخ"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            {copied && (
              <span className="text-[11px] font-bold text-emerald-600 mt-1 block">
                تم نسخ رقم الفاتورة!
              </span>
            )}
          </div>
        </Card>

        {/* Steps to Pay */}
        <div className="rounded-[18px] bg-white p-4 border border-border space-y-2 text-right">
          <h4 className="text-[13px] font-bold text-primary flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>خطوات الشحن عبر جوال باي (Jawwal Pay):</span>
          </h4>
          <ol className="text-[12px] text-text-secondary space-y-1.5 pr-4 list-decimal leading-relaxed">
            <li>افتح تطبيق <strong>جوال باي (Jawwal Pay)</strong> على هاتفك.</li>
            <li>اختر خيار <strong>مسح رمز QR (Scan & Pay)</strong>.</li>
            <li>امسح الرمز أعلاه وقم بتأكيد دفع <strong>{selectedAmount} شيكل</strong>.</li>
            <li>ستتم إضافة التوكنز إلى محفظتك في التطبيق تلقائياً!</li>
          </ol>
        </div>

        {/* Check Payment & Return */}
        <div className="pt-2 space-y-2">
          <Button
            variant="accent"
            size="md"
            fullWidth
            onClick={() => {
              navigate("/wallet");
            }}
            leftIcon={<Zap className="h-4 w-4" />}
          >
            تأكيد الدفع والعودة للمحفظة
          </Button>

          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => navigate("/wallet")}
          >
            إلغاء والعودة للمحفظة
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
