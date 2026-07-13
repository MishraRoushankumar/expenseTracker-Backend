import { OpenAPIV3_1 } from "openapi-types";

export const authPaths: OpenAPIV3_1.PathsObject = {
  "/auth/register": {
    post: {
      tags: ["Authentication"],

      summary: "Register a new user",

      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/RegisterRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          $ref: "#/components/responses/RegisterSuccess",
        },
      },
    },
  },
};
