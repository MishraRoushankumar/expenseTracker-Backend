import { Request, Response } from "express";
import { getHealthStatus } from "./health.service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const healthController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const data = getHealthStatus();

    sendResponse(res, {
      success: true,
      message: "Health check successful",
      data,
    });
  },
);
