import { useNavigate } from "react-router-dom";

function RegisterStep2() {
  const navigate = useNavigate();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-5 py-8"
    >
      <div className="w-full max-w-[353px] min-h-[654px] rounded-[18px] border border-[#E1E4E8] bg-white px-[33px] pt-[38px] pb-[25px] shadow-sm">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-[65px] w-[68px] object-contain"
          />
        </div>

        {/* Title */}
        <div className="mt-[20px] text-center">
          <h1 className="text-[24px] font-bold leading-[1.4] text-primary">
            إنشاء حساب جديد
          </h1>

          <p className="mt-[3px] text-[16px] text-text-secondary">
            أكمل بياناتك
          </p>
        </div>

        {/* Steps */}
        <div className="mt-[16px] flex items-center justify-center gap-[8px]">
          <span className="h-[6px] w-[32px] rounded-pill bg-[#E4E7EB]" />
          <span className="h-[6px] w-[48px] rounded-pill bg-accent" />
        </div>

        {/* City */}
        <div className="mt-[27px]">
          <label className="mb-[6px] block text-[14px] font-medium text-primary">
            المدينة
            <span className="mr-[3px] text-error">*</span>
          </label>

          <select
            className="h-[50px] w-full rounded-[16px] border-2 border-[#E3E7EC] bg-[#FAFBFC] px-[16px] text-[15px] text-primary outline-none focus:border-accent"
          >
            <option value="">اختر المدينة</option>
            <option value="غزة">غزة</option>
            <option value="شمال غزة">شمال غزة</option>
            <option value="خانيونس">خانيونس</option>
            <option value="الوسطى">الوسطى</option>
            <option value="رفح">رفح</option>
          </select>
        </div>

        {/* Neighborhood */}
        <div className="mt-[16px]">
          <label className="mb-[6px] block text-[14px] font-medium text-primary">
            الحي
            <span className="mr-[3px] text-error">*</span>
          </label>

          <input
            type="text"
            placeholder="أدخل اسم الحي"
            className="h-[50px] w-full rounded-[16px] border-2 border-[#E3E7EC] bg-[#FAFBFC] px-[16px] text-right text-[15px] text-primary outline-none placeholder:text-[#A7B0BE] focus:border-accent"
          />
        </div>

        {/* Terms */}
        <div className="mt-[20px] flex items-start gap-[8px]">
          <input
            id="terms"
            type="checkbox"
            className="mt-[3px] h-[17px] w-[17px] accent-[#FF7817]"
          />

          <label
            htmlFor="terms"
            className="text-[12px] leading-[1.7] text-text-secondary"
          >
            أوافق على{" "}

            <button
              type="button"
              className="font-bold text-accent hover:text-accent-hover"
            >
              الشروط
            </button>

            {" "}و{" "}

            <button
              type="button"
              className="font-bold text-accent hover:text-accent-hover"
            >
              سياسة الخصوصية
            </button>
          </label>
        </div>

        {/* Create Account */}
     <button
  type="button"
  onClick={() => navigate("/dashboard")}
  className="mt-[24px] h-[51px] w-full rounded-[16px] bg-accent text-[16px] font-bold text-white shadow-sm transition hover:bg-accent-hover active:scale-[0.99]"
>
  إنشاء الحساب
</button>

        {/* Login */}
        <div className="mt-[25px] text-center text-[14px] text-text-secondary">
          <span>لديك حساب بالفعل؟ </span>
         <button
          type="button"
           onClick={() => navigate("/")}
           className="..."
     >
            تسجيل الدخول
         </button>
        </div>

      </div>
    </main>
  );
}

export default RegisterStep2;