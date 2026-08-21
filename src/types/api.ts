export type ApiSuccessResponse<T = null> = {
  success: true;
  message: string;
  data: T;
};

export interface ApiValidationErrorDetail {
  field: string;
  message: string;
}

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors: ApiValidationErrorDetail[] | unknown[];
};

export type ApiResponse<T = null> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
  skip: number;
  take: number;
  total: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination: PaginationMeta;
}
