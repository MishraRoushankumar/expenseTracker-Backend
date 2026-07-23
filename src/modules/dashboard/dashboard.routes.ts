import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  getCategoryAnalyticsController,
  getDashboardInsightsController,
  getDashboardSummaryController,
  getMonthlyTrendsController,
} from "./dashboard.controller.js";

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

export default router;
