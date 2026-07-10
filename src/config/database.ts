import { Pool } from "pg";

import { env } from "./env.js";
import { logger } from "../logger/index.js";

export const db = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

export const connectDB = async (): Promise<void> => {
  try {
    await db.query("SELECT 1");

    logger.info(
      {
        host: env.DB_HOST,
        port: env.DB_PORT,
        database: env.DB_NAME,
      },
      "Connected to PostgreSQL",
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
