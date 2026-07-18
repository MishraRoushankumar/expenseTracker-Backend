import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB, db } from "./config/database.js";
import { logger } from "./logger/logger.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });

    const gracefulShutdown = async (signal: string): Promise<void> => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        await db.end();

        logger.info("PostgreSQL connection pool closed.");
        logger.info("Server shut down successfully.");

        process.exit(0);
      });
    };

    process.on("SIGINT", () => {
      void gracefulShutdown("SIGINT");
    });

    process.on("SIGTERM", () => {
      void gracefulShutdown("SIGTERM");
    });
  } catch (error) {
    logger.fatal(
      {
        err: error,
      },
      "Failed to start server",
    );

    process.exit(1);
  }
};

startServer();
