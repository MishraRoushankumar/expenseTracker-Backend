export const transactionPaths = {
  "/transactions": {
    post: {
      tags: ["Transactions"],
      summary: "Create transaction",
      operationId: "createTransaction",
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
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "401": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "404": {
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

    get: {
      tags: ["Transactions"],
      summary: "Get transactions",
      operationId: "getTransactions",
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
        },
        {
          name: "sortBy",
          in: "query",
          schema: {
            type: "string",
            enum: ["transactionDate", "amount", "createdAt"],
          },
        },
        {
          name: "sortOrder",
          in: "query",
          schema: {
            type: "string",
            enum: ["asc", "desc"],
          },
        },
        {
          name: "type",
          in: "query",
          schema: {
            type: "string",
            enum: ["income", "expense"],
          },
        },
        {
          name: "categoryId",
          in: "query",
          schema: {
            type: "integer",
          },
        },
        {
          name: "startDate",
          in: "query",
          schema: {
            type: "string",
            format: "date",
          },
        },
        {
          name: "endDate",
          in: "query",
          schema: {
            type: "string",
            format: "date",
          },
        },
      ],
      responses: {
        "200": {
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
        "400": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "401": {
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
    get: {
      tags: ["Transactions"],
      summary: "Get transaction by ID",
      operationId: "getTransactionById",
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
        "401": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "404": {
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
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "401": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "404": {
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
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
            },
          },
        },
        "401": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "404": {
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
};
