import {
  pgTable,
  serial,
  integer,
  numeric,
  text,
  date,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { users } from "./users.js";
import { categories } from "./categories.js";
import { transactionTypeEnum } from "./enums.js";

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),

    userId: integer("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    categoryId: integer("category_id").references(() => categories.id, {
      onDelete: "set null",
    }),

    type: transactionTypeEnum("type").notNull(),

    amount: numeric("amount", {
      precision: 12,
      scale: 2,
      mode: "number",
    }).notNull(),

    description: text("description"),

    transactionDate: date("transaction_date", {
      mode: "date",
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_transactions_user_id").on(table.userId),

    index("idx_transactions_category_id").on(table.categoryId),

    index("idx_transactions_date").on(table.transactionDate),

    index("idx_transactions_type").on(table.type),

    index("idx_transactions_user_date").on(table.userId, table.transactionDate),
  ],
);
