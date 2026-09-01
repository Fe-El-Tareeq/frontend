import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import {
  ProtectedRoute,
  PublicOnlyRoute,
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
    useAuthStore.setState({ isAuthenticated: true });

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
});
