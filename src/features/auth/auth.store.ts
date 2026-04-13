import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, AuthUser } from "./auth.types";

interface AuthStore extends AuthState {
  setAuth: (user: AuthUser, accessToken: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true, error: null }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);