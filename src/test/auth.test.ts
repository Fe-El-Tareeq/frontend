import { describe, it, expect } from "vitest";
import { z } from "zod";
import { ENDPOINTS } from "../api/endpoints";

describe("Auth Module & Swagger API Schemas", () => {
  // 1. Password Complexity Schema according to Swagger Specification
  const passwordComplexitySchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

  it("should validate strong passwords conforming to Swagger rules", () => {
    expect(passwordComplexitySchema.safeParse("Pass1234!").success).toBe(true);
    expect(passwordComplexitySchema.safeParse("Secure@2026").success).toBe(true);
  });

  it("should reject weak passwords lacking required character classes", () => {
    expect(passwordComplexitySchema.safeParse("weakpass").success).toBe(false);
    expect(passwordComplexitySchema.safeParse("NoNumber!").success).toBe(false);
    expect(passwordComplexitySchema.safeParse("NoSpecial1").success).toBe(false);
    expect(passwordComplexitySchema.safeParse("Short1!").success).toBe(false);
  });

  // 2. OTP Validation Schema (Exactly 6 digits)
  const otpSchema = z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain digits only");

  it("should validate exactly 6-digit OTP codes", () => {
    expect(otpSchema.safeParse("123456").success).toBe(true);
    expect(otpSchema.safeParse("000999").success).toBe(true);
  });

  it("should reject invalid OTP lengths or non-numeric values", () => {
    expect(otpSchema.safeParse("12345").success).toBe(false);
    expect(otpSchema.safeParse("1234567").success).toBe(false);
    expect(otpSchema.safeParse("12345a").success).toBe(false);
  });

  // 3. Register Request Schema
  const registerRequestSchema = z.object({
    fullName: z.string().min(2),
    phone: z.string().min(8).max(20),
    password: z.string().min(8),
    neighborhoodId: z.string().min(1),
  });

  it("should validate registration request payload", () => {
    const validPayload = {
      fullName: "هديل محمد",
      phone: "0591234567",
      password: "Password123!",
      neighborhoodId: "60a32850-bd3f-444a-84b4-c750abf6ecb6",
    };
    expect(registerRequestSchema.safeParse(validPayload).success).toBe(true);
  });

  // 4. API Endpoint Definitions Check
  it("should have all expected Swagger Auth endpoints registered", () => {
    expect(ENDPOINTS.AUTH.REGISTER).toBe("/api/v1/auth/register");
    expect(ENDPOINTS.AUTH.LOGIN).toBe("/api/v1/auth/login");
    expect(ENDPOINTS.AUTH.REQUEST_OTP).toBe("/api/v1/auth/request-otp");
    expect(ENDPOINTS.AUTH.VERIFY_OTP).toBe("/api/v1/auth/verify-otp");
    expect(ENDPOINTS.AUTH.FORGOT_PASSWORD).toBe("/api/v1/auth/forgot-password");
    expect(ENDPOINTS.AUTH.RESET_PASSWORD).toBe("/api/v1/auth/reset-password");
    expect(ENDPOINTS.AUTH.REFRESH).toBe("/api/v1/auth/refresh");
    expect(ENDPOINTS.AUTH.LOGOUT).toBe("/api/v1/auth/logout");
  });
});
