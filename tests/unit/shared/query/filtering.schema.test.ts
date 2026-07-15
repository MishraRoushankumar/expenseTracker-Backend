import { describe, expect, it } from "vitest";

import { transactionFilteringSchema } from "../../../../src/shared/query/index.js";

describe("transactionFilteringSchema", () => {
  it("should parse valid filters", () => {
    const result = transactionFilteringSchema.parse({
      type: "income",
      categoryId: "5",
      startDate: "2026-01-01",
      endDate: "2026-01-31",
    });

    expect(result).toEqual({
      type: "income",
      categoryId: 5,
      startDate: "2026-01-01",
      endDate: "2026-01-31",
    });
  });

  it("should allow empty filters", () => {
    expect(transactionFilteringSchema.parse({})).toEqual({});
  });

  it("should reject invalid transaction type", () => {
    expect(() =>
      transactionFilteringSchema.parse({
        type: "salary",
      }),
    ).toThrow();
  });
});
