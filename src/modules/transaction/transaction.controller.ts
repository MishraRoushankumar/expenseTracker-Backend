import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { AUTH_MESSAGES } from "../../constants/auth.constants.js";
import { createTransactionService } from "./transaction.service.js";
import { sendResponse } from "../../utils/apiResponse.js";
import { TRANSACTION_MESSAGES } from "../../constants/transaction.constants.js";

/*
==============================================
CREATE TRANSACTION CONTROLLER
==============================================
*/

export const createTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const transaction = await createTransactionService(
      req.user.userId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      message: TRANSACTION_MESSAGES.CREATED,
      statusCode: HTTP_STATUS.CREATED,
      data: transaction,
    });
  },
);
