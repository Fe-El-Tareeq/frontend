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
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
    CHANGE_PASSWORD: "/api/v1/auth/change-password",
  },
  LOCATIONS: {
    NEIGHBORHOODS: "/api/v1/locations/neighborhoods",
  },
  USERS: {
    ME: "/api/v1/users/me",
    PROFILE_IMAGE: "/api/v1/users/me/profile-image",
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
    UPDATE: (id: string) => `/api/v1/trips/${id}`,
    CANCEL: (id: string) => `/api/v1/trips/${id}/cancel`,
    BOOK: (id: string) => `/api/v1/trips/${id}/book`,
  },
  MATCHING: {
    ERRAND_TRIPS: (id: string) => `/api/v1/matching/errands/${id}`,
    TRIP_ERRANDS: (id: string) => `/api/v1/matching/trips/${id}`,
  },
  DELIVERY_PRICING: {
    QUOTE: "/api/v1/delivery-pricing/quote",
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
