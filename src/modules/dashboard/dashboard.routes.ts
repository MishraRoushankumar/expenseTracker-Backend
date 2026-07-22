import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { getDashboardSummaryController } from "./dashboard.controller.js";

const router = Router();

// GET DASHBOARD SUMMARY

router.get("/summary", authMiddleware, getDashboardSummaryController);

export default router;
