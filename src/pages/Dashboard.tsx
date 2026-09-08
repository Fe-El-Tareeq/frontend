import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />


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
                onClick={() => navigate("/requests")}
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
              onClick={() => navigate("/add-trip")}
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
              onClick={() => navigate("/create-request")}
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