import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [hasInternet, setHasInternet] = useState(true);

  useEffect(() => {
    const checkInternet = async () => {
      try {
        // أول فحص
        if (!navigator.onLine) {
          setHasInternet(false);
          setChecking(false);
          return;
        }

        // فحص فعلي للإنترنت
        await fetch(
          "https://www.gstatic.com/generate_204",
          {
            method: "GET",
            mode: "no-cors",
            cache: "no-store",
          }
        );

        setHasInternet(true);

        // إذا يوجد إنترنت انتقل للصفحة التعريفية
        setTimeout(() => {
          navigate("/landing");
        }, 1000);

      } catch (error) {
        setHasInternet(false);
      } finally {
        setChecking(false);
      }
    };

    checkInternet();
  }, [navigate]);


  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white flex items-center justify-center px-5"
    >

      <div className="flex flex-col items-center justify-center text-center">

        {/* Logo */}
        <img
          src="/logo.png"
          alt="بطريقك"
          className="h-[100px] w-[110px] object-contain"
        />


        {/* جاري التحقق */}
        {checking && (
          <div className="mt-6">

            <div className="mx-auto h-7 w-7 animate-spin rounded-full border-4 border-[#E5E9EF] border-t-[#FF7817]" />

            <p className="mt-4 text-[14px] text-[#7A8699]">
              جاري التحقق من الاتصال...
            </p>

          </div>
        )}


        {/* لا يوجد إنترنت */}
        {!checking && !hasInternet && (
          <div className="mt-6">

            <div className="text-[35px]">
              📡
            </div>

            <h2 className="mt-3 text-[20px] font-bold text-[#123A68]">
              لا يتوفر إنترنت
            </h2>

            <p className="mt-2 text-[13px] text-[#7A8699]">
              يرجى التحقق من اتصالك بالإنترنت
              والمحاولة مرة أخرى.
            </p>


            <button
              type="button"
              onClick={() => window.location.reload()}
              className="
                mt-5
                rounded-[12px]
                bg-[#FF7817]
                px-6
                py-3
                text-[14px]
                font-bold
                text-white
              "
            >
              إعادة المحاولة
            </button>

          </div>
        )}

      </div>

    </main>
  );
}

export default Home;