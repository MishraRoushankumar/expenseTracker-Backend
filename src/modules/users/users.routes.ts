import { Router } from "express";
import {
  getProfileController,
  updateProfileController,
} from "./users.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { updateProfileSchema } from "./users.schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

// GET PROFILE

router.get("/profile", authMiddleware, getProfileController);

// UPDATE PROFILE

router.patch(
  "/profile",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfileController,
);

export default router;
