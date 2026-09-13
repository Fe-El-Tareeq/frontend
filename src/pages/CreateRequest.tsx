import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CreateRequest() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >
      {/* =====================================================
          HEADER + SIDEBAR
      ===================================================== */}

      <Header />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          min-h-screen
          px-4
          pb-12
          pt-[105px]
          lg:mr-[256px]
        "
      >
        <div className="mx-auto max-w-[900px]">

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div className="mb-6 text-right">

            <div className="flex items-center justify-between">

              <div>
                <h1
                  className="
                    text-[25px]
                    font-bold
                    text-[#102F57]
                  "
                >
                  إنشاء طلب جديد
                </h1>

                <p
                  className="
                    mt-2
                    text-[13px]
                    text-[#7B8494]
                  "
                >
                  صف ما تحتاجه وسيجدك المسافرون المناسبون
                </p>
              </div>

              {/* العودة */}

              <button
                type="button"
                onClick={() => navigate("/requests")}
                className="
                  text-[28px]
                  text-[#52647A]
                  transition
                  hover:text-[#FF7817]
                "
              >
                ‹
              </button>

            </div>

          </div>


          {/* =================================================
              REQUEST CARD
          ================================================= */}

          <div
            className="
              mx-auto
              w-full
              max-w-[900px]
              rounded-[20px]
              border
              border-[#E3E7EC]
              bg-white
              p-5
              shadow-sm
              sm:p-7
            "
          >

            {/* =================================================
                WHAT DO YOU NEED?
            ================================================= */}

            <div className="mb-5">

              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-medium
                  text-[#102F57]
                "
              >
                ماذا تحتاج؟

                <span className="mr-1 text-[#FF7817]">
                  *
                </span>
              </label>

              <textarea
                rows={4}
                placeholder="صف طلبك بالتفصيل: نوع الغرض، الحجم، الكمية، وأي تفاصيل أخرى..."
                className="
                  h-[120px]
                  w-full
                  resize-none
                  rounded-[16px]
                  border
                  border-[#E1E5EA]
                  bg-[#FAFBFC]
                  p-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  transition
                  placeholder:text-[#A7B0BE]
                  focus:border-[#FF7817]
                "
              />

              <p className="mt-2 text-[10px] text-[#9AA5B5]">
                0/500 حرف
              </p>

            </div>


            {/* =================================================
                CITY
            ================================================= */}

            <div className="mb-5">

              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-medium
                  text-[#102F57]
                "
              >
                المدينة المطلوبة
              </label>

              <select
                defaultValue=""
                className="
                  h-[50px]
                  w-full
                  rounded-[16px]
                  border
                  border-[#E1E5EA]
                  bg-[#FAFBFC]
                  px-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  focus:border-[#FF7817]
                "
              >
                <option value="" disabled>
                  اختر المدينة
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


            {/* =================================================
                NEIGHBORHOOD
            ================================================= */}

            <div className="mb-5">

              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-medium
                  text-[#102F57]
                "
              >
                الحي
              </label>

              <input
                type="text"
                placeholder="حيّك أو الحي المطلوب"
                className="
                  h-[50px]
                  w-full
                  rounded-[16px]
                  border
                  border-[#E1E5EA]
                  bg-[#FAFBFC]
                  px-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  transition
                  placeholder:text-[#A7B0BE]
                  focus:border-[#FF7817]
                "
              />

            </div>


            {/* =================================================
                VOICE MESSAGE
            ================================================= */}

            <div
              className="
                mb-5
                rounded-[16px]
                border
                border-[#DCE3EC]
                bg-[#FAFBFC]
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-[42px]
                    w-[42px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[12px]
                    bg-[#E9EEF5]
                    text-[22px]
                    text-[#234A7D]
                  "
                >
                  💬
                </div>

                <div>

                  <p
                    className="
                      text-[14px]
                      font-bold
                      text-[#102F57]
                    "
                  >
                    تسجيل رسالة صوتية

                    <span className="font-normal">
                      {" "} (اختياري)
                    </span>
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#8A95A5]
                    "
                  >
                    اشرح طلبك بشكل مختصر من الصوت
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="
                  mt-3
                  h-[45px]
                  w-full
                  rounded-[14px]
                  border
                  border-dashed
                  border-[#B8C7DA]
                  bg-white
                  text-[14px]
                  font-medium
                  text-[#234A7D]
                  transition
                  hover:bg-[#F5F7FA]
                "
              >
                اضغط للتسجيل 🎙
              </button>

            </div>


            {/* =================================================
                IMAGE
            ================================================= */}

            <div
              className="
                mb-5
                rounded-[16px]
                border
                border-[#DCE3EC]
                bg-[#FAFBFC]
                p-4
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-[42px]
                    w-[42px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[12px]
                    bg-[#E9EEF5]
                    text-[21px]
                    text-[#234A7D]
                  "
                >
                  🖼
                </div>

                <div>

                  <p
                    className="
                      text-[14px]
                      font-bold
                      text-[#102F57]
                    "
                  >
                    إرسال صورة للمنتج

                    <span className="font-normal">
                      {" "} (اختياري)
                    </span>
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#8A95A5]
                    "
                  >
                    قم بإرسال صورة معينة لمزيد من الوضوح
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="
                  mt-3
                  h-[45px]
                  w-full
                  rounded-[14px]
                  border
                  border-dashed
                  border-[#B8C7DA]
                  bg-white
                  text-[14px]
                  font-medium
                  text-[#234A7D]
                  transition
                  hover:bg-[#F5F7FA]
                "
              >
                اضغط للتصوير 📷
              </button>

            </div>


            {/* =================================================
                COST
            ================================================= */}

            <div
              className="
                mb-6
                rounded-[16px]
                border
                border-[#FFD0B0]
                bg-[#FFF4EC]
                px-4
                py-4
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className="
                      text-[14px]
                      font-bold
                      text-[#102F57]
                    "
                  >
                    تكلفة نشر الطلب
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#8A95A5]
                    "
                  >
                    سيُخصم توكن واحد من رصيدك
                  </p>

                </div>


                <div className="text-center">

                  <p
                    className="
                      text-[17px]
                      font-bold
                      text-[#FF7817]
                    "
                  >
                    ⚡ 1 توكن
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      text-[#8A95A5]
                    "
                  >
                    رصيدك: 47 توكن
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:items-center
              "
            >

              {/* ================= إلغاء ================= */}

              <button
                type="button"
                onClick={() => navigate("/requests")}
                className="
                  h-[50px]
                  px-6
                  text-[14px]
                  font-medium
                  text-[#102F57]
                  transition
                  hover:text-[#FF7817]
                  sm:w-[100px]
                "
              >
                إلغاء
              </button>


              {/* ================= نشر الطلب ================= */}

              <button
                type="button"
                onClick={() => navigate("/request-created")}
                className="
                  h-[50px]
                  flex-1
                  rounded-[14px]
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
                نشر الطلب 📦
              </button>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}

export default CreateRequest;