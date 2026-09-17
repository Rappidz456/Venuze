"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types";

type AuthState = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setUser: (user: AuthUser | null) => void;
  setHydrated: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: Boolean(user),
        }),
      setHydrated: (value) => set({ hasHydrated: value }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "venuze-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
