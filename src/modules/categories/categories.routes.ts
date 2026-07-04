import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { createCategorySchema } from "./categories.schema.js";
import { createCategoryController } from "./categories.controller.js";

const router = Router();

// CREATE CATEGORY

router.post(
  "/",
  authMiddleware,
  validateRequest(createCategorySchema),
  createCategoryController,
);

export default router;
