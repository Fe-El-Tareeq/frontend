import { useNavigate } from "react-router-dom";

function RequestCreated() {
  const navigate = useNavigate();

  return (
    <main
      dir="rtl"
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-[#F5F7FA]
        px-4
        py-8
      "
    >
      {/* ================= CARD ================= */}

      <div
        className="
          w-full
          max-w-[353px]
          rounded-[18px]
          border
          border-[#E1E4E8]
          bg-white
          px-5
          py-6
          shadow-sm
        "
      >

        {/* ================= SUCCESS ICON ================= */}

        <div className="flex justify-center">
          <div
            className="
              flex
              h-[80px]
              w-[80px]
              items-center
              justify-center
              rounded-full
              bg-[#DDF9E8]
            "
          >
            <div
              className="
                flex
                h-[32px]
                w-[32px]
                items-center
                justify-center
                rounded-full
                bg-[#22C55E]
                text-[20px]
                font-bold
                text-white
              "
            >
              ✓
            </div>
          </div>
        </div>


        {/* ================= TITLE ================= */}

        <div className="mt-5 text-center">

          <h1
            className="
              text-[24px]
              font-bold
              text-[#102F57]
            "
          >
            تم نشر الطلب
          </h1>

          <p
            className="
              mt-2
              text-[14px]
              leading-6
              text-[#667085]
            "
          >
            طلبك أصبح ظاهرًا للمستخدمين حسب المناطق
          </p>

        </div>


        {/* ================= REQUEST INFO ================= */}

        <div
          className="
            mt-5
            rounded-[12px]
            border
            border-[#D8E0E8]
            bg-[#F8FAFC]
            px-3
            py-3
          "
        >

          {/* First Row */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <span
                className="
                  text-[16px]
                  font-medium
                  text-[#102F57]
                "
              >
                التفاح
              </span>

              <span className="text-[22px] text-[#7B8494]">
                ←
              </span>

              <span
                className="
                  text-[16px]
                  font-medium
                  text-[#102F57]
                "
              >
                النصر
              </span>

            </div>

            <span
              className="
                rounded-full
                bg-[#DDF5EA]
                px-2
                py-1
                text-[10px]
                font-bold
                text-[#20A56A]
              "
            >
              ✓ تم النشر
            </span>

          </div>


          {/* Second Row */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              text-[11px]
              text-[#667085]
            "
          >

            <div className="flex items-center gap-1">
              <span className="text-[16px]">
                📅
              </span>

              <span>
                اليوم
              </span>
            </div>

            <span className="text-[#C5CBD3]">
              •
            </span>

            <div className="flex items-center gap-1">
              <span>
                الكمية قليلة و خفيفة
              </span>
            </div>

          </div>

        </div>


        {/* ================= VIEW REQUESTS ================= */}

        <button
          type="button"
          onClick={() => navigate("/requests")}
          className="
            mt-6
            h-[49px]
            w-full
            rounded-[10px]
            bg-[#FF7817]
            text-[15px]
            font-bold
            text-white
            shadow-sm
            transition
            hover:bg-[#E96B0D]
            active:scale-[0.99]
          "
        >
          عرض طلباتي
        </button>


        {/* ================= HOME ================= */}

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="
            mt-5
            w-full
            text-center
            text-[14px]
            font-medium
            text-[#7B8494]
            transition
            hover:text-[#FF7817]
          "
        >
          الرئيسية
        </button>

      </div>
    </main>
  );
}

export default RequestCreated;