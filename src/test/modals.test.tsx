import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { RequestSpaceSuccessModal } from "../components/modals/RequestSpaceSuccessModal";
import { SubmitOfferSuccessModal } from "../components/modals/SubmitOfferSuccessModal";
import { ResetPasswordSuccessModal } from "../components/modals/ResetPasswordSuccessModal";
import { ChangePasswordSuccessModal } from "../components/modals/ChangePasswordSuccessModal";
import { LandingMenuModal } from "../components/modals/LandingMenuModal";

describe("Modals & Feedback Components", () => {
  it("should render RequestSpaceSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <RequestSpaceSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("تم إرسال طلبك بنجاح")).toBeInTheDocument();
    expect(screen.getByText("تتبع حالة الطلب")).toBeInTheDocument();
  });

  it("should render SubmitOfferSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <SubmitOfferSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("تم إرسال عرضك بنجاح")).toBeInTheDocument();
    expect(screen.getByText("عرض حالة العروض")).toBeInTheDocument();
  });

  it("should render ResetPasswordSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <ResetPasswordSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("تم تغيير كلمة المرور بنجاح")).toBeInTheDocument();
    expect(screen.getByText("تسجيل الدخول")).toBeInTheDocument();
  });

  it("should render ChangePasswordSuccessModal when open", () => {
    render(
      <MemoryRouter>
        <ChangePasswordSuccessModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("تم حفظ كلمة المرور بنجاح")).toBeInTheDocument();
    expect(screen.getByText("العودة للرئيسية")).toBeInTheDocument();
  });

  it("should render LandingMenuModal with navigation items", () => {
    render(
      <MemoryRouter>
        <LandingMenuModal isOpen={true} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("بطريقك")).toBeInTheDocument();
    expect(screen.getByText("تسجيل الدخول")).toBeInTheDocument();
    expect(screen.getByText("إنشاء حساب جديد")).toBeInTheDocument();
    expect(screen.getByText("الرئيسية")).toBeInTheDocument();
  });
});
