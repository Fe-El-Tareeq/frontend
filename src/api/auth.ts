import { apiClient } from "./client";
import { ENDPOINTS } from "./endpoints";
import type {
  ApiSuccessResponse,
  RegisterRequest,
  RegisterResponseData,
  LoginRequest,
  LoginResponseData,
  OtpRequest,
  OtpRequestResponseData,
  OtpVerifyRequest,
  VerifyOtpData,
  RefreshTokenRequest,
  UserProfile,
  UserProfileUpdateRequest,
} from "../types";

export const authApi = {
  register: async (payload: RegisterRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<RegisterResponseData>>(
      ENDPOINTS.AUTH.REGISTER,
      payload,
    );
    return res.data;
  },

  login: async (payload: LoginRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<LoginResponseData>>(
      ENDPOINTS.AUTH.LOGIN,
      payload,
    );
    return res.data;
  },

  requestOtp: async (payload: OtpRequest) => {
    const res = await apiClient.post<
      ApiSuccessResponse<OtpRequestResponseData>
    >(ENDPOINTS.AUTH.REQUEST_OTP, payload);
    return res.data;
  },

  verifyOtp: async (payload: OtpVerifyRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<VerifyOtpData>>(
      ENDPOINTS.AUTH.VERIFY_OTP,
      payload,
    );
    return res.data;
  },

  logout: async (payload: RefreshTokenRequest) => {
    const res = await apiClient.post<ApiSuccessResponse<null>>(
      ENDPOINTS.AUTH.LOGOUT,
      payload,
    );
    return res.data;
  },

  getMe: async () => {
    const res = await apiClient.get<ApiSuccessResponse<UserProfile>>(
      ENDPOINTS.USERS.ME,
    );
    return res.data;
  },

  updateMe: async (payload: UserProfileUpdateRequest) => {
    const res = await apiClient.patch<ApiSuccessResponse<UserProfile>>(
      ENDPOINTS.USERS.ME,
      payload,
    );
    return res.data;
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await apiClient.put<ApiSuccessResponse<UserProfile>>(
      ENDPOINTS.USERS.PROFILE_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data;
  },

  deleteProfileImage: async () => {
    const res = await apiClient.delete<ApiSuccessResponse<UserProfile>>(
      ENDPOINTS.USERS.PROFILE_IMAGE,
    );
    return res.data;
  },
};
