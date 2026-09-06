import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  Assignment,
  AssignmentCreateRequest,
  AssignmentCancelRequest,
  CompleteAssignmentResponseData,
  PaginationMeta,
} from "../types";

export interface AssignmentListData {
  assignments: Assignment[];
  pagination: PaginationMeta;
}

export const assignmentsApi = {
  createAssignment: async (payload: AssignmentCreateRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ assignment: Assignment }>>(
      ENDPOINTS.ASSIGNMENTS.CREATE,
      payload,
    );
    return res.data;
  },

  getAssignments: async (params?: { skip?: number; take?: number }) => {
    const res = await apiClient.get<ApiSuccessResponse<AssignmentListData>>(
      ENDPOINTS.ASSIGNMENTS.LIST,
      { params },
    );
    return res.data;
  },

  getAssignmentById: async (id: string) => {
    const res = await apiClient.get<ApiSuccessResponse<{ assignment: Assignment }>>(
      ENDPOINTS.ASSIGNMENTS.DETAIL(id),
    );
    return res.data;
  },

  markPickedUp: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ assignment: Assignment }>>(
      ENDPOINTS.ASSIGNMENTS.PICKUP(id),
      {},
    );
    return res.data;
  },

  startDelivery: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ assignment: Assignment }>>(
      ENDPOINTS.ASSIGNMENTS.START_DELIVERY(id),
      {},
    );
    return res.data;
  },

  completeAssignment: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<CompleteAssignmentResponseData>>(
      ENDPOINTS.ASSIGNMENTS.COMPLETE(id),
      {},
    );
    return res.data;
  },

  cancelAssignment: async (id: string, payload?: AssignmentCancelRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ assignment: Assignment }>>(
      ENDPOINTS.ASSIGNMENTS.CANCEL(id),
      payload || {},
    );
    return res.data;
  },
};
