import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-5 py-8"
    >
      <div className="w-full max-w-[359px] min-h-[650px] rounded-[18px] border border-[#E3E8EF] bg-white px-[35px] pt-[38px] pb-[25px] shadow-sm">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/logo.png"
            alt="بطريقك"
            className="h-[65px] w-[68px] object-contain"
          />
        </div>

        {/* Title */}
        <div className="mt-[22px] text-center">
          <h1 className="text-[24px] font-bold leading-[1.4] text-primary">
            أهلاً بعودتك
          </h1>

          <p className="mt-[4px] text-[16px] text-text-secondary">
            سجل الدخول إلى حسابك للمتابعة
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-[30px]">

          {/* Phone */}
          <div className="mb-[16px]">
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
          <div>
            <label className="mb-[6px] block text-[14px] font-medium text-primary">
              كلمة المرور
              <span className="mr-[3px] text-error">*</span>
            </label>

            <input
              type="password"
              placeholder="أدخل كلمة المرور"
              className="h-[50px] w-full rounded-[16px] border-2 border-[#E3E7EC] bg-[#FAFBFC] px-[16px] text-right text-[15px] text-primary outline-none placeholder:text-[#A7B0BE] focus:border-accent"
            />
          </div>

          {/* Forgot Password */}
          <div className="mt-[10px] text-right">
            <button
              type="button"
              className="text-[13px] font-medium text-accent hover:text-accent-hover"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="mt-[24px] h-[51px] w-full rounded-[16px] bg-accent text-[16px] font-bold text-white shadow-sm transition hover:bg-accent-hover active:scale-[0.99]"
          >
            تسجيل الدخول
          </button>
        </form>

        {/* Create Account */}
        <div className="mt-[28px] text-center text-[14px] text-text-secondary">
          <span>ليس لديك حساب؟ </span>

          <button
            type="button"
            onClick={() => navigate("/register-step1")}
            className="font-bold text-accent hover:text-accent-hover"
          >
            إنشاء حساب جديد
          </button>
        </div>

      </div>
    </main>
  );
}

export default Welcome;