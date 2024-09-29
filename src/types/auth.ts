import { z } from "zod";
import { registerSchema, loginSchema } from "@/schemas/auth";

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export type Register = z.infer<typeof registerSchema>;
export type Login = z.infer<typeof loginSchema>;
