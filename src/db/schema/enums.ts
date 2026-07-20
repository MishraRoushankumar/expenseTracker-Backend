import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "maintainer",
  "user",
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);
