import { Router } from "express";
import { validateRequest } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createTransactionSchema } from "./transaction.schema.js";
import {
  createTransactionController,
  getTransactionByIdController,
  getTransactionsController,
} from "./transaction.controller.js";

const router = Router();

// CREATE TRANSACTION

router.post(
  "/",
  authMiddleware,
  validateRequest(createTransactionSchema),
  createTransactionController,
);

// GET TRANSACTIONS

router.get("/", authMiddleware, getTransactionsController);

// GET TRANSACTION BY ID

router.get("/:id", authMiddleware, getTransactionByIdController);

export default router;
