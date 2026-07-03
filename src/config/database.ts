import { Pool } from "pg";
import { env } from "./env.js";

export const db = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

const isProd = env.NODE_ENV === "production";

export const connectDB = async (): Promise<void> => {
  try {
    await db.connect();

    if (!isProd) {
      console.log("PostgreSQL connected successfully");
    }
  } catch (error) {
    if (!isProd) {
      console.error("Database connection failed", error);
    } else {
      console.log("Something went wrong");
    }

    process.exit(1);
  }
};
