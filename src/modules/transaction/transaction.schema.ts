import z from "zod";
import { TRANSACTION_TYPES } from "../../constants/transaction.constants.js";

export const createTransactionSchema = z.object({
  type: z.enum([TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.EXPENSE]),
  amount: z.number().positive("Amount must be greater than zero"),
  categoryId: z.number().int().positive().nullable().optional(),
  description: z.string().trim().max(500).nullable().optional(),
  transactionDate: z.iso.date(),
});

export const updateTransactionSchema = createTransactionSchema.partial();

export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionDto = z.infer<typeof updateTransactionSchema>;
