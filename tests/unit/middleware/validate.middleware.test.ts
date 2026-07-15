import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction } from "express";
import { z, ZodError } from "zod";

import { validate } from "../../../src/middlewares/validate.middleware.js";

import {
  createNext,
  createRequest,
  createResponse,
} from "../../helpers/index.js";

describe("validate middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("body validation", () => {
    const schema = {
      body: z.object({
        name: z.string().min(3),
        age: z.number().min(18),
      }),
    };

    it("should validate a valid request body", () => {
      const req = createRequest({
        body: {
          name: "John",
          age: 20,
        },
      });

      const res = createResponse();

      const next = createNext();

      validate(schema)(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();
      expect(next).toHaveBeenCalledWith();

      expect(req.body).toEqual({
        name: "John",
        age: 20,
      });
    });

    it("should forward ZodError for an invalid body", () => {
      const req = createRequest({
        body: {
          name: "Jo",
          age: 15,
        },
      });

      const res = createResponse();

      const next = createNext();

      validate(schema)(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next.mock.calls[0][0]).toBeInstanceOf(ZodError);
    });
  });

  describe("query validation", () => {
    const schema = {
      query: z.object({
        page: z.coerce.number().min(1),
      }),
    };

    it("should validate query parameters", () => {
      const req = createRequest({
        query: {
          page: "2",
        },
      });

      const res = createResponse();

      const next = createNext();

      validate(schema)(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();
      expect(next).toHaveBeenCalledWith();
    });

    it("should reject invalid query parameters", () => {
      const req = createRequest({
        query: {
          page: "0",
        },
      });

      const res = createResponse();

      const next = createNext();

      validate(schema)(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next.mock.calls[0][0]).toBeInstanceOf(ZodError);
    });
  });

  describe("params validation", () => {
    const schema = {
      params: z.object({
        id: z.coerce.number().positive(),
      }),
    };

    it("should validate route parameters", () => {
      const req = createRequest({
        params: {
          id: "5",
        },
      });

      const res = createResponse();

      const next = createNext();

      validate(schema)(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();
      expect(next).toHaveBeenCalledWith();
    });

    it("should reject invalid route parameters", () => {
      const req = createRequest({
        params: {
          id: "-1",
        },
      });

      const res = createResponse();

      const next = createNext();

      validate(schema)(req, res, next as NextFunction);

      expect(next).toHaveBeenCalledOnce();

      expect(next.mock.calls[0][0]).toBeInstanceOf(ZodError);
    });
  });

  describe("multiple schemas", () => {
    it("should validate body, params and query together", () => {
      const middleware = validate({
        body: z.object({
          name: z.string(),
        }),
        params: z.object({
          id: z.coerce.number(),
        }),
        query: z.object({
          page: z.coerce.number(),
        }),
      });

      const req = createRequest({
        body: {
          name: "John",
        },
        params: {
          id: "1",
        },
        query: {
          page: "2",
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
