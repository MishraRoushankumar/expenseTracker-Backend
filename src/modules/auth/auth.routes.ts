import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { loginController, registerController } from "./auth.controller.js";
import { authRateLimiter } from "../../middlewares/rateLimit.middleware.js";

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

// router.post("/logout", logOutController);

export default router;
