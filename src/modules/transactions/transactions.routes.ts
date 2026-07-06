import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "./transactions.schema.js";
import {
  createTransactionController,
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

router.get("/", authMiddleware, getTransactionsController);

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

export default router;
