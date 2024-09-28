import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z } from "zod";

// Define the Zod schema for registration
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

// Définine the Zod schema for login
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

// Type from Zod schema
type Register = z.infer<typeof registerSchema>;
type Login = z.infer<typeof loginSchema>;

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
