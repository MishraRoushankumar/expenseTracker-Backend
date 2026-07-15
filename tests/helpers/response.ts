import { vi } from "vitest";
import type { Response } from "express";

export function createResponse(): Response {
  const res = {} as Response;

  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);

  return res;
}
