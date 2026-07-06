import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";

type ValidationSchemas = {
  body?: ZodObject;
  params?: ZodObject;
  query?: ZodObject;
};

export const validate =
  (schemas: ValidationSchemas) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        schemas.params.parse(req.params);
      }

      if (schemas.query) {
        schemas.query.parse(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(error);
        return;
      }

      next(error);
    }
  };
