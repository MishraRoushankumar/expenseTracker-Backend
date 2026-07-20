import "dotenv/config";

import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/database.js";
import { logger } from "./logger/logger.js";
import { pool } from "./db/index.js";

const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    const server = app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });

    const gracefulShutdown = (signal: string): void => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      // Force shutdown after 10s if connections are still open

      setTimeout(() => {
        logger.error(
          "Could not close connections in time, forcefully shutting down",
        );
        process.exit(1);
      }, 10000).unref();

      server.close(async (err) => {
        if (err) {
          logger.error({ err }, "Error while closing HTTP server");
        }
        try {
          await pool.end();
          logger.info("PostgreSQL connection pool closed.");
          logger.info("Server shut down successfully.");
        } catch (dbErr) {
          logger.error(
            { err: dbErr },
            "Error while closing PostreSQL connection pool",
          );
          process.exit(1);
        }
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
