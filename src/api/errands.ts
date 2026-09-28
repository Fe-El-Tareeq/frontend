import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import { enqueueOfflineMutation } from "../offline/syncEngine";
import type {
  ApiSuccessResponse,
  Errand,
  ErrandCreateRequest,
  ErrandFilterParams,
  ErrandListData,
  ErrandUpdateRequest,
} from "../types";

export const errandsApi = {
  getErrands: async (params?: ErrandFilterParams) => {
    const res = await apiClient.get<ApiSuccessResponse<ErrandListData>>(
      ENDPOINTS.ERRANDS.LIST,
      { params },
    );
    return res.data;
  },

  getErrandById: async (id: string) => {
    const res = await apiClient.get<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.DETAIL(id),
    );
    return res.data;
  },

  createErrand: async (payload: ErrandCreateRequest) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const mut = await enqueueOfflineMutation({
        type: "CREATE_ERRAND",
        endpoint: ENDPOINTS.ERRANDS.CREATE,
        method: "POST",
        payload,
        descriptionAr: `إنشاء طلب: ${payload.title}`,
      });
      return {
        success: true,
        message: "تم حفظ الطلب محلياً بانتظار استعادة الاتصال",
        data: {
          errand: {
            id: mut.id,
            status: "PENDING_OFFLINE",
            ...payload,
            createdAt: new Date().toISOString(),
          },
        },
      } as unknown as ApiSuccessResponse<{ errand: Errand }>;
    }

    const res = await apiClient.post<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.CREATE,
      payload,
    );
    return res.data;
  },

  updateErrand: async (id: string, payload: ErrandUpdateRequest) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "UPDATE_ERRAND",
        endpoint: ENDPOINTS.ERRANDS.UPDATE(id),
        method: "PATCH",
        payload,
        descriptionAr: `تحديث الطلب #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم حفظ التعديل محلياً بانتظار استعادة الاتصال",
        data: { errand: { id, ...payload } },
      } as unknown as ApiSuccessResponse<{ errand: Errand }>;
    }

    const res = await apiClient.patch<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.UPDATE(id),
      payload,
    );
    return res.data;
  },

  cancelErrand: async (id: string) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      await enqueueOfflineMutation({
        type: "CANCEL_ERRAND",
        endpoint: ENDPOINTS.ERRANDS.CANCEL(id),
        method: "POST",
        payload: {},
        descriptionAr: `إلغاء الطلب #${id.slice(0, 6)}`,
      });
      return {
        success: true,
        message: "تم تسجيل الإلغاء محلياً بانتظار استعادة الاتصال",
        data: { errand: { id, status: "CANCELLED" } },
      } as unknown as ApiSuccessResponse<{ errand: Errand }>;
    }

    const res = await apiClient.post<ApiSuccessResponse<{ errand: Errand }>>(
      ENDPOINTS.ERRANDS.CANCEL(id),
    );
    return res.data;
  },

  submitOffer: async (
    errandId: string,
    payload: { priceNis: number; departureTime: string; notes?: string },
  ) => {
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      const mut = await enqueueOfflineMutation({
        type: "SUBMIT_PROPOSAL",
        endpoint: ENDPOINTS.ERRANDS.OFFERS(errandId),
        method: "POST",
        payload,
        descriptionAr: `تقديم عرض توصيل بقيمة ${payload.priceNis} ₪`,
      });
      return {
        success: true,
        message: "تم حفظ العرض محلياً بانتظار استعادة الاتصال",
        data: { id: mut.id, errandId, ...payload },
      };
    }

    const res = await apiClient.post(
      ENDPOINTS.ERRANDS.OFFERS(errandId),
      payload,
    );
    return res.data;
  },
};
