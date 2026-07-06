import { Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import { loginUser, registerUser } from "./auth.service.js";
import { LoginDto, RegisterDto } from "./auth.schema.js";
import { sendResponse } from "../../utils/http/apiResponse.js";

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
    message: "Login successfully",
    data: {
      accessToken,
    },
  });
});
