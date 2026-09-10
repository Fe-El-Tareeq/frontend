const FALLBACK_API_BASE_URL = "https://fe-el-tareeq-api-staging.onrender.com";

function normalizeApiBaseUrl(value: string) {
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed.replace(/\/api\/v1$/, "");
}

function resolveApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL;

  if (configured) {
    return normalizeApiBaseUrl(configured);
  }

  if (import.meta.env.PROD) {
    throw new Error(
      "VITE_API_BASE_URL must be set to the backend origin for production builds.",
    );
  }

  return FALLBACK_API_BASE_URL;
}

export const API_BASE_URL = resolveApiBaseUrl();

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
  },
  LOCATIONS: {
    NEIGHBORHOODS: "/api/v1/locations/neighborhoods",
  },
  USERS: {
    ME: "/api/v1/users/me",
    PROFILE_IMAGE: "/api/v1/users/me/profile-image",
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
  ASSIGNMENTS: {
    LIST: "/api/v1/assignments",
    CREATE: "/api/v1/assignments",
    DETAIL: (id: string) => `/api/v1/assignments/${id}`,
    PICKUP: (id: string) => `/api/v1/assignments/${id}/pickup`,
    START_DELIVERY: (id: string) => `/api/v1/assignments/${id}/start-delivery`,
    COMPLETE: (id: string) => `/api/v1/assignments/${id}/complete`,
    CANCEL: (id: string) => `/api/v1/assignments/${id}/cancel`,
  },
  CHAT: {
    ROOMS: "/api/v1/chat-rooms",
    ROOM_DETAIL: (roomId: string) => `/api/v1/chat-rooms/${roomId}`,
    MESSAGES: (roomId: string) => `/api/v1/chat-rooms/${roomId}/messages`,
    SEND_MESSAGE: (roomId: string) => `/api/v1/chat-rooms/${roomId}/messages`,
    SYNC: (roomId: string) => `/api/v1/chat-rooms/${roomId}/sync`,
    READ: (roomId: string) => `/api/v1/chat-rooms/${roomId}/read`,
  },
  RATINGS: {
    SUBMIT: "/api/v1/ratings",
    PENDING: "/api/v1/ratings/pending",
    ME_RECEIVED: "/api/v1/ratings/me/received",
    ME_SUMMARY: "/api/v1/ratings/me/summary",
    ASSIGNMENT: (assignmentId: string) => `/api/v1/ratings/assignments/${assignmentId}`,
  },
  DELIVERY_PRICING: {
    QUOTE: "/api/v1/delivery-pricing/quote",
  },
  WALLET: {
    ME: "/api/v1/wallet",
    TRANSACTIONS: "/api/v1/wallet/transactions",
  },
  PAYMENTS: {
    PACKAGES: "/api/v1/payments/packages",
    INVOICES: "/api/v1/payments/invoices",
    INVOICE_DETAIL: (id: string) => `/api/v1/payments/invoices/${id}`,
    MOCK_PAY: (id: string) => `/api/v1/payments/mock/invoices/${id}/pay`,
    MOCK_WEBHOOK: "/api/v1/payments/webhooks/mock",
  },
  MESSAGES: {
    CONVERSATIONS: "/api/v1/chat-rooms",
    CHAT: (id: string) => `/api/v1/chat-rooms/${id}/messages`,
    SEND: (id: string) => `/api/v1/chat-rooms/${id}/messages`,
  },
  HEALTH: "/health",
  TEST_VALIDATION: "/api/test/validation",
} as const;
