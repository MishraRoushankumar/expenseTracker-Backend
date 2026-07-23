export const userSchemas = {
  UpdateProfileRequest: {
    type: "object",
    additionalProperties: false,
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
    },
  },

  UpdateRoleRequest: {
    type: "object",
    additionalProperties: false,
    required: ["role"],
    properties: {
      role: {
        type: "string",
        enum: ["admin", "maintainer", "user"],
        example: "maintainer",
      },
    },
  },

  User: {
    type: "object",
    required: [
      "id",
      "firstName",
      "lastName",
      "email",
      "role",
      "createdAt",
      "updatedAt",
    ],
    properties: {
      id: {
        type: "integer",
        example: 1,
      },
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
        example: "john@example.com",
      },
      role: {
        type: "string",
        enum: ["admin", "maintainer", "user"],
        example: "user",
      },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2026-07-15T10:30:00.000Z",
      },
      updatedAt: {
        type: "string",
        format: "date-time",
        example: "2026-07-15T10:30:00.000Z",
      },
    },
  },
};
