import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function Header() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar للموبايل */}
      {sidebarOpen && (
        <>
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40"
          />

          <Sidebar
            onClose={() => setSidebarOpen(false)}
          />
        </>
      )}

      {/* Header */}
      <header
        className="
          fixed right-0 top-0 z-30
          flex h-[82px] w-full
          items-center justify-between
          bg-white
          px-5
          shadow-sm
          lg:pr-[280px]
        "
      >

        {/* Menu */}
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="
            flex h-[42px] w-[42px]
            items-center justify-center
            text-[#263F61]
          "
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>

        {/* Location */}
        <button
          type="button"
          className="
            hidden sm:flex
            h-[42px] w-[42px]
            items-center justify-center
            rounded-[12px]
            border border-[#E1E5EA]
            bg-[#FAFBFC]
            text-[#FF7817]
          "
        >
          📍
        </button>

        {/* Notification */}
        <button
          type="button"
          className="hidden text-[#5C6675] sm:block"
        >
          🔔
        </button>

        {/* Balance */}
        <div
          className="
            hidden sm:flex
            items-center gap-2
            rounded-full
            bg-[#FFF1E8]
            px-4 py-2
            text-[#FF7817]
          "
        >
          ⚡

          <span className="font-bold">
            47
          </span>
        </div>

        {/* User */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="
            flex h-[42px] w-[42px]
            items-center justify-center
            rounded-full
            bg-[#234A7D]
            text-[13px]
            font-bold
            text-white
          "
        >
          هـم
        </button>

      </header>
    </>
  );
}

export default Header;