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
} from "../types";

export const paymentsApi = {
  getPackages: async () => {
    const res = await apiClient.get<
      ApiSuccessResponse<{ packages: PaymentTokenPackage[] }>
    >(ENDPOINTS.PAYMENTS.PACKAGES);
    return res.data;
  },

  createInvoice: async (payload: CreateInvoiceRequest) => {
    const res = await apiClient.post<
      ApiSuccessResponse<CreateInvoiceResponseData>
    >(ENDPOINTS.PAYMENTS.INVOICES, payload);
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
};
