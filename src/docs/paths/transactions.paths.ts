/*
=========================================
TRANSACTION PATHS
=========================================
*/

export const transactionPaths = {
  "/transactions": {
    /*
    =========================================
    CREATE TRANSACTION
    =========================================
    */

    post: {
      tags: ["Transactions"],

      summary: "Create transaction",

      operationId: "createTransaction",

      description: "Creates a new transaction for the authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CreateTransactionRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Transaction created successfully.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",

                    required: ["data"],

                    properties: {
                      data: {
                        $ref: "#/components/schemas/Transaction",
                      },
                    },
                  },
                ],
              },
            },
          },
        },

        "400": {
          description: "Validation failed.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },

        "401": {
          description: "Authentication required.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },

        "404": {
          description: "Category not found.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },

    /*
    =========================================
    GET TRANSACTIONS
    =========================================
    */

    get: {
      tags: ["Transactions"],

      summary: "Get transactions",

      operationId: "getTransactions",

      description:
        "Returns paginated transactions belonging to the authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "page",
          in: "query",

          schema: {
            type: "integer",
            minimum: 1,
            default: 1,
          },

          description: "Page number.",
        },

        {
          name: "limit",
          in: "query",

          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
            default: 10,
          },

          description: "Number of records per page.",
        },

        {
          name: "sortBy",
          in: "query",

          schema: {
            type: "string",

            enum: ["transactionDate", "amount", "createdAt"],
          },

          description: "Field used for sorting.",
        },

        {
          name: "sortOrder",
          in: "query",

          schema: {
            type: "string",

            enum: ["asc", "desc"],
          },

          description: "Sorting direction.",
        },

        {
          name: "type",

          in: "query",

          schema: {
            type: "string",

            enum: ["income", "expense"],
          },

          description: "Filter by transaction type.",
        },

        {
          name: "categoryId",

          in: "query",

          schema: {
            type: "integer",
          },

          description: "Filter by category.",
        },

        {
          name: "startDate",

          in: "query",

          schema: {
            type: "string",

            format: "date",
          },

          description: "Return transactions after this date.",
        },

        {
          name: "endDate",

          in: "query",

          schema: {
            type: "string",

            format: "date",
          },

          description: "Return transactions before this date.",
        },
      ],

      responses: {
        "200": {
          description: "Transactions fetched successfully.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },

                  {
                    type: "object",

                    required: ["data", "pagination"],

                    properties: {
                      data: {
                        type: "array",

                        items: {
                          $ref: "#/components/schemas/Transaction",
                        },
                      },

                      pagination: {
                        $ref: "#/components/schemas/Pagination",
                      },
                    },
                  },
                ],
              },
            },
          },
        },

        "401": {
          description: "Authentication required.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  "/transactions/{id}": {
    /*
    =========================================
    UPDATE TRANSACTION
    =========================================
    */

    patch: {
      tags: ["Transactions"],

      summary: "Update transaction",

      operationId: "updateTransaction",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",

          in: "path",

          required: true,

          schema: {
            type: "integer",

            minimum: 1,

            example: 1,
          },
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateTransactionRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Transaction updated successfully.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },

                  {
                    type: "object",

                    required: ["data"],

                    properties: {
                      data: {
                        $ref: "#/components/schemas/Transaction",
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
    },

    /*
    =========================================
    DELETE TRANSACTION
    =========================================
    */

    delete: {
      tags: ["Transactions"],

      summary: "Delete transaction",

      operationId: "deleteTransaction",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",

          in: "path",

          required: true,

          schema: {
            type: "integer",

            minimum: 1,

            example: 1,
          },
        },
      ],

      responses: {
        "200": {
          description: "Transaction deleted successfully.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
            },
          },
        },
      },
    },
  },
};
