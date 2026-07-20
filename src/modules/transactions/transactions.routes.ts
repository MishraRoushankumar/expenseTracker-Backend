import { Router } from "express";
import { authMiddleware, validate } from "../../middlewares/index.js";
import {
  createTransactionSchema,
  TransactionQuerySchema,
  updateTransactionSchema,
} from "./transactions.schema.js";
import {
  createTransactionController,
  deleteTransactionController,
  getTransactionByIdController,
  getTransactionsController,
  updateTransactionController,
} from "./transactions.controller.js";
import { idParamsSchema } from "../../shared/schemas/id.schema.js";

const router = Router();

// CREATE TRANSACTION

router.post(
  "/",
  authMiddleware,
  validate({ body: createTransactionSchema }),
  createTransactionController,
);

// GET TRANSACTIONS

router.get(
  "/",
  authMiddleware,
  validate({ query: TransactionQuerySchema }),
  getTransactionsController,
);

// GET TRANSACTION BY ID

router.get("/:id", authMiddleware, getTransactionByIdController);

// UPDATE TRANSACTION

router.patch(
  "/:id",
  authMiddleware,
  validate({
    params: idParamsSchema,
    body: updateTransactionSchema,
  }),
  updateTransactionController,
);

// DELETE TRANSACTION

router.delete(
  "/:id",
  authMiddleware,
  validate({ params: idParamsSchema }),
  deleteTransactionController,
);

export default router;
