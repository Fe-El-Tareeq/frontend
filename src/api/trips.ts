import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  Trip,
  TripFilterParams,
  TripListData,
  CreateTripRequest,
  UpdateTripRequest,
} from "../types";

export const tripsApi = {
  // GET /api/v1/trips
  getTrips: async (params?: TripFilterParams) => {
    const res = await apiClient.get<ApiSuccessResponse<TripListData>>(
      ENDPOINTS.TRIPS.LIST,
      { params },
    );
    return res.data;
  },

  // GET /api/v1/trips/:id
  getTripById: async (id: string) => {
    const res = await apiClient.get<ApiSuccessResponse<{ trip: Trip } | Trip>>(
      ENDPOINTS.TRIPS.DETAIL(id),
    );
    return res.data;
  },

  // POST /api/v1/trips
  createTrip: async (payload: CreateTripRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<{ trip: Trip } | Trip>>(
      ENDPOINTS.TRIPS.CREATE,
      payload,
    );
    return res.data;
  },

  // PATCH /api/v1/trips/:id
  updateTrip: async (id: string, payload: UpdateTripRequest) => {
    const res = await apiClient.patch<
      ApiSuccessResponse<{ trip: Trip } | Trip>
    >(ENDPOINTS.TRIPS.UPDATE(id), payload);
    return res.data;
  },

  // POST /api/v1/trips/:id/cancel
  cancelTrip: async (id: string) => {
    const res = await apiClient.post<ApiSuccessResponse<{ trip: Trip } | Trip>>(
      ENDPOINTS.TRIPS.CANCEL(id),
      {},
    );
    return res.data;
  },

  // Book space helper / placeholder
  bookSpace: async (
    tripId: string,
    payload: { errandId?: string; notes?: string },
  ) => {
    const res = await apiClient.post(ENDPOINTS.TRIPS.BOOK(tripId), payload);
    return res.data;
  },
};
