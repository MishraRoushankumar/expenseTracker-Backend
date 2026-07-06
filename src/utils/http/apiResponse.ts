import { Response } from "express";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { ApiResponse, ApiResponseOptions } from "../../types/api.types.js";

export const sendResponse = (
  res: Response,
  options: ApiResponseOptions,
): void => {
  const { success, message, data, statusCode = HTTP_STATUS.OK } = options;

  const response: ApiResponse = {
    success,
    message,
    ...(data !== undefined && { data }),
  };

  res.status(statusCode).json({
    response,
  });
};

export const sendSuccess = (res: Response, message: string, data?: unknown) => {
  sendResponse(res, {
    success: true,
    message,
    data,
  });
};

export const sendCreated = (res: Response, message: string, data?: unknown) => {
  sendResponse(res, {
    success: true,
    message,
    data,
    statusCode: HTTP_STATUS.CREATED,
  });
};
