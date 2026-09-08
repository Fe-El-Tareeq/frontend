import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Trips() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >

      {/* =====================================================
          HEADER COMPONENT
      ===================================================== */}

      <Header />


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main
        className="
          min-h-screen
          pt-[82px]
          lg:mr-[256px]
        "
      >

        <div
          className="
            mx-auto
            max-w-[1000px]
            px-4
            py-7
            sm:px-6
          "
        >

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <section className="mb-5">

            <div className="flex items-center justify-between">

              <div>

                <h1
                  className="
                    text-[25px]
                    font-bold
                    text-[#102F57]
                  "
                >
                  الرحلات
                </h1>

                <p
                  className="
                    mt-1
                    text-[14px]
                    text-[#7B8494]
                  "
                >
                  6 رحلات متاحة
                </p>

              </div>


              {/* إضافة رحلة */}

              <button
                type="button"
                onClick={() => navigate("/add-trip")}
                className="
                  flex
                  h-[44px]
                  items-center
                  gap-2
                  rounded-[15px]
                  bg-[#FF7817]
                  px-4
                  text-[14px]
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#e96b0f]
                "
              >
                <span className="text-[20px]">
                  +
                </span>

                إضافة رحلة
              </button>

            </div>

          </section>


          {/* =================================================
              SEARCH & FILTER
          ================================================= */}

          <section
            className="
              mb-8
              rounded-[20px]
              border border-[#E3E7EC]
              bg-white
              p-4
              shadow-sm
            "
          >

            {/* البحث */}

            <div className="mb-3">

              <div
                className="
                  flex
                  h-[48px]
                  items-center
                  rounded-[14px]
                  border border-[#E1E5EA]
                  bg-[#FAFBFC]
                  px-4
                "
              >

                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9AA3AF"
                  strokeWidth="2"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="text"
                  placeholder="ابحث عن وجهة أو مسافر..."
                  className="
                    mr-3
                    w-full
                    bg-transparent
                    text-right
                    text-[13px]
                    text-[#263F61]
                    outline-none
                    placeholder:text-[#A0A7B1]
                  "
                />

              </div>

            </div>


            {/* المدينة */}

            <div
              className="
                mb-3
                flex
                h-[48px]
                items-center
                justify-between
                rounded-[14px]
                border border-[#E1E5EA]
                bg-[#FAFBFC]
                px-4
              "
            >

              <select
                className="
                  w-full
                  appearance-none
                  bg-transparent
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                "
                defaultValue=""
              >

                <option value="" disabled>
                  كل المدن
                </option>

                <option value="gaza">
                  غزة
                </option>

                <option value="north-gaza">
                  شمال غزة
                </option>

                <option value="middle">
                  الوسطى
                </option>

                <option value="khan-younis">
                  خانيونس
                </option>

                <option value="rafah">
                  رفح
                </option>

              </select>

            </div>


            {/* الترتيب */}

            <div
              className="
                flex
                h-[48px]
                items-center
                justify-between
                rounded-[14px]
                border border-[#E1E5EA]
                bg-[#FAFBFC]
                px-4
              "
            >

              <select
                className="
                  w-full
                  appearance-none
                  bg-transparent
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                "
                defaultValue="newest"
              >

                <option value="newest">
                  الترتيب: الأحدث
                </option>

                <option value="oldest">
                  الأقدم
                </option>

                <option value="rating">
                  الأعلى تقييمًا
                </option>

              </select>

            </div>

          </section>


          {/* =================================================
              TRIPS LIST
          ================================================= */}

          <section className="space-y-4">


            {/* ================= TRIP 1 ================= */}

            <div
              className="
                rounded-[20px]
                border border-[#E3E7EC]
                bg-white
                p-4
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                {/* User */}

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-[38px] w-[38px]
                      items-center justify-center
                      rounded-full
                      bg-[#FF7817]
                      font-bold
                      text-white
                    "
                  >
                    أح
                  </div>

                  <div>

                    <h3 className="text-[15px] font-bold text-[#102F57]">
                      أحمد خالد
                    </h3>

                    <p className="text-[12px] text-[#8B94A1]">
                      حتى ٥ أغراض
                    </p>

                  </div>

                </div>


                {/* Rating */}

                <div className="text-[12px] text-[#687386]">
                  ⭐ 4.9
                </div>

              </div>


              {/* Route */}

              <div
                className="
                  my-4
                  rounded-[15px]
                  bg-[#F3F6FA]
                  p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#234A7D]" />

                  <span className="text-[14px] text-[#234A7D]">
                    غزة - الرمال
                  </span>

                </div>

                <div
                  className="
                    mr-[3px]
                    h-[25px]
                    border-r-2
                    border-dashed
                    border-[#CBD3DE]
                  "
                />

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#FF7817]" />

                  <span className="text-[14px] text-[#FF7817]">
                    رفح
                  </span>

                </div>

              </div>


              {/* Date */}

              <div
                className="
                  mb-3
                  flex
                  items-center
                  justify-end
                  gap-4
                  text-[12px]
                  text-[#7B8494]
                "
              >

                <span>
                  📅 ٢٣ يوليو ٢٠٢٦
                </span>

                <span>
                  🕐 ١٠:٣٠ ص
                </span>

              </div>


              {/* Note */}

              <div
                className="
                  mb-3
                  rounded-[12px]
                  border
                  border-[#FFE6A6]
                  bg-[#FFFBEF]
                  px-3
                  py-2
                  text-right
                  text-[11px]
                  text-[#8B7A40]
                "
              >
                📝 لا مانع من الأغراض الثقيلة
              </div>


              {/* Button */}

              <button
                type="button"
                className="
                  h-[42px]
                  w-full
                  rounded-full
                  bg-[#234A7D]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                عرض التفاصيل
              </button>

            </div>


            {/* ================= TRIP 2 ================= */}

            <div
              className="
                rounded-[20px]
                border border-[#E3E7EC]
                bg-white
                p-4
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-[38px] w-[38px]
                      items-center justify-center
                      rounded-full
                      bg-[#F00045]
                      font-bold
                      text-white
                    "
                  >
                    س
                  </div>

                  <div>

                    <h3 className="text-[15px] font-bold text-[#102F57]">
                      سارة عمر
                    </h3>

                    <p className="text-[12px] text-[#8B94A1]">
                      حتى ٤ أغراض
                    </p>

                  </div>

                </div>

                <div className="text-[12px] text-[#687386]">
                  ⭐ 4.7
                </div>

              </div>


              <div
                className="
                  my-4
                  rounded-[15px]
                  bg-[#F3F6FA]
                  p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#234A7D]" />

                  <span className="text-[14px] text-[#234A7D]">
                    خان يونس
                  </span>

                </div>

                <div
                  className="
                    mr-[3px]
                    h-[25px]
                    border-r-2
                    border-dashed
                    border-[#CBD3DE]
                  "
                />

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#FF7817]" />

                  <span className="text-[14px] text-[#FF7817]">
                    غزة - الشجاعية
                  </span>

                </div>

              </div>


              <div
                className="
                  mb-4
                  flex
                  justify-end
                  gap-4
                  text-[12px]
                  text-[#7B8494]
                "
              >

                <span>
                  📅 ٢٤ يوليو ٢٠٢٦
                </span>

                <span>
                  🕐 ٢:٠٠ م
                </span>

              </div>


              <button
                type="button"
                className="
                  h-[42px]
                  w-full
                  rounded-full
                  bg-[#234A7D]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                عرض التفاصيل
              </button>

            </div>


            {/* ================= TRIP 3 ================= */}

            <div
              className="
                rounded-[20px]
                border border-[#E3E7EC]
                bg-white
                p-4
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-[38px] w-[38px]
                      items-center justify-center
                      rounded-full
                      bg-[#00A394]
                      font-bold
                      text-white
                    "
                  >
                    مح
                  </div>

                  <div>

                    <h3 className="text-[15px] font-bold text-[#102F57]">
                      محمد يوسف
                    </h3>

                    <p className="text-[12px] text-[#8B94A1]">
                      حتى ٥ أغراض
                    </p>

                  </div>

                </div>

                <div className="text-[12px] text-[#687386]">
                  ⭐ 5.0
                </div>

              </div>


              <div
                className="
                  my-4
                  rounded-[15px]
                  bg-[#F3F6FA]
                  p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#234A7D]" />

                  <span className="text-[14px] text-[#234A7D]">
                    دير البلح
                  </span>

                </div>

                <div
                  className="
                    mr-[3px]
                    h-[25px]
                    border-r-2
                    border-dashed
                    border-[#CBD3DE]
                  "
                />

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#FF7817]" />

                  <span className="text-[14px] text-[#FF7817]">
                    بيت لاهيا
                  </span>

                </div>

              </div>


              <div
                className="
                  mb-4
                  flex
                  justify-end
                  gap-4
                  text-[12px]
                  text-[#7B8494]
                "
              >

                <span>
                  📅 ٢٥ يوليو ٢٠٢٦
                </span>

                <span>
                  🕐 ٩:٠٠ ص
                </span>

              </div>


              <div
                className="
                  mb-3
                  rounded-[12px]
                  border
                  border-[#FFE6A6]
                  bg-[#FFFBEF]
                  px-3
                  py-2
                  text-right
                  text-[11px]
                  text-[#8B7A40]
                "
              >
                📝 أغراض خفيفة فقط
              </div>


              <button
                type="button"
                className="
                  h-[42px]
                  w-full
                  rounded-full
                  bg-[#234A7D]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                عرض التفاصيل
              </button>

            </div>


            {/* ================= TRIP 4 ================= */}

            <div
              className="
                rounded-[20px]
                border border-[#E3E7EC]
                bg-white
                p-4
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-[38px] w-[38px]
                      items-center justify-center
                      rounded-full
                      bg-[#9B12FF]
                      font-bold
                      text-white
                    "
                  >
                    لي
                  </div>

                  <div>

                    <h3 className="text-[15px] font-bold text-[#102F57]">
                      ليلى حسن
                    </h3>

                    <p className="text-[12px] text-[#8B94A1]">
                      حتى ٦ أغراض
                    </p>

                  </div>

                </div>

                <div className="text-[12px] text-[#687386]">
                  ⭐ 4.6
                </div>

              </div>


              <div
                className="
                  my-4
                  rounded-[15px]
                  bg-[#F3F6FA]
                  p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#234A7D]" />

                  <span className="text-[14px] text-[#234A7D]">
                    غزة - التفاح
                  </span>

                </div>

                <div
                  className="
                    mr-[3px]
                    h-[25px]
                    border-r-2
                    border-dashed
                    border-[#CBD3DE]
                  "
                />

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#FF7817]" />

                  <span className="text-[14px] text-[#FF7817]">
                    خان يونس
                  </span>

                </div>

              </div>


              <div
                className="
                  mb-4
                  flex
                  justify-end
                  gap-4
                  text-[12px]
                  text-[#7B8494]
                "
              >

                <span>
                  📅 ٢٦ يوليو ٢٠٢٦
                </span>

                <span>
                  🕐 ١١:٣٠ ص
                </span>

              </div>


              <button
                type="button"
                className="
                  h-[42px]
                  w-full
                  rounded-full
                  bg-[#234A7D]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                عرض التفاصيل
              </button>

            </div>


            {/* ================= TRIP 5 ================= */}

            <div
              className="
                rounded-[20px]
                border border-[#E3E7EC]
                bg-white
                p-4
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-[38px] w-[38px]
                      items-center justify-center
                      rounded-full
                      bg-[#FF7817]
                      font-bold
                      text-white
                    "
                  >
                    عم
                  </div>

                  <div>

                    <h3 className="text-[15px] font-bold text-[#102F57]">
                      عمر نبيل
                    </h3>

                    <p className="text-[12px] text-[#8B94A1]">
                      حتى ٤ أغراض
                    </p>

                  </div>

                </div>

                <div className="text-[12px] text-[#687386]">
                  ⭐ 4.8
                </div>

              </div>


              <div
                className="
                  my-4
                  rounded-[15px]
                  bg-[#F3F6FA]
                  p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#234A7D]" />

                  <span className="text-[14px] text-[#234A7D]">
                    رفح
                  </span>

                </div>

                <div
                  className="
                    mr-[3px]
                    h-[25px]
                    border-r-2
                    border-dashed
                    border-[#CBD3DE]
                  "
                />

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#FF7817]" />

                  <span className="text-[14px] text-[#FF7817]">
                    غزة - النصر
                  </span>

                </div>

              </div>


              <div
                className="
                  mb-4
                  flex
                  justify-end
                  gap-4
                  text-[12px]
                  text-[#7B8494]
                "
              >

                <span>
                  📅 ٢٧ يوليو ٢٠٢٦
                </span>

                <span>
                  🕐 ٨:٠٠ ص
                </span>

              </div>


              <div
                className="
                  mb-3
                  rounded-[12px]
                  border
                  border-[#FFE6A6]
                  bg-[#FFFBEF]
                  px-3
                  py-2
                  text-right
                  text-[11px]
                  text-[#8B7A40]
                "
              >
                📝 متاح للأغراض المتنوعة
              </div>


              <button
                type="button"
                className="
                  h-[42px]
                  w-full
                  rounded-full
                  bg-[#234A7D]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                عرض التفاصيل
              </button>

            </div>


            {/* ================= TRIP 6 ================= */}

            <div
              className="
                rounded-[20px]
                border border-[#E3E7EC]
                bg-white
                p-4
                shadow-sm
              "
            >

              <div className="flex items-start justify-between">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex h-[38px] w-[38px]
                      items-center justify-center
                      rounded-full
                      bg-[#00A394]
                      font-bold
                      text-white
                    "
                  >
                    نو
                  </div>

                  <div>

                    <h3 className="text-[15px] font-bold text-[#102F57]">
                      نور إبراهيم
                    </h3>

                    <p className="text-[12px] text-[#8B94A1]">
                      حتى ٥ أغراض
                    </p>

                  </div>

                </div>

                <div className="text-[12px] text-[#687386]">
                  ⭐ 4.5
                </div>

              </div>


              <div
                className="
                  my-4
                  rounded-[15px]
                  bg-[#F3F6FA]
                  p-4
                "
              >

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#234A7D]" />

                  <span className="text-[14px] text-[#234A7D]">
                    بيت حانون
                  </span>

                </div>

                <div
                  className="
                    mr-[3px]
                    h-[25px]
                    border-r-2
                    border-dashed
                    border-[#CBD3DE]
                  "
                />

                <div className="flex items-center gap-3">

                  <div className="h-[8px] w-[8px] rounded-full bg-[#FF7817]" />

                  <span className="text-[14px] text-[#FF7817]">
                    دير البلح
                  </span>

                </div>

              </div>


              <div
                className="
                  mb-4
                  flex
                  justify-end
                  gap-4
                  text-[12px]
                  text-[#7B8494]
                "
              >

                <span>
                  📅 ٢٨ يوليو ٢٠٢٦
                </span>

                <span>
                  🕐 ٣:٠٠ م
                </span>

              </div>


              <button
                type="button"
                className="
                  h-[42px]
                  w-full
                  rounded-full
                  bg-[#234A7D]
                  text-[14px]
                  font-bold
                  text-white
                "
              >
                عرض التفاصيل
              </button>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Trips;