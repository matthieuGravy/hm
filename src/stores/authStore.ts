import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Register, Login } from "@/types/auth";

interface AuthStore {
  user: Register | null;
  isAuthenticated: boolean;
  isRegistrationSuccess: boolean;
  setRegister: (register: Register) => void;
  setLogin: (login: Login) => void;
  logout: () => void;
  setRegistrationSuccess: (value: boolean) => void;
}

const initialUser: Register = {
  email: "",
  password1: "",
  password2: "",
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: initialUser,
        isAuthenticated: false,
        isRegistrationSuccess: false,
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
        setRegistrationSuccess: (value) =>
          set({ isRegistrationSuccess: value }),
      }),
      {
        name: "auth-store",
      }
    )
  )
);
