import { describe, expect, it } from "vitest";

import { transactionSortingSchema } from "../../../../src/shared/query/index.js";

describe("transactionSortingSchema", () => {
  it("should parse valid sorting", () => {
    const result = transactionSortingSchema.parse({
      sortBy: "amount",
      sortOrder: "asc",
    });

    expect(result).toEqual({
      sortBy: "amount",
      sortOrder: "asc",
    });
  });

  it("should apply defaults", () => {
    const result = transactionSortingSchema.parse({});

    expect(result).toEqual({
      sortBy: "transactionDate",
      sortOrder: "desc",
    });
  });

  it("should reject invalid sort field", () => {
    expect(() =>
      transactionSortingSchema.parse({
        sortBy: "name",
      }),
    ).toThrow();
  });
});
