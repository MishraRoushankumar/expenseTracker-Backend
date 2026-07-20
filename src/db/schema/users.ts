import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

import { userRoleEnum } from "./enums.js";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  email: varchar("email", { length: 255 }).notNull().unique(),

  passwordHash: text("password_hash").notNull(),

  firstName: varchar("first_name", { length: 100 }).notNull(),

  lastName: varchar("last_name", { length: 100 }).notNull(),

  role: userRoleEnum("role").notNull().default("user"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
