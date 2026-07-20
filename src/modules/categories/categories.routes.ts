import { Router } from "express";
import { authMiddleware, validate } from "../../middlewares/index.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./categories.schema.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from "./categories.controller.js";

const router = Router();

// CREATE CATEGORY

router.post(
  "/",
  authMiddleware,
  validate({ body: createCategorySchema }),
  createCategoryController,
);

// GET CATEGORIES

router.get("/", authMiddleware, getCategoriesController);

// UPDATE CATEGORY

router.patch(
  "/:id",
  authMiddleware,
  validate({ body: updateCategorySchema }),
  updateCategoryController,
);

// DELETE CATEGORY

router.delete("/:id", authMiddleware, deleteCategoryController);

export default router;
