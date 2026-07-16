import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction } from "express";

import { AUTH_MESSAGES } from "../../../src/constants/auth.constants.js";
import { HTTP_STATUS } from "../../../src/constants/http.constants.js";
import { AppError } from "../../../src/errors/appError.js";
import { authMiddleware } from "../../../src/middlewares/auth.middleware.js";
import { verifyToken } from "../../../src/utils/auth/jwt.js";

import {
  createNext,
  createRequest,
  createResponse,
} from "../../helpers/index.js";

vi.mock("../../../src/utils/auth/jwt.js", () => ({
  verifyToken: vi.fn(),
}));

describe("authMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when authorization header is missing", () => {
    it("should pass TOKEN_MISSING AppError to next()", () => {
      const req = createRequest();

      const res = createResponse();

      const next = createNext();

      authMiddleware(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next).toHaveBeenCalledWith(expect.any(AppError));

      const error = next.mock.calls[0][0] as AppError;

      expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);

      expect(error.message).toBe(AUTH_MESSAGES.TOKEN_MISSING);
    });
  });

  describe("when authorization header is not Bearer", () => {
    it("should reject the request", () => {
      const req = createRequest({
        headers: {
          authorization: "Basic abc123",
        },
      });

      const res = createResponse();

      const next = createNext();

      authMiddleware(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      const error = next.mock.calls[0][0] as AppError;

      expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);

      expect(error.message).toBe(AUTH_MESSAGES.TOKEN_MISSING);
    });
  });

  describe("when JWT is invalid", () => {
    it("should pass INVALID_TOKEN AppError to next()", () => {
      vi.mocked(verifyToken).mockImplementation(() => {
        throw new Error("Invalid token");
      });

      const req = createRequest({
        headers: {
          authorization: "Bearer invalid-token",
        },
      });

      const res = createResponse();

      const next = createNext();

      authMiddleware(req, res, next as NextFunction);

      expect(verifyToken).toHaveBeenCalledWith("invalid-token");

      expect(next).toHaveBeenCalledOnce();

      const error = next.mock.calls[0][0] as AppError;

      expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);

      expect(error.message).toBe(AUTH_MESSAGES.INVALID_TOKEN);
    });
  });

  describe("when JWT is valid", () => {
    it("should attach the decoded user to request", () => {
      const user = {
        userId: 1,
        email: "john@example.com",
        role: "user",
      } as const;

      vi.mocked(verifyToken).mockReturnValue(user);

      const req = createRequest({
        headers: {
          authorization: "Bearer valid-token",
        },
      });

      const res = createResponse();

      const next = createNext();

      authMiddleware(req, res, next as NextFunction);

      expect(verifyToken).toHaveBeenCalledWith("valid-token");

      expect(req.user).toEqual(user);

      expect(next).toHaveBeenCalledOnce();

      expect(next).toHaveBeenCalledWith();
    });
  });
});
