import { relations } from "drizzle-orm";
import { users } from "./users.js";
import { categories } from "./categories.js";
import { transactions } from "./transactions.js";

export const userRelations = relations(users, ({ many }) => ({
  categories: many(categories),
  transactions: many(transactions),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),

  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),

  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
