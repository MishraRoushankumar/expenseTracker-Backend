import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name too short").max(50, "Name too long"),
  email: z.string().check(z.email("Invalid email address")),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
