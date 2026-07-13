import { NextFunction, Request, Response } from "express";

import { env } from "../config/env.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { AppError } from "../errors/appError.js";
import { logger } from "../logger/index.js";
import { sendResponse } from "../utils/http/apiResponse.js";

const isProd = env.NODE_ENV === "production";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  /*
  =========================================
  INVALID JSON
  =========================================
  */

  if (err instanceof SyntaxError && "body" in err) {
    logger.warn(
      {
        err,
        method: req.method,
        url: req.originalUrl,
        userId: req.user?.userId,
      },
      "Invalid JSON payload",
    );

    sendResponse(res, {
      success: false,
      message: "Invalid JSON format",
      statusCode: HTTP_STATUS.BAD_REQUEST,
    });

    return;
  }

  /*
  =========================================
  APPLICATION ERROR
  =========================================
  */

  if (err instanceof AppError) {
    logger.warn(
      {
        err,
        method: req.method,
        url: req.originalUrl,
        userId: req.user?.userId,
      },
      err.message,
    );

    sendResponse(res, {
      success: false,
      message: err.message,
      statusCode: err.statusCode,
    });

    return;
  }

  /*
  =========================================
  UNHANDLED ERROR
  =========================================
  */

  logger.error(
    {
      err,
      method: req.method,
      url: req.originalUrl,
      userId: req.user?.userId,
    },
    "Unhandled application error",
  );

  const message = err instanceof Error ? err.message : "Unknown error";

  const stack = err instanceof Error ? err.stack : undefined;

  sendResponse(res, {
    success: false,
    message: isProd ? "Something went wrong" : message,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,

    ...(!isProd && { stack }),
  });
};
