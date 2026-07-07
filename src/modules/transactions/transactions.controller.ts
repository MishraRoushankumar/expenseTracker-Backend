import { Request, Response } from "express";
import { asyncHandler } from "../../utils/http/asyncHandler.js";
import { AppError } from "../../errors/appError.js";
import { HTTP_STATUS } from "../../constants/http.constants.js";
import { AUTH_MESSAGES } from "../../constants/auth.constants.js";
import {
  createTransactionService,
  deleteTransactionService,
  getTransactionByIdService,
  getTransactionsService,
  updateTransactionService,
} from "./transactions.service.js";
import { sendResponse } from "../../utils/http/apiResponse.js";
import { TRANSACTION_MESSAGES } from "../../constants/transaction.constants.js";
import { paginationSchema } from "../../shared/query/index.js";

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

/*
=========================================
GET TRANSACTIONS CONTROLLER
=========================================
*/

export const getTransactionsController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const query = paginationSchema.parse(req.query);

    const result = await getTransactionsService(req.user.userId, query);

    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: TRANSACTION_MESSAGES.FETCHED,
      data: result.data,
      pagination: result.pagination,
    });
  },
);

/*
=========================================
GET TRANSACTION BY ID CONTROLLER
=========================================
*/

export const getTransactionByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const transactionId = Number(req.params.id);

    const transaction = await getTransactionByIdService(
      transactionId,
      req.user.userId,
    );
    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: TRANSACTION_MESSAGES.FETCHED,
      data: transaction,
    });
  },
);

/*
==============================================
UPDATE TRANSACTION CONTROLLER
==============================================
*/

export const updateTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const transactionId = Number(req.params.id);

    const updatedTransaction = await updateTransactionService(
      transactionId,
      req.user.userId,
      req.body,
    );

    sendResponse(res, {
      success: true,
      message: TRANSACTION_MESSAGES.UPDATED,
      statusCode: HTTP_STATUS.OK,
      data: updatedTransaction,
    });
  },
);

/*
==============================================
DELETE TRANSACTION CONTROLLER
==============================================
*/

export const deleteTransactionController = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) {
      throw new AppError(HTTP_STATUS.UNAUTHORIZED, AUTH_MESSAGES.AUTH_REQUIRED);
    }

    const transactionId = Number(req.params.id);

    await deleteTransactionService(transactionId, req.user.userId);

    sendResponse(res, {
      success: true,
      statusCode: HTTP_STATUS.OK,
      message: TRANSACTION_MESSAGES.DELETED,
    });
  },
);
