import { Request } from "express";

export type TypeRequestBody<T> = Request<{}, {}, T>;
export type TypeRequestQuery<T> = Request<{}, {}, {}, T>;
export type TypeRequestParams<T> = Request<T>;
