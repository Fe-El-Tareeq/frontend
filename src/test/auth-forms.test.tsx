import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import RegisterStep1 from "../pages/auth/RegisterStep1";
import RegisterStep2 from "../pages/auth/RegisterStep2";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import { useAuth } from "../hooks/useAuth";
import { useLocations } from "../hooks/useLocations";

vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../hooks/useLocations", () => ({
  useLocations: vi.fn(),
}));

const authMock = {
  login: vi.fn(),
  register: vi.fn(),
  requestOtp: vi.fn(),
  verifyOtp: vi.fn(),
  forgotPassword: vi.fn(),
  resetPassword: vi.fn(),
  isLoggingIn: false,
  isRegistering: false,
  isRequestingOtp: false,
  isVerifyingOtp: false,
  isForgotPasswordPending: false,
  isResetPasswordPending: false,
};

function LocationDisplay() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname}</span>;
}

function renderRoute(
  ui: React.ReactNode,
  entry: string | { pathname: string; state?: unknown },
) {
  const pagePath = typeof entry === "string" ? entry : entry.pathname;
  const observerPaths = [
    "/home",
    "/verify-otp",
    "/register-step2",
    "/reset-password",
    "/login",
  ].filter((path) => path !== pagePath);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path={pagePath} element={ui} />
          {observerPaths.map((path) => (
            <Route key={path} path={path} element={<LocationDisplay />} />
          ))}
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function fillInput(container: HTMLElement, name: string, value: string) {
  const input = container.querySelector<HTMLInputElement | HTMLSelectElement>(
    `[name="${name}"]`,
  );
  expect(input).toBeTruthy();
  fireEvent.change(input!, { target: { value } });
}

beforeEach(() => {
  vi.mocked(useAuth).mockReturnValue(
    authMock as unknown as ReturnType<typeof useAuth>,
  );
  vi.mocked(useLocations).mockReturnValue({
    neighborhoods: [{ id: "n1", name: "الرمال", governorate: "غزة" }],
    isLoadingNeighborhoods: false,
    isErrorNeighborhoods: false,
    errorNeighborhoods: null,
    refetchNeighborhoods: vi.fn(),
    } as unknown as ReturnType<typeof useLocations>);
});

afterEach(() => {
  vi.useRealTimers();
  Object.values(authMock).forEach((value) => {
    if (typeof value === "function") value.mockReset();
  });
});

describe("auth forms", () => {
  it("validates login required fields and does not submit invalid input", async () => {
    renderRoute(<Login />, "/login");

    fireEvent.click(screen.getAllByText("تسجيل الدخول")[0]);

    expect(await screen.findByText("يرجى إدخال كلمة المرور")).toBeInTheDocument();
    expect(authMock.login).not.toHaveBeenCalled();
  });

  it("submits valid login, shows loading text, and navigates after success", async () => {
    authMock.login.mockResolvedValueOnce({ success: true });
    vi.mocked(useAuth).mockReturnValue({
      ...authMock,
      isLoggingIn: true,
    } as unknown as ReturnType<typeof useAuth>);
    const { container, rerender } = renderRoute(<Login />, "/login");

    expect(screen.getByText("جاري التحقق...")).toBeInTheDocument();

    vi.mocked(useAuth).mockReturnValue({
      ...authMock,
      isLoggingIn: false,
    } as unknown as ReturnType<typeof useAuth>);
    rerender(
      <QueryClientProvider
        client={
          new QueryClient({
            defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
          })
        }
      >
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/home" element={<LocationDisplay />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );

    fillInput(container, "phone", "0599123456");
    fillInput(container, "password", "Password123!");
    fireEvent.click(screen.getAllByText("تسجيل الدخول")[0]);

    await waitFor(() =>
      expect(authMock.login).toHaveBeenCalledWith({
        phone: "0599123456",
        password: "Password123!",
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent("/home"),
    );
  });

  it("shows invalid credentials and redirects unverified users to OTP", async () => {
    authMock.login.mockRejectedValueOnce({
      response: {
        status: 403,
        data: { success: false, message: "Phone number is not verified.", errors: [] },
      },
    });
    const { container } = renderRoute(<Login />, "/login");

    fillInput(container, "phone", "0599123456");
    fillInput(container, "password", "Password123!");
    fireEvent.click(screen.getAllByText("تسجيل الدخول")[0]);

    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent("/verify-otp"),
    );
  });

  it("keeps registration step 1 blocked until required fields pass validation", async () => {
    renderRoute(<RegisterStep1 />, "/register-step1");

    fireEvent.click(screen.getByText("التالي"));

    expect(
      await screen.findByText("الاسم الكامل يجب أن يتكون من 3 أحرف على الأقل"),
    ).toBeInTheDocument();
  });

  it("moves registration step 1 to neighborhood selection with valid input", async () => {
    const { container } = renderRoute(<RegisterStep1 />, "/register-step1");

    fillInput(container, "fullName", "هديل محمد");
    fillInput(container, "phone", "0599123456");
    fillInput(container, "password", "Pass12!");
    fireEvent.click(screen.getByText("التالي"));

    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent("/register-step2"),
    );
  });

  it("submits registration step 2, sends neighborhood, and transitions to OTP", async () => {
    authMock.register.mockResolvedValueOnce({ success: true });
    const { container } = renderRoute(<RegisterStep2 />, {
      pathname: "/register-step2",
      state: {
        fullName: "هديل محمد",
        phone: "0599123456",
        password: "Password123!",
      },
    });

    fillInput(container, "neighborhoodId", "n1");
    fireEvent.click(screen.getByText("إنشاء الحساب"));

    await waitFor(() =>
      expect(authMock.register).toHaveBeenCalledWith({
        fullName: "هديل محمد",
        phone: "0599123456",
        password: "Password123!",
        neighborhoodId: "n1",
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent("/verify-otp"),
    );
  });

  it("shows server validation errors on registration step 2", async () => {
    authMock.register.mockRejectedValueOnce({
      response: {
        data: {
          success: false,
          message: "Validation failed",
          errors: [{ field: "phone", message: "Phone already exists." }],
        },
      },
    });
    const { container } = renderRoute(<RegisterStep2 />, {
      pathname: "/register-step2",
      state: {
        fullName: "هديل محمد",
        phone: "0599123456",
        password: "Password123!",
      },
    });

    fillInput(container, "neighborhoodId", "n1");
    fireEvent.click(screen.getByText("إنشاء الحساب"));

    expect(await screen.findByText(/Phone already exists/i)).toBeInTheDocument();
  });

  it("validates OTP, verifies a valid code, and navigates home", async () => {
    authMock.verifyOtp.mockResolvedValueOnce({ success: true });
    const { container } = renderRoute(<VerifyOtp />, {
      pathname: "/verify-otp",
      state: { phone: "0599123456" },
    });

    fillInput(container, "otp", "12ab");
    fireEvent.click(screen.getByText("تأكيد الحساب والدخول"));
    expect(
      await screen.findByText("رمز التحقق يجب أن يتكون من 6 أرقام"),
    ).toBeInTheDocument();

    fillInput(container, "otp", "123456");
    fireEvent.click(screen.getByText("تأكيد الحساب والدخول"));

    await waitFor(() =>
      expect(authMock.verifyOtp).toHaveBeenCalledWith({
        phone: "0599123456",
        otp: "123456",
      }),
    );
    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent("/home"),
    );
  });

  it("resends OTP only after the timer expires and shows API failures", async () => {
    vi.useFakeTimers();
    authMock.requestOtp.mockRejectedValueOnce(new Error("resend failed"));
    renderRoute(<VerifyOtp />, {
      pathname: "/verify-otp",
      state: { phone: "0599123456" },
    });

    fireEvent.click(screen.getByText("إعادة إرسال الرمز"));
    expect(authMock.requestOtp).not.toHaveBeenCalled();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(60_000);
    });
    fireEvent.click(screen.getByText("إعادة إرسال الرمز"));

    expect(authMock.requestOtp).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
    expect(await screen.findByText("resend failed")).toBeInTheDocument();
  });

  it("requests forgot-password reset and validates reset password rules", async () => {
    authMock.forgotPassword.mockResolvedValueOnce({
      message: "If an account exists, a reset code has been sent.",
    });
    const forgot = renderRoute(<ForgotPassword />, "/forgot-password");

    fillInput(forgot.container, "phone", "0599123456");
    fireEvent.click(screen.getByText("إرسال رمز التحقق"));

    await waitFor(() =>
      expect(authMock.forgotPassword).toHaveBeenCalledWith({
        phone: "0599123456",
      }),
    );
    expect(
      await screen.findByText("إذا كان الحساب مسجلاً، تم إرسال رمز استعادة كلمة المرور."),
    ).toBeInTheDocument();
    forgot.unmount();

    const reset = renderRoute(<ResetPassword />, {
      pathname: "/reset-password",
      state: { phone: "0599123456" },
    });
    fillInput(reset.container, "otp", "123456");
    fillInput(reset.container, "password", "weak");
    fillInput(reset.container, "confirmPassword", "different");
    fireEvent.click(screen.getByText("حفظ كلمة المرور"));

    expect(
      await screen.findByText("كلمة المرور يجب أن تتكون من 8 أحرف على الأقل"),
    ).toBeInTheDocument();
  });

  it("submits reset password and renders the success state", async () => {
    authMock.resetPassword.mockResolvedValueOnce({ success: true });
    const { container } = renderRoute(<ResetPassword />, {
      pathname: "/reset-password",
      state: { phone: "0599123456" },
    });

    fillInput(container, "otp", "123456");
    fillInput(container, "password", "Password123!");
    fillInput(container, "confirmPassword", "Password123!");
    fireEvent.click(screen.getByText("حفظ كلمة المرور"));

    await waitFor(() =>
      expect(authMock.resetPassword).toHaveBeenCalledWith({
        phone: "0599123456",
        otp: "123456",
        newPassword: "Password123!",
      }),
    );
    expect(await screen.findByText("تم تغيير كلمة المرور بنجاح")).toBeInTheDocument();
  });
});
