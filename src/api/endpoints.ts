export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://fe-el-tareeq-api-staging.onrender.com";

export const ENDPOINTS = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    REQUEST_OTP: "/api/v1/auth/request-otp",
    VERIFY_OTP: "/api/v1/auth/verify-otp",
    REFRESH: "/api/v1/auth/refresh",
    LOGOUT: "/api/v1/auth/logout",
  },
  LOCATIONS: {
    NEIGHBORHOODS: "/api/v1/locations/neighborhoods",
  },
  USERS: {
    ME: "/api/v1/users/me",
  },
  ERRANDS: {
    LIST: "/api/v1/errands",
    CREATE: "/api/v1/errands",
    DETAIL: (id: string) => `/api/v1/errands/${id}`,
    UPDATE: (id: string) => `/api/v1/errands/${id}`,
    CANCEL: (id: string) => `/api/v1/errands/${id}/cancel`,
  },
  WALLET: {
    ME: "/api/v1/wallet",
    TRANSACTIONS: "/api/v1/wallet/transactions",
  },
  HEALTH: "/health",
} as const;
