import { HTTP_STATUS } from "../../constants/http.constants.js";
import { TRANSACTION_MESSAGES } from "../../constants/transaction.constants.js";
import { AppError } from "../../errors/appError.js";
import { buildPaginationMeta } from "../../shared/query/index.js";
import { findCategoryByIdAndUserId } from "../categories/categories.repository.js";
import {
  countTransactionsByUserId,
  createTransaction,
  deleteTransaction,
  findTransactionByIdAndUserId,
  findTransactionsByUserId,
  updateTransaction,
} from "./transactions.repository.js";
import {
  CreateTransactionDto,
  TransactionQueryDto,
  UpdateTransactionDto,
} from "./transactions.schema.js";
import { Transaction, UpdateTransactionInput } from "./transactions.types.js";

/*
=========================================
PRIVATE HELPERS
=========================================
*/

const mergeTransactionUpdate = (
  existing: Transaction,
  updates: UpdateTransactionDto,
): UpdateTransactionInput => ({
  categoryId: updates.categoryId ?? existing.categoryId,
  type: updates.type ?? existing.type,
  amount: updates.amount ?? existing.amount,
  description:
    updates.description !== undefined
      ? updates.description?.trim() || null
      : existing.description,
  transactionDate: updates.transactionDate
    ? new Date(updates.transactionDate)
    : existing.transactionDate,
});

/*
=========================================
CREATE TRANSACTION SERVICE
=========================================
*/

export const createTransactionService = async (
  userId: number,
  data: CreateTransactionDto,
) => {
  /*
  --------------------------------------
  VERIFY CATEGORY OWNERSHIP
  --------------------------------------
  */

  if (data.categoryId !== undefined && data.categoryId !== null) {
    const category = await findCategoryByIdAndUserId(data.categoryId, userId);

    if (!category) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        TRANSACTION_MESSAGES.CATEGORY_NOT_FOUND,
      );
    }
  }

  /*
  --------------------------------------
  NORMALIZE DESCRIPTION
  --------------------------------------
  */

  const description = data.description?.trim() || null;

  /*
  --------------------------------------
  CREATE TRANSACTIONS
  --------------------------------------
  */

  return createTransaction({
    userId,
    categoryId: data.categoryId ?? null,
    type: data.type,
    amount: data.amount,
    description: description,
    transactionDate: new Date(data.transactionDate),
  });
};

/*
=========================================
GET TRANSACTIONS SERVICE
=========================================
*/

export const getTransactionsService = async (
  userId: number,
  query: TransactionQueryDto,
) => {
  const filters = {
    type: query.type,
    categoryId: query.categoryId,
    startDate: query.startDate,
    endDate: query.endDate,
  };
  /*
  --------------------------------------
  COUNT TRANSACTIONS
  --------------------------------------
  */

  const totalItems = await countTransactionsByUserId(userId, filters);

  /*
  --------------------------------------
  FETCH TRANSACTIONS
  --------------------------------------
  */

  const transactions = await findTransactionsByUserId(userId, {
    pagination: {
      page: query.page,
      limit: query.limit,
    },
    filters,
  });

  /*
  --------------------------------------
  PAGINATION METADATA
  --------------------------------------
  */

  const pagination = buildPaginationMeta({
    page: query.page,
    limit: query.limit,
    totalItems,
    currentItemCount: transactions.length,
  });

  /*
  --------------------------------------
  RESPONSE
  --------------------------------------
  */

  return {
    data: transactions,
    pagination,
  };
};

/*
=========================================
GET TRANSACTION BY ID SERVICE
=========================================
*/

export const getTransactionByIdService = async (
  transactionId: number,
  userId: number,
) => {
  const transaction = await findTransactionByIdAndUserId(transactionId, userId);

  if (!transaction) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, TRANSACTION_MESSAGES.NOT_FOUND);
  }

  return transaction;
};

/*
=========================================
UPDATE TRANSACTION SERVICE
=========================================
*/

export const updateTransactionService = async (
  transactionId: number,
  userId: number,
  data: UpdateTransactionDto,
): Promise<Transaction> => {
  /*
  --------------------------------------
  VERIFY OWNERSHIP
  --------------------------------------
  */

  const existingTransaction = await findTransactionByIdAndUserId(
    transactionId,
    userId,
  );

  if (!existingTransaction) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, TRANSACTION_MESSAGES.NOT_FOUND);
  }

  /*
  --------------------------------------
  VERIFY CATEGORY OWNERSHIP
  --------------------------------------
  */

  if (
    data.categoryId !== undefined &&
    data.categoryId !== existingTransaction.categoryId &&
    data.categoryId !== null
  ) {
    const category = await findCategoryByIdAndUserId(data.categoryId, userId);

    if (!category) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        TRANSACTION_MESSAGES.CATEGORY_NOT_FOUND,
      );
    }
  }

  /*
  --------------------------------------
  MERGE UPDATES
  --------------------------------------
  */

  const merged = mergeTransactionUpdate(existingTransaction, data);

  /*
  --------------------------------------
  UPDATE
  --------------------------------------
  */

  const updated = await updateTransaction(transactionId, merged);

  if (!updated) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, TRANSACTION_MESSAGES.NOT_FOUND);
  }

  return updated;
};

/*
=========================================
DELETE TRANSACTION SERVICE
=========================================
*/

export const deleteTransactionService = async (
  transactionId: number,
  userId: number,
): Promise<void> => {
  /*
  --------------------------------------
  VERIFY OWNERSHIP
  --------------------------------------
  */

  const existingTransaction = await findTransactionByIdAndUserId(
    transactionId,
    userId,
  );

  if (!existingTransaction) {
    throw new AppError(HTTP_STATUS.NOT_FOUND, TRANSACTION_MESSAGES.NOT_FOUND);
  }

  /*
  -----------------------------------------
  Delete Transaction
  -----------------------------------------
  */

  const deleted = await deleteTransaction(transactionId);

  if (!deleted) {
    throw new AppError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      TRANSACTION_MESSAGES.DELETE_FAILED,
    );
  }
};
