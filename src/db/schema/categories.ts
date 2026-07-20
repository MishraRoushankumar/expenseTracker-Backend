import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),

    userId: integer("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    unique().on(table.name, table.userId),

    index("idx_categories_user_id").on(table.userId),
  ],
);
