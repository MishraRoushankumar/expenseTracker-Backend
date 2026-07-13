/*
=========================================
COMMON SCHEMAS
=========================================

Reusable schemas shared across the API.

These schemas should remain generic and
must not contain module-specific models.
*/

export const commonSchemas = {
  /*
  =========================================
  API RESPONSE
  =========================================
  */

  ApiResponse: {
    type: "object",

    description: "Base schema for all successful API responses.",

    required: ["success", "message"],

    properties: {
      success: {
        type: "boolean",

        description: "Indicates whether the request was successful.",

        example: true,
      },

      message: {
        type: "string",

        description: "Human-readable response message.",

        example: "Request completed successfully.",
      },
    },
  },

  /*
  =========================================
  ERROR RESPONSE
  =========================================
  */

  ErrorResponse: {
    type: "object",

    description: "Base schema for API error responses.",

    required: ["success", "message"],

    properties: {
      success: {
        type: "boolean",

        description: "Always false for failed requests.",

        example: false,
      },

      message: {
        type: "string",

        description: "Description of the error.",

        example: "Validation failed.",
      },
    },
  },

  /*
  =========================================
  PAGINATION
  =========================================
  */

  Pagination: {
    type: "object",

    description: "Pagination metadata returned with paginated endpoints.",

    required: [
      "page",
      "limit",
      "totalItems",
      "totalPages",
      "currentItemCount",
      "hasNextPage",
      "hasPreviousPage",
    ],

    properties: {
      page: {
        type: "integer",

        minimum: 1,

        description: "Current page number.",

        example: 1,
      },

      limit: {
        type: "integer",

        minimum: 1,

        description: "Maximum number of items returned per page.",

        example: 10,
      },

      totalItems: {
        type: "integer",

        minimum: 0,

        description: "Total number of matching records.",

        example: 57,
      },

      totalPages: {
        type: "integer",

        minimum: 0,

        description: "Total number of available pages.",

        example: 6,
      },

      currentItemCount: {
        type: "integer",

        minimum: 0,

        description: "Number of items returned in the current page.",

        example: 10,
      },

      hasNextPage: {
        type: "boolean",

        description: "Whether another page exists after the current one.",

        example: true,
      },

      hasPreviousPage: {
        type: "boolean",

        description: "Whether another page exists before the current one.",

        example: false,
      },
    },
  },
};
