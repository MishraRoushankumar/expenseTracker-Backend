import { Router } from "express";
import healthRoutes from "../modules/health/health.routes.js";
import userRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import categoryRoutes from "../modules/categories/categories.routes.js";
import transactionRoutes from "../modules/transaction/transaction.routes.js";

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
AUTH ROUTES
=======================================
*/

router.use("/auth", authRoutes);

/*
=======================================
CATEGORY ROUTES
=======================================
*/

router.use("/categories", categoryRoutes);

/*
=======================================
TRANSACTION ROUTES
=======================================
*/

router.use("/transactions", transactionRoutes);

export default router;
