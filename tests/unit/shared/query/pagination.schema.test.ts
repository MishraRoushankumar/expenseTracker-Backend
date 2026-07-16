import { describe, expect, it } from "vitest";

import { paginationSchema } from "../../../../src/shared/query/index.js";

describe("paginationSchema", () => {
  it("should parse valid pagination values", () => {
    const result = paginationSchema.parse({
      page: "2",
      limit: "20",
    });

    expect(result).toEqual({
      page: 2,
      limit: 20,
    });
  });

  it("should apply default values", () => {
    const result = paginationSchema.parse({});

    expect(result).toEqual({
      page: 1,
      limit: 10,
    });
  });

  it("should reject invalid page", () => {
    expect(() =>
      paginationSchema.parse({
        page: 0,
        limit: 10,
      }),
    ).toThrow();
  });

  it("should reject limit above maximum", () => {
    expect(() =>
      paginationSchema.parse({
        page: 1,
        limit: 101,
      }),
    ).toThrow();
  });
});
