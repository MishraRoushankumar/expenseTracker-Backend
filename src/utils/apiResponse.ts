import { Response } from "express";
import { HTTP_STATUS } from "./constants.js";
import { ApiResponseOptions } from "../types/api.types.js";

export const sendResponse = <T>(
  res: Response,
  options: ApiResponseOptions<T>,
): void => {
  const { success, message, data, statusCode = HTTP_STATUS.OK } = options;

  res.status(statusCode).json({
    success,
    message,
    ...(data !== undefined && { data }),
  });
};
