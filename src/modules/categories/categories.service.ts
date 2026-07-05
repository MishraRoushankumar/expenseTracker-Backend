import { HTTP_STATUS } from "../../constants/http.constants.js";
import { AppError } from "../../errors/appError.js";
import {
  createCategory,
  findCategoryByName,
  findCategoryByUserId,
} from "./categories.repository.js";
import { CreateCategoryDto } from "./categories.schema.js";

/*
===========================================
CREATE CATEGORY
===========================================
*/

export const createCategoryService = async (
  userId: number,
  data: CreateCategoryDto,
) => {
  const normalizedName = data.name.trim().toLocaleUpperCase();

  const existingCategory = await findCategoryByName(normalizedName, userId);

  if (existingCategory) {
    throw new AppError(HTTP_STATUS.CONFLICT, "Category already exists");
  }

  return createCategory({
    name: normalizedName,
    userId,
  });
};

/*
=========================================
GET CATEGORY
=========================================
*/

export const getCategoriesService = async (userId: number) => {
  return await findCategoryByUserId(userId);
};
