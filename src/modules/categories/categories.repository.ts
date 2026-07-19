import { and, asc, eq } from "drizzle-orm";

import { db } from "../../db/index.js";
import { categories } from "../../db/schema/index.js";

import type { Category, CreateCategoryInput } from "./categories.types.js";

/*
=========================================
CREATE CATEGORY
=========================================
*/

export const createCategory = async (
  data: CreateCategoryInput,
): Promise<Category> => {
  const [category] = await db
    .insert(categories)
    .values({
      name: data.name,
      userId: data.userId,
    })
    .returning();

  return category;
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
  const [category] = await db
    .select()
    .from(categories)
    .where(and(eq(categories.name, name), eq(categories.userId, userId)))
    .limit(1);

  return category;
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
  const [category] = await db
    .select()
    .from(categories)
    .where(and(eq(categories.id, id), eq(categories.userId, userId)))
    .limit(1);

  return category;
};

/*
=========================================
FIND CATEGORY BY USER ID
=========================================
*/

export const findCategoryByUserId = async (
  userId: number,
): Promise<Category[]> => {
  return db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId))
    .orderBy(asc(categories.name));
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
  const [category] = await db
    .update(categories)
    .set({
      name,
      updatedAt: new Date(),
    })
    .where(eq(categories.id, id))
    .returning();

  return category;
};

/*
=========================================
DELETE CATEGORY
=========================================
*/

export const deleteCategory = async (id: number): Promise<boolean> => {
  const deleted = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning({
      id: categories.id,
    });

  return deleted.length > 0;
};
