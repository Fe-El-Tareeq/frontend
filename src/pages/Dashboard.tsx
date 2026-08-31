import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // فتح وإغلاق الـ Sidebar على الهاتف
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="fixed right-0 top-0 z-30 flex h-[82px] w-full items-center justify-between bg-white px-5 shadow-sm lg:pr-[280px]">

        {/* Menu Button */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="text-[#263F61]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>


        {/* Location */}
        <button
          type="button"
          className="hidden h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-[#E1E5EA] bg-[#FAFBFC] text-[#FF7817] sm:flex"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </button>


        {/* Notification */}
        <button
          type="button"
          className="hidden text-[#5C6675] sm:block"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>
        </button>


        {/* Balance */}
        <div className="hidden items-center gap-2 rounded-full bg-[#FFF1E8] px-4 py-2 text-[#FF7817] sm:flex">

          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
          </svg>

          {/* سيتم وضع الرصيد من Backend */}
          <span className="font-bold"></span>

        </div>


        {/* User */}
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#234A7D] text-[13px] font-bold text-white">
          هـم
        </div>

      </header>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}


      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside
        className={`
          fixed right-0 top-0 z-50
          h-screen w-[256px]
          bg-[#234A7D]
          transition-transform duration-300

          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >

        {/* Close Button - Mobile */}
        <div className="flex h-[45px] items-center justify-start px-4 lg:hidden">

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-[28px] leading-none text-white"
          >
            ×
          </button>

        </div>


        {/* =================================================
            LOGO
        ================================================= */}
        <div className="flex h-[87px] items-center justify-center bg-white">

          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-[65px] w-[68px] object-contain"
          />

        </div>


        {/* =================================================
            USER INFO
        ================================================= */}
        <div className="border-b border-white/10 px-4 py-4">

          <div className="flex items-center justify-between">

            <div className="text-right">

              {/* البيانات ستأتي من Backend */}
              <p className="text-[15px] font-bold text-white">
              </p>

              <p className="mt-1 text-[12px] text-white/60">
              </p>

            </div>

            <span className="font-bold text-white">
              هـم
            </span>

          </div>

        </div>


        {/* =================================================
            SIDEBAR MENU
        ================================================= */}
        <nav className="px-3 pt-4">


          {/* ================= الرئيسية ================= */}
          <Link
            to="/dashboard"
            onClick={() => setSidebarOpen(false)}
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] bg-[#FF7817] px-4 font-bold text-white"
          >

            {/* Home Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
              <path d="M9 21v-6h6v6" />
            </svg>

            <span>
              الرئيسية
            </span>

          </Link>


          {/* ================= الرحلات ================= */}
          <Link
            to="/trips"
            onClick={() => setSidebarOpen(false)}
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 transition hover:bg-white/10"
          >

            {/* Car Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 17h2l2-6h8l4 3h2v3h-2" />
              <path d="M5 17a2 2 0 1 0 4 0" />
              <path d="M17 17a2 2 0 1 0 4 0" />
              <path d="M7 11V8h7l3 3" />
            </svg>

            <span>
              الرحلات
            </span>

          </Link>


          {/* ================= الطلبات ================= */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 transition hover:bg-white/10"
          >

            {/* Box Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
              <path d="m4 7.5 8 4.5 8-4.5" />
              <path d="M12 12v9" />
            </svg>

            <span>
              الطلبات
            </span>

          </button>


          {/* ================= الرسائل ================= */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 transition hover:bg-white/10"
          >

            {/* Message Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M4 5h16v12H8l-4 4V5Z" />
            </svg>


            <span>
              الرسائل
            </span>


            {/* Notification Number */}
            <span className="mr-auto flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FF3B45] text-[10px] font-bold text-white">
            </span>

          </button>


          {/* ================= المحفظة ================= */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 transition hover:bg-white/10"
          >

            {/* Wallet Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="3"
                y="6"
                width="18"
                height="14"
                rx="2"
              />

              <path d="M7 6V4h10v2" />

              <path d="M15 13h4" />
            </svg>

            <span>
              المحفظة
            </span>

          </button>


          {/* ================= حسابي ================= */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 transition hover:bg-white/10"
          >

            {/* User Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="12"
                cy="8"
                r="3"
              />

              <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
            </svg>

            <span>
              حسابي
            </span>

          </button>


          {/* ================= الإعدادات ================= */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 transition hover:bg-white/10"
          >

            {/* Settings Icon */}
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle
                cx="12"
                cy="12"
                r="3"
              />

              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4v-2.5h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V4h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.6 1Z" />
            </svg>

            <span>
              الإعدادات
            </span>

          </button>

        </nav>


        {/* =================================================
            SIDEBAR BOTTOM
        ================================================= */}
        <div className="absolute bottom-0 right-0 w-full px-3 pb-5">

          {/* Balance */}
          <div className="mb-4 flex h-[40px] items-center justify-between rounded-full border border-[#FF7817] px-4">

            <span className="text-[12px] text-white">
              رصيد التوكيز
            </span>

            {/* Backend Balance */}
            <span className="font-bold text-[#FF7817]">
            </span>

          </div>


          {/* Logout */}
          <button
            type="button"
            onClick={() => navigate("/welcome")}
            className="flex h-[45px] w-full items-center gap-4 px-4 text-[#FF9696]"
          >

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 5H5v14h4" />
              <path d="M13 8l4 4-4 4" />
              <path d="M17 12H9" />
            </svg>

            <span>
              تسجيل الخروج
            </span>

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="min-h-screen pt-[82px] lg:mr-[256px]">

        <div className="mx-auto max-w-[1000px] px-4 py-7 sm:px-6">


          {/* =================================================
              WELCOME
          ================================================= */}
          <section className="mb-6">

            <h1 className="text-right text-[25px] font-bold text-[#102F57]">
              مرحبًا بك في بطريقك 👋
            </h1>

            <p className="mt-1 text-right text-[14px] text-[#7B8494]">
              إليك ملخص نشاطك اليوم
            </p>

          </section>


          {/* =================================================
              FOUR CARDS
          ================================================= */}
          <section className="mb-8 grid grid-cols-2 gap-4">


            {/* ================= CARD 1 ================= */}
            <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-4 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[14px] text-[#7B8494]">
                    رصيد التوكيز
                  </p>

                  {/* Backend */}
                  <p className="mt-2 text-[24px] font-bold text-[#FF7817]">
                  </p>

                  <p className="mt-1 text-[11px] text-[#A0A7B1]">
                  </p>

                </div>


                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#FF7817] text-white">

                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
                  </svg>

                </div>

              </div>

            </div>


            {/* ================= CARD 2 ================= */}
            <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-4 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[14px] text-[#7B8494]">
                    الرحلات النشطة
                  </p>

                  {/* Backend */}
                  <p className="mt-2 text-[24px] font-bold text-[#234A7D]">
                  </p>

                  <p className="mt-1 text-[11px] text-[#A0A7B1]">
                  </p>

                </div>


                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#234A7D] text-white">

                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 17h2l2-6h8l4 3h2v3h-2" />
                    <path d="M5 17a2 2 0 1 0 4 0" />
                    <path d="M17 17a2 2 0 1 0 4 0" />
                  </svg>

                </div>

              </div>

            </div>


            {/* ================= CARD 3 ================= */}
            <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-4 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[14px] text-[#7B8494]">
                    الرسائل الجديدة
                  </p>

                  {/* Backend */}
                  <p className="mt-2 text-[24px] font-bold text-[#9B12FF]">
                  </p>

                  <p className="mt-1 text-[11px] text-[#A0A7B1]">
                  </p>

                </div>


                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#9B12FF] text-white">

                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M4 5h16v12H8l-4 4V5Z" />
                  </svg>

                </div>

              </div>

            </div>


            {/* ================= CARD 4 ================= */}
            <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-4 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-[14px] text-[#7B8494]">
                    طلباتي الحالية
                  </p>

                  {/* Backend */}
                  <p className="mt-2 text-[24px] font-bold text-[#00A394]">
                  </p>

                  <p className="mt-1 text-[11px] text-[#A0A7B1]">
                  </p>

                </div>


                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-[14px] bg-[#00A394] text-white">

                  <svg
                    width="23"
                    height="23"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                    <path d="m4 7.5 8 4.5 8-4.5" />
                    <path d="M12 12v9" />
                  </svg>

                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              AVAILABLE TRIPS
          ================================================= */}
          <section className="mb-8">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-[19px] font-bold text-[#102F57]">
                الرحلات المتاحة بالقرب منك
              </h2>

              <Link
                to="/trips"
                className="text-[13px] font-bold text-[#FF7817]"
              >
                عرض الكل ←
              </Link>

            </div>


            {/* Backend Container */}
            <div className="min-h-[180px] rounded-[20px] border border-[#E3E7EC] bg-white p-4 shadow-sm">

              {/*

                الرحلات ستأتي من Backend

                مثال مستقبلي:

                trips.map(...)

              */}

            </div>

          </section>


          {/* =================================================
              NEARBY REQUESTS
          ================================================= */}
          <section className="mb-8">

            <div className="mb-4 flex items-center justify-between">

              <h2 className="text-[19px] font-bold text-[#102F57]">
                الطلبات القريبة
              </h2>

              <button
                type="button"
                className="text-[13px] font-bold text-[#FF7817]"
              >
                عرض الكل ←
              </button>

            </div>


            {/* Backend Container */}
            <div className="min-h-[180px] rounded-[20px] border border-[#E3E7EC] bg-white p-4 shadow-sm">

              {/*

                الطلبات ستأتي من Backend

                مثال مستقبلي:

                requests.map(...)

              */}

            </div>

          </section>


          {/* =================================================
              BOTTOM BUTTONS
          ================================================= */}
          <div className="flex gap-3 pb-8">


            {/* إضافة رحلة */}
            <button
              type="button"
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[17px] bg-[#234A7D] text-[15px] font-bold text-white shadow-sm"
            >

              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 17h2l2-6h8l4 3h2v3h-2" />
                <path d="M5 17a2 2 0 1 0 4 0" />
                <path d="M17 17a2 2 0 1 0 4 0" />
              </svg>

              إضافة رحلة

            </button>


            {/* إنشاء طلب جديد */}
            <button
              type="button"
              className="flex h-[52px] flex-1 items-center justify-center gap-2 rounded-[17px] bg-[#FF7817] text-[15px] font-bold text-white shadow-sm"
            >

              <span className="text-[22px]">
                +
              </span>

              إنشاء طلب جديد

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;