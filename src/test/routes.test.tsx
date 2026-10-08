import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ProtectedRoute,
  PublicOnlyRoute,
  AdminRoute,
} from "../components/auth/ProtectedRoute";
import { useAuthStore } from "../store/useAuthStore";

describe("Strict ProtectedRoute & PublicOnlyRoute Architecture", () => {
  it("should redirect unauthenticated users away from /home, /trips, /errands to /login", () => {
    useAuthStore.setState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/trips"]}>
        <Routes>
          <Route
            path="/trips"
            element={
              <ProtectedRoute>
                <div>Trips Feed Protected</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Redirected Login Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Trips Feed Protected")).not.toBeInTheDocument();
    expect(screen.getByText("Redirected Login Page")).toBeInTheDocument();
  });

  it("should redirect unauthenticated users away from /errands to /login", () => {
    useAuthStore.setState({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      user: null,
    });

    render(
      <MemoryRouter initialEntries={["/errands"]}>
        <Routes>
          <Route
            path="/errands"
            element={
              <ProtectedRoute>
                <div>Errands Feed Protected</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Redirected Login Page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.queryByText("Errands Feed Protected"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Redirected Login Page")).toBeInTheDocument();
  });

  it("should redirect authenticated users away from /login and /register to /home", () => {
    useAuthStore.setState({
      user: {
        id: "1",
        phone: "0599123456",
        role: "USER" as const,
        status: "ACTIVE" as const,
      },
      accessToken: "mock-jwt-token",
      refreshToken: "mock-refresh-token",
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={["/register-step1"]}>
        <Routes>
          <Route
            path="/register-step1"
            element={
              <PublicOnlyRoute>
                <div>Signup Form</div>
              </PublicOnlyRoute>
            }
          />
          <Route path="/home" element={<div>Home Dashboard Redirected</div>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.queryByText("Signup Form")).not.toBeInTheDocument();
    expect(screen.getByText("Home Dashboard Redirected")).toBeInTheDocument();
  });

  describe("AdminRoute Security Architecture (Restricted to bitareqk@gmail.com)", () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    it("should redirect unauthenticated users away from /admin to /login", () => {
      useAuthStore.setState({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <div>Admin Dashboard Content</div>
                  </AdminRoute>
                }
              />
              <Route path="/login" element={<div>Redirected Login Page</div>} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      );

      expect(screen.queryByText("Admin Dashboard Content")).not.toBeInTheDocument();
      expect(screen.getByText("Redirected Login Page")).toBeInTheDocument();
    });

    it("should deny access and render unauthorized screen for authenticated user with non-admin email", () => {
      useAuthStore.setState({
        user: {
          id: "usr-regular",
          phone: "0599000000",
          email: "regular.user@example.com",
          role: "USER" as const,
          status: "ACTIVE" as const,
        },
        accessToken: "valid-regular-token",
        refreshToken: "valid-refresh-token",
        isAuthenticated: true,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <div>Admin Dashboard Content</div>
                  </AdminRoute>
                }
              />
              <Route path="/home" element={<div>Home Page</div>} />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      );

      expect(screen.queryByText("Admin Dashboard Content")).not.toBeInTheDocument();
      expect(screen.getByText(/غير مصرح بالدخول/)).toBeInTheDocument();
      expect(screen.getByText("bitareqk@gmail.com")).toBeInTheDocument();
    });

    it("should grant full access to authenticated admin with email bitareqk@gmail.com", () => {
      useAuthStore.setState({
        user: {
          id: "usr-admin",
          phone: "0599111222",
          email: "bitareqk@gmail.com",
          role: "SUPER_ADMIN" as const,
          status: "ACTIVE" as const,
        },
        accessToken: "valid-admin-token",
        refreshToken: "valid-refresh-token",
        isAuthenticated: true,
      });

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter initialEntries={["/admin"]}>
            <Routes>
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <div>Admin Dashboard Content</div>
                  </AdminRoute>
                }
              />
            </Routes>
          </MemoryRouter>
        </QueryClientProvider>,
      );

      expect(screen.getByText("Admin Dashboard Content")).toBeInTheDocument();
      expect(screen.queryByText(/غير مصرح بالدخول/)).not.toBeInTheDocument();
    });
  });
});
