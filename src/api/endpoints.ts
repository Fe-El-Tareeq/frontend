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
    CHANGE_PASSWORD: "/api/v1/auth/change-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
  },
  LOCATIONS: {
    NEIGHBORHOODS: "/api/v1/locations/neighborhoods",
  },
  USERS: {
    ME: "/api/v1/users/me",
    PROFILE: "/api/v1/users/profile",
    SETTINGS: "/api/v1/users/settings",
  },
  ERRANDS: {
    LIST: "/api/v1/errands",
    CREATE: "/api/v1/errands",
    DETAIL: (id: string) => `/api/v1/errands/${id}`,
    UPDATE: (id: string) => `/api/v1/errands/${id}`,
    CANCEL: (id: string) => `/api/v1/errands/${id}/cancel`,
    OFFERS: (id: string) => `/api/v1/errands/${id}/offers`,
  },
  TRIPS: {
    LIST: "/api/v1/trips",
    CREATE: "/api/v1/trips",
    DETAIL: (id: string) => `/api/v1/trips/${id}`,
    BOOK: (id: string) => `/api/v1/trips/${id}/book`,
    CANCEL: (id: string) => `/api/v1/trips/${id}/cancel`,
  },
  MESSAGES: {
    CONVERSATIONS: "/api/v1/messages/conversations",
    CHAT: (id: string) => `/api/v1/messages/conversations/${id}`,
    SEND: (id: string) => `/api/v1/messages/conversations/${id}/send`,
  },
  WALLET: {
    ME: "/api/v1/wallet",
    TRANSACTIONS: "/api/v1/wallet/transactions",
    TOPUP: "/api/v1/wallet/topup",
  },
  HEALTH: "/health",
} as const;
