import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./categories.schema.js";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "./categories.controller.js";

const router = Router();

// CREATE CATEGORY

router.post(
  "/",
  authMiddleware,
  validateRequest(createCategorySchema),
  createCategoryController,
);

// GET CATEGORIES

router.get("/", authMiddleware, getCategoriesController);

// UPDATE CATEGORY

router.patch(
  "/:id",
  authMiddleware,
  validateRequest(updateCategorySchema),
  updateCategoryController,
);

export default router;
