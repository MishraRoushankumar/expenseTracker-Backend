import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { verifyToken } from "../utils/jwt.js";
import { AUTH_MESSAGES } from "../constants/auth.constants.js";

// export const authMiddleware = (
//   req: Request,
//   _res: Response,
//   next: NextFunction,
// ): void => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader?.startsWith("Bearer ")) {
//     next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.TOKEN_MISSING));
//     return;
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = verifyToken(token);
//     req.user = decoded;
//     next();
//   } catch {
//     next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN));
//   }
// };

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  console.log("FULL HEADERS:", req.headers);
  console.log("AUTH HEADER:", req.headers.authorization);

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.TOKEN_MISSING));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    next(new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.INVALID_TOKEN));
  }
};
