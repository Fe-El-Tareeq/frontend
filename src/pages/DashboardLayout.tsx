import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isTripsPage = location.pathname === "/trips";

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >

      {/* ================= HEADER ================= */}

      <header className="h-[82px] bg-white flex items-center justify-between px-5">

        {/* الثلاث خطوط */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-[42px] w-[42px] items-center justify-center text-[26px] text-[#234B7D]"
        >
          ☰
        </button>

        {/* اللوجو */}
        <img
          src="/logo.png"
          alt="بطريقك"
          className="h-[50px] w-[60px] object-contain"
        />

      </header>


      {/* ================= SIDEBAR ================= */}

      {sidebarOpen && (
        <>
          {/* الخلفية */}
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />

          {/* Sidebar */}
          <aside className="fixed right-0 top-0 z-50 h-screen w-[256px] bg-[#234B7D] text-white shadow-xl">

            {/* إغلاق */}
            <div className="flex justify-start p-4">

              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="text-[28px]"
              >
                ×
              </button>

            </div>


            {/* بيانات المستخدم */}
            <div className="border-b border-white/10 px-5 pb-5">

              <p className="text-[16px] font-bold">
                هديل محمد
              </p>

              <p className="text-[12px] text-white/60">
                غزة - الرمال
              </p>

            </div>


            {/* القائمة */}
            <nav className="mt-5 space-y-2 px-3">

              {/* الرئيسية */}
              <button
                type="button"
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/dashboard");
                }}
                className={`
                  flex w-full items-center justify-between
                  rounded-[16px]
                  px-4 py-3
                  text-[16px]
                  ${
                    !isTripsPage
                      ? "bg-[#FF7817] text-white"
                      : "text-white/70 hover:bg-white/10"
                  }
                `}
              >
                <span>الرئيسية</span>
                <span>⌂</span>
              </button>


              {/* الرحلات */}
              <button
                type="button"
                onClick={() => {
                  setSidebarOpen(false);
                  navigate("/trips");
                }}
                className={`
                  flex w-full items-center justify-between
                  rounded-[16px]
                  px-4 py-3
                  text-[16px]
                  ${
                    isTripsPage
                      ? "bg-[#FF7817] text-white"
                      : "text-white/70 hover:bg-white/10"
                  }
                `}
              >
                <span>الرحلات</span>
                <span>🚗</span>
              </button>


              {/* الطلبات */}
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-[16px] text-white/70 hover:bg-white/10"
              >
                <span>الطلبات</span>
                <span>□</span>
              </button>


              {/* الرسائل */}
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-[16px] text-white/70 hover:bg-white/10"
              >
                <span>الرسائل</span>

                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px]">
                  3
                </span>
              </button>


              {/* المحفظة */}
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-[16px] text-white/70 hover:bg-white/10"
              >
                <span>المحفظة</span>
                <span>▣</span>
              </button>


              {/* حسابي */}
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-[16px] text-white/70 hover:bg-white/10"
              >
                <span>حسابي</span>
                <span>♙</span>
              </button>


              {/* الإعدادات */}
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-[16px] px-4 py-3 text-[16px] text-white/70 hover:bg-white/10"
              >
                <span>الإعدادات</span>
                <span>⚙</span>
              </button>

            </nav>


            {/* أسفل Sidebar */}
            <div className="absolute bottom-5 left-3 right-3">

              {/* الرصيد */}
              <div className="mb-4 rounded-[18px] border border-[#FF7817] px-4 py-3">

                <div className="flex items-center justify-between">

                  <span className="text-[13px] text-white/70">
                    رصيد التوكنز
                  </span>

                  <span className="font-bold text-[#FF7817]">
                    ⚡ 47
                  </span>

                </div>

              </div>


              {/* تسجيل الخروج */}
              <button
                type="button"
                onClick={() => navigate("/welcome")}
                className="flex w-full items-center justify-between px-4 py-3 text-[#FF9B9B]"
              >
                <span>تسجيل الخروج</span>
                <span>↪</span>
              </button>

            </div>

          </aside>
        </>
      )}


      {/* ================= PAGE ================= */}

      <main>
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;