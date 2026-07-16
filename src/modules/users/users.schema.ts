import { z } from "zod";
import { USER_ROLES } from "../../constants/role.constants.js";

export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .optional(),

    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .optional(),
  })
  .refine(
    (data) => data.firstName !== undefined || data.lastName !== undefined,
  );

export const userRoleSchema = z.object({
  role: z.enum([USER_ROLES.ADMIN, USER_ROLES.MAINTAINER, USER_ROLES.USER]),
});

export const updateRoleSchema = z.object({
  role: userRoleSchema,
});

export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
