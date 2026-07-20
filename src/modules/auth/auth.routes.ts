import { Router } from "express";
import {
  authMiddleware,
  authRateLimiter,
  validate,
} from "../../middlewares/index.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import {
  loginController,
  logoutController,
  registerController,
} from "./auth.controller.js";

const router = Router();

// REGISTER ROUTE
router.post(
  "/register",
  authRateLimiter,
  validate({ body: registerSchema }),
  registerController,
);

// LOGIN ROUTE
router.post(
  "/login",
  authRateLimiter,
  validate({ body: loginSchema }),
  loginController,
);

// LOGOUT ROUTE

router.post("/logout", authMiddleware, logoutController);

export default router;
