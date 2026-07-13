/*
=========================================
CATEGORY SCHEMAS
=========================================

Reusable schemas for the Category module.

Schemas are grouped into:

1. Request Schemas
2. Resource Schemas
*/

export const categorySchemas = {
  /*
  =========================================
  REQUEST SCHEMAS
  =========================================
  */

  CreateCategoryRequest: {
    type: "object",

    description: "Request payload used to create a new category.",

    additionalProperties: false,

    required: ["name"],

    properties: {
      name: {
        type: "string",

        description: "Unique category name.",

        minLength: 1,

        maxLength: 100,

        example: "Groceries",
      },
    },
  },

  UpdateCategoryRequest: {
    type: "object",

    description: "Request payload used to update an existing category.",

    additionalProperties: false,

    properties: {
      name: {
        type: "string",

        description: "Updated category name.",

        minLength: 1,

        maxLength: 100,

        example: "Food",
      },
    },
  },

  /*
  =========================================
  RESOURCE SCHEMAS
  =========================================
  */

  Category: {
    type: "object",

    description: "Represents a transaction category.",

    required: ["id", "name", "userId", "createdAt", "updatedAt"],

    properties: {
      id: {
        type: "integer",

        description: "Unique category identifier.",

        example: 1,
      },

      name: {
        type: "string",

        description: "Category name.",

        example: "Groceries",
      },

      userId: {
        type: "integer",

        description: "Owner of the category.",

        example: 12,
      },

      createdAt: {
        type: "string",

        format: "date-time",

        description: "Timestamp when the category was created.",

        example: "2026-07-15T10:30:00.000Z",
      },

      updatedAt: {
        type: "string",

        format: "date-time",

        description: "Timestamp when the category was last updated.",

        example: "2026-07-15T10:30:00.000Z",
      },
    },
  },
};
