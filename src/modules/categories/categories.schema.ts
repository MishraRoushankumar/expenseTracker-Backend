import z from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name too short")
    .max(100, "Category name too long"),
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
