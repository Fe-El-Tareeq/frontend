import { useState } from "react";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="fixed right-0 top-0 z-30 flex h-[82px] w-full items-center justify-between border-b border-[#E5E8ED] bg-white px-5">

        {/* Menu */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-[42px] w-[42px] items-center justify-center rounded-[12px] text-[#263F61] hover:bg-[#F5F7FA]"
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
        <div className="hidden items-center gap-1 rounded-full bg-[#FFF1E8] px-4 py-2 text-[#FF7817] sm:flex">

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
          <span className="min-w-[15px]"></span>

        </div>


        {/* User */}
        <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#234A7D] text-[13px] font-bold text-white">
          هـم
        </div>

      </header>


      {/* =====================================================
          OVERLAY
      ===================================================== */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
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
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
      >

        {/* Sidebar Logo */}
        <div className="flex h-[132px] items-center justify-center bg-white">

          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-[65px] w-[68px] object-contain"
          />

        </div>


        {/* User */}
        <div className="border-b border-white/10 px-4 py-4">

          <div className="flex items-center justify-between">

            <div className="text-right">

              {/* اسم المستخدم من Backend */}
              <p className="text-[15px] font-bold text-white">
              </p>

              {/* المدينة من Backend */}
              <p className="mt-1 text-[12px] text-white/60">
              </p>

            </div>

            <div className="text-sm font-bold text-white">
              هـم
            </div>

          </div>

        </div>


        {/* Sidebar Menu */}
        <nav className="px-3 pt-4">


          {/* الرئيسية */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] bg-[#FF7817] px-4 text-white"
          >

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

            <span className="font-bold">
              الرئيسية
            </span>

          </button>


          {/* الرحلات */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 hover:bg-white/10"
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
              <path d="M7 11V8h7l3 3" />
            </svg>

            <span>
              الرحلات
            </span>

          </button>


          {/* الطلبات */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 hover:bg-white/10"
          >

            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            >
              <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
              <path d="m4 7.5 8 4.5 8-4.5" />
              <path d="M12 12v9" />
            </svg>

            <span>
              الطلبات
            </span>

          </button>


          {/* الرسائل */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center justify-between rounded-[15px] px-4 text-white/75 hover:bg-white/10"
          >

            <div className="flex items-center gap-4">

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
                <path d="M4 5h16v12H8l-4 4V5Z" />
              </svg>

              <span>
                الرسائل
              </span>

            </div>

            {/* عدد الرسائل من Backend */}
            <span className="h-[20px] w-[20px] rounded-full bg-[#FF3B4D]">
            </span>

          </button>


          {/* المحفظة */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 hover:bg-white/10"
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
              <rect x="3" y="6" width="18" height="14" rx="2" />
              <path d="M7 6V4h10v2" />
              <path d="M15 13h4" />
            </svg>

            <span>
              المحفظة
            </span>

          </button>


          {/* حسابي */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 hover:bg-white/10"
          >

            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="12" cy="8" r="3" />
              <path d="M5 21c0-4 3-6 7-6s7 2 7 6" />
            </svg>

            <span>
              حسابي
            </span>

          </button>


          {/* الإعدادات */}
          <button
            type="button"
            className="mb-1 flex h-[48px] w-full items-center gap-4 rounded-[15px] px-4 text-white/75 hover:bg-white/10"
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
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-2.5v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4v-2.5h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V4h2.5v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v2.5h-.1a1.7 1.7 0 0 0-1.6 1Z" />
            </svg>

            <span>
              الإعدادات
            </span>

          </button>

        </nav>


        {/* Sidebar Bottom */}
        <div className="absolute bottom-0 right-0 w-full px-3 pb-5">


          {/* Balance */}
          <div className="mb-4 flex h-[40px] items-center justify-between rounded-full border border-[#FF7817] px-4">

            <span className="text-[12px] text-white">
              رصيد التوكيز
            </span>

            {/* الرصيد من Backend */}
            <span className="text-[#FF7817]">
            </span>

          </div>


          {/* Logout */}
          <button
            type="button"
            className="flex h-[45px] w-full items-center gap-4 px-4 text-[#FF9696]"
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
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
            </svg>

            <span>
              تسجيل الخروج
            </span>

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="min-h-screen pt-[82px]">


        <section className="px-4 py-6 sm:px-6 lg:px-8">


          {/* =================================================
              CONTAINER 1
              يحتوي على الترحيب + الأشكال الأربعة
          ================================================= */}
          <div className="mb-8">


            {/* Welcome */}
            <div className="mb-5">

              <h1 className="text-[24px] font-bold text-[#102F57] sm:text-[27px]">
                مرحبًا بك في بطريقك 👋
              </h1>

              <p className="mt-1 text-[14px] text-[#7B8494]">
                {/* البيانات من Backend */}
              </p>

            </div>


            {/* Four Cards */}
            <div className="grid grid-cols-2 gap-4">


              {/* ================= BALANCE ================= */}
              <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-5 shadow-sm">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[14px] text-[#7B8494]">
                      رصيد التوكيز
                    </p>

                    {/* البيانات من Backend */}
                    <div className="mt-4 h-[30px]">
                    </div>

                    <div className="mt-2 h-[14px]">
                    </div>

                  </div>


                  {/* Orange Icon */}
                  <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[14px] bg-[#FF7817] text-white">

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />
                    </svg>

                  </div>

                </div>

              </div>


              {/* ================= ACTIVE TRIPS ================= */}
              <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-5 shadow-sm">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[14px] text-[#7B8494]">
                      الرحلات النشطة
                    </p>

                    {/* البيانات من Backend */}
                    <div className="mt-4 h-[30px]">
                    </div>

                    <div className="mt-2 h-[14px]">
                    </div>

                  </div>


                  {/* Blue Icon */}
                  <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[14px] bg-[#234A7D] text-white">

                    <svg
                      width="24"
                      height="24"
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

                  </div>

                </div>

              </div>


              {/* ================= NEW MESSAGES ================= */}
              <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-5 shadow-sm">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[14px] text-[#7B8494]">
                      الرسائل الجديدة
                    </p>

                    {/* البيانات من Backend */}
                    <div className="mt-4 h-[30px]">
                    </div>

                    <div className="mt-2 h-[14px]">
                    </div>

                  </div>


                  {/* Purple Icon */}
                  <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[14px] bg-[#8B00FF] text-white">

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
                      <path d="M4 5h16v12H8l-4 4V5Z" />
                    </svg>

                  </div>

                </div>

              </div>


              {/* ================= CURRENT ORDERS ================= */}
              <div className="min-h-[140px] rounded-[20px] border border-[#E3E7EC] bg-white p-5 shadow-sm">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[14px] text-[#7B8494]">
                      طلباتي الحالية
                    </p>

                    {/* البيانات من Backend */}
                    <div className="mt-4 h-[30px]">
                    </div>

                    <div className="mt-2 h-[14px]">
                    </div>

                  </div>


                  {/* Green Icon */}
                  <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[14px] bg-[#00A896] text-white">

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
                      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
                      <path d="m4 7.5 8 4.5 8-4.5" />
                      <path d="M12 12v9" />
                    </svg>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              CONTAINER 2 - فارغ
          ================================================= */}
          <section className="mb-8">

            <div className="mb-4 flex items-center justify-between">

              {/* العنوان سيتم تحديده لاحقًا */}
              <div className="h-[24px]">
              </div>

              {/* عرض الكل لاحقًا */}
              <div className="h-[20px]">
              </div>

            </div>


            <div className="min-h-[180px] rounded-[20px] border border-[#E3E7EC] bg-white shadow-sm">

              {/* 
                هذا الكونتينر جاهز لاستقبال بيانات Backend
              */}

            </div>

          </section>


          {/* =================================================
              CONTAINER 3 - فارغ
          ================================================= */}
          <section className="mb-8">

            <div className="mb-4 h-[24px]">
            </div>


            <div className="min-h-[180px] rounded-[20px] border border-[#E3E7EC] bg-white shadow-sm">

              {/* 
                هذا الكونتينر جاهز لاستقبال بيانات Backend
              */}

            </div>

          </section>


          {/* =================================================
              BUTTONS
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

        </section>

      </main>

    </div>
  );
}

export default Dashboard;