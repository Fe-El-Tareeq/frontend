import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { UserSummary } from "../types/auth";
import { API_BASE_URL } from "../api/endpoints";
import { purgeUserOfflineData } from "../offline/storage";

interface AuthState {
  user: UserSummary | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (
    user: UserSummary,
    tokens: { accessToken: string; refreshToken: string },
  ) => void;
  setAccessToken: (accessToken: string) => void;
  setUser: (user: UserSummary) => void;
  logout: () => Promise<void>;
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
          isAuthenticated: Boolean(user && tokens.accessToken),
        }),

      setAccessToken: (accessToken) =>
        set((state) => ({
          accessToken,
          isAuthenticated: Boolean(state.user && accessToken),
        })),

      setUser: (user) =>
        set((state) => ({
          user,
          isAuthenticated: Boolean(user && state.accessToken),
        })),

      logout: async () => {
        const userId = useAuthStore.getState().user?.id;
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
        if (userId) await purgeUserOfflineData(userId, API_BASE_URL);
      },
    }),
    {
      name: "bitareeqak-auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Strictly validate that user and accessToken both exist to be authenticated
          state.isAuthenticated = Boolean(state.user && state.accessToken);
        }
      },
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: Boolean(state.user && state.accessToken),
      }),
    },
  ),
);
