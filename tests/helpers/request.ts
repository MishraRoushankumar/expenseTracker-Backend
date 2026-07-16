import type { Request } from "express";
import type { JwtPayload } from "../../src/utils/auth/jwt.js";

export type MockRequest = Request & {
  user?: JwtPayload;
};

export function createRequest(
  overrides: Partial<MockRequest> = {},
): MockRequest {
  return {
    headers: {},
    body: {},
    params: {},
    query: {},
    ...overrides,
  } as MockRequest;
}
