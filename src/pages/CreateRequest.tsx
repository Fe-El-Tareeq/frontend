import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CreateRequest() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [note, setNote] = useState("");

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
          px-4
          pb-12
          pt-[105px]
          lg:mr-[256px]
          lg:px-8
        "
      >
        <div className="mx-auto w-full max-w-[900px]">

          {/* =================================================
              PAGE TITLE
          ================================================= */}
          <div className="mb-8 flex items-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/requests")}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[28px]
                text-[#52627A]
              "
            >
              ‹
            </button>

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
                  mt-1
                  text-[14px]
                  text-[#7B8494]
                "
              >
                صف ما تحتاجه وسيجدك المسافرون المناسبون
              </p>
            </div>
          </div>

          {/* =================================================
              WHAT DO YOU NEED?
          ================================================= */}
          <section
            className="
              mb-5
              rounded-[18px]
              border
              border-[#E4E7EC]
              bg-white
              p-5
              shadow-[0_2px_6px_rgba(16,47,87,0.08)]
            "
          >

            {/* Header */}
            <div className="flex items-start justify-between gap-3">

              <div className="flex-1">

                <h2
                  className="
                    text-[17px]
                    font-bold
                    text-[#102F57]
                  "
                >
                  ماذا تحتاج؟
                  <span className="text-[#FF7817]">*</span>
                </h2>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-[#A2AAB7]
                  "
                >
                  يمكنك إضافة أكثر من فئة في نفس الطلب
                </p>

              </div>

              {/* =================================================
                  ADD CATEGORY BUTTON
              ================================================= */}
              <button
                type="button"
                onClick={() => navigate("/add-category")}
                className="
                  flex
                  h-[40px]
                  shrink-0
                  items-center
                  gap-2
                  rounded-[14px]
                  bg-[#234A7D]
                  px-5
                  text-[14px]
                  font-bold
                  text-white
                  transition
                  hover:bg-[#1C3D68]
                  active:scale-[0.98]
                "
              >
                <span className="text-[20px] leading-none">
                  +
                </span>

                <span>
                  إضافة فئة
                </span>
              </button>

            </div>

            {/* =================================================
                EMPTY CATEGORY BOX
            ================================================= */}
            <div
              className="
                mt-4
                flex
                min-h-[84px]
                items-center
                justify-center
                rounded-[17px]
                border-2
                border-dashed
                border-[#D4DCE7]
                bg-[#FAFBFC]
              "
            >

              <div className="text-center">

                <p
                  className="
                    text-[14px]
                    font-bold
                    text-[#A3ACBA]
                  "
                >
                  أضف أول فئة
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    text-[#A8B0BC]
                  "
                >
                  دواء، وثائق، طرد، ملابس...
                </p>

              </div>

              <div
                className="
                  mr-3
                  flex
                  h-[40px]
                  w-[40px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#F0F2F5]
                  text-[24px]
                  text-[#A6AFBD]
                "
              >
                +
              </div>

            </div>

          </section>

          {/* =================================================
              LOCATION
          ================================================= */}
          <section
            className="
              mb-5
              rounded-[18px]
              border
              border-[#E4E7EC]
              bg-white
              p-5
              shadow-[0_2px_6px_rgba(16,47,87,0.08)]
            "
          >

            <h2
              className="
                mb-5
                text-[18px]
                font-bold
                text-[#102F57]
              "
            >
              الموقع
            </h2>

            {/* City */}
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

              <div className="relative">

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="
                    h-[52px]
                    w-full
                    appearance-none
                    rounded-[16px]
                    border-2
                    border-[#E0E4EA]
                    bg-[#FAFBFC]
                    px-4
                    text-[15px]
                    text-[#263F61]
                    outline-none
                    focus:border-[#234A7D]
                  "
                >
                  <option value="">
                    اختر المدينة
                  </option>

                  <option value="غزة">
                    غزة
                  </option>

                  <option value="شمال غزة">
                    شمال غزة
                  </option>

                  <option value="خانيونس">
                    خانيونس
                  </option>

                  <option value="الوسطى">
                    الوسطى
                  </option>

                  <option value="رفح">
                    رفح
                  </option>
                </select>

                <span
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[18px]
                    text-[#9AA3AF]
                  "
                >
                  ⌄
                </span>

              </div>

            </div>

            {/* Neighborhood */}
            <div>

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
                value={neighborhood}
                onChange={(e) =>
                  setNeighborhood(e.target.value)
                }
                placeholder="حيّ أو الحي المطلوب"
                className="
                  h-[52px]
                  w-full
                  rounded-[16px]
                  border-2
                  border-[#E0E4EA]
                  bg-[#FAFBFC]
                  px-4
                  text-[15px]
                  text-[#263F61]
                  outline-none
                  placeholder:text-[#A8B0BC]
                  focus:border-[#234A7D]
                "
              />

            </div>

          </section>

          {/* =================================================
              VOICE + IMAGE
          ================================================= */}
          <section
            className="
              mb-5
              rounded-[18px]
              border
              border-[#E4E7EC]
              bg-white
              p-5
              shadow-[0_3px_7px_rgba(16,47,87,0.10)]
            "
          >

            {/* Voice */}
            <div
              className="
                mb-4
                rounded-[16px]
                border
                border-[#DDE2E8]
                bg-[#FAFBFC]
                p-4
              "
            >

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[12px]
                    bg-[#E9EDF3]
                    text-[21px]
                    text-[#234A7D]
                  "
                >
                  ♧
                </div>

                <div>

                  <p
                    className="
                      text-[14px]
                      font-medium
                      text-[#102F57]
                    "
                  >
                    تسجيل رسالة صوتية (اختياري)
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#8B95A3]
                    "
                  >
                    اشرح طلبك بصوتك لمزيد من الوضوح
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="
                  mt-3
                  flex
                  h-[43px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-[14px]
                  border-2
                  border-dashed
                  border-[#B9CBE0]
                  bg-white
                  text-[14px]
                  font-medium
                  text-[#234A7D]
                "
              >
                <span>
                  اضغط للتسجيل
                </span>

                <span>
                  🎙
                </span>
              </button>

            </div>

            {/* Image */}
            <div
              className="
                rounded-[16px]
                border
                border-[#DDE2E8]
                bg-[#FAFBFC]
                p-4
              "
            >

              <div className="flex items-start gap-3">

                <div
                  className="
                    flex
                    h-[40px]
                    w-[40px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-[12px]
                    bg-[#E9EDF3]
                    text-[20px]
                    text-[#234A7D]
                  "
                >
                  ▧
                </div>

                <div>

                  <p
                    className="
                      text-[14px]
                      font-medium
                      text-[#102F57]
                    "
                  >
                    إرسال صورة للغرض (اختياري)
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#8B95A3]
                    "
                  >
                    قم بإرسال صورة لمزيد من الوضوح
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="
                  mt-3
                  flex
                  h-[43px]
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-[14px]
                  border-2
                  border-dashed
                  border-[#B9CBE0]
                  bg-white
                  text-[14px]
                  font-medium
                  text-[#234A7D]
                "
              >
                <span>
                  اضغط للتصوير
                </span>

                <span>
                  📷
                </span>
              </button>

            </div>

          </section>

          {/* =================================================
              GENERAL NOTE
          ================================================= */}
          <section
            className="
              mb-5
              rounded-[18px]
              border
              border-[#E4E7EC]
              bg-white
              p-5
              shadow-[0_2px_6px_rgba(16,47,87,0.08)]
            "
          >

            <label
              className="
                mb-3
                block
                text-[15px]
                font-medium
                text-[#102F57]
              "
            >
              ملاحظة عامة للمسافر (اختياري)
            </label>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="وقت التسليم المفضل، طريقة التواصل، أي تعليمات عامة..."
              className="
                w-full
                resize-none
                rounded-[16px]
                border-2
                border-[#E0E4EA]
                bg-[#FAFBFC]
                px-4
                py-3
                text-[14px]
                leading-6
                text-[#263F61]
                outline-none
                placeholder:text-[#A8B0BC]
                focus:border-[#234A7D]
              "
            />

          </section>

          {/* =================================================
              COST
          ================================================= */}
          <section
            className="
              mb-8
              rounded-[16px]
              border
              border-[#FFD0AD]
              bg-[#FFF0E7]
              px-5
              py-4
            "
          >

            <div className="flex items-center justify-between">

              {/* Right */}
              <div className="flex items-start gap-3">

                <span
                  className="
                    text-[24px]
                    text-[#FF7817]
                  "
                >
                  ⚡
                </span>

                <div>

                  <h3
                    className="
                      text-[14px]
                      font-bold
                      text-[#102F57]
                    "
                  >
                    تكلفة نشر الطلب
                  </h3>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-[#7B8494]
                    "
                  >
                    سيتم خصم تكلفة واحدة من رصيدك
                  </p>

                </div>

              </div>

              {/* Left */}
              <div className="text-center">

                <div
                  className="
                    text-[18px]
                    font-bold
                    text-[#FF7817]
                  "
                >
                  1 توكن
                </div>

                <div
                  className="
                    mt-1
                    text-[11px]
                    text-[#8D96A3]
                  "
                >
                  رصيدك: 47 توكن
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}
          <div
            className="
              mb-8
              flex
              flex-row-reverse
              items-center
              gap-5
            "
          >

            {/* Publish */}
            <button
              type="button"
              onClick={() => navigate("/request-created")}
              className="
                flex
                h-[52px]
                flex-1
                items-center
                justify-center
                gap-2
                rounded-[15px]
                bg-[#FF7817]
                text-[16px]
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-[#E96B0D]
                active:scale-[0.99]
              "
            >
              <span>
                ▱
              </span>

              <span>
                نشر الطلب
              </span>
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate("/requests")}
              className="
                h-[52px]
                min-w-[65px]
                text-[15px]
                font-medium
                text-[#234A7D]
                transition
                hover:text-[#FF7817]
              "
            >
              إلغاء
            </button>

          </div>

        </div>
      </main>
    </div>
  );
}

export default CreateRequest;