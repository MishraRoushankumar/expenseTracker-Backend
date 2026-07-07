/*
=========================================
PAGINATION OPTIONS
=========================================
*/

export interface PaginationOptions {
  page: number;
  limit: number;
}

/*
=========================================
PAGINATION METADATA
=========================================
*/

export interface PaginationMeta {
  page: number;
  limit: number;

  totalItems: number;
  currentItemCount: number;
  totalPages: number;

  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/*
=========================================
PAGINATED RESPONSE
=========================================
*/

export interface PaginatedResponse<T> {
  data: T[];

  pagination: PaginationMeta;
}
