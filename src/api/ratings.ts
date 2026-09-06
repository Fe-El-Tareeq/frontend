import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  Rating,
  RatingCreateRequest,
  RatingCreateResponseData,
  PendingRatingsResponseData,
  ReceivedRatingsResponseData,
  UserRatingSummaryResponseData,
} from "../types";

export const ratingsApi = {
  submitRating: async (payload: RatingCreateRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<RatingCreateResponseData>>(
      ENDPOINTS.RATINGS.SUBMIT,
      payload,
    );
    return res.data;
  },

  getPendingRatings: async (params?: { skip?: number; take?: number }) => {
    const res = await apiClient.get<ApiSuccessResponse<PendingRatingsResponseData>>(
      ENDPOINTS.RATINGS.PENDING,
      { params },
    );
    return res.data;
  },

  getMyReceivedRatings: async (params?: { skip?: number; take?: number }) => {
    const res = await apiClient.get<ApiSuccessResponse<ReceivedRatingsResponseData>>(
      ENDPOINTS.RATINGS.ME_RECEIVED,
      { params },
    );
    return res.data;
  },

  getMySummary: async () => {
    const res = await apiClient.get<ApiSuccessResponse<UserRatingSummaryResponseData>>(
      ENDPOINTS.RATINGS.ME_SUMMARY,
    );
    return res.data;
  },

  getAssignmentRatings: async (assignmentId: string) => {
    const res = await apiClient.get<ApiSuccessResponse<{ ratings: Rating[] }>>(
      ENDPOINTS.RATINGS.ASSIGNMENT(assignmentId),
    );
    return res.data;
  },
};
