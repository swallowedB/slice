import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser } from "@/hooks/queries/auth/queryKeys";

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
  setUser: (user: AuthUser) => void;
  clearUser: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "slice_auth",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
