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

const initialUser: Register = {
  email: "",
  password1: "",
  password2: "",
};

export const useStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: initialUser,
        isAuthenticated: false,
        setRegister: (register) =>
          set({
            user: register,
            isAuthenticated: true,
          }),
        setLogin: (login) =>
          set({
            user: {
              email: login.email,
              password1: login.password,
              password2: login.password,
            },
            isAuthenticated: true,
          }),
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
