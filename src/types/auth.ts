import type { Neighborhood } from "./locations";

export type UserRole = "USER" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "BANNED";

export interface UserSummary {
  id: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
}

export interface UserProfile {
  id: string;
  phone: string;
  fullName: string | null;
  role: UserRole;
  trustScore: number;
  neighborhoodId: string | null;
  profileCompleted: boolean;
  phoneVerifiedAt: string | null;
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
  password: string;
  neighborhoodId: string;
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

export interface UserProfileUpdateRequest {
  fullName?: string;
  neighborhoodId?: string;
}
