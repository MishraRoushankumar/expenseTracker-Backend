import type { Request, Response } from "express";
import { getHealthStatus } from "./health.service.js";
import { sendResponse } from "../../utils/http/apiResponse.js";
import { asyncHandler } from "../../utils/http/asyncHandler.js";

export const healthController = asyncHandler(
  async (_req: Request, res: Response): Promise<void> => {
    const data = getHealthStatus();

    sendResponse(res, {
      success: true,
      message: "Health check successful",
      data,
    });
  },
);
