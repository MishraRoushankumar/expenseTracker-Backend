import type { PaginationMeta } from "./pagination.types.js";

/*
===================================
OFFSET
===================================
*/

export const calculateOffset = (page: number, limit: number): number => {
  return (page - 1) * limit;
};

/*
===================================
TOTAL PAGES
===================================
*/

export const calculateTotalPages = (
  totalItems: number,
  limit: number,
): number => {
  return Math.ceil(totalItems / limit);
};

/*
===================================
METADATA
===================================
*/

interface BuildPaginationMetaOptions {
  page: number;
  limit: number;
  totalItems: number;
  currentItemCount: number;
}

export const buildPaginationMeta = ({
  page,
  limit,
  totalItems,
  currentItemCount,
}: BuildPaginationMetaOptions): PaginationMeta => {
  const totalPages = calculateTotalPages(totalItems, limit);

  return {
    page,
    limit,
    totalItems,
    currentItemCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};
