import { Request } from "express";
import { PaginationMeta } from "../shared/query/index.js";

export interface ApiResponseOptions<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  statusCode?: number;
  pagination?: PaginationMeta;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  pagination?: PaginationMeta;
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
