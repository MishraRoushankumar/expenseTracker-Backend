import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { createCategoryService } from "./categories.service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { CATEGORY_MESSAGES } from "../../constants/category.constants.js";

/*
=========================================
CREATE CATEGORY CONTROLLER
=========================================
 */

export const createCategoryController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, "User not authenticated");
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
