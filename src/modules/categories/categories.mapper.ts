import { Category } from "./categories.types.js";

interface CategoryRow {
  id: number;
  name: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export const mapCategoryRow = (row: CategoryRow): Category => {
  return {
    id: row.id,
    name: row.name,
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};
