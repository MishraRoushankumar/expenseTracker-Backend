import { OpenAPIV3_1 } from "openapi-types";

export const commonSchemas: Record<string, OpenAPIV3_1.SchemaObject> = {
  Pagination: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        example: 1,
      },
      limit: {
        type: "integer",
        example: 10,
      },
      totalItems: {
        type: "integer",
        example: 42,
      },
      totalPages: {
        type: "integer",
        example: 5,
      },
      currentItemCount: {
        type: "integer",
        example: 10,
      },
      hasNextPage: {
        type: "boolean",
        example: true,
      },
      hasPreviousPage: {
        type: "boolean",
        example: false,
      },
    },

    required: [
      "page",
      "limit",
      "totalItems",
      "totalPages",
      "currentItemCount",
      "hasNextPage",
      "hasPreviousPage",
    ],
  },
};
