import { authPaths } from "./paths/auth.paths.js";
import { categoryPaths } from "./paths/categories.paths.js";
import { dashboardPaths } from "./paths/dashboard.paths.js";
import { transactionPaths } from "./paths/transactions.paths.js";
import { userPaths } from "./paths/users.paths.js";

import { authSchemas } from "./components/schemas/auth.schema.js";
import { userSchemas } from "./components/schemas/users.schema.js";
import { categorySchemas } from "./components/schemas/categories.schema.js";
import { dashboardSchemas } from "./components/schemas/dashboard.schema.js";
import { transactionSchemas } from "./components/schemas/transactions.schema.js";
import { commonSchemas } from "./components/schemas/common.schema.js";

import { bearerSecurity } from "./components/security/bearer.security.js";

import { tags } from "./tags.js";

export const openApiDocument = {
  openapi: "3.1.0",

  info: {
    title: "Expense Tracker API",

    description:
      "RESTful API for managing personal income, expenses and categories.",

    version: "1.4.0",

    contact: {
      name: "Roushankumar Mishra",

      url: "https://github.com/MishraRoushankumar",

      email: "mishraroushankumar57@gmail.com",
    },

    license: {
      name: "MIT",
    },
  },

  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "Development Server",
    },
    {
      url: "https://expensetracker-api-w610.onrender.com/api/v1/",

      description: "Production",
    },
  ],

  tags,

  paths: {
    ...authPaths,
    ...userPaths,
    ...categoryPaths,
    ...dashboardPaths,
    ...transactionPaths,
  },

  components: {
    schemas: {
      ...commonSchemas,
      ...authSchemas,
      ...userSchemas,
      ...categorySchemas,
      ...dashboardSchemas,
      ...transactionSchemas,
    },

    securitySchemes: {
      ...bearerSecurity,
    },
  },
};
