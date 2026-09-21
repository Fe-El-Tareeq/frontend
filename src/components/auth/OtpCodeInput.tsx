import { useRef, useEffect, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from "react";
import { cn } from "../../utils/cn";

export interface OtpCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export function OtpCodeInput({
  value = "",
  onChange,
  length = 6,
  disabled = false,
  error = false,
  autoFocus = false,
  className,
}: OtpCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Array of single digit chars
  const digits = Array.from({ length }, (_, i) => value[i] || "");

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const digit = rawVal.replace(/\D/g, "").slice(-1); // Only take last single digit

    const newDigits = [...digits];
    newDigits[index] = digit;
    const newValue = newDigits.join("");
    onChange(newValue);

    // If digit was entered, move to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // Move back and clear previous
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        inputRefs.current[index - 1]?.focus();
      } else if (digits[index]) {
        const newDigits = [...digits];
        newDigits[index] = "";
        onChange(newDigits.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      // In RTL, left arrow moves to next (index + 1) or previous depending on dir; let's support both
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pastedData) return;

    onChange(pastedData);
    const targetIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[targetIndex]?.focus();
  };

  return (
    <div
      dir="ltr"
      className={cn("flex items-center justify-center gap-2 sm:gap-2.5", className)}
    >
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        return (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index]}
            disabled={disabled}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1}`}
            className={cn(
              "h-12 w-11 sm:h-14 sm:w-12 text-center font-bold text-lg sm:text-xl rounded-2xl border transition-all duration-200 outline-none select-none",
              "bg-[#F8FAFC] text-[#123A68]",
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : isFilled
                  ? "border-[#123A68] bg-white ring-1 ring-[#123A68]/20"
                  : "border-slate-200 hover:border-slate-300 focus:border-[#F36F21] focus:bg-white focus:ring-2 focus:ring-[#F36F21]/20",
              disabled && "opacity-50 cursor-not-allowed bg-slate-100"
            )}
          />
        );
      })}
    </div>
  );
}
