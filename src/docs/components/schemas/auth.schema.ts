import { OpenAPIV3_1 } from "openapi-types";

export const authSchemas: Record<string, OpenAPIV3_1.SchemaObject> = {
  RegisterRequest: {
    type: "object",
    required: ["firstName", "lastName", "email", "password"],
    properties: {
      firstName: {
        type: "string",
        example: "John",
      },
      lastName: {
        type: "string",
        example: "Doe",
      },
      email: {
        type: "string",
        format: "email",
        example: "email@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "StrongPassword123",
      },
    },
  },

  LoginRequest: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
      },
      password: {
        type: "string",
        format: "password",
      },
    },
  },

  AuthResponse: {
    type: "object",
    properties: {
      success: {
        type: "boolean",
        example: true,
      },
      message: {
        type: "string",
        example: "Login successful",
      },
      data: {
        type: "object",
      },
    },
  },
};
