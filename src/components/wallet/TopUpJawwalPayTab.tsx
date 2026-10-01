import type { FC, RefObject, KeyboardEvent } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

interface TopUpJawwalPayTabProps {
  jawwalPhone: string;
  setJawwalPhone: (v: string) => void;
  isOtpSent: boolean;
  setIsOtpSent: (v: boolean) => void;
  maskedPhone: string;
  otpDigits: string[];
  otpInputRefs: RefObject<(HTMLInputElement | null)[]>;
  handleOtpChange: (index: number, val: string) => void;
  handleOtpKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  handleSendOtp: () => void;
  handleResendOtp: () => void;
  handleVerifyOtpPayment: () => void;
  isCreatingInvoice: boolean;
  isVerifyingOtp: boolean;
  isResendingOtp: boolean;
}

export const TopUpJawwalPayTab: FC<TopUpJawwalPayTabProps> = ({
  jawwalPhone,
  setJawwalPhone,
  isOtpSent,
  setIsOtpSent,
  maskedPhone,
  otpDigits,
  otpInputRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleSendOtp,
  handleResendOtp,
  handleVerifyOtpPayment,
  isCreatingInvoice,
  isVerifyingOtp,
  isResendingOtp,
}) => {
  return (
    <div className="space-y-3.5 text-right py-1 animate-in fade-in duration-200">
      {/* Top Info Callout Box */}
      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F0F7FF] dark:bg-[#132F54] p-3 border border-blue-100/70 dark:border-white/10 text-right">
        <div className="text-base">📱</div>
        <p className="text-[11.5px] font-bold text-[#123A68] dark:text-blue-200 leading-relaxed flex-1">
          أدخل رقمك المسجّل في جوال باي وسيُرسل لك رمز تأكيد
        </p>
      </div>

      {/* Phone Input */}
      <div className="space-y-1.5">
        <label className="block text-xs font-black text-[#123A68] dark:text-white">
          رقم جوال باي
        </label>
        <div className="flex items-center gap-2" dir="ltr">
          <div className="flex h-11 items-center justify-center px-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
            +970
          </div>
          <input
            type="tel"
            value={jawwalPhone}
            onChange={(e) => setJawwalPhone(e.target.value)}
            disabled={isOtpSent}
            className="flex-1 h-11 rounded-2xl border border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] px-3.5 text-left text-xs font-bold text-slate-800 dark:text-white focus:bg-white dark:focus:bg-[#102A4C] focus:border-[#123A68] dark:focus:border-accent focus:outline-none transition-all disabled:opacity-60"
            placeholder="059xxxxxxx"
          />
        </div>
      </div>

      {/* Send OTP button */}
      {!isOtpSent && (
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={jawwalPhone.length < 9 || isCreatingInvoice}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#123A68] dark:bg-accent text-xs font-black text-white hover:bg-[#0D2C50] dark:hover:bg-[#E05E12] active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
        >
          {isCreatingInvoice ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>جاري إرسال الرمز...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4 -rotate-45" />
              <span>إرسال رمز التأكيد</span>
            </>
          )}
        </button>
      )}

      {/* Verification Code Section */}
      {isOtpSent && (
        <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-white/10 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#123A68] dark:text-white font-black">رمز التأكيد</span>
            <span className="text-text-muted dark:text-slate-400 text-[11px]" dir="ltr">
              {maskedPhone}
            </span>
          </div>

          {/* 6 Digits Boxes */}
          <div className="flex items-center justify-center gap-2" dir="ltr">
            {otpDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (otpInputRefs.current) {
                    otpInputRefs.current[index] = el;
                  }
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className={`h-11 w-11 rounded-2xl border text-center text-base font-black transition-all ${
                  digit
                    ? "border-[#123A68] dark:border-accent bg-white dark:bg-[#102A4C] text-[#123A68] dark:text-white shadow-xs"
                    : "border-slate-200 dark:border-white/10 bg-[#F8FAFC] dark:bg-[#0B1E36] text-slate-800 dark:text-white"
                } focus:border-[#F36F21] focus:bg-white dark:focus:bg-[#102A4C] focus:outline-none`}
              />
            ))}
          </div>

          <p className="text-[10.5px] text-text-muted dark:text-slate-400 text-center">
            أدخل رمز الـ OTP المكوّن من 6 أرقام المرسل عبر SMS
          </p>

          {/* Action Verify Button */}
          <button
            type="button"
            onClick={handleVerifyOtpPayment}
            disabled={otpDigits.join("").length !== 6 || isVerifyingOtp}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-2xl bg-[#059669] text-xs font-black text-white hover:bg-emerald-700 active:scale-98 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer shadow-md"
          >
            {isVerifyingOtp ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري تأكيد الدفع...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>تأكيد الخصم وإتمام الدفع</span>
              </>
            )}
          </button>

          {/* Resend Code Link */}
          <div className="flex items-center justify-between pt-1 text-[11px]">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResendingOtp}
              className="text-[#123A68] dark:text-[#38BDF8] font-bold hover:underline cursor-pointer disabled:opacity-50"
            >
              {isResendingOtp ? "جاري إعادة الإرسال..." : "إعادة إرسال الرمز"}
            </button>
            <button
              type="button"
              onClick={() => setIsOtpSent(false)}
              className="text-text-muted dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
            >
              تغيير الرقم
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
