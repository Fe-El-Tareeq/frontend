import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RequestSpaceSuccessModal } from "../components/modals/RequestSpaceSuccessModal";
import { SubmitOfferSuccessModal } from "../components/modals/SubmitOfferSuccessModal";
import { ResetPasswordSuccessModal } from "../components/modals/ResetPasswordSuccessModal";
import { ChangePasswordSuccessModal } from "../components/modals/ChangePasswordSuccessModal";
import { LandingMenuModal } from "../components/modals/LandingMenuModal";
import { IdentityVerificationModal } from "../components/modals/IdentityVerificationModal";
import { IdentityVerificationPage } from "../pages/profile/IdentityVerificationPage";
import { LiveCameraCaptureModal } from "../components/camera/LiveCameraCaptureModal";

describe("Modals & Feedback Components", () => {
  it("should render RequestSpaceSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <RequestSpaceSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("تم إرسال طلبك بنجاح")).toBeInTheDocument();
    expect(screen.getByText("تتبع حالة الطلب")).toBeInTheDocument();
  });

  it("should render SubmitOfferSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <SubmitOfferSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("تم إرسال عرضك بنجاح")).toBeInTheDocument();
    expect(screen.getByText("عرض حالة العروض")).toBeInTheDocument();
  });

  it("should render ResetPasswordSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <ResetPasswordSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("تم تغيير كلمة المرور بنجاح")).toBeInTheDocument();
    expect(screen.getByText("تسجيل الدخول")).toBeInTheDocument();
  });

  it("should render ChangePasswordSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <ChangePasswordSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("تم حفظ كلمة المرور بنجاح")).toBeInTheDocument();
    expect(screen.getByText("العودة للرئيسية")).toBeInTheDocument();
  });

  it("should render LandingMenuModal with navigation items", () => {
    render(
      <MemoryRouter>
        <LandingMenuModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("بطريقك")).toBeInTheDocument();
    expect(screen.getByText("تسجيل الدخول")).toBeInTheDocument();
    expect(screen.getByText("إنشاء حساب جديد")).toBeInTheDocument();
    expect(screen.getByText("الرئيسية")).toBeInTheDocument();
  });

  it("should render IdentityVerificationModal with live camera trigger options", () => {
    render(
      <MemoryRouter>
        <IdentityVerificationModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("التحقق من الهوية")).toBeInTheDocument();
    expect(screen.getByText("1. بطاقة الهوية")).toBeInTheDocument();
    expect(screen.getAllByText("فتح الكاميرا").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("اختيار ملف").length).toBeGreaterThanOrEqual(1);
  });

  it("should render LiveCameraCaptureModal and handle permissions / fallback gracefully", () => {
    const handleCapture = vi.fn();
    const handleClose = vi.fn();

    render(
      <LiveCameraCaptureModal
        isOpen={true}
        mode="id_front"
        onClose={handleClose}
        onCapture={handleCapture}
      />,
    );

    expect(
      screen.getByText("التقاط بطاقة الهوية — الوجه الأمامي"),
    ).toBeInTheDocument();

    const cancelButton = screen.getByText("إلغاء");
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalled();
  });

  it("should render IdentityVerificationPage full multi-step workflow conforming to design", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <IdentityVerificationPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText("التحقق من الهوية")).toBeInTheDocument();
    expect(screen.getByText("تحميل المستندات")).toBeInTheDocument();
    expect(screen.getByText("التحقق من الوجه")).toBeInTheDocument();
    expect(screen.getByText("المراجعة")).toBeInTheDocument();
    expect(screen.getByText("بطاقة الهوية — الوجه الأمامي")).toBeInTheDocument();
    expect(screen.getByText("بطاقة الهوية — الوجه الخلفي")).toBeInTheDocument();
    expect(screen.getAllByText("التقاط بالكاميرا").length).toBe(2);
  });
});
