import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Requests() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >

      {/* =====================================================
          Header Component
      ===================================================== */}

      <Header />

      {/* =====================================================
          Main
      ===================================================== */}

      <main
        className="
          min-h-screen
          pt-[110px]
          pb-10
          lg:mr-[256px]
        "
      >

        <div
          className="
            mx-auto
            max-w-[1000px]
            px-4
            sm:px-6
          "
        >

          {/* =====================================================
              Title
          ===================================================== */}

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
                  طلبات الأغراض
                </h1>

                <p
                  className="
                    mt-1
                    text-[14px]
                    text-[#7B8494]
                  "
                >
                  0 طلب
                </p>

              </div>


              {/* Buttons */}

              <div className="flex gap-3">

                {/* Incoming Offers */}

                <button
                  type="button"
                  className="
                    hidden
                    h-[44px]
                    rounded-[15px]
                    bg-[#234A7D]
                    px-5
                    text-[14px]
                    font-bold
                    text-white
                    sm:block
                  "
                >
                  العروض الواردة
                </button>


                {/* Create Request */}

                <button
                  type="button"
                  onClick={() => navigate("/create-request")}
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
                    transition
                    hover:bg-[#e96b0f]
                  "
                >
                  <span className="text-[20px]">
                    +
                  </span>

                  إنشاء طلب جديد
                </button>

              </div>

            </div>

          </section>


          {/* =====================================================
              Search & Filters
          ===================================================== */}

          <section
            className="
              mb-5
              rounded-[20px]
              border border-[#E3E7EC]
              bg-white
              p-4
              shadow-sm
            "
          >

            {/* Search */}

            <div
              className="
                mb-3
                flex h-[48px]
                items-center
                rounded-[14px]
                border border-[#E1E5EA]
                bg-[#FAFBFC]
                px-4
              "
            >

              <input
                type="text"
                placeholder="ابحث في الطلبات"
                className="
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


            {/* Status */}

            <div
              className="
                mb-3
                flex h-[48px]
                items-center
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

                <option value="">
                  كل الحالات
                </option>

                <option value="waiting">
                  قيد الانتظار
                </option>

                <option value="matching">
                  تم التطابق
                </option>

                <option value="completed">
                  مكتمل
                </option>

                <option value="cancelled">
                  ملغي
                </option>

              </select>

            </div>


            {/* Area */}

            <div
              className="
                flex h-[48px]
                items-center
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

                <option value="">
                  كل المناطق
                </option>

                <option value="gaza">
                  غزة
                </option>

                <option value="north">
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

          </section>


          {/* =====================================================
              Requests
          ===================================================== */}

          <section
            className="
              rounded-[20px]
              border border-[#E3E7EC]
              bg-white
              shadow-sm
            "
          >

            <div
              className="
                flex
                min-h-[450px]
                flex-col
                items-center
                justify-center
                px-5
                text-center
              "
            >

              {/* Empty Icon */}

              <div
                className="
                  mb-5
                  flex
                  h-[80px]
                  w-[80px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F1F4F8]
                  text-[36px]
                "
              >
                📦
              </div>


              {/* Empty Title */}

              <h2
                className="
                  text-[20px]
                  font-bold
                  text-[#234A7D]
                "
              >
                لا توجد طلبات
              </h2>


              {/* Empty Description */}

              <p
                className="
                  mt-2
                  text-[14px]
                  leading-7
                  text-[#8B94A1]
                "
              >
                لا توجد طلبات أغراض متاحة حاليًا.
              </p>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Requests;