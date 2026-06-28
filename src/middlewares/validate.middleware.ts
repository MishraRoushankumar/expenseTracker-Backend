import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../errors/appError.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const validate =
  (schema: ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(", ");

      next(new AppError(HTTP_STATUS.BAD_REQUEST, message));
      return;
    }

    req.body = result.data;
    next();
  };
