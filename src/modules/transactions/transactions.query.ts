import {
  SqlFilterResult,
  TransactionFilters,
  TransactionQueryOptions,
  TransactionSorting,
} from "../../shared/query/index.js";
import { TransactionQueryDto } from "./transactions.schema.js";

/*
=========================================
TRANSACTION QUERY HELPERS
=========================================
*/

export const buildTransactionFilters = (
  userId: number,
  filters?: TransactionFilters,
): SqlFilterResult => {
  const conditions: string[] = ["user_id = $1"];

  const values: unknown[] = [userId];

  let parameterIndex = 2;

  if (filters?.type) {
    conditions.push(`type = $${parameterIndex++}`);
    values.push(filters.type);
  }

  if (filters?.categoryId) {
    conditions.push(`category_id = $${parameterIndex++}`);
    values.push(filters.categoryId);
  }

  if (filters?.startDate) {
    conditions.push(`transaction_date >= $${parameterIndex++}`);
    values.push(filters.startDate);
  }

  if (filters?.endDate) {
    conditions.push(`transaction_date <= $${parameterIndex++}`);
    values.push(filters.endDate);
  }

  return {
    whereClause: `WHERE ${conditions.join(" AND ")}`,
    values,
  };
};

export const buildTransactionSorting = (
  sorting?: TransactionSorting,
): string => {
  if (!sorting) {
    return `
      ORDER BY
        transaction_date DESC,
        created_at DESC
    `;
  }

  const fieldMap = {
    amount: "amount",
    transactionDate: "transaction_date",
    createdAt: "created_at",
  } as const;

  return `
    ORDER BY
      ${fieldMap[sorting.sortBy]}
      ${sorting.sortOrder.toUpperCase()}
  `;
};

export const buildTransactionQueryOptions = (
  query: TransactionQueryDto,
): TransactionQueryOptions => {
  return {
    pagination: {
      page: query.page,
      limit: query.limit,
    },
    filters: {
      type: query.type,
      categoryId: query.categoryId,
      startDate: query.startDate,
      endDate: query.endDate,
    },
    sorting: {
      sortBy: query.sortBy,
      sortOrder: query.sortOrder,
    },
  };
};
