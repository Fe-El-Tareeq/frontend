import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  SupportConfig,
  SupportTicket,
  CreateTicketRequest,
  CreateTicketMessageRequest,
  TicketListResponseData,
  SupportReport,
  CreateReportRequest,
  ReportListResponseData,
  TicketStatus,
  ReportStatus,
} from "../types";

export const supportApi = {
  getConfig: async () => {
    const res = await apiClient.get<ApiSuccessResponse<SupportConfig>>(
      ENDPOINTS.SUPPORT.CONFIG,
    );
    return res.data;
  },

  createTicket: async (payload: CreateTicketRequest) => {
    const res = await apiClient.post<
      ApiSuccessResponse<{ ticket: SupportTicket }>
    >(ENDPOINTS.SUPPORT.TICKETS, payload);
    return res.data;
  },

  getTickets: async (params?: { skip?: number; take?: number }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<TicketListResponseData>
    >(ENDPOINTS.SUPPORT.TICKETS, { params });
    return res.data;
  },

  getTicketById: async (id: string) => {
    const res = await apiClient.get<
      ApiSuccessResponse<{ ticket: SupportTicket }>
    >(ENDPOINTS.SUPPORT.TICKET_DETAIL(id));
    return res.data;
  },

  sendMessageToTicket: async (
    id: string,
    payload: CreateTicketMessageRequest,
  ) => {
    const res = await apiClient.post<
      ApiSuccessResponse<{ ticket: SupportTicket }>
    >(ENDPOINTS.SUPPORT.TICKET_MESSAGES(id), payload);
    return res.data;
  },

  getAdminTickets: async (params?: {
    status?: TicketStatus;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<TicketListResponseData>
    >(ENDPOINTS.SUPPORT.ADMIN_TICKETS, { params });
    return res.data;
  },

  updateAdminTicketStatus: async (
    id: string,
    payload: { status: TicketStatus },
  ) => {
    const res = await apiClient.patch<
      ApiSuccessResponse<{ ticket: SupportTicket }>
    >(ENDPOINTS.SUPPORT.ADMIN_TICKET_STATUS(id), payload);
    return res.data;
  },

  createReport: async (payload: CreateReportRequest) => {
    const res = await apiClient.post<
      ApiSuccessResponse<{ report: SupportReport }>
    >(ENDPOINTS.SUPPORT.REPORTS, payload);
    return res.data;
  },

  getReports: async (params?: { skip?: number; take?: number }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ReportListResponseData>
    >(ENDPOINTS.SUPPORT.REPORTS, { params });
    return res.data;
  },

  getReportById: async (id: string) => {
    const res = await apiClient.get<
      ApiSuccessResponse<{ report: SupportReport }>
    >(ENDPOINTS.SUPPORT.REPORT_DETAIL(id));
    return res.data;
  },

  getAdminReports: async (params?: {
    status?: ReportStatus;
    skip?: number;
    take?: number;
  }) => {
    const res = await apiClient.get<
      ApiSuccessResponse<ReportListResponseData>
    >(ENDPOINTS.SUPPORT.ADMIN_REPORTS, { params });
    return res.data;
  },

  updateAdminReport: async (
    id: string,
    payload: { status?: ReportStatus; adminNotes?: string },
  ) => {
    const res = await apiClient.patch<
      ApiSuccessResponse<{ report: SupportReport }>
    >(ENDPOINTS.SUPPORT.ADMIN_REPORT_UPDATE(id), payload);
    return res.data;
  },
};
