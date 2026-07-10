import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { logger } from "./logger/logger.js";

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
};

startServer();
