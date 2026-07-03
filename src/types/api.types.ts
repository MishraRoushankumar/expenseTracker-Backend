import { Request } from "express";

export interface ApiResponseOptions<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type RequestWithBody<T> = Request<{}, {}, T>;

export type RequestWithQuery<T> = Request<{}, {}, {}, T>;

export type RequestWithParams<T> = Request<T>;

export type RequestWithParamsAndBody<P, B> = Request<P, {}, B>;

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ApiError {
  success: false;
  message: string;
}
