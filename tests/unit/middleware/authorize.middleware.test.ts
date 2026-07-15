import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction } from "express";

import { AUTH_MESSAGES } from "../../../src/constants/auth.constants.js";
import { HTTP_STATUS } from "../../../src/constants/http.constants.js";
import { AppError } from "../../../src/errors/appError.js";
import { authorize } from "../../../src/middlewares/authorize.middleware.js";

import {
  createNext,
  createRequest,
  createResponse,
} from "../../helpers/index.js";

describe("authorize", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when the user is not authenticated", () => {
    it("should pass AUTH_REQUIRED AppError to next()", () => {
      const middleware = authorize(["admin"]);

      const req = createRequest();

      const res = createResponse();

      const next = createNext();

      middleware(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next).toHaveBeenCalledWith(expect.any(AppError));

      const error = next.mock.calls[0][0] as AppError;

      expect(error.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);

      expect(error.message).toBe(AUTH_MESSAGES.AUTH_REQUIRED);
    });
  });

  describe("when the user has insufficient permissions", () => {
    it("should pass a forbidden AppError to next()", () => {
      const middleware = authorize(["admin"]);

      const req = createRequest({
        user: {
          userId: 1,
          email: "user@example.com",
          role: "user",
        },
      });

      const res = createResponse();

      const next = createNext();

      middleware(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next).toHaveBeenCalledWith(expect.any(AppError));

      const error = next.mock.calls[0][0] as AppError;

      expect(error.statusCode).toBe(HTTP_STATUS.FORBIDDEN);

      expect(error.message).toBe("Insufficient permissions");
    });
  });

  describe("when the user has permission", () => {
    it("should call next() without an error", () => {
      const middleware = authorize(["admin", "maintainer"]);

      const req = createRequest({
        user: {
          userId: 1,
          email: "admin@example.com",
          role: "admin",
        },
      });

      const res = createResponse();

      const next = createNext();

      middleware(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("when multiple roles are allowed", () => {
    it("should allow any matching role", () => {
      const middleware = authorize(["admin", "maintainer"]);

      const req = createRequest({
        user: {
          userId: 2,
          email: "maintainer@example.com",
          role: "maintainer",
        },
      });

      const res = createResponse();

      const next = createNext();

      middleware(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next).toHaveBeenCalledWith();
    });
  });
});
