import { OpenAPIV3_1 } from "openapi-types";

export const authResponses: Record<string, OpenAPIV3_1.ResponseObject> = {
  LoginSuccess: {
    description: "User logged in successfully",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthResponse",
        },
      },
    },
  },

  RegisterSuccess: {
    description: "User registered successfully",
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/AuthResponse",
        },
      },
    },
  },
};
