import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { createUser, getAllUsers, getUserById } from "./users.service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../utils/constants.js";

export const getUsersController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const users = getAllUsers();

    sendResponse(res, {
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  },
);

export const getUserByIdController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

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
