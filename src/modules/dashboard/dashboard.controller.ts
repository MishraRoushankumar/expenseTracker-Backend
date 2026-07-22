import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import { getDashboardSummary } from "./dashboard.service.js";
import { sendResponse } from "../../utils/http/apiResponse.js";
import { DASHBOARD_MESSAGES } from "./dashboard.constants.js";

/*
==========================================
GET DASHBOARD SUMMARY HANDLER 
==========================================
*/

export const getDashboardSummaryController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const dashboard = await getDashboardSummary(req.user!.userId);

    sendResponse(res, {
      success: true,
      message: DASHBOARD_MESSAGES.SUMMARY_RETRIEVED,
      data: dashboard,
    });
  },
);
