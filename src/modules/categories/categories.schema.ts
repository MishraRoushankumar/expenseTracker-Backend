import { z } from "zod";

const categoryNameSchema = z
  .string()
  .trim()
  .min(2, "Category name too short")
  .max(100, "Category name too long");

export const createCategorySchema = z.object({
  name: categoryNameSchema,
});

export const updateCategorySchema = z.object({
  name: categoryNameSchema,
});

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>;
