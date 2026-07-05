export const TRANSACTION_TYPES = {
  INCOME: "income",
  EXPENSE: "expense",
} as const;

export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export const TRANSACTION_MESSAGES = {
  CREATED: "Transaction created successfully",

  FETCHED: "Transactions fetched successfully",

  UPDATED: "Transaction updated successfully",

  DELETED: "Transaction deleted successfully",

  NOT_FOUND: "Transaction not found",

  CATEGORY_NOT_FOUND: "Category not found",

  INVALID_AMOUNT: "Amount must be greater than zero",
} as const;
