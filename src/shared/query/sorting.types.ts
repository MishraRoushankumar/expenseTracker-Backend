/*
=========================================
TRANSACTION SORTING
=========================================
*/

export type transactionSortField = "amount" | "transactionDate" | "createdAt";

export type SortOrder = "asc" | "desc";

export interface TransactionSorting {
  sortBy: transactionSortField;
  sortOrder: SortOrder;
}
