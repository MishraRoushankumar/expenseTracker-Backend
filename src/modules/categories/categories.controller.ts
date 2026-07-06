import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
  updateCategoryService,
} from "./categories.service.js";
import { sendResponse } from "../../utils/http/apiResponse.js";
import { CATEGORY_MESSAGES } from "../../constants/category.constants.js";
import { AUTH_MESSAGES } from "../../constants/auth.constants.js";

/*
=========================================
CREATE CATEGORY CONTROLLER
=========================================
*/

export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const category = await createCategoryService(req.user.userId, req.body);

    sendResponse(res, {
      success: true,
      message: CATEGORY_MESSAGES.CREATED,
      data: category,
      statusCode: HTTP_STATUS.CREATED,
    });
  },
);

/*
=========================================
GET CATEGORY CONTROLLER
=========================================
*/

export const getCategoriesController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const categories = await getCategoriesService(req.user.userId);

    sendResponse(res, {
      success: true,
      message: CATEGORY_MESSAGES.FETCHED,
      data: categories,
    });
  },
);

/*
=========================================
UPDATE CATEGORY CONTROLLER
=========================================
*/

export const updateCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const categoryId = Number(req.params.id);

    const updatedCategory = await updateCategoryService(
      categoryId,
      req.user.userId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      message: CATEGORY_MESSAGES.UPDATED,
      data: updatedCategory,
    });
  },
);

/*
=========================================
DELETE CATEGORY CONTROLLER
=========================================
*/

export const deleteCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const categoryId = Number(req.params.id);

    await deleteCategoryService(categoryId, req.user.userId);

    sendResponse(res, {
      success: true,
      message: CATEGORY_MESSAGES.DELETED,
    });
  },
);
