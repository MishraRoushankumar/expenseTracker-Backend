import { Response } from "express";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { ApiResponse, ApiResponseOptions } from "../../types/api.types.js";

export const sendResponse = (
  res: Response,
  options: ApiResponseOptions,
): void => {
  const {
    success,
    message,
    data,
    pagination,
    statusCode = HTTP_STATUS.OK,
  } = options;

  const response: ApiResponse = {
    success,
    message,
    ...(data !== undefined && { data }),
    ...(pagination !== undefined && { pagination }),
  };

  res.status(statusCode).json(response);
};

export const sendSuccess = <T>(res: Response, message: string, data?: T) => {
  sendResponse(res, {
    success: true,
    message,
    data,
  });
};

export const sendCreated = <T>(res: Response, message: string, data?: T) => {
  sendResponse(res, {
    success: true,
    message,
    data,
    statusCode: HTTP_STATUS.CREATED,
  });
};
