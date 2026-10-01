import type { FC } from "react";
import { Copy, CheckCheck } from "lucide-react";

interface BankTransferDetailsCardProps {
  bankName: string;
  beneficiaryName: string;
  accountNumber: string;
  transferRef: string;
  priceNis: number;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export const BankTransferDetailsCard: FC<BankTransferDetailsCardProps> = ({
  bankName,
  beneficiaryName,
  accountNumber,
  transferRef,
  priceNis,
  copiedField,
  onCopy,
}) => {
  return (
    <div className="rounded-3xl bg-white dark:bg-[#102A4C] p-5 border border-slate-200/90 dark:border-white/10 shadow-xs space-y-3.5 text-right">
      <h3 className="text-xs font-black text-[#123A68] dark:text-white border-b border-slate-100 dark:border-white/10 pb-2">
        بيانات الحساب المصرفي للتحويل
      </h3>

      {/* Field: Bank Name */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 border border-slate-100 dark:border-white/5">
        <span className="text-xs font-black text-[#123A68] dark:text-white">{bankName}</span>
        <span className="text-[11px] text-text-muted dark:text-slate-400">اسم البنك</span>
      </div>

      {/* Field: Beneficiary */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 border border-slate-100 dark:border-white/5">
        <span className="text-xs font-black text-[#123A68] dark:text-white">
          {beneficiaryName}
        </span>
        <span className="text-[11px] text-text-muted dark:text-slate-400">المستفيد</span>
      </div>

      {/* Field: Account / IBAN */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] dark:bg-[#0B1E36] p-3 border border-slate-100 dark:border-white/5">
        <button
          type="button"
          onClick={() => onCopy(accountNumber, "account")}
          className="flex items-center gap-1 text-[11px] font-bold text-[#123A68] dark:text-slate-200 hover:text-[#F36F21] cursor-pointer"
        >
          {copiedField === "account" ? (
            <CheckCheck className="h-4 w-4 text-emerald-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copiedField === "account" ? "تم النسخ" : "نسخ"}</span>
        </button>
        <div className="text-right">
          <span className="text-xs font-mono font-bold text-[#123A68] dark:text-white block" dir="ltr">
            {accountNumber}
          </span>
          <span className="text-[10px] text-text-muted dark:text-slate-400 block">رقم الحساب / IBAN</span>
        </div>
      </div>

      {/* Field: Transfer Reference Note */}
      <div className="flex items-center justify-between rounded-2xl bg-orange-50/60 dark:bg-orange-950/30 p-3 border border-orange-200/60 dark:border-orange-500/20">
        <button
          type="button"
          onClick={() => onCopy(transferRef, "ref")}
          className="flex items-center gap-1 text-[11px] font-black text-[#F36F21] cursor-pointer"
        >
          {copiedField === "ref" ? (
            <CheckCheck className="h-4 w-4 text-emerald-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copiedField === "ref" ? "تم النسخ" : "نسخ"}</span>
        </button>
        <div className="text-right">
          <span className="text-xs font-mono font-black text-[#F36F21] block" dir="ltr">
            {transferRef}
          </span>
          <span className="text-[10px] font-bold text-orange-900 dark:text-orange-300 block">
            رقم المرجع (اكتبه في ملاحظة التحويل)
          </span>
        </div>
      </div>

      {/* Field: Total Amount */}
      <div className="flex items-center justify-between rounded-2xl bg-[#F0F7FF] dark:bg-[#132F54] p-3.5 border border-blue-100 dark:border-white/10">
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-[#123A68] dark:text-white">{priceNis}</span>
          <span className="text-xs font-black text-[#123A68] dark:text-white">₪</span>
        </div>
        <span className="text-xs font-black text-[#123A68] dark:text-white">
          المبلغ المطلوب تحويله
        </span>
      </div>
    </div>
  );
};
