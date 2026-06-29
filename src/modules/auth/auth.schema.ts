import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().check(z.email("Invalid email")),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().check(z.email("Invalid email")),
  password: z.string().min(1, "Password required"),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export type LoginDto = z.infer<typeof loginSchema>;
