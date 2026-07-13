import { authPaths } from "./paths/auth.paths.js";
import { userPaths } from "./paths/users.paths.js";
import { categoryPaths } from "./paths/categories.paths.js";
import { transactionPaths } from "./paths/transactions.paths.js";

import { authSchemas } from "./components/schemas/auth.schema.js";
import { userSchemas } from "./components/schemas/users.schema.js";
import { categorySchemas } from "./components/schemas/categories.schema.js";
import { transactionSchemas } from "./components/schemas/transactions.schema.js";
import { commonSchemas } from "./components/schemas/common.schema.js";

import { bearerSecurity } from "./components/security/bearer.security.js";

import { tags } from "./tags.js";

export const openApiDocument = {
  openapi: "3.1.0",

  info: {
    title: "Expense Tracker API",
    description: "REST API for Expense Tracker Backend",
    version: "1.4.0",
  },

  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development Server",
    },
  ],

  tags,

  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...transactionPaths,
  },

  components: {
    schemas: {
      ...commonSchemas,
      ...authSchemas,
      ...userSchemas,
      ...categorySchemas,
      ...transactionSchemas,
    },

    security: {
      ...bearerSecurity,
    },
  },
};
