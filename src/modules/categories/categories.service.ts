import { CATEGORY_MESSAGES } from "../../constants/category.constants.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { AppError } from "../../errors/appError.js";
import {
  createCategory,
  findCategoryByIdAndUserId,
  findCategoryByName,
  findCategoryByUserId,
  updateCategory,
} from "./categories.repository.js";
import { CreateCategoryDto, UpdateCategoryDto } from "./categories.schema.js";

/*
===========================================
CREATE CATEGORY
===========================================
*/

export const createCategoryService = async (
  userId: number,
  data: CreateCategoryDto,
) => {
  const normalizedName = data.name.trim().toLowerCase();

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
  return findCategoryByUserId(userId);
};

/*
=========================================
UPDATE CATEGORY
=========================================
*/

export const updateCategoryService = async (
  categoryId: number,
  userId: number,
  data: UpdateCategoryDto,
) => {
  const category = await findCategoryByIdAndUserId(categoryId, userId);

  if (!category) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);
  }

  const normalizedName = data.name.trim().toLowerCase();

  if (normalizedName !== category.name) {
    const duplicate = await findCategoryByName(normalizedName, userId);

    if (duplicate) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        CATEGORY_MESSAGES.ALREADY_EXISTS,
      );
    }
  }

  const updatedCategory = await updateCategory(categoryId, normalizedName);

  if (!updatedCategory) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, CATEGORY_MESSAGES.NOT_FOUND);
  }

  return updatedCategory;
};
