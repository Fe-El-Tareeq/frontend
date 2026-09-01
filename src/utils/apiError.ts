import type { AxiosError } from "axios";
import type { ApiErrorResponse, ApiValidationErrorDetail } from "../types";

/**
 * Safely extracts a single human-readable error message from backend ApiErrorResponse
 * Handles both Validation errors (with field messages) and General errors.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage = "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.",
): string => {
  if (!error) return fallbackMessage;

  const axiosError = error as AxiosError<ApiErrorResponse>;
  if (axiosError?.response?.data) {
    const data = axiosError.response.data;

    // Case 1: Validation Error with detailed field messages
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const fieldErrors = data.errors
        .map((item) => {
          if (typeof item === "string") return item;
          if (typeof item === "object" && item !== null && "message" in item) {
            return (item as ApiValidationErrorDetail).message;
          }
          return null;
        })
        .filter(Boolean) as string[];

      if (fieldErrors.length > 0) {
        // Return the first specific validation error message
        return fieldErrors[0];
      }
    }

    // Case 2: General Error message
    if (
      data.message &&
      typeof data.message === "string" &&
      data.message.trim() !== ""
    ) {
      return data.message;
    }
  }

  // Case 3: Standard JS Error
  if (
    error instanceof Error &&
    error.message &&
    !error.message.startsWith("Request failed with status code")
  ) {
    return error.message;
  }

  return fallbackMessage;
};

/**
 * Extracts a map of field-specific errors: { [fieldName]: errorMessage }
 * Strips prefixes like "body." or "query." (e.g., "body.phone" -> "phone")
 * Perfect for React Hook Form's setError() integration.
 */
export const getApiFieldErrors = (error: unknown): Record<string, string> => {
  const result: Record<string, string> = {};
  if (!error) return result;

  const axiosError = error as AxiosError<ApiErrorResponse>;
  if (
    axiosError?.response?.data?.errors &&
    Array.isArray(axiosError.response.data.errors)
  ) {
    for (const item of axiosError.response.data.errors) {
      if (
        typeof item === "object" &&
        item !== null &&
        "field" in item &&
        "message" in item
      ) {
        const detail = item as ApiValidationErrorDetail;
        if (detail.field && detail.message) {
          // Normalize "body.fieldName" -> "fieldName"
          const cleanField = detail.field.replace(/^(body|query|params)\./, "");
          result[cleanField] = detail.message;
        }
      }
    }
  }

  return result;
};
