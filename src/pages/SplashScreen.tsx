import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function SplashScreen() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/home", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#123A68] to-[#0A1F38] p-8 text-white select-none animate-fade-in"
      dir="rtl"
    >
      <div />

      {/* Center Brand Icon & Typography */}
      <div className="flex flex-col items-center text-center space-y-4">
        {/* App Icon Container */}
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-2xl ring-4 ring-white/10 p-2">
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-full w-full object-contain"
            onError={(e) => {
              // Fallback to text logo if image is missing
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-white">
            بطريقك
          </h1>
          <p className="text-xs font-bold text-orange-400">
            وصل أغراضك ووفر وقتك
          </p>
        </div>
      </div>

      {/* Bottom Loading Dots */}
      <div className="flex items-center gap-1.5 pb-6">
        <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce" />
        <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.2s]" />
        <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
