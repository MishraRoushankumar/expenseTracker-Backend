import {
  SqlFilterResult,
  TransactionFilters,
} from "../../shared/query/index.js";

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
