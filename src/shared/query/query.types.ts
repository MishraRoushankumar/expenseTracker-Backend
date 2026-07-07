import { TransactionFilters } from "./filtering.types.js";
import { PaginationOptions } from "./pagination.types.js";
import { TransactionSorting } from "./sorting.types.js";

export interface TransactionQueryOptions {
  pagination: PaginationOptions;
  filters?: TransactionFilters;
  sorting?: TransactionSorting;
}
