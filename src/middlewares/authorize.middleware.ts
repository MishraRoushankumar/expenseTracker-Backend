import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../modules/users/users.types.js";
import { AppError } from "../errors/appError.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { AUTH_MESSAGES } from "../constants/auth.constants.js";

export const authorize =
  (allowedRoles: UserRole[]) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED));
      return;
    }

    const hasPermission = allowedRoles.includes(req.user.role);

    if (!hasPermission) {
      next(new AppError(HTTP_STATUS.FORBIDDEN, "Insufficient permissions"));
      return;
    }

    next();
  };
