import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white flex items-center justify-center"
    >
      <div className="text-center">

        <img
          src="/logo.png"
          alt="بطريقك"
          className="mx-auto w-[111px] h-[107px] object-contain"
        />

        <button
          type="button"
          onClick={() => navigate("/welcome")}
          className="mt-6 rounded-pill bg-accent px-6 py-3 text-white"
        >
          ابدأ الآن
        </button>

      </div>
    </main>
  );
}

export default Home;