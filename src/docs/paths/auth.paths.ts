export const authPaths = {
  "/auth/register": {
    post: {
      tags: ["Authentication"],
      summary: "Register a new user",
      operationId: "registerUser",
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
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "409": {
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

  "/auth/login": {
    post: {
      tags: ["Authentication"],
      summary: "Authenticate user",
      operationId: "loginUser",
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
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        "401": {
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

  "/auth/logout": {
    post: {
      tags: ["Authentication"],
      summary: "Logout user",
      operationId: "logoutUser",
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        "200": {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
            },
          },
        },
        "401": {
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
