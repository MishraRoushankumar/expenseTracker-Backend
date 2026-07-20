import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { users } from "./users.js";
import type { categories } from "./categories.js";
import type { transactions } from "./transactions.js";

export type UserEntity = InferSelectModel<typeof users>;
export type NewUserEntity = InferInsertModel<typeof users>;

export type CategoryEntity = InferSelectModel<typeof categories>;
export type NewCategoryEntity = InferInsertModel<typeof categories>;

export type TransactionEntity = InferSelectModel<typeof transactions>;
export type NewTransactionEntity = InferInsertModel<typeof transactions>;
