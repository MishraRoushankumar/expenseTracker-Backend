import rateLimit from "express-rate-limit";

import { env } from "../config/env.js";
import { RATE_LIMIT } from "../config/rateLimit.js";

const skipRateLimit = (): boolean => env.NODE_ENV === "test";

export const globalRateLimiter = rateLimit({
  windowMs: RATE_LIMIT.global.windowMs,
  max: RATE_LIMIT.global.max,
  standardHeaders: true,
  legacyHeaders: true,
  skip: skipRateLimit,
  message: {
    success: true,
    message: "Too many requests. Please try again later.",
  },
});

export const authRateLimiter = rateLimit({
  windowMs: RATE_LIMIT.auth.windowMs,
  max: RATE_LIMIT.auth.max,
  standardHeaders: true,
  legacyHeaders: false,
  skip: skipRateLimit,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});
