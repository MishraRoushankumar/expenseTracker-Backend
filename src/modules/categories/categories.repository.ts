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
    INSERT INTO categories (
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

export const findCategoryByIdAndUserId = async (
  id: number,
  userId: number,
): Promise<Category | undefined> => {
  const result = await db.query(
    `
      SELECT *
      FROM categories
      WHERE 
        id = $1
        AND user_id = $2
    `,
    [id, userId],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapCategoryRow(result.rows[0]);
};

/*
=========================================
FIND CATEGORY BY USER ID
=========================================
*/

export const findCategoryByUserId = async (
  userId: number,
): Promise<Category[]> => {
  const result = await db.query(
    `
      SELECT *
      FROM categories
      WHERE user_id = $1
      ORDER BY name ASC
    `,
    [userId],
  );

  return result.rows.map(mapCategoryRow);
};

/*
=========================================
UPDATE CATEGORY
=========================================
*/

export const updateCategory = async (
  id: number,
  name: string,
): Promise<Category | undefined> => {
  const result = await db.query(
    `
    UPDATE categories
    SET 
      name = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING *  
    `,
    [name, id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapCategoryRow(result.rows[0]);
};

/*
=========================================
DELETE CATEGORY
=========================================
*/

export const deleteCategory = async (id: number): Promise<boolean> => {
  const result = await db.query(
    `
    DELETE FROM categories
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );
  return result.rows.length > 0;
};
