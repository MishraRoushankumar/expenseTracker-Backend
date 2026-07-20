import { sql } from "drizzle-orm";
import { db } from "../../src/db/index";

export const truncateAllTables = async (): Promise<void> => {
  await db.execute(sql`
    TRUNCATE TABLE
      transactions,
      categories,
      users
    RESTART IDENTITY CASCADE;
  `);
};
