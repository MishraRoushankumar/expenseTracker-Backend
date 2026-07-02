import { Router } from "express";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import { loginController, registerController } from "./auth.controller.js";

const router = Router();

// REGISTER ROUTE
router.post("/register", validateRequest(registerSchema), registerController);

// LOGIN ROUTE
router.post("/login", validateRequest(loginSchema), loginController);

// LOGOUT ROUTE

// router.post("/logout", logOutController);

export default router;
