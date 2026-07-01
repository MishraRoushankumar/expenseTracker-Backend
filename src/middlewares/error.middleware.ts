import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";
import { sendResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../utils/constants.js";
import { env } from "../config/env.js";

const isProd = env.NODE_ENV === "production";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof SyntaxError && "body" in err) {
    sendResponse(res, {
      success: false,
      message: "Invalid JSON format",
      statusCode: HTTP_STATUS.BAD_REQUEST,
    });

    return;
  }

  if (err instanceof AppError) {
    sendResponse(res, {
      success: false,
      message: err.message,
      statusCode: err.statusCode,
    });

    return;
  }

  console.error("Unhandled Error:", err);

  sendResponse(res, {
    success: false,
    message: isProd ? "Something went wrong" : err.message,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,

    ...(!isProd && { stack: err.stack }),
  });
};
