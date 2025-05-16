import { z } from "zod";

export const registerSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password1: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    password2: z.string(),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords must match",
    path: ["password2"],
  });

export const loginSchema = z.object({
  username: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "The password must be at least 1 character"),
});
