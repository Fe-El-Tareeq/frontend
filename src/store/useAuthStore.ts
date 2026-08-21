import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserSummary } from "../types/auth";

interface AuthState {
  user: UserSummary | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: UserSummary, tokens: { accessToken: string; refreshToken: string }) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: UserSummary) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      setAuth: (user, tokens) =>
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),

      setAccessToken: (accessToken) =>
        set({
          accessToken,
        }),

      setUser: (user) =>
        set({
          user,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "bitareeqak-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
