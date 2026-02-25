import { create } from "zustand";
import { persist } from "zustand/middleware";

import { apiClient } from "@/api/client";
import { API_ENDPOINTS } from "@/api/endpoints";
import type { LoginCredentials, User } from "@/api/types";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (data: LoginCredentials) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => {
      return {
        accessToken: null,
        user: null,
        isAuthenticated: false,

        login: async ({ email, password }) => {
          const { data } = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
            email,
            password,
          });

          set({
            accessToken: data.accessToken,
            user: data.user,
            isAuthenticated: true,
          });
        },
      };
    },
    { name: "auth-store" },
  ),
);
