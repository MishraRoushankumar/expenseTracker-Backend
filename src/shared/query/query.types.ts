import type { TransactionFilters } from "./filtering.types.js";
import type { PaginationOptions } from "./pagination.types.js";
import type { TransactionSorting } from "./sorting.types.js";

export interface TransactionQueryOptions {
  pagination: PaginationOptions;
  filters?: TransactionFilters;
  sorting?: TransactionSorting;
}
