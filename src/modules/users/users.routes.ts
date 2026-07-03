import { Router } from "express";
import {
  deleteUserController,
  getProfileController,
  updateProfileController,
  updateUserRoleController,
} from "./users.controller.js";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { updateProfileSchema, updateRoleSchema } from "./users.schema.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { USER_ROLES } from "../../constants/role.constants.js";

const router = Router();

// GET PROFILE

router.get("/profile", authMiddleware, getProfileController);

// UPDATE PROFILE

router.patch(
  "/profile",
  authMiddleware,
  validateRequest(updateProfileSchema),
  updateProfileController,
);

// UPDATE USER ROLE

router.patch(
  "/:id/role",
  authMiddleware,
  authorize([USER_ROLES.ADMIN]),
  validateRequest(updateRoleSchema),
  updateUserRoleController,
);

// DELETE USER

router.delete(
  "/:id",
  authMiddleware,
  authorize([USER_ROLES.ADMIN, USER_ROLES.MAINTAINER]),
  deleteUserController,
);

export default router;
