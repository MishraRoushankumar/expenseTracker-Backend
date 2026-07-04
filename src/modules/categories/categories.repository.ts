import { db } from "../../config/database.js";
import { mapCategoryRow } from "./categories.mapper.js";
import { Category, CreateCategoryInput } from "./categories.types.js";

/*
=========================================
CREATE CATEGORY
=========================================
*/

export const createCategory = async (
  data: CreateCategoryInput,
): Promise<Category> => {
  const result = await db.query(
    `
    INSER INTO categories (
    name,
    user_id
    )
    VALUES ($1,$2)
    RETURNING *
    `,
    [data.name, data.userId],
  );

  return mapCategoryRow(result.rows[0]);
};

/*
=========================================
FIND CATEGORY BY NAME
=========================================
*/

export const findCategoryByName = async (
  name: string,
  userId: number,
): Promise<Category | undefined> => {
  const result = await db.query(
    `
      SELECT *
      FROM categories
      WHERE
        name = $1
        AND user_id = $2
    `,
    [name, userId],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapCategoryRow(result.rows[0]);
};

/*
=========================================
FIND CATEGORY BY ID
=========================================
*/

export const findCategoryById = async (
  id: number,
): Promise<Category | undefined> => {
  const result = await db.query(
    `
      SELECT *
      FROM categories
      WHERE id = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapCategoryRow(result.rows[0]);
};
