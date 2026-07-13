import { db } from "../../config/database.js";
import type {
  TransactionQueryOptions,
  TransactionFilters,
} from "../../shared/query/index.js";
import { calculateOffset } from "../../shared/query/index.js";
import {
  buildTransactionFilters,
  buildTransactionSorting,
} from "./transactions.query.js";
import { mapTransactionRow } from "./transactions.mapper.js";
import type {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from "./transactions.types.js";

/*
=========================================
CREATE TRANSACTION
=========================================
*/

export const createTransaction = async (
  data: CreateTransactionInput,
): Promise<Transaction> => {
  const result = await db.query(
    `
      INSERT INTO transactions (
        user_id,
        category_id,
        type,
        amount,
        description,
        transaction_date
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
    [
      data.userId,
      data.categoryId,
      data.type,
      data.amount,
      data.description,
      data.transactionDate,
    ],
  );

  return mapTransactionRow(result.rows[0]);
};

/*
=========================================
FIND TRANSACTION BY ID
=========================================
*/

export const findTransactionById = async (
  id: number,
): Promise<Transaction | undefined> => {
  const result = await db.query(
    `
    SELECT *
    FROM transactions
    WHERE id = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapTransactionRow(result.rows[0]);
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
  const result = await db.query(
    `
    SELECT * 
    FROM transactions
    WHERE 
      id = $1
      AND user_id = $2
    `,
    [id, userId],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapTransactionRow(result.rows[0]);
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

  const { whereClause, values } = buildTransactionFilters(
    userId,
    options.filters,
  );

  const orderBy = buildTransactionSorting(options.sorting);

  const result = await db.query(
    `
      SELECT
        id,
        user_id,
        category_id,
        type,
        amount,
        description,
        transaction_date,
        created_at,
        updated_at
      FROM transactions
      ${whereClause}
      ${orderBy}
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `,
    [...values, options.pagination.limit, offset],
  );

  return result.rows.map(mapTransactionRow);
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
  const result = await db.query(
    `
      UPDATE transactions
      SET
        category_id = $1,
        type = $2,
        amount = $3,
        description = $4,
        transaction_date = $5,
        updated_at = NOW()
      WHERE id = $6
      RETURNING
        id,
        user_id,
        category_id,
        type,
        amount,
        description,
        transaction_date,
        created_at,
        updated_at
    `,
    [
      data.categoryId,
      data.type,
      data.amount,
      data.description,
      data.transactionDate,
      id,
    ],
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapTransactionRow(result.rows[0]);
};

/*
=========================================
DELETE TRANSACTION
=========================================
*/

export const deleteTransaction = async (id: number): Promise<boolean> => {
  const result = await db.query(
    `
    DELETE FROM transactions
    WHERE id = $1
    `,
    [id],
  );

  return result.rowCount === 1;
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
  const { whereClause, values } = buildTransactionFilters(userId, filters);

  const result = await db.query(
    `
      SELECT COUNT(*)::int AS total
      FROM transactions
      ${whereClause}
    `,
    values,
  );

  return result.rows[0].total;
};
