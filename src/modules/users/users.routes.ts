import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
} from "./users.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createUserSchema } from "./users.schema.js";

const router = Router();

router.get("/", getUsersController);

router.get("/:id", getUserByIdController);

router.post("/", validate(createUserSchema), createUserController);

export default router;
