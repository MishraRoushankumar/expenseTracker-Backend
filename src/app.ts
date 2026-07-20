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

app.use("/api/v1", routes);

configureSwagger(app);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
