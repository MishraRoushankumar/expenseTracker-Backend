import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import {
  getCategoryAnalyticsService,
  getDashboardInsightsService,
  getDashboardSummaryService,
  getMonthlyTrendsService,
  getRecentTransactionsService,
} from "./dashboard.service.js";
import { sendSuccess } from "../../utils/http/apiResponse.js";
import { DASHBOARD_MESSAGES } from "./dashboard.constants.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { AUTH_MESSAGES } from "../../constants/auth.constants.js";

/*
==========================================
GET DASHBOARD SUMMARY CONTROLLER 
==========================================
*/

export const getDashboardSummaryController = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const dashboard = await getDashboardSummaryService(req.user.userId);

    sendSuccess(res, DASHBOARD_MESSAGES.SUMMARY_RETRIEVED, dashboard);
  },
);

/*
==========================================
GET MONTHLY TRENDS CONTROLLER 
==========================================
*/

export const getMonthlyTrendsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const trends = await getMonthlyTrendsService(req.user.userId);

    sendSuccess(res, DASHBOARD_MESSAGES.MONTHLY_TRENDS_RETRIEVED, trends);
  },
);

/*
==========================================
GET DASHBOARD INSIGHTS CONTROLLER 
==========================================
*/

export const getDashboardInsightsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const insights = await getDashboardInsightsService(req.user.userId);

    sendSuccess(res, DASHBOARD_MESSAGES.INSIGHTS_RETRIEVED, insights);
  },
);

/*
==========================================
GET CATEGORY ANALYTICS CONTROLLER 
==========================================
*/

export const getCategoryAnalyticsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const analytics = await getCategoryAnalyticsService(req.user.userId);

    sendSuccess(
      res,
      DASHBOARD_MESSAGES.CATEGORY_ANALYTICS_RETRIEVED,
      analytics,
    );
  },
);

/*
=================================================
GET RECENT CONTROLLER
=================================================
*/

export const getRecentTransactionsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const { limit } = req.query;

    const transactions = await getRecentTransactionsService(
      req.user.userId,
      Number(limit),
    );

    sendSuccess(
      res,
      DASHBOARD_MESSAGES.RECENT_TRANSACTIONS_RETRIEVED,
      transactions,
    );
  },
);
