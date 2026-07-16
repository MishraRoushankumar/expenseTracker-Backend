import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction } from "express";
import { ZodError, z } from "zod";

import { HTTP_STATUS } from "../../../src/constants/http.constants.js";
import { AppError } from "../../../src/errors/appError.js";
import { errorMiddleware } from "../../../src/middlewares/error.middleware.js";

import {
  createNext,
  createRequest,
  createResponse,
} from "../../helpers/index.js";

import { sendResponse } from "../../../src/utils/http/apiResponse.js";
import { logger } from "../../../src/logger/index.js";

vi.mock("../../../src/utils/http/apiResponse.js", () => ({
  sendResponse: vi.fn(),
}));

vi.mock("../../../src/logger/index.js", () => ({
  logger: {
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe("errorMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when the error is a SyntaxError", () => {
    it("should return a bad request response", () => {
      const req = createRequest({
        method: "POST",
        originalUrl: "/api/test",
      });

      const res = createResponse();

      const next = createNext();

      const error = new SyntaxError("Unexpected token");

      Object.defineProperty(error, "body", {
        value: "{}",
      });

      errorMiddleware(error, req, res, next as NextFunction);

      expect(logger.warn).toHaveBeenCalledOnce();

      expect(sendResponse).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          success: false,
          message: "Invalid JSON format",
          statusCode: HTTP_STATUS.BAD_REQUEST,
        }),
      );
    });
  });

  describe("when the error is an AppError", () => {
    it("should return the application error", () => {
      const req = createRequest({
        method: "GET",
        originalUrl: "/api/test",
      });

      const res = createResponse();

      const next = createNext();

      const error = new AppError(HTTP_STATUS.NOT_FOUND, "Resource not found");

      errorMiddleware(error, req, res, next as NextFunction);

      expect(logger.warn).toHaveBeenCalledOnce();

      expect(sendResponse).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          success: false,
          message: "Resource not found",
          statusCode: HTTP_STATUS.NOT_FOUND,
        }),
      );
    });
  });

  describe("when the error is a ZodError", () => {
    it("should treat it as an unhandled error", () => {
      const schema = z.object({
        name: z.string(),
      });

      let error!: ZodError;

      try {
        schema.parse({});
      } catch (err) {
        error = err as ZodError;
      }

      const req = createRequest({
        method: "POST",
        originalUrl: "/api/test",
      });

      const res = createResponse();

      const next = createNext();

      errorMiddleware(error, req, res, next as NextFunction);

      expect(logger.error).not.toHaveBeenCalledOnce();

      expect(sendResponse).toHaveBeenCalled();
    });
  });

  describe("when the error is a generic Error", () => {
    it("should return an internal server error", () => {
      const req = createRequest({
        method: "GET",
        originalUrl: "/api/test",
      });

      const res = createResponse();

      const next = createNext();

      const error = new Error("Unexpected failure");

      errorMiddleware(error, req, res, next as NextFunction);

      expect(logger.error).toHaveBeenCalledOnce();

      expect(sendResponse).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          success: false,
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        }),
      );
    });
  });

  describe("when the error is an unknown value", () => {
    it("should handle unknown thrown values", () => {
      const req = createRequest({
        method: "GET",
        originalUrl: "/api/test",
      });

      const res = createResponse();

      const next = createNext();

      errorMiddleware("Unknown Error", req, res, next as NextFunction);

      expect(logger.error).toHaveBeenCalledOnce();

      expect(sendResponse).toHaveBeenCalledWith(
        res,
        expect.objectContaining({
          success: false,
          message: expect.any(String),
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        }),
      );
    });
  });
});
