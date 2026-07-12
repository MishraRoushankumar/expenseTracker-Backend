import express from "express";
import cors from "cors";
import { httpLogger } from "./logger/index.js";
import routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { globalRateLimiter } from "./middlewares/rateLimit.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(httpLogger);
app.use(globalRateLimiter);
app.use("/api/v1", routes);
app.use(errorMiddleware);

export default app;
