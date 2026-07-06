import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";
import { sendResponse } from "../utils/http/apiResponse.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import { env } from "../config/env.js";

const isProd = env.NODE_ENV === "production";

export const errorMiddleware = (
  err: unknown,
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

  if (!isProd) {
    console.error("Unhandled Error:", err);
  }

  const message = err instanceof Error ? err.message : "Unknown error";

  const stack = err instanceof Error ? err.stack : undefined;

  sendResponse(res, {
    success: false,
    message: isProd ? "Something went wrong" : message,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,

    ...(!isProd && { stack }),
  });
};
