import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { z } from "zod";

// Définition du schéma Zod
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

// Type inféré à partir du schéma Zod
type Register = z.infer<typeof registerSchema>;

// Définition de l'interface du store
interface RegisterStore {
  register: Register | null;
  setRegister: (register: Register) => void;
}

export const useStore = create<RegisterStore>()(
  devtools(
    persist(
      (set) => ({
        register: null,
        setRegister: (register) => set({ register }),
      }),
      {
        name: "register-store",
      }
    )
  )
);
