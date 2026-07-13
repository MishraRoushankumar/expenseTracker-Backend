import { OpenAPIV3_1 } from "openapi-types";
import { commonSchemas } from "./components/schemas/common.schema.js";
import { commonResponses } from "./components/responses/common.responses.js";
import { authSchemas } from "./components/schemas/auth.schema.js";
import { authResponses } from "./components/responses/auth.responses.js";
import { authPaths } from "./paths/auth.paths.js";
import { tags } from "./tags.js";

export const openApiDocument: OpenAPIV3_1.Document = {
  openapi: "3.1.0",

  info: {
    title: "Expense Tracker API",
    version: "1.4.0",
    description: "REST API for the Expense Tracker backend.",
  },

  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development Server",
    },
  ],

  tags: [...tags],

  components: {
    schemas: {
      ...commonSchemas,
      ...authSchemas,
    },
    responses: {
      ...commonResponses,
      ...authResponses,
    },
    securitySchemes: {},
  },

  paths: {
    ...authPaths,
  },
};
