import type { InferSelectModel } from "drizzle-orm";
import type { categories } from "../../db/schema/categories.js";

export type Category = InferSelectModel<typeof categories>;

export interface CreateCategoryInput {
  name: string;
  userId: number;
}

export interface UpdateCategoryInput {
  name: string;
}
