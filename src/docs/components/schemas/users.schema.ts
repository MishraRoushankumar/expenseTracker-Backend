/*
=========================================
USER SCHEMAS
=========================================

Reusable user schemas shared across
multiple API modules.
*/

export const userSchemas = {
  User: {
    type: "object",

    description: "Represents a user resource.",

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

        description: "Unique user identifier.",

        example: 1,
      },

      firstName: {
        type: "string",

        description: "User's first name.",

        example: "John",
      },

      lastName: {
        type: "string",

        description: "User's last name.",

        example: "Doe",
      },

      email: {
        type: "string",

        format: "email",

        description: "Registered email address.",

        example: "john@example.com",
      },

      role: {
        type: "string",

        enum: ["admin", "maintainer", "user"],

        description: "Role assigned to the user.",

        example: "user",
      },

      createdAt: {
        type: "string",

        format: "date-time",

        description: "Account creation timestamp.",

        example: "2026-07-15T10:30:00.000Z",
      },

      updatedAt: {
        type: "string",

        format: "date-time",

        description: "Last profile update timestamp.",

        example: "2026-07-15T10:30:00.000Z",
      },
    },
  },
};
