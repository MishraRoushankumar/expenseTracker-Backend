import { TransactionFilters } from "./filtering.types.js";
import { PaginationOptions } from "./pagination.types.js";

export interface QueryOptions {
  pagination: PaginationOptions;
  filters?: TransactionFilters;
}
