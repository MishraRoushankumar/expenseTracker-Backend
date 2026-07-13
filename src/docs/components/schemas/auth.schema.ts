/*
=========================================
AUTHENTICATION SCHEMAS
=========================================

This file contains reusable schemas for the
Authentication module.

Schemas are grouped into:

1. Request Schemas
2. Resource Schemas
3. Response Payload Schemas
*/

export const authSchemas = {
  /*
  =========================================
  REQUEST SCHEMAS
  =========================================
  */

  RegisterRequest: {
    type: "object",

    description: "Request payload used to register a new user.",

    additionalProperties: false,

    required: ["firstName", "lastName", "email", "password"],

    properties: {
      firstName: {
        type: "string",

        description: "User's first name.",

        minLength: 1,

        maxLength: 50,

        example: "John",
      },

      lastName: {
        type: "string",

        description: "User's last name.",

        minLength: 1,

        maxLength: 50,

        example: "Doe",
      },

      email: {
        type: "string",

        format: "email",

        description: "Unique email address.",

        example: "john.doe@example.com",
      },

      password: {
        type: "string",

        format: "password",

        minLength: 8,

        description: "Password containing at least 8 characters.",

        example: "StrongPassword123",
      },
    },
  },

  LoginRequest: {
    type: "object",

    description: "Request payload used to authenticate a user.",

    additionalProperties: false,

    required: ["email", "password"],

    properties: {
      email: {
        type: "string",

        format: "email",

        description: "Registered email address.",

        example: "john.doe@example.com",
      },

      password: {
        type: "string",

        format: "password",

        description: "Account password.",

        example: "StrongPassword123",
      },
    },
  },

  UpdateProfileRequest: {
    type: "object",

    description:
      "Request payload used to update the authenticated user's profile.",

    additionalProperties: false,

    properties: {
      firstName: {
        type: "string",

        description: "Updated first name.",

        minLength: 1,

        maxLength: 50,

        example: "John",
      },

      lastName: {
        type: "string",

        description: "Updated last name.",

        minLength: 1,

        maxLength: 50,

        example: "Doe",
      },

      email: {
        type: "string",

        format: "email",

        description: "Updated email address.",

        example: "john.doe@example.com",
      },
    },
  },

  /*
  =========================================
  RESPONSE PAYLOAD SCHEMAS
  =========================================
  */

  LoginPayload: {
    type: "object",

    description: "Payload returned after successful authentication.",

    required: ["token", "user"],

    properties: {
      token: {
        type: "string",

        description: "JWT access token used for authenticated requests.",

        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },

      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },
};
