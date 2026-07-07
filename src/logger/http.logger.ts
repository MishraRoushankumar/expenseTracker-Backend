import { pinoHttp } from "pino-http";
import { logger } from "./logger.js";

export const httpLogger = pinoHttp({
  logger,

  redact: {
    paths: [
      "req.headers.authorization",
      "req.body.password",
      "req.body.confirmPassword",
      "req.body.token",
      "req.body.refreshToken",
    ],
    censor: "[REDACTED]",
  },

  customSuccessMessage(req, res) {
    return `${req.method} ${req.url} completed with ${res.statusCode}`;
  },

  customErrorMessage(req, res) {
    return `${req.method} ${req.url} failed with ${res.statusCode}`;
  },

  customLogLevel(_req, res, error) {
    if (error || res.statusCode >= 500) {
      return "error";
    }

    if (res.statusCode >= 400) {
      return "warn";
    }

    return "info";
  },

  autoLogging: {
    ignore(req) {
      return req.url === "/health";
    },
  },
});
