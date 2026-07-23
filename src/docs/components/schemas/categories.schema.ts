export const categorySchemas = {
  CreateCategoryRequest: {
    type: "object",
    additionalProperties: false,
    required: ["name"],
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        example: "Groceries",
      },
    },
  },

  UpdateCategoryRequest: {
    type: "object",
    additionalProperties: false,
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 100,
        example: "Food",
      },
    },
  },

  Category: {
    type: "object",
    required: ["id", "name", "userId", "createdAt", "updatedAt"],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
      name: {
        type: "string",
        example: "Groceries",
      },
      userId: {
        type: "integer",
        example: 12,
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
