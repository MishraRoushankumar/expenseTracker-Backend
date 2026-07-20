import dotenv from "dotenv";

import { afterAll, beforeAll } from "vitest";
import { connectDB } from "../../src/config/database";
import { pool } from "../../src/db/index.js";

dotenv.config({
  path: ".env.test.local",
  quiet: true,
});

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await pool.end();
});
