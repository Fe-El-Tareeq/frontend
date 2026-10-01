import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL, ENDPOINTS } from "./endpoints";
import { useAuthStore } from "../store/useAuthStore";
import type { ApiSuccessResponse, AuthTokens } from "../types";
import { getCachedData, setCachedData } from "../offline/cacheManager";
import { enqueueOfflineMutation } from "../offline/syncEngine";
import type { OfflineMutationType } from "../types/offline";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT access token to outgoing requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Concurrency-safe Token Refresh Queue
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor for offline cache fallback & automatic 401 retry
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Automatically cache successful GET API responses into IndexedDB
    if (
      response.config.method?.toLowerCase() === "get" &&
      response.config.url &&
      response.status === 200 &&
      response.data
    ) {
      const cacheKey = `${response.config.baseURL || ""}${response.config.url}`;
      setCachedData(cacheKey, response.data).catch(() => {});
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Offline Cache Fallback for GET requests
    const isNetworkError =
      !error.response ||
      error.code === "ERR_NETWORK" ||
      error.message === "Network Error" ||
      (typeof navigator !== "undefined" && !navigator.onLine);

    if (
      isNetworkError &&
      originalRequest.method?.toLowerCase() === "get" &&
      originalRequest.url
    ) {
      const cacheKey = `${originalRequest.baseURL || ""}${originalRequest.url}`;
      const cached = await getCachedData(cacheKey);

      if (cached) {
        return {
          data: cached,
          status: 200,
          statusText: "OK (Offline Cache)",
          headers: {},
          config: originalRequest,
          isOfflineCache: true,
        } as AxiosResponse;
      }
    }

    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // Do not attempt refresh on auth endpoints themselves
    if (
      originalRequest.url?.includes(ENDPOINTS.AUTH.LOGIN) ||
      originalRequest.url?.includes(ENDPOINTS.AUTH.REGISTER) ||
      originalRequest.url?.includes(ENDPOINTS.AUTH.REFRESH) ||
      originalRequest.url?.includes(ENDPOINTS.AUTH.VERIFY_OTP)
    ) {
      return Promise.reject(error);
    }

    const { refreshToken, logout, setAccessToken } = useAuthStore.getState();

    if (!refreshToken) {
      logout();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post<ApiSuccessResponse<AuthTokens>>(
        `${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`,
        { refreshToken },
      );

      const newTokens = response.data.data;
      setAccessToken(newTokens.accessToken);

      processQueue(null, newTokens.accessToken);

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
      }

      return apiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as Error, null);
      logout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

/**
 * Helper to queue an action offline when disconnected
 */
export async function queueOfflineAction<T = unknown>(params: {
  type: OfflineMutationType;
  endpoint: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  payload: T;
  descriptionAr: string;
  entityId?: string;
}) {
  return enqueueOfflineMutation(params);
}
