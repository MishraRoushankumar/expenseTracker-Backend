/*
======================================
TRANSACTIONS FILTER
======================================
*/

export interface TransactionFilters {
  type?: "income" | "expense";
  categoryId?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface SqlFilterResult {
  whereClause: string;
  values: unknown[];
}
