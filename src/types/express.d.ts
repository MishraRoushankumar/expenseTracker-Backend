import type { JwtPayload } from "../utils/auth/jwt.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

export {};
