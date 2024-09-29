import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Register, Login } from "@/types/auth";

// Define the store
interface AuthStore {
  user: Register | null;
  isAuthenticated: boolean;
  setRegister: (register: Register) => void;
  setLogin: (login: Login) => void;
  logout: () => void;
}

export const useStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setRegister: (register) =>
          set({ user: register, isAuthenticated: true }),
        setLogin: (login) =>
          set({ user: { ...login, name: "" }, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
