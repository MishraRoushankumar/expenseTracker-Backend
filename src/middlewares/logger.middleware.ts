import { NextFunction, Request, Response } from "express";

export const loggerMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  console.log("==============");
  console.log("Time:", new Date());
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("==============");

  next();
};
