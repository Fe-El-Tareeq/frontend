import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function DashboardLayout() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F5F7FA]"
    >
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= PAGE ================= */}
      <main className="pt-[82px] lg:mr-[256px]">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;