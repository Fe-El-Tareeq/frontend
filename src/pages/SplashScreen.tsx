import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function SplashScreen() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = Boolean(user && accessToken);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/home", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }, 1800);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between bg-white px-6 py-10 select-none animate-fade-in"
      dir="rtl"
    >
      {/* Top spacing */}
      <div className="w-full h-8" />

      {/* Center Brand Icon & Title */}
      <div className="flex flex-col items-center justify-center text-center space-y-5 my-auto">
        {/* App Logo Container - Proportional & Responsive across all screen sizes */}
        <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 max-w-[32vw] max-h-[32vw] aspect-square rounded-3xl bg-white shadow-lg shadow-slate-100/80 border border-slate-100 p-3 transition-transform duration-500 hover:scale-105">
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-full w-full object-contain drop-shadow-sm select-none"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Brand Name & Tagline */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#123A68]">
            بطريقك
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-500">
            منصة التوصيل المجتمعي التضامني
          </p>
        </div>
      </div>

      {/* Bottom Loading Indicator */}
      <div className="flex flex-col items-center space-y-3 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#123A68] animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-[#F36F21] animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-[#123A68] animate-bounce" />
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          جاري التحميل...
        </span>
      </div>
    </div>
  );
}
