import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] =
    useState("دواء / صيدلية");

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("متوسط");
  const [priority, setPriority] = useState("عاجل");
  const [description, setDescription] = useState("");

  const categories = [
    { name: "دواء / صيدلية", icon: "💊" },
    { name: "طرد / بضاعة عامة", icon: "📦" },
    { name: "ملابس", icon: "👕" },
    { name: "مواد غذائية", icon: "🧃" },
    { name: "مستلزمات أطفال", icon: "👶" },
    { name: "وثائق / أوراق", icon: "📄" },
    { name: "مستلزمات منزلية", icon: "🏠" },
    { name: "كهربائيات", icon: "🔌" },
    { name: "أخرى", icon: "📁" },
  ];

  const selected =
    categories.find(
      (item) => item.name === selectedCategory
    ) || categories[0];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] px-5 py-6"
    >
      <div className="mx-auto w-full max-w-[360px]">

        {/* =========================================
            HEADER
        ========================================= */}
        <div className="mb-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/create-request")}
            className="text-[28px] text-[#52627A]"
          >
            ‹
          </button>

          <h1 className="text-[20px] font-bold text-[#102F57]">
            ماذا تحتاج؟
          </h1>

          <div className="w-8" />
        </div>

        {/* =========================================
            CATEGORY
        ========================================= */}
        <section
          className="
            rounded-[18px]
            border
            border-[#E4E7EC]
            bg-white
            p-5
            shadow-[0_2px_6px_rgba(16,47,87,0.08)]
          "
        >
          {/* العنوان */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-[17px] font-bold text-[#102F57]">
                ماذا تحتاج؟
                <span className="text-[#FF7817]">*</span>
              </h2>

              <p className="mt-1 text-[11px] text-[#9AA3AF]">
                يمكنك إضافة أكثر من فئة في نفس الطلب
              </p>
            </div>

            <button
              type="button"
              className="
                flex
                h-[38px]
                items-center
                gap-2
                rounded-[13px]
                bg-[#234A7D]
                px-4
                text-[13px]
                font-bold
                text-white
              "
            >
              <span className="text-[18px]">+</span>
              إضافة فئة
            </button>
          </div>

          {/* =====================================
              CATEGORY SELECT
          ===================================== */}
          <div
            className="
              mt-4
              rounded-[15px]
              bg-[#F4F6FB]
              p-4
            "
          >
            <h3 className="mb-3 text-[14px] font-bold text-[#667085]">
              اختر الفئة
            </h3>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const isSelected =
                  selectedCategory === category.name;

                return (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(category.name)
                    }
                    className={`
                      rounded-full
                      border-2
                      px-3
                      py-2
                      text-[12px]
                      font-medium
                      transition
                      ${
                        isSelected
                          ? "border-[#FF5364] bg-[#FFF1F3] text-[#FF3348]"
                          : "border-[#E0E3E8] bg-white text-[#667085]"
                      }
                    `}
                  >
                    {category.name} {category.icon}
                  </button>
                );
              })}
            </div>

            {/* =====================================
                QUANTITY + DESCRIPTION
            ===================================== */}
            <div className="mt-5 flex gap-2">

              {/* الكمية */}
              <div
                className="
                  flex
                  h-[43px]
                  w-[95px]
                  shrink-0
                  items-center
                  justify-between
                  rounded-[13px]
                  border
                  border-[#DCE1E7]
                  bg-white
                  px-3
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="text-[18px] text-[#687588]"
                >
                  −
                </button>

                <span className="font-bold text-[#102F57]">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="text-[18px] text-[#687588]"
                >
                  +
                </button>
              </div>

              {/* وصف الغرض */}
              <input
                type="text"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="اسم / وصف الغرض..."
                className="
                  h-[43px]
                  min-w-0
                  flex-1
                  rounded-[13px]
                  border
                  border-[#DCE1E7]
                  bg-white
                  px-3
                  text-[13px]
                  text-[#102F57]
                  outline-none
                  placeholder:text-[#A7AFBC]
                "
              />
            </div>

            {/* =====================================
                SIZE
            ===================================== */}
            <div className="mt-4">
              <p className="mb-2 text-[13px] font-bold text-[#667085]">
                الحجم
              </p>

              <div className="flex justify-center gap-1.5">
                {["ظرف", "صغير", "متوسط", "كبير"].map(
                  (value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setSize(value)}
                      className={`
                        rounded-[10px]
                        border
                        px-3
                        py-2
                        text-[11px]
                        font-medium
                        ${
                          size === value
                            ? "border-[#234A7D] bg-[#234A7D] text-white"
                            : "border-[#DCE1E7] bg-white text-[#667085]"
                        }
                      `}
                    >
                      {value}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* =====================================
                PRIORITY
            ===================================== */}
            <div className="mt-4">
              <p className="mb-2 text-[13px] font-bold text-[#667085]">
                الأهمية
              </p>

              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setPriority("عادي")}
                  className={`
                    rounded-[11px]
                    border
                    px-5
                    py-2
                    text-[12px]
                    font-medium
                    ${
                      priority === "عادي"
                        ? "border-[#234A7D] bg-[#234A7D] text-white"
                        : "border-[#DCE1E7] bg-white text-[#667085]"
                    }
                  `}
                >
                  عادي
                </button>

                <button
                  type="button"
                  onClick={() => setPriority("عاجل")}
                  className={`
                    rounded-[11px]
                    border
                    px-5
                    py-2
                    text-[12px]
                    font-medium
                    ${
                      priority === "عاجل"
                        ? "border-[#FF3348] bg-[#FF3348] text-white"
                        : "border-[#DCE1E7] bg-white text-[#667085]"
                    }
                  `}
                >
                  عاجل
                </button>
              </div>
            </div>

            {/* =====================================
                NOTE
            ===================================== */}
            <input
              type="text"
              placeholder="ملاحظة خاصة بهذا الغرض (اختياري)..."
              className="
                mt-4
                h-[43px]
                w-full
                rounded-[13px]
                border
                border-[#DCE1E7]
                bg-white
                px-4
                text-[12px]
                outline-none
                placeholder:text-[#A7AFBC]
              "
            />

            {/* =====================================
                BUTTONS
            ===================================== */}
            <div className="mt-4 flex gap-2">

              <button
                type="button"
                onClick={() => navigate("/create-request")}
                className="
                  h-[42px]
                  flex-1
                  rounded-[13px]
                  border
                  border-[#DCE1E7]
                  bg-white
                  text-[13px]
                  font-medium
                  text-[#667085]
                "
              >
                إلغاء
              </button>

              <button
                type="button"
                onClick={() => navigate("/create-request")}
                className="
                  h-[42px]
                  flex-1
                  rounded-[13px]
                  bg-[#234A7D]
                  text-[13px]
                  font-bold
                  text-white
                "
              >
                + إضافة للطلب
              </button>

            </div>
          </div>
        </section>

        {/* =========================================
            PREVIEW
        ========================================= */}
        <section
          className="
            mt-4
            overflow-hidden
            rounded-[16px]
            border-2
            border-[#FFC1C8]
            bg-white
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
              bg-[#FFF1F3]
              px-4
              py-3
            "
          >
            <span className="text-[14px] font-bold text-[#D91E36]">
              {selected.name} {selected.icon}
            </span>

            <span className="text-[11px] font-medium text-[#D91E36]">
              1 غرض
            </span>
          </div>

          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-bold text-[#102F57]">
                  {description || "دواء للأكول"}
                </p>

                <p className="mt-2 text-[11px] text-[#98A1AE]">
                  الكمية: {quantity} × الحجم: {size}
                </p>
              </div>

              <span
                className="
                  rounded-full
                  bg-[#FFE4E7]
                  px-3
                  py-1
                  text-[10px]
                  font-bold
                  text-[#FF3348]
                "
              >
                {priority}
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

export default AddCategory;