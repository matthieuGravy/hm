import { z } from "zod";
import { registerSchema, loginSchema } from "@/schemas/auth";

export interface LoginData {
  username?: string;
  email: string;
  password: string;
}
export interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;
