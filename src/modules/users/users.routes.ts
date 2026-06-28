import { Router } from "express";
import {
  createUserController,
  getUserByIdController,
  getUsersController,
} from "./users.controller.js";

const router = Router();

router.get("/", getUsersController);

router.get("/:id", getUserByIdController);

router.post("/", createUserController);

export default router;
