import { pool } from "../db/index.js";
import { logger } from "../logger/index.js";

export const connectDB = async (): Promise<void> => {
  try {
    await pool.query("SELECT 1");

    logger.info(
      {
        provider: "Neon",
        database: "PostgreSQL",
      },
      "Connected to database",
    );
  } catch (error) {
    logger.fatal(
      {
        err: error,
      },
      "Failed to connect to PostgreSQL",
    );

    process.exit(1);
  }
};
