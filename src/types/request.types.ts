import type { Request } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

export type TypedRequest<
  Params = ParamsDictionary,
  Body = unknown,
  Query = ParsedQs,
> = Request<Params, unknown, Body, Query>;
