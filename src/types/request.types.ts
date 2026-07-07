import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export type TypedRequest<
  Params = ParamsDictionary,
  Body = unknown,
  Query = ParsedQs,
> = Request<Params, unknown, Body, Query>;
