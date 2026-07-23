export const authSchemas = {
  RegisterRequest: {
    type: "object",
    additionalProperties: false,
    required: ["firstName", "lastName", "email", "password"],
    properties: {
      firstName: {
        type: "string",
        minLength: 2,
        maxLength: 50,
        example: "John",
      },
      lastName: {
        type: "string",
        minLength: 2,
        maxLength: 50,
        example: "Doe",
      },
      email: {
        type: "string",
        format: "email",
        example: "john.doe@example.com",
      },
      password: {
        type: "string",
        format: "password",
        minLength: 8,
        example: "StrongPassword123",
      },
    },
  },

  LoginRequest: {
    type: "object",
    additionalProperties: false,
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        example: "john.doe@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "StrongPassword123",
      },
    },
  },

  LoginPayload: {
    type: "object",
    required: ["token", "user"],
    properties: {
      token: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
      user: {
        $ref: "#/components/schemas/User",
      },
    },
  },
};
