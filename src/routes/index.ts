import { Router } from "express";
import healthRoutes from "../modules/health/health.routes.js";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

/*
=======================================
HEALTH CHECK ROUTES
=======================================
*/

router.use("/health", healthRoutes);

/*
=======================================
USER ROUTES
=======================================
*/

router.use("/users", userRoutes);

/*
=======================================
USER ROUTES
=======================================
*/

router.use("/auth", authRoutes);

export default router;
