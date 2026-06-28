import { Router } from "express";
import { sendResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../errors/appError.js";
import healthRoutes from "../modules/health/health.routes.js";

const router = Router();

/*
=======================================
HEALTH CHECK ROUTES
=======================================
*/
router.use("/health", healthRoutes);

/*  
=======================================
TEST ROUTES
=======================================
*/
router.get("/error", (req, res) => {
  throw new Error("Manual error test");
});

router.get("/user", (req, res) => {
  sendResponse(res, {
    success: true,
    message: "User fetched successfuly",
    data: {
      name: "Roushan",
      role: "Backed Developer",
    },
  });
});

router.get(
  "/async-test",
  asyncHandler(async (req, res) => {
    throw new AppError(500, "Async route failed");
  }),
);

export default router;
