import { OpenAPIV3_1 } from "openapi-types";

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

  tags: [],

  paths: {},

  components: {
    schemas: {},
    responses: {},
    securitySchemes: {},
  },
};
