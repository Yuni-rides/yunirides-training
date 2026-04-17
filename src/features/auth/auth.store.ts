import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";
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

      setAuth: (user, accessToken) => {
     
        Cookies.set("access_token", accessToken, { 
          expires: 7, 
          secure: true, 
          sameSite: "None" 
        });

        set({ user, accessToken, isAuthenticated: true, error: null });
      },

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error, isLoading: false }),

      logout: () => {
    
        Cookies.remove("access_token");
        
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");

        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },
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