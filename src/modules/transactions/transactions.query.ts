import { asc, desc, eq, gte, lte, type SQL } from "drizzle-orm";
import type {
  TransactionFilters,
  TransactionQueryOptions,
  TransactionSorting,
} from "../../shared/query/index.js";
import type { TransactionQueryDto } from "./transactions.schema.js";
import { transactions } from "../../db/schema/transactions.js";

/*
=========================================
TRANSACTION QUERY HELPERS
=========================================
*/

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

export const buildTransactionConditions = (
  userId: number,
  filters?: TransactionFilters,
): SQL[] => {
  const conditions: SQL[] = [eq(transactions.userId, userId)];

  if (filters?.type) {
    conditions.push(eq(transactions.type, filters.type));
  }

  if (filters?.categoryId) {
    conditions.push(eq(transactions.categoryId, filters.categoryId));
  }

  if (filters?.startDate) {
    conditions.push(
      gte(transactions.transactionDate, new Date(filters.startDate)),
    );
  }

  if (filters?.endDate) {
    conditions.push(
      lte(transactions.transactionDate, new Date(filters.endDate)),
    );
  }

  return conditions;
};

export const buildTransactionOrder = (sorting?: TransactionSorting) => {
  if (!sorting) {
    return [desc(transactions.transactionDate), desc(transactions.createdAt)];
  }

  const direction = sorting.sortOrder === "asc" ? asc : desc;

  switch (sorting.sortBy) {
    case "amount":
      return [direction(transactions.amount)];

    case "createdAt":
      return [direction(transactions.createdAt)];

    case "transactionDate":
    default:
      return [direction(transactions.transactionDate)];
  }
};
