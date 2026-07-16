import dotenv from "dotenv";

import { afterAll, beforeAll } from "vitest";
import { connectDB, db } from "../../src/config/database";

dotenv.config({
  path: ".env.test.local",
  quiet: true,
});

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await db.end();
});
