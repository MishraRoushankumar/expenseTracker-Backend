import { describe, expect, it } from "vitest";

import {
  buildPaginationMeta,
  calculateOffset,
  calculateTotalPages,
} from "../../../../src/shared/query/pagination.utils.js";

describe("calculateOffset", () => {
  it("should calculate offset for the first page", () => {
    expect(calculateOffset(1, 10)).toBe(0);
  });

  it("should calculate offset for subsequent pages", () => {
    expect(calculateOffset(3, 10)).toBe(20);
  });

  it("should support custom page sizes", () => {
    expect(calculateOffset(4, 25)).toBe(75);
  });
});

describe("calculateTotalPages", () => {
  it("should return one page when all items fit", () => {
    expect(calculateTotalPages(8, 10)).toBe(1);
  });

  it("should round up partial pages", () => {
    expect(calculateTotalPages(25, 10)).toBe(3);
  });

  it("should return zero when there are no items", () => {
    expect(calculateTotalPages(0, 10)).toBe(0);
  });

  it("should handle exact multiples", () => {
    expect(calculateTotalPages(30, 10)).toBe(3);
  });
});

describe("buildPaginationMeta", () => {
  it("should build pagination metadata", () => {
    const meta = buildPaginationMeta({
      page: 2,
      limit: 10,
      totalItems: 25,
      currentItemCount: 10,
    });

    expect(meta).toEqual({
      page: 2,
      limit: 10,
      totalItems: 25,
      currentItemCount: 10,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });

  it("should identify the first page", () => {
    const meta = buildPaginationMeta({
      page: 1,
      limit: 10,
      totalItems: 25,
      currentItemCount: 10,
    });

    expect(meta.hasPreviousPage).toBe(false);
    expect(meta.hasNextPage).toBe(true);
  });

  it("should identify the last page", () => {
    const meta = buildPaginationMeta({
      page: 3,
      limit: 10,
      totalItems: 25,
      currentItemCount: 5,
    });

    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPreviousPage).toBe(true);
  });

  it("should handle empty collections", () => {
    const meta = buildPaginationMeta({
      page: 1,
      limit: 10,
      totalItems: 0,
      currentItemCount: 0,
    });

    expect(meta.totalPages).toBe(0);
    expect(meta.hasNextPage).toBe(false);
    expect(meta.hasPreviousPage).toBe(false);
  });
});
