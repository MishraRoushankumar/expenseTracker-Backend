import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  getCategoryAnalyticsController,
  getDashboardInsightsController,
  getDashboardSummaryController,
  getMonthlyTrendsController,
  getRecentTransactionsController,
} from "./dashboard.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { recentTransactionsQuerySchema } from "./dashboard.schemas.js";

const router = Router();

// GET DASHBOARD SUMMARY

router.get("/summary", authMiddleware, getDashboardSummaryController);

// GET MONTHLY TRENDS

router.get("/monthly", authMiddleware, getMonthlyTrendsController);

// GET DASHBOARD INSIGHTS

router.get("/insights", authMiddleware, getDashboardInsightsController);

// GET CATEGORY ANALYTICS

router.get(
  "category-analytics",
  authMiddleware,
  getCategoryAnalyticsController,
);

// GET RECENT TRANSACTIONS

router.get(
  "/recent",
  authMiddleware,
  validate({ query: recentTransactionsQuerySchema }),
  getRecentTransactionsController,
);

export default router;
