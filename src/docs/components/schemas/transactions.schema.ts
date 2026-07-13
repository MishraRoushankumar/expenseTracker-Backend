/*
=========================================
TRANSACTION SCHEMAS
=========================================

Reusable schemas for the Transaction module.

Schemas are grouped into:

1. Request Schemas
2. Resource Schemas
*/

export const transactionSchemas = {
  /*
  =========================================
  REQUEST SCHEMAS
  =========================================
  */

  CreateTransactionRequest: {
    type: "object",

    description: "Request payload used to create a transaction.",

    additionalProperties: false,

    required: ["categoryId", "type", "amount", "transactionDate"],

    properties: {
      categoryId: {
        type: ["integer", "null"],

        description: "Associated category identifier.",

        example: 2,
      },

      type: {
        type: "string",

        enum: ["income", "expense"],

        description: "Transaction type.",

        example: "expense",
      },

      amount: {
        type: "number",

        minimum: 0,

        description: "Transaction amount.",

        example: 249.99,
      },

      description: {
        type: ["string", "null"],

        maxLength: 255,

        description: "Optional transaction description.",

        example: "Weekly grocery shopping",
      },

      transactionDate: {
        type: "string",

        format: "date-time",

        description: "Date of the transaction.",

        example: "2026-07-15T09:30:00.000Z",
      },
    },
  },

  UpdateTransactionRequest: {
    type: "object",

    description: "Request payload used to update a transaction.",

    additionalProperties: false,

    properties: {
      categoryId: {
        type: ["integer", "null"],

        description: "Associated category identifier.",

        example: 2,
      },

      type: {
        type: "string",

        enum: ["income", "expense"],

        example: "expense",
      },

      amount: {
        type: "number",

        minimum: 0,

        example: 500,
      },

      description: {
        type: ["string", "null"],

        maxLength: 255,

        example: "Updated description",
      },

      transactionDate: {
        type: "string",

        format: "date-time",

        example: "2026-07-15T09:30:00.000Z",
      },
    },
  },

  /*
  =========================================
  RESOURCE SCHEMAS
  =========================================
  */

  Transaction: {
    type: "object",

    description: "Represents a financial transaction.",

    required: [
      "id",
      "userId",
      "categoryId",
      "type",
      "amount",
      "description",
      "transactionDate",
      "createdAt",
      "updatedAt",
    ],

    properties: {
      id: {
        type: "integer",

        example: 15,
      },

      userId: {
        type: "integer",

        example: 1,
      },

      categoryId: {
        type: ["integer", "null"],

        description: "Associated category identifier.",

        example: 2,
      },

      type: {
        type: "string",

        enum: ["income", "expense"],

        example: "expense",
      },

      amount: {
        type: "number",

        example: 249.99,
      },

      description: {
        type: ["string", "null"],

        example: "Weekly grocery shopping",
      },

      transactionDate: {
        type: "string",

        format: "date-time",

        example: "2026-07-15T09:30:00.000Z",
      },

      createdAt: {
        type: "string",

        format: "date-time",

        example: "2026-07-15T10:30:00.000Z",
      },

      updatedAt: {
        type: "string",

        format: "date-time",

        example: "2026-07-15T10:30:00.000Z",
      },
    },
  },
};
