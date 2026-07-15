import { describe, expect, it, vi } from "vitest";

import { asyncHandler } from "../../../src/utils/http/asyncHandler.js";

describe("asyncHandler", () => {
  it("should call the wrapped handler", async () => {
    const handler = vi.fn().mockResolvedValue(undefined);

    const wrapped = asyncHandler(handler);

    const req = {} as never;
    const res = {} as never;
    const next = vi.fn();

    wrapped(req, res, next);

    await Promise.resolve();

    expect(handler).toHaveBeenCalledWith(req, res, next);
  });

  it("should forward rejected promises to next()", async () => {
    const error = new Error("boom");

    const handler = vi.fn().mockRejectedValue(error);

    const wrapped = asyncHandler(handler);

    const next = vi.fn();

    wrapped({} as never, {} as never, next);

    await Promise.resolve();

    expect(next).toHaveBeenCalledWith(error);
  });
});
