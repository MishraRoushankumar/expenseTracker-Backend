import { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { getProfileService, updateProfileService } from "./users.service.js";

/*
==========================================
GET PROFILE CONTROLLER
==========================================
*/

export const getProfileController = asyncHandler(async (req, res: Response) => {
  const user = await getProfileService(req.user!.userId);
  sendResponse(res, {
    success: true,
    message: "Profile fetched successfully",
    data: user,
  });
});

/*
==========================================
UPDATE PROFILE CONTROLLER
==========================================
*/

export const updateProfileController = asyncHandler(
  async (req, res: Response) => {
    const updatedUser = await updateProfileService(req.user!.userId, req.body);

    sendResponse(res, {
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  },
);
