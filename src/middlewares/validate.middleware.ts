import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";
import { AppError } from "../errors/appError.js";
import { HTTP_STATUS } from "../constants/http.constants.js";

export const validateRequest =
  (schema: ZodObject, target: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      next(new AppError(HTTP_STATUS.BAD_REQUEST, message));
      return;
    }

    (req as any)[target] = result.data;
    next();
  };
