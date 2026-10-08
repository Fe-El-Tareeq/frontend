import type { ReactNode } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { ShieldAlert, ArrowRight, LogOut, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/useAuthStore";
import { authApi } from "../../api/auth";
import { AUTH_KEYS } from "../../hooks/useAuth";

export const ADMIN_EMAIL = "bitareqk@gmail.com";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = Boolean(user && accessToken);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login and save current path to return after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const isAuthenticated = Boolean(user && accessToken);

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}

export function AdminRoute({ children }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = Boolean(user && accessToken);
  const location = useLocation();

  // If user is authenticated but email is missing from store, try fetching me profile
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: () => authApi.getMe(),
    enabled: isAuthenticated && !user?.email,
    select: (res) => res.data,
  });

  // 1. Unauthenticated users -> redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Loading state while fetching profile email if not already present
  if (isLoadingProfile && !user?.email) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#071322] text-white gap-3 font-sans">
        <div className="h-12 w-12 rounded-2xl bg-[#0F223A] border border-[#1E3A5F] flex items-center justify-center shadow-lg">
          <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
        </div>
        <span className="text-xs text-slate-400 font-bold">
          جاري التحقق من صلاحيات المشرف...
        </span>
      </div>
    );
  }

  // 3. Check authorized email (case-insensitive)
  const currentEmail = (user?.email || profile?.email || "")?.trim().toLowerCase();
  const isAuthorized = currentEmail === ADMIN_EMAIL.toLowerCase();

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#071322] text-white p-4 font-sans text-right dir-rtl">
        <div className="w-full max-w-md rounded-2xl bg-[#0C1B2E] border border-red-500/30 p-6 md:p-8 shadow-2xl space-y-6 text-center">
          <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto flex items-center justify-center shadow-inner">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-black text-white">
              غير مصرح بالدخول — منطقة إدارة محمية
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              لوحة التحكم مخصصة حصرياً لبريد المشرف المعتمد:
            </p>
            <div className="py-1.5 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-xs font-bold inline-block dir-ltr">
              {ADMIN_EMAIL}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E233C] border border-[#183659] text-xs text-slate-400 space-y-1">
            <span className="block text-[11px] text-slate-500">حسابك الحالي:</span>
            <span className="block font-bold text-slate-200 font-mono">
              {currentEmail || user?.phone || "مستخدم غير مصرح"}
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              to="/home"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>العودة إلى الصفحة الرئيسية</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => logout()}
              className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-white/10"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>تسجيل الخروج والتبديل لحساب آخر</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authorized admin -> render children
  return <>{children}</>;
}
