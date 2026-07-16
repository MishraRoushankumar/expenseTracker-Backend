import { db } from "../../src/config/database.js";

export const truncateAllTables = async (): Promise<void> => {
  await db.query(`
    TRUNCATE TABLE
      transactions,
      categories,
      users
    RESTART IDENTITY CASCADE;
  `);
};
