import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "The name must be at least 2 characters")
    .max(50, "The name must be at most 50 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "The password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "The password must be at least 1 character"),
});
