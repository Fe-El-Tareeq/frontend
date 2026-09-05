import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";
import type {
  LoginRequest,
  OtpRequest,
  OtpVerifyRequest,
  RegisterRequest,
  UserProfileUpdateRequest,
} from "../types";

export const AUTH_KEYS = {
  me: ["auth", "me"] as const,
};

export function useAuth() {
  const queryClient = useQueryClient();
  const { setAuth, logout, user, isAuthenticated } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (res) => {
      const { user: userData, accessToken, refreshToken } = res.data;
      setAuth(userData, { accessToken, refreshToken });
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
  });

  const requestOtpMutation = useMutation({
    mutationFn: (data: OtpRequest) => authApi.requestOtp(data),
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (data: OtpVerifyRequest) => authApi.verifyOtp(data),
    onSuccess: (res) => {
      const { user: userData, accessToken, refreshToken } = res.data;
      setAuth(userData, { accessToken, refreshToken });
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = useAuthStore.getState().refreshToken;
      if (refreshToken) {
        try {
          await authApi.logout({ refreshToken });
        } catch {
          // Ignore network failure on logout
        }
      }
      logout();
      queryClient.clear();
    },
  });

  const meQuery = useQuery({
    queryKey: AUTH_KEYS.me,
    queryFn: () => authApi.getMe(),
    enabled: isAuthenticated,
    select: (res) => res.data,
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data: UserProfileUpdateRequest) => authApi.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });

  const uploadProfileImageMutation = useMutation({
    mutationFn: (file: File) => authApi.uploadProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });

  const deleteProfileImageMutation = useMutation({
    mutationFn: () => authApi.deleteProfileImage(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
    },
  });

  return {
    user,
    isAuthenticated,
    profile: meQuery.data,
    isLoadingProfile: meQuery.isLoading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    requestOtp: requestOtpMutation.mutateAsync,
    isRequestingOtp: requestOtpMutation.isPending,
    verifyOtp: verifyOtpMutation.mutateAsync,
    isVerifyingOtp: verifyOtpMutation.isPending,
    verifyOtpError: verifyOtpMutation.error,
    logout: logoutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,
    uploadProfileImage: uploadProfileImageMutation.mutateAsync,
    isUploadingProfileImage: uploadProfileImageMutation.isPending,
    deleteProfileImage: deleteProfileImageMutation.mutateAsync,
    isDeletingProfileImage: deleteProfileImageMutation.isPending,
  };
}
