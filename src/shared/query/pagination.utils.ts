import { PaginationMeta } from "./pagination.types.js";

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

export const calulateTotalPages = (
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

export const buildPaginationMeta = (
  page: number,
  limit: number,
  totalItems: number,
): PaginationMeta => {
  const totalPages = calulateTotalPages(totalItems, limit);

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};
