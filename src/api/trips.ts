import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { enqueueOfflineMutation } from "../offline/syncEngine";
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
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const mut = await enqueueOfflineMutation({
        type: "CREATE_TRIP",
        endpoint: ENDPOINTS.TRIPS.CREATE,
        method: "POST",
        payload,
        descriptionAr: `إضافة رحلة إلى ${payload.destinationKeyword || "الوجهة"}`,
      });
      return {
        success: true,
        message: "تم حفظ الرحلة محلياً بانتظار استعادة الاتصال",
        data: {
          trip: {
            id: mut.id,
            status: "PENDING_OFFLINE",
            ...payload,
            createdAt: new Date().toISOString(),
          },
        },
      } as unknown as ApiSuccessResponse<{ trip: Trip }>;
    }

    const res = await apiClient.post<ApiSuccessResponse<{ trip: Trip } | Trip>>(
      ENDPOINTS.TRIPS.CREATE,
      payload,
    );
    return res.data;
  },

  // PATCH /api/v1/trips/:id
  updateTrip: async (id: string, payload: UpdateTripRequest) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "UPDATE_TRIP",
        endpoint: ENDPOINTS.TRIPS.UPDATE(id),
        method: "PATCH",
        payload,
        descriptionAr: `تعديل الرحلة #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم حفظ تعديل الرحلة محلياً",
        data: { trip: { id, ...payload } },
      } as unknown as ApiSuccessResponse<{ trip: Trip }>;
    }

    const res = await apiClient.patch<
      ApiSuccessResponse<{ trip: Trip } | Trip>
    >(ENDPOINTS.TRIPS.UPDATE(id), payload);
    return res.data;
  },

  // POST /api/v1/trips/:id/cancel
  cancelTrip: async (id: string) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "CANCEL_TRIP",
        endpoint: ENDPOINTS.TRIPS.CANCEL(id),
        method: "POST",
        payload: {},
        descriptionAr: `إلغاء الرحلة #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم تسجيل إلغاء الرحلة محلياً",
        data: { trip: { id, status: "CANCELLED" } },
      } as unknown as ApiSuccessResponse<{ trip: Trip }>;
    }

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
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const mut = await enqueueOfflineMutation({
        type: "SUBMIT_PROPOSAL",
        endpoint: `/trips/${tripId}/requests`,
        method: "POST",
        payload,
        descriptionAr: `طلب حجز مساحة بالرحلة #${tripId.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم حفظ طلب الحجز محلياً بانتظار استعادة الاتصال",
        data: { id: mut.id, tripId, ...payload },
      };
    }

    const res = await apiClient.post(`/trips/${tripId}/requests`, payload);
    return res.data;
  },
};
