import type { Request } from "express";
import type { PaginationMeta } from "../shared/query/index.js";

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

export type RequestWithBody<T> = Request<Record<string, never>, unknown, T>;

export type RequestWithQuery<T> = Request<
  Record<string, never>,
  unknown,
  unknown,
  T
>;

export type RequestWithParams<T> = Request<T>;

export type RequestWithParamsAndBody<P, B> = Request<P, unknown, B>;

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ApiError {
  success: false;
  message: string;
}
