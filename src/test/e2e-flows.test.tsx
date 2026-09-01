import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "../pages/Home";
import MyErrands from "../pages/errands/MyErrands";
import IncomingOffersPage from "../pages/errands/IncomingOffersPage";
import OrderTracking from "../pages/errands/OrderTracking";
import TripsPage from "../pages/trips/TripsPage";
import WalletPage from "../pages/wallet/WalletPage";
import BuyTokensPackages from "../pages/wallet/BuyTokensPackages";
import TopUpQRPage from "../pages/wallet/TopUpQRPage";
import PaymentSuccessPage from "../pages/wallet/PaymentSuccessPage";
import ProfilePage from "../pages/profile/ProfilePage";
import SettingsPage from "../pages/profile/SettingsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function renderWithProviders(
  component: React.ReactNode,
  initialEntries = ["/"],
) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("E2E User Simulation & Flows Test Suite", () => {
  // 1. Home Dashboard & Quick Actions Flow
  it("Flow 1: User visits Home Dashboard and checks stats and nearby cards", () => {
    renderWithProviders(<Home />);

    expect(screen.getByText(/مرحباً بك في بطريقك/i)).toBeInTheDocument();
    expect(screen.getAllByText("رصيد التوكنز")[0]).toBeInTheDocument();
    expect(screen.getAllByText("الرحلات النشطة")[0]).toBeInTheDocument();
    expect(screen.getAllByText("طلباتي الحالية")[0]).toBeInTheDocument();

    expect(screen.getByText("الرحلات المتاحة بالقرب منك")).toBeInTheDocument();
    expect(screen.getByText("الطلبات القريبة")).toBeInTheDocument();
    expect(screen.getAllByText("إنشاء طلب جديد")[0]).toBeInTheDocument();
    expect(screen.getAllByText("إضافة رحلة")[0]).toBeInTheDocument();
  });

  // 2. Errands & Incoming Offers & Order Tracking Flow
  it("Flow 2: User manages Errands, filters status, and navigates to Incoming Offers", () => {
    renderWithProviders(<MyErrands />);

    expect(screen.getAllByText("طلبات الأغراض")[0]).toBeInTheDocument();
    expect(screen.getAllByText("العروض الواردة")[0]).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("ابحث في الطلبات...");
    fireEvent.change(searchInput, { target: { value: "دواء" } });
    expect(searchInput).toHaveValue("دواء");
  });

  it("Flow 3: User reviews Incoming Offers and verifies dynamic state", () => {
    renderWithProviders(<IncomingOffersPage />);

    expect(screen.getAllByText("العروض الواردة")[0]).toBeInTheDocument();
    expect(screen.getAllByText("إجمالي العروض")[0]).toBeInTheDocument();
    expect(screen.getByText("لا توجد عروض واردة حالياً")).toBeInTheDocument();
  });

  it("Flow 4: User tracks order progress with 4-stage timeline and driver details", () => {
    renderWithProviders(<OrderTracking />);

    expect(screen.getByText("تتبع حالة الطلب")).toBeInTheDocument();
    expect(screen.getByText("تقدم الطلب 67%")).toBeInTheDocument();
    expect(screen.getByText("تم نشر الطلب")).toBeInTheDocument();
    expect(screen.getByText("تم قبول العرض")).toBeInTheDocument();
    expect(screen.getAllByText("في الطريق")[0]).toBeInTheDocument();
    expect(screen.getByText("المسافر المكلّف بطلبك")).toBeInTheDocument();
    expect(screen.getByText("التواصل مع المسافر")).toBeInTheDocument();
  });

  // 3. Trips Domain Flow
  it("Flow 5: User browses trips list, searches and filters by city", () => {
    renderWithProviders(<TripsPage />);

    expect(screen.getAllByText("الرحلات")[0]).toBeInTheDocument();
    expect(screen.getAllByText("إضافة رحلة")[0]).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("ابحث عن وجهة أو مسافر...");
    fireEvent.change(searchInput, { target: { value: "رفح" } });
    expect(searchInput).toHaveValue("رفح");
  });

  // 4. Wallet & 4-Step Token Purchase Flow
  it("Flow 6: User navigates Wallet and initiates token top-up", () => {
    renderWithProviders(<WalletPage />);

    expect(screen.getAllByText("المحفظة")[0]).toBeInTheDocument();
    expect(screen.getByText("رصيدك الحالي")).toBeInTheDocument();
    expect(screen.getByText("إجمالي الشراء")).toBeInTheDocument();
    expect(screen.getByText("إجمالي الإنفاق")).toBeInTheDocument();
    expect(screen.getByText("سجل المعاملات")).toBeInTheDocument();
  });

  it("Flow 7: Step 1 (Packages) -> Step 3 (QR Code) -> Step 4 (Receipt)", () => {
    // Step 1: Packages
    const { unmount: unmount1 } = renderWithProviders(<BuyTokensPackages />);
    expect(screen.getAllByText("شراء توكنز")[0]).toBeInTheDocument();
    expect(screen.getByText("الباقة المتوسطة")).toBeInTheDocument();
    expect(screen.getByText("الباقة الاحترافية")).toBeInTheDocument();
    unmount1();

    // Step 3: QR Code
    const { unmount: unmount2 } = renderWithProviders(<TopUpQRPage />);
    expect(screen.getAllByText("إتمام الدفع")[0]).toBeInTheDocument();
    expect(
      screen.getByText("افتح تطبيق البنك أو جوال باي على هاتفك"),
    ).toBeInTheDocument();
    expect(screen.getByText("لقد أتممت الدفع")).toBeInTheDocument();
    unmount2();

    // Step 4: Success Receipt
    renderWithProviders(<PaymentSuccessPage />);
    expect(screen.getByText("تمّ الشراء بنجاح! 🎉")).toBeInTheDocument();
    expect(screen.getByText("ملخّص العملية")).toBeInTheDocument();
    expect(screen.getByText("رصيدك الجديد")).toBeInTheDocument();
  });

  // 5. Profile & Settings Flow
  it("Flow 8: User inspects Profile and modifies Settings options", () => {
    const { unmount: unmountProfile } = renderWithProviders(<ProfilePage />);
    expect(screen.getAllByText("الملف الشخصي")[0]).toBeInTheDocument();
    expect(screen.getByText("تعديل الملف الشخصي")).toBeInTheDocument();
    expect(screen.getByText("تغيير كلمة المرور")).toBeInTheDocument();
    unmountProfile();

    renderWithProviders(<SettingsPage />);
    expect(screen.getAllByText("الإعدادات")[0]).toBeInTheDocument();
    expect(screen.getByText("الإشعارات والتنبيهات")).toBeInTheDocument();
    expect(screen.getByText("المظهر واللغة")).toBeInTheDocument();
    expect(screen.getByText("عن التطبيق")).toBeInTheDocument();
    expect(screen.getByText("حذف الحساب")).toBeInTheDocument();
  });
});
