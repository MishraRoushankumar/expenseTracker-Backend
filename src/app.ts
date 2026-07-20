import express from "express";
import cors from "cors";
import { httpLogger } from "./logger/index.js";
import routes from "./routes/index.js";

import { configureSwagger } from "./docs/swagger.js";
import { env } from "./config/env.js";
import {
  errorMiddleware,
  globalRateLimiter,
  notFoundMiddleware,
} from "./middlewares/index.js";
import { appConfig } from "./config/app.js";
import { HTTP_STATUS } from "./constants/http.constants.js";

const app = express();

app.use(httpLogger);

app.set("trust proxy", 1);

app.use(
  cors({
    origin: env.NODE_ENV === "production" ? env.CORS_ORIGIN : true,
    credentials: true,
  }),
);

app.use(express.json());

app.use(globalRateLimiter);

app.get("/", (_req, res) => {
  res.status(HTTP_STATUS.OK).json({
    name: appConfig.name,
    description: appConfig.description,
    version: appConfig.version,
    status: "ok",
    environment: env.NODE_ENV,
    documentation: "/api/docs",
    health: "/api/v1/health",
    repository: appConfig.repository,
  });
});

app.use("/api/v1", routes);

configureSwagger(app);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
