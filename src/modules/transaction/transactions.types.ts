import { TransactionType } from "../../constants/transaction.constants.js";

export interface Transaction {
  id: number;
  userId: number;
  categoryId: number | null;
  type: TransactionType;
  amount: number;
  description: string | null;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTransactionInput {
  userId: number;
  categoryId: number | null;
  type: TransactionType;
  amount: number;
  description?: string | null;
  transactionDate: Date;
}

export interface UpdateTransactionInput {
  categoryId?: number | null;
  type?: TransactionType;
  amount?: number;
  description?: string | null;
  transactionDate?: Date;
}
