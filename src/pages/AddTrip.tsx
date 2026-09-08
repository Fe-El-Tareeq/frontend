import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AddTrip() {
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
          MAIN
      ===================================================== */}

      <main
        className="
          min-h-screen
          px-5
          pb-10
          pt-[110px]
          lg:mr-[256px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[900px]
          "
        >
          {/* =================================================
              عنوان الصفحة
          ================================================= */}

          <div className="mb-7">
            <h1
              className="
                text-[25px]
                font-bold
                text-[#102F57]
              "
            >
              إضافة رحلة جديدة
            </h1>

            <p
              className="
                mt-2
                text-[14px]
                text-[#7B8494]
              "
            >
              شارك رحلتك القادمة وساعد أبناء منطقتك
            </p>
          </div>

          {/* =================================================
              FORM CARD
          ================================================= */}

          <div
            className="
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
                منطقة الانطلاق
            ================================================= */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                منطقة الانطلاق *
              </label>

              <input
                type="text"
                placeholder="مثال: غزة - الرمال"
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
                  px-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  transition
                  focus:border-[#FF7817]
                "
              />
            </div>

            {/* =================================================
                الوجهة
            ================================================= */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                الوجهة *
              </label>

              <input
                type="text"
                placeholder="مثال: رفح"
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
                  px-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  transition
                  focus:border-[#FF7817]
                "
              />
            </div>

            {/* =================================================
                المدينة
            ================================================= */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                المدينة
              </label>

              <select
                defaultValue=""
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
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
                الحي
            ================================================= */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                الحي
              </label>

              <input
                type="text"
                placeholder="حيّك الحالي"
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
                  px-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  transition
                  focus:border-[#FF7817]
                "
              />
            </div>

            {/* =================================================
                التاريخ والوقت
            ================================================= */}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="mb-5">
                <label
                  className="
                    mb-2
                    block
                    text-[14px]
                    font-bold
                    text-[#102F57]
                  "
                >
                  تاريخ الرحلة
                </label>

                <input
                  type="date"
                  className="
                    h-[50px]
                    w-full
                    rounded-[12px]
                    border
                    border-[#E1E5EA]
                    bg-white
                    px-4
                    text-[14px]
                    outline-none
                    focus:border-[#FF7817]
                  "
                />
              </div>

              <div className="mb-5">
                <label
                  className="
                    mb-2
                    block
                    text-[14px]
                    font-bold
                    text-[#102F57]
                  "
                >
                  وقت الرحلة
                </label>

                <input
                  type="time"
                  className="
                    h-[50px]
                    w-full
                    rounded-[12px]
                    border
                    border-[#E1E5EA]
                    bg-white
                    px-4
                    text-[14px]
                    outline-none
                    focus:border-[#FF7817]
                  "
                />
              </div>
            </div>

            {/* =================================================
                السعة
            ================================================= */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                السعة المتاحة للأغراض
              </label>

              <select
                defaultValue=""
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
                  px-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  focus:border-[#FF7817]
                "
              >
                <option value="" disabled>
                  اختر الطاقة
                </option>

                <option value="small">
                  صغيرة
                </option>

                <option value="medium">
                  متوسطة
                </option>

                <option value="large">
                  كبيرة
                </option>
              </select>
            </div>

            {/* =================================================
                ملاحظة السعر
            ================================================= */}

            <div
              className="
                mb-5
                rounded-[12px]
                border
                border-[#FFE6A6]
                bg-[#FFFBEF]
                px-4
                py-3
                text-right
                text-[12px]
                leading-6
                text-[#8B7A40]
              "
            >
              عند اختيار منطقة الانطلاق والوجهة سيتم عرض السعر تلقائيًا
            </div>

            {/* =================================================
                السعر
            ================================================= */}

            <div className="mb-5">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                السعر بالشكل
              </label>

              <input
                type="text"
                disabled
                className="
                  h-[50px]
                  w-full
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-[#F3F4F6]
                  px-4
                  outline-none
                "
              />
            </div>

            {/* =================================================
                ملاحظات إضافية
            ================================================= */}

            <div className="mb-6">
              <label
                className="
                  mb-2
                  block
                  text-[14px]
                  font-bold
                  text-[#102F57]
                "
              >
                ملاحظات إضافية
              </label>

              <textarea
                rows={4}
                placeholder="أضف أي ملاحظات..."
                className="
                  w-full
                  resize-none
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
                  p-4
                  text-right
                  text-[14px]
                  text-[#263F61]
                  outline-none
                  transition
                  focus:border-[#FF7817]
                "
              />
            </div>

            {/* =================================================
                الأزرار
            ================================================= */}

            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              {/* نشر الرحلة */}

              <button
                type="button"
                onClick={() => navigate("/trip-created")}
                className="
                  h-[48px]
                  w-full
                  rounded-[12px]
                  bg-[#FF7817]
                  text-[15px]
                  font-bold
                  text-white
                  transition
                  hover:bg-[#e96b0d]
                "
              >
                نشر الرحلة
              </button>

              {/* إلغاء */}

              <button
                type="button"
                onClick={() => navigate("/trips")}
                className="
                  h-[50px]
                  flex-1
                  rounded-[12px]
                  border
                  border-[#E1E5EA]
                  bg-white
                  text-[14px]
                  font-bold
                  text-[#102F57]
                  transition
                  hover:bg-[#F8F9FA]
                "
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AddTrip;