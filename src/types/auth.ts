import type { Neighborhood } from "./locations";

export type UserRole = "USER" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED";

export interface UserSummary {
  id: string;
  phone: string;
  email?: string | null;
  emailVerifiedAt?: string | null;
  fullName?: string | null;
  trustScore?: number;
  profileImageUrl?: string | null;
  role: UserRole;
  status: UserStatus;
}

export interface UserProfile {
  id: string;
  phone: string;
  email?: string | null;
  fullName: string | null;
  profileImageUrl?: string | null;
  role: UserRole;
  trustScore: number;
  neighborhoodId: string | null;
  profileCompleted: boolean;
  phoneVerifiedAt: string | null;
  emailVerifiedAt?: string | null;
  isVerified?: boolean;
  verificationStatus?: "UNVERIFIED" | "PENDING_REVIEW" | "VERIFIED" | "REJECTED";
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  neighborhood?: Neighborhood | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  neighborhoodId: string;
  termsAccepted?: boolean;
}

export interface RegisterResponseData {
  expiresInMinutes: number;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponseData {
  user: UserSummary;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface OtpRequest {
  phone: string;
  channel?: "SMS" | "WHATSAPP";
}

export interface OtpRequestResponseData {
  expiresInMinutes: number;
}

export interface OtpVerifyRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpData extends AuthTokens {
  user: UserSummary;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  phone: string;
  channel?: "SMS" | "WHATSAPP";
}

export interface ForgotPasswordResponseData {
  expiresInMinutes: number;
}

export interface ResetPasswordRequest {
  phone: string;
  otp: string;
  newPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
  confirmPassword?: string;
  refreshToken: string;
}

export interface UserProfileUpdateRequest {
  fullName?: string;
  neighborhoodId?: string;
}

export interface CancelDeletionRequestOtpRequest {
  phone: string;
  channel?: "SMS" | "WHATSAPP";
}

export interface CancelDeletionConfirmRequest {
  phone: string;
  otp: string;
  password?: string;
}

export interface DeactivateAccountRequest {
  password?: string;
  confirmation?: "DELETE";
}

export interface UserNotificationSettings {
  newTripsEnabled?: boolean;
  chatMessagesEnabled?: boolean;
  requestUpdatesEnabled?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  smsNotifications?: boolean;
  whatsappNotifications?: boolean;
  tripAlerts?: boolean;
  errandAlerts?: boolean;
  chatAlerts?: boolean;
}

export interface UserSettingsResponseData {
  notifications: UserNotificationSettings;
  privacy?: Record<string, unknown>;
}

export interface UpdateNotificationSettingsRequest {
  notifications: Partial<UserNotificationSettings>;
}

export interface AdminLoginRequest {
  phone: string;
  password: string;
}

export interface AdminUserSummary {
  id: string;
  phone: string;
  role: "SUPER_ADMIN";
}

export interface AdminLoginResponseData {
  user: AdminUserSummary;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

