import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./Input";
import type { InputProps } from "./Input";

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      ref={ref}
      type={showPassword ? "text" : "password"}
      leftElement={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-text-muted hover:text-primary transition-colors focus:outline-none p-1"
          tabIndex={-1}
          aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      }
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
