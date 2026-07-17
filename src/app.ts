import express from "express";
import cors from "cors";
import { httpLogger } from "./logger/index.js";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware.js";
import { configureSwagger } from "./docs/swagger.js";
import { env } from "./config/env.js";

const app = express();

app.use(httpLogger);
app.use(
  cors({
    origin: env.NODE_ENV === "production" ? process.env.CORS_ORIGIN : true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(globalRateLimiter);
app.use("/api/v1", routes);
configureSwagger(app);
app.use(errorMiddleware);

export default app;
