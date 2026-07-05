import { HTTP_STATUS } from "../../constants/http.constants.js";
import { TRANSACTION_MESSAGES } from "../../constants/transaction.constants.js";
import { AppError } from "../../errors/appError.js";
import { findCategoryByIdAndUserId } from "../categories/categories.repository.js";
import { createTransaction } from "./transaction.repository.js";
import { CreateTransactionDto } from "./transaction.schema.js";

/*
=========================================
CREATE TRANSACTION
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
