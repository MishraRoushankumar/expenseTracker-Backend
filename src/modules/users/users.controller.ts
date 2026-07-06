import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import { sendResponse } from "../../utils/http/apiResponse.js";
import {
  deleteUserService,
  getProfileService,
  updateProfileService,
  updateUserRoleService,
} from "./users.service.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { sanitizeUser } from "./users.sanitizer.js";
import { AUTH_MESSAGES } from "../../constants/auth.constants.js";
import { USER_MESSAGES } from "../../constants/user.constants.js";

/*
==========================================
GET PROFILE CONTROLLER
==========================================
*/

export const getProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const user = await getProfileService(req.user.userId);
    sendResponse(res, {
      success: true,
      message: USER_MESSAGES.PROFILE_FETCHED,
      data: sanitizeUser(user),
    });
  },
);

/*
==========================================
UPDATE PROFILE CONTROLLER
==========================================
*/

export const updateProfileController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const updatedUser = await updateProfileService(req.user.userId, req.body);

    sendResponse(res, {
      success: true,
      message: USER_MESSAGES.PROFILE_UPDATED,
      data: sanitizeUser(updatedUser),
    });
  },
);

/*
==========================================
UPDATE USER ROLE CONTROLLER
==========================================
*/

export const updateUserRoleController = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  const { role } = req.body;

  const updatedUser = await updateUserRoleService(userId, role);

  sendResponse(res, {
    success: true,
    message: USER_MESSAGES.ROLE_UPDATED,
    data: sanitizeUser(updatedUser),
  });
});

/*
==========================================
DELETE USER CONTROLLER
==========================================
*/

export const deleteUserController = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
  }

  const targetUserId = Number(req.params.id);

  if (isNaN(targetUserId)) {
    throw new AppError(HTTP_STATUS.BAD_REQUEST, AUTH_MESSAGES.INVALID_USER_ID);
  }

  await deleteUserService(req.user, targetUserId);

  sendResponse(res, {
    success: true,
    message: USER_MESSAGES.USER_DELETED,
  });
});
