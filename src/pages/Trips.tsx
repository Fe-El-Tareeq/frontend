function Trips() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] px-4 py-6"
    >

      {/* عنوان الصفحة */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold text-[#123A68]">
          الرحلات
        </h1>

        <p className="mt-1 text-[14px] text-[#7A8699]">
          استكشف الرحلات المتاحة بالقرب منك
        </p>
      </div>


      {/* البحث */}
      <div className="rounded-[18px] bg-white p-4 shadow-sm">

        <label className="mb-2 block text-[14px] font-medium text-[#123A68]">
          البحث عن رحلة
        </label>

        <input
          type="text"
          placeholder="ابحث عن مدينة أو وجهة..."
          className="
            h-[50px]
            w-full
            rounded-[14px]
            border-2
            border-[#E3E7EC]
            bg-[#FAFBFC]
            px-4
            text-right
            text-[14px]
            text-[#123A68]
            outline-none
            placeholder:text-[#A7B0BE]
            focus:border-[#FF7817]
          "
        />

      </div>


      {/* الفلاتر */}
      <div className="mt-4 grid grid-cols-2 gap-3">

        <select
          className="
            h-[48px]
            rounded-[14px]
            border-2
            border-[#E3E7EC]
            bg-white
            px-3
            text-[13px]
            text-[#123A68]
            outline-none
            focus:border-[#FF7817]
          "
        >
          <option value="">
            المدينة
          </option>

          <option value="غزة">
            غزة
          </option>

          <option value="شمال غزة">
            شمال غزة
          </option>

          <option value="الوسطى">
            الوسطى
          </option>

          <option value="خانيونس">
            خانيونس
          </option>

          <option value="رفح">
            رفح
          </option>
        </select>


        <select
          className="
            h-[48px]
            rounded-[14px]
            border-2
            border-[#E3E7EC]
            bg-white
            px-3
            text-[13px]
            text-[#123A68]
            outline-none
            focus:border-[#FF7817]
          "
        >
          <option value="">
            ترتيب الرحلات
          </option>

          <option value="new">
            الأحدث
          </option>

          <option value="near">
            الأقرب
          </option>

        </select>

      </div>


      {/* عنوان الرحلات */}
      <div className="mt-7 mb-4 flex items-center justify-between">

        <h2 className="text-[19px] font-bold text-[#123A68]">
          الرحلات المتاحة
        </h2>

        <span className="text-[12px] text-[#7A8699]">
          بالقرب منك
        </span>

      </div>


      {/* ========================= */}
      {/* مكان بيانات الـ Backend */}
      {/* ========================= */}

      <div className="space-y-4">

        {/* Trip Card 1 */}
        <div className="rounded-[18px] bg-white p-4 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[15px] font-bold text-[#123A68]">
                غزة
              </p>

              <p className="mt-1 text-[13px] text-[#7A8699]">
                
              </p>
            </div>

            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FFF1E8] text-[20px]">
              🚗
            </div>

          </div>


          <div className="my-4 h-[1px] bg-[#EEF1F5]" />


          <div className="flex items-center justify-between">

            <div>
              <p className="text-[12px] text-[#A0A8B5]">
                وقت الرحلة
              </p>

              <p className="mt-1 text-[13px] font-medium text-[#123A68]">
                سيتم تحديده لاحقًا
              </p>
            </div>


            <button
              type="button"
              className="
                rounded-[12px]
                bg-[#FF7817]
                px-4
                py-2
                text-[13px]
                font-bold
                text-white
              "
            >
              عرض الرحلة
            </button>

          </div>

        </div>


        {/* Trip Card 2 */}
        <div className="rounded-[18px] bg-white p-4 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[15px] font-bold text-[#123A68]">
                رحلة متاحة
              </p>

              <p className="mt-1 text-[13px] text-[#7A8699]">
                
              </p>
            </div>

            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FFF1E8] text-[20px]">
              📍
            </div>

          </div>


          <div className="my-4 h-[1px] bg-[#EEF1F5]" />


          <div className="flex items-center justify-between">

            <div>
              <p className="text-[12px] text-[#A0A8B5]">
                الحالة
              </p>

              <p className="mt-1 text-[13px] font-medium text-[#123A68]">
                متاحة
              </p>
            </div>


            <button
              type="button"
              className="
                rounded-[12px]
                bg-[#FF7817]
                px-4
                py-2
                text-[13px]
                font-bold
                text-white
              "
            >
              عرض الرحلة
            </button>

          </div>

        </div>


        {/* Trip Card 3 */}
        <div className="rounded-[18px] bg-white p-4 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[15px] font-bold text-[#123A68]">
                رحلة قريبة
              </p>

              <p className="mt-1 text-[13px] text-[#7A8699]">
                
              </p>
            </div>

            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#FFF1E8] text-[20px]">
              🧭
            </div>

          </div>


          <div className="my-4 h-[1px] bg-[#EEF1F5]" />


          <div className="flex items-center justify-between">

            <div>
              <p className="text-[12px] text-[#A0A8B5]">
                المسافة
              </p>

              <p className="mt-1 text-[13px] font-medium text-[#123A68]">
                سيتم تحديدها
              </p>
            </div>


            <button
              type="button"
              className="
                rounded-[12px]
                bg-[#FF7817]
                px-4
                py-2
                text-[13px]
                font-bold
                text-white
              "
            >
              عرض الرحلة
            </button>

          </div>

        </div>

      </div>


      {/* رسالة مستقبلية عند عدم وجود رحلات */}
      <div className="mt-6 rounded-[18px] border border-dashed border-[#D9DEE7] bg-white p-6 text-center">

        <div className="text-[32px]">
          🚗
        </div>

        <p className="mt-3 text-[15px] font-bold text-[#123A68]">
          الرحلات ستظهر هنا
        </p>

        <p className="mt-2 text-[12px] leading-6 text-[#8A94A3]">
        
          
        </p>

      </div>

    </main>
  );
}

export default Trips;