import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  PaymentTokenPackage,
  PaymentInvoice,
  CreateInvoiceRequest,
  CreateInvoiceResponseData,
  InvoicesListData,
  MockPayResponseData,
  InvoiceStatus,
  VerifyPaymentOtpRequest,
} from "../types";

export const paymentsApi = {
  getPackages: async () => {
    const res = await apiClient.get<
      ApiSuccessResponse<{ packages: PaymentTokenPackage[] }>
    >(ENDPOINTS.PAYMENTS.PACKAGES);
    return res.data;
  },

  createInvoice: async (payload: CreateInvoiceRequest) => {
    const body = {
      tokenPackageId: payload.tokenPackageId || payload.packageId || "",
      clientRequestKey:
        payload.clientRequestKey ||
        (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `req_${Date.now()}`),
      paymentMethod: payload.paymentMethod || payload.method,
      paymentPhone: payload.paymentPhone,
    };
    const res = await apiClient.post<
      ApiSuccessResponse<CreateInvoiceResponseData>
    >(ENDPOINTS.PAYMENTS.INVOICES, body);
    return res.data;
  },

  getInvoices: async (params?: {
    status?: InvoiceStatus;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<ApiSuccessResponse<InvoicesListData>>(
      ENDPOINTS.PAYMENTS.INVOICES,
      { params },
    );
    return res.data;
  },

  getInvoiceById: async (id: string) => {
    const res = await apiClient.get<
      ApiSuccessResponse<{ invoice: PaymentInvoice }>
    >(ENDPOINTS.PAYMENTS.INVOICE_DETAIL(id));
    return res.data;
  },

  mockPayInvoice: async (id: string) => {
    const res = await apiClient.post<
      ApiSuccessResponse<MockPayResponseData>
    >(ENDPOINTS.PAYMENTS.MOCK_PAY(id), {});
    return res.data;
  },

  resendPaymentOtp: async (id: string) => {
    const res = await apiClient.post<
      ApiSuccessResponse<{ message: string }>
    >(ENDPOINTS.PAYMENTS.OTP_RESEND(id), {});
    return res.data;
  },

  verifyPaymentOtp: async (
    id: string,
    payload: VerifyPaymentOtpRequest | { otp: string; otpCode?: string },
  ) => {
    const otp = payload.otp || payload.otpCode || "";
    const res = await apiClient.post<
      ApiSuccessResponse<{ success: boolean; invoice: PaymentInvoice }>
    >(ENDPOINTS.PAYMENTS.OTP_VERIFY(id), { otp });
    return res.data;
  },

  uploadReceipt: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append("receipt", file);
    const res = await apiClient.post<
      ApiSuccessResponse<{ success: boolean; invoice: PaymentInvoice }>
    >(ENDPOINTS.PAYMENTS.RECEIPT(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },
};

