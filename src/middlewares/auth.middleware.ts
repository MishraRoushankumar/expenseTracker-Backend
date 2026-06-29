import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(HTTP_STATUS.UNAUTHORIZED, "No token provided"));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(HTTP_STATUS.UNAUTHORIZED, "Invalid or expired token"));
  }
};
