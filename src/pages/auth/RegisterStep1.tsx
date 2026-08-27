import { useNavigate } from "react-router-dom";

function RegisterStep1() {
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
            انضم إلى مجتمع بطريقك
          </p>
        </div>

        {/* Steps */}
        <div className="mt-[16px] flex items-center justify-center gap-[8px]">
          <span className="h-[6px] w-[48px] rounded-pill bg-accent" />
          <span className="h-[6px] w-[32px] rounded-pill bg-[#E4E7EB]" />
        </div>

        {/* Form */}
        <form
          className="mt-[27px]"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/register-step2");
          }}
        >
          {/* Full Name */}
          <div className="mb-[14px]">
            <label className="mb-[6px] block text-[14px] font-medium text-primary">
              الاسم الكامل
              <span className="mr-[3px] text-error">*</span>
            </label>

            <input
              type="text"
              placeholder="هديل محمد"
              className="h-[50px] w-full rounded-[16px] border-2 border-[#E3E7EC] bg-[#FAFBFC] px-[16px] text-right text-[15px] text-primary outline-none placeholder:text-[#A7B0BE] focus:border-accent"
            />
          </div>

          {/* Phone */}
          <div className="mb-[14px]">
            <label className="mb-[6px] block text-[14px] font-medium text-primary">
              رقم الهاتف
              <span className="mr-[3px] text-error">*</span>
            </label>

            <input
              type="tel"
              placeholder="05XX-XXX-XXX"
              className="h-[50px] w-full rounded-[16px] border-2 border-[#E3E7EC] bg-[#FAFBFC] px-[16px] text-right text-[15px] text-primary outline-none placeholder:text-[#A7B0BE] focus:border-accent"
            />
          </div>

          {/* Password */}
          <div className="mb-[17px]">
            <label className="mb-[6px] block text-[14px] font-medium text-primary">
              كلمة المرور
              <span className="mr-[3px] text-error">*</span>
            </label>

            <input
              type="password"
              placeholder="يجب أن تكون من 8 أرقام وحروف كبيرة على الأقل ورمز مميز"
              className="h-[50px] w-full rounded-[16px] border-2 border-[#E3E7EC] bg-[#FAFBFC] px-[16px] text-right text-[11px] text-primary outline-none placeholder:text-[#A7B0BE] focus:border-accent"
            />
          </div>

          {/* Next */}
          <button
            type="submit"
            className="h-[51px] w-full rounded-[16px] bg-accent text-[16px] font-bold text-white shadow-sm"
          >
            التالي
          </button>
        </form>

        {/* Login */}
        <div className="mt-[25px] text-center text-[14px] text-text-secondary">
          <span>لديك حساب بالفعل؟ </span>

          <button
            type="button"
            onClick={() => navigate("/welcome")}
            className="font-bold text-accent hover:text-accent-hover"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    </main>
  );
}

export default RegisterStep1;