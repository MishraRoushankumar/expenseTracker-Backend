import { and, eq, sql } from "drizzle-orm";

import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "./transactions.types.js";
import { db } from "../../db/index.js";
import { transactions } from "../../db/schema/index.js";

import {
  calculateOffset,
  type TransactionFilters,
  type TransactionQueryOptions,
} from "../../shared/query/index.js";

import {
  buildTransactionConditions,
  buildTransactionOrder,
} from "./transactions.query.js";

/*
=========================================
CREATE TRANSACTION
=========================================
*/

export const createTransaction = async (
  data: CreateTransactionInput,
): Promise<Transaction> => {
  const [transaction] = await db
    .insert(transactions)
    .values({
      userId: data.userId,
      categoryId: data.categoryId,
      type: data.type,
      amount: data.amount,
      description: data.description,
      transactionDate: data.transactionDate,
    })
    .returning();

  return { ...transaction, amount: Number(transaction.amount) };
};

/*
=========================================
FIND TRANSACTION BY ID
=========================================
*/

export const findTransactionById = async (
  id: number,
): Promise<Transaction | undefined> => {
  const [transaction] = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, id))
    .limit(1);

  if (!transaction) return undefined;

  return {
    ...transaction,
    amount: Number(transaction.amount),
  };
};

/*
=========================================
FIND TRANSACTION BY ID AND USER ID
=========================================
*/

export const findTransactionByIdAndUserId = async (
  id: number,
  userId: number,
): Promise<Transaction | undefined> => {
  const [transaction] = await db
    .select()
    .from(transactions)
    .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
    .limit(1);

  if (!transaction) return undefined;

  return {
    ...transaction,
    amount: Number(transaction.amount),
  };
};

/*
=========================================
FIND TRANSACTIONS BY USER ID
=========================================
*/

export const findTransactionsByUserId = async (
  userId: number,
  options: TransactionQueryOptions,
): Promise<Transaction[]> => {
  const offset = calculateOffset(
    options.pagination.page,
    options.pagination.limit,
  );

  const conditions = buildTransactionConditions(userId, options.filters);

  const orderBy = buildTransactionOrder(options.sorting);

  const result = await db
    .select()
    .from(transactions)
    .where(and(...conditions))
    .orderBy(...orderBy)
    .limit(options.pagination.limit)
    .offset(offset);

  return result.map((transaction) => ({
    ...transaction,
    amount: Number(transaction.amount),
  }));
};

/*
=========================================
UPDATE TRANSACTION
=========================================
*/

export const updateTransaction = async (
  id: number,
  data: UpdateTransactionInput,
): Promise<Transaction | undefined> => {
  const [transaction] = await db
    .update(transactions)
    .set({
      categoryId: data.categoryId,
      type: data.type,
      amount: data.amount !== undefined ? data.amount : undefined,
      description: data.description,
      transactionDate: data.transactionDate,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, id))
    .returning();

  if (!transaction) return undefined;

  return {
    ...transaction,
    amount: Number(transaction.amount),
  };
};

/*
=========================================
DELETE TRANSACTION
=========================================
*/

export const deleteTransaction = async (id: number): Promise<boolean> => {
  const deleted = await db
    .delete(transactions)
    .where(eq(transactions.id, id))
    .returning({
      id: transactions.id,
    });

  return deleted.length > 0;
};

/*
=========================================
COUNT TRANSACTIONS BY USER ID
=========================================
*/

export const countTransactionsByUserId = async (
  userId: number,
  filters?: TransactionFilters,
): Promise<number> => {
  const conditions = buildTransactionConditions(userId, filters);

  const [result] = await db
    .select({
      total: sql<number>`count(*)`,
    })
    .from(transactions)
    .where(and(...conditions));

  return Number(result.total);
};
