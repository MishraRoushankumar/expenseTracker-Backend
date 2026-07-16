import type { Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import { loginUser, registerUser } from "./auth.service.js";
import type { LoginDto, RegisterDto } from "./auth.schema.js";
import { sendResponse } from "../../utils/http/apiResponse.js";
import { AUTH_MESSAGES } from "../../constants/auth.constants.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";

/*
=================================
REGISTER CONTROLLER
=================================
*/

export const registerController = asyncHandler(async (req, res: Response) => {
  await registerUser(req.body as RegisterDto);

  sendResponse(res, {
    success: true,

    message: "User registered successfully",
  });
});

/*
=================================
LOGIN CONTROLLER
=================================
*/

export const loginController = asyncHandler(async (req, res: Response) => {
  const accessToken = await loginUser(req.body as LoginDto);

  sendResponse(res, {
    success: true,
    message: AUTH_MESSAGES.LOGIN_SUCCESS,
    data: {
      accessToken,
    },
  });
});

/*
=================================
LOGOUT CONTROLLER
=================================
*/

export const logoutController = asyncHandler(async (_req, res: Response) => {
  sendResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: AUTH_MESSAGES.LOGOUT_SUCCESS,
  });
});
