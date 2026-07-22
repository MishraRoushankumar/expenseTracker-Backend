import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  getDashboardSummaryController,
  getMonthlyTrendsController,
} from "./dashboard.controller.js";

const router = Router();

// GET DASHBOARD SUMMARY

router.get("/summary", authMiddleware, getDashboardSummaryController);

// GET MONTHLY TRENDS

router.get("/monthly", authMiddleware, getMonthlyTrendsController);

export default router;
