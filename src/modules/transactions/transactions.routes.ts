import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createTransactionSchema } from "./transactions.schema.js";
import {
  createTransactionController,
  getTransactionByIdController,
  getTransactionsController,
} from "./transactions.controller.js";

const router = Router();

// CREATE TRANSACTION

router.post(
  "/",
  authMiddleware,
  validate({ body: createTransactionSchema }),
  createTransactionController,
);

// GET TRANSACTIONS

router.get("/", authMiddleware, getTransactionsController);

// GET TRANSACTION BY ID

router.get("/:id", authMiddleware, getTransactionByIdController);

export default router;
