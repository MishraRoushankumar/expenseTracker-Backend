import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createUser, getAllUsers, getUserById } from "./users.service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../utils/constants.js";

export const getUsersController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 2;
    const search = req.query.search as string | undefined;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1 || limit > 100) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, "Invalid pagination values");
    }

    const data = getAllUsers({ page, limit, search });

    sendResponse(res, {
      success: true,
      message: "Users fetched successfully",
      data,
    });
  },
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, "Invalid user ID");
    }

    const user = getUserById(id);

    if (!user) {
      throw new AppError(HTTP_STATUS.NOT_FOUND, "User not found");
    }

    sendResponse(res, {
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  },
);

export const createUserController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { name, email } = req.body;

    if (!name || !email) {
      throw new AppError(HTTP_STATUS.BAD_REQUEST, "Name and email required");
    }

    const user = createUser(name, email);

    sendResponse(res, {
      success: true,
      message: "User created successfully",
      data: user,
      statusCode: HTTP_STATUS.CREATED,
    });
  },
);
