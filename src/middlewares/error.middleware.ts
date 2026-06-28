import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";
import { sendResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../utils/constants.js";

const isProd = process.env.NODE_ENV === "production";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    sendResponse(res, {
      success: false,
      message: err.message,
      statusCode: err.statusCode,
    });

    return;
  }

  sendResponse(res, {
    success: false,
    message: isProd ? "Something went wrong" : err.message,
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,

    ...(!isProd && { stack: err.stack }),
  });
};
