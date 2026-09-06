import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  EXACT_ERROR_TRANSLATIONS,
  SUCCESS_TRANSLATIONS,
  DYNAMIC_PATTERN_TRANSLATIONS,
} from "./catalog";

const resources = {
  ar: {
    translation: {
      errors: EXACT_ERROR_TRANSLATIONS,
      success: SUCCESS_TRANSLATIONS,
      common: {
        networkError: "تعذر الاتصال بالخادم، يرجى التحقق من اتصال الإنترنت.",
        unexpectedError: "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.",
        loading: "جاري التحميل...",
        retry: "إعادة المحاولة",
        confirm: "تأكيد",
        cancel: "إلغاء",
        save: "حفظ",
        delete: "حذف",
      },
    },
  },
  en: {
    translation: {
      errors: Object.keys(EXACT_ERROR_TRANSLATIONS).reduce(
        (acc, key) => ({ ...acc, [key]: key }),
        {},
      ),
      success: Object.keys(SUCCESS_TRANSLATIONS).reduce(
        (acc, key) => ({ ...acc, [key]: key }),
        {},
      ),
      common: {
        networkError: "Network connection error, please check your internet.",
        unexpectedError: "An unexpected error occurred, please try again.",
        loading: "Loading...",
        retry: "Retry",
        confirm: "Confirm",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

/**
 * Translates any English backend API error message to Arabic
 * Supports exact catalog lookup and dynamic regex pattern matching.
 */
export function translateApiMessage(
  message?: string | null,
  fallback = "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.",
): string {
  if (!message || typeof message !== "string") return fallback;

  const trimmed = message.trim();

  // 1. Direct match in exact dictionary
  if (EXACT_ERROR_TRANSLATIONS[trimmed]) {
    return EXACT_ERROR_TRANSLATIONS[trimmed];
  }

  // 1b. Check without trailing period or with trailing period
  const withDot = trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
  const withoutDot = trimmed.endsWith(".") ? trimmed.slice(0, -1) : trimmed;

  if (EXACT_ERROR_TRANSLATIONS[withDot]) {
    return EXACT_ERROR_TRANSLATIONS[withDot];
  }
  if (EXACT_ERROR_TRANSLATIONS[withoutDot]) {
    return EXACT_ERROR_TRANSLATIONS[withoutDot];
  }

  // 2. Dynamic pattern matching with variable capture
  for (const rule of DYNAMIC_PATTERN_TRANSLATIONS) {
    if (rule.pattern.test(trimmed)) {
      return trimmed.replace(rule.pattern, rule.replace);
    }
  }

  // 3. Fallback if already in Arabic
  if (/[\u0600-\u06FF]/.test(trimmed)) {
    return trimmed;
  }

  return trimmed || fallback;
}

/**
 * Translates any English backend API success message to Arabic
 */
export function translateSuccessMessage(
  message?: string | null,
  fallback = "تمت العملية بنجاح.",
): string {
  if (!message || typeof message !== "string") return fallback;

  const trimmed = message.trim();
  if (SUCCESS_TRANSLATIONS[trimmed]) {
    return SUCCESS_TRANSLATIONS[trimmed];
  }

  // Fallback if already Arabic
  if (/[\u0600-\u06FF]/.test(trimmed)) {
    return trimmed;
  }

  return SUCCESS_TRANSLATIONS[trimmed] || trimmed || fallback;
}
