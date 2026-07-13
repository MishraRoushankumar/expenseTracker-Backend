import type { TransactionType } from "../../constants/transaction.constants.js";
import type { Transaction } from "./transactions.types.js";

interface TransactionRow {
  id: number;
  user_id: number;
  category_id: number | null;
  type: TransactionType;
  amount: number;
  description: string | null;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}

export const mapTransactionRow = (row: TransactionRow): Transaction => {
  return {
    id: row.id,
    userId: row.user_id,
    categoryId: row.category_id,
    type: row.type,
    amount: row.amount,
    description: row.description,
    transactionDate: row.transaction_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
};
