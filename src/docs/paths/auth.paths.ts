/*
=========================================
AUTHENTICATION PATHS
=========================================

Authentication endpoints.

- Register
- Login
- Get Profile
- Update Profile
*/

export const authPaths = {
  /*
  =========================================
  REGISTER
  =========================================
  */

  "/auth/register": {
    post: {
      tags: ["Authentication"],

      summary: "Register a new user",

      operationId: "registerUser",

      description: "Creates a new user account.",

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
          description: "User registered successfully.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",

                    required: ["data"],

                    properties: {
                      data: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                ],
              },
            },
          },
        },

        "400": {
          description: "Validation failed.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },

        "409": {
          description: "Email already exists.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  /*
  =========================================
  LOGIN
  =========================================
  */

  "/auth/login": {
    post: {
      tags: ["Authentication"],

      summary: "Authenticate user",

      operationId: "loginUser",

      description: "Authenticates a user using email and password.",

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Login successful.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",

                    required: ["data"],

                    properties: {
                      data: {
                        $ref: "#/components/schemas/LoginPayload",
                      },
                    },
                  },
                ],
              },
            },
          },
        },

        "400": {
          description: "Validation failed.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },

        "401": {
          description: "Invalid email or password.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },

  /*
  =========================================
  PROFILE
  =========================================
  */

  "/auth/profile": {
    get: {
      tags: ["Authentication"],

      summary: "Get authenticated user profile",

      operationId: "getProfile",

      description: "Returns the currently authenticated user's profile.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        "200": {
          description: "Profile retrieved successfully.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",

                    required: ["data"],

                    properties: {
                      data: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                ],
              },
            },
          },
        },

        "401": {
          description: "Authentication required.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },

    patch: {
      tags: ["Authentication"],

      summary: "Update authenticated user profile",

      operationId: "updateProfile",

      description: "Updates the authenticated user's profile.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateProfileRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Profile updated successfully.",

          content: {
            "application/json": {
              schema: {
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",

                    required: ["data"],

                    properties: {
                      data: {
                        $ref: "#/components/schemas/User",
                      },
                    },
                  },
                ],
              },
            },
          },
        },

        "400": {
          description: "Validation failed.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },

        "401": {
          description: "Authentication required.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
  },
};
