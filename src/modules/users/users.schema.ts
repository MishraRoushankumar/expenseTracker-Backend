import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be atleast 2 characters")
    .optional(),

  lastName: z
    .string()
    .min(2, "Last name must be atleast 2 characters")
    .optional(),
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
