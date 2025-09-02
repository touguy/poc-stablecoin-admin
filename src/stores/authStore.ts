import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  username: string;
  loginId: string;
  roleId: string;
} | null;

type AuthStore = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // localStorage 키 이름
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
