import type { IUserCrendentials } from "../../../models/user-crendentials";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cookies } from "typescript-cookie";

interface AuthState {
  user: IUserCrendentials | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  signIn: (
    user: IUserCrendentials,
    accessToken: string,
    refreshToken?: string
  ) => void;
  signOut: () => void;
  updateTokens: (accessToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      signIn: (user, accessToken) => {
        Cookies.set("accessToken", accessToken);
        set({
          user,
          accessToken,
          isAuthenticated: true,
        });
      },

      signOut: () => {
        Cookies.remove("refreshToken");
        window.location.href = "/"
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        });
      },

      updateTokens: (accessToken) => {
        set((state) => ({
          ...state,
          accessToken: accessToken,
          isAuthenticated: !!accessToken,
        }));
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
