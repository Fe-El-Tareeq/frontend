import { http, HttpResponse } from "msw";
import { describe, expect, it, vi } from "vitest";
import { API_BASE_URL, ENDPOINTS } from "../api/endpoints";
import { apiClient } from "../api/client";
import { useAuthStore } from "../store/useAuthStore";
import { server } from "./msw/server";

const user = {
  id: "user-1",
  phone: "0599123456",
  role: "USER" as const,
  status: "ACTIVE" as const,
};

describe("apiClient", () => {
  it("uses a backend origin base URL and appends versioned endpoint paths once", async () => {
    let observedUrl = "";

    server.use(
      http.get(`${API_BASE_URL}${ENDPOINTS.LOCATIONS.NEIGHBORHOODS}`, ({ request }) => {
        observedUrl = request.url;
        return HttpResponse.json({
          success: true,
          data: { neighborhoods: [] },
        });
      }),
    );

    await apiClient.get(ENDPOINTS.LOCATIONS.NEIGHBORHOODS);

    expect(API_BASE_URL).not.toMatch(/\/api\/v1$/);
    expect(observedUrl).toBe(
      `${API_BASE_URL}${ENDPOINTS.LOCATIONS.NEIGHBORHOODS}`,
    );
  });

  it("attaches the stored access token to protected requests", async () => {
    let authorizationHeader: string | null = null;
    useAuthStore.setState({
      user,
      accessToken: "access-token-1",
      refreshToken: "refresh-token-1",
      isAuthenticated: true,
    });

    server.use(
      http.get(`${API_BASE_URL}${ENDPOINTS.USERS.ME}`, ({ request }) => {
        authorizationHeader = request.headers.get("authorization");
        return HttpResponse.json({
          success: true,
          data: { ...user, fullName: "Test User", profileCompleted: true },
        });
      }),
    );

    await apiClient.get(ENDPOINTS.USERS.ME);

    expect(authorizationHeader).toBe("Bearer access-token-1");
  });

  it("refreshes once after a protected 401 and retries queued requests with the new token", async () => {
    const protectedHits: string[] = [];
    const refreshHits = vi.fn();

    useAuthStore.setState({
      user,
      accessToken: "expired-token",
      refreshToken: "refresh-token-1",
      isAuthenticated: true,
    });

    server.use(
      http.post(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, async () => {
        refreshHits();
        await new Promise((resolve) => setTimeout(resolve, 20));
        return HttpResponse.json({
          success: true,
          data: {
            accessToken: "fresh-token",
            refreshToken: "refresh-token-1",
            tokenType: "Bearer",
            expiresIn: 3600,
          },
        });
      }),
      http.get(`${API_BASE_URL}${ENDPOINTS.USERS.ME}`, ({ request }) => {
        const auth = request.headers.get("authorization") || "";
        protectedHits.push(auth);

        if (auth === "Bearer expired-token") {
          return HttpResponse.json(
            { success: false, message: "Expired token", errors: [] },
            { status: 401 },
          );
        }

        return HttpResponse.json({
          success: true,
          data: { ...user, fullName: "Fresh User", profileCompleted: true },
        });
      }),
    );

    await Promise.all([
      apiClient.get(ENDPOINTS.USERS.ME),
      apiClient.get(ENDPOINTS.USERS.ME),
    ]);

    expect(refreshHits).toHaveBeenCalledTimes(1);
    expect(protectedHits).toContain("Bearer expired-token");
    expect(protectedHits.filter((h) => h === "Bearer fresh-token").length).toBe(2);
    expect(useAuthStore.getState().accessToken).toBe("fresh-token");
  });

  it("logs out when refresh fails", async () => {
    useAuthStore.setState({
      user,
      accessToken: "expired-token",
      refreshToken: "refresh-token-1",
      isAuthenticated: true,
    });

    server.use(
      http.post(`${API_BASE_URL}${ENDPOINTS.AUTH.REFRESH}`, () =>
        HttpResponse.json(
          { success: false, message: "Refresh failed", errors: [] },
          { status: 401 },
        ),
      ),
      http.get(`${API_BASE_URL}${ENDPOINTS.USERS.ME}`, () =>
        HttpResponse.json(
          { success: false, message: "Expired token", errors: [] },
          { status: 401 },
        ),
      ),
    );

    await expect(apiClient.get(ENDPOINTS.USERS.ME)).rejects.toBeTruthy();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().accessToken).toBeNull();
  });
});
