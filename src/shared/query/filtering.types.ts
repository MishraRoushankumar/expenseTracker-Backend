/*
======================================
TRANSACTIONS FILTER
======================================
*/

export interface TransactionFilters {
  type?: "income" | "expense";
  categoryId?: number;
  startDate?: string;
  endDate?: string;
}

export interface SqlFilterResult {
  whereClause: string;
  values: unknown[];
}
