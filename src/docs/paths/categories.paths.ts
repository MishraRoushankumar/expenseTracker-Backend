/*
=========================================
CATEGORY PATHS
=========================================

Category management endpoints.
*/

export const categoryPaths = {
  "/categories": {
    /*
    =========================================
    CREATE CATEGORY
    =========================================
    */
    post: {
      tags: ["Categories"],

      summary: "Create category",

      operationId: "createCategory",

      description: "Creates a new category for the authenticated user.",

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
              $ref: "#/components/schemas/CreateCategoryRequest",
            },
          },
        },
      },

      responses: {
        "201": {
          description: "Category created successfully.",

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
                        $ref: "#/components/schemas/Category",
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

        "409": {
          description: "Category already exists.",

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

    /*
    =========================================
    GET CATEGORIES
    =========================================
    */

    get: {
      tags: ["Categories"],

      summary: "Get categories",

      operationId: "getCategories",

      description:
        "Returns all categories belonging to the authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      responses: {
        "200": {
          description: "Categories fetched successfully.",

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
                        type: "array",

                        items: {
                          $ref: "#/components/schemas/Category",
                        },
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
  },

  "/categories/{id}": {
    /*
    =========================================
    UPDATE CATEGORY
    =========================================
    */

    patch: {
      tags: ["Categories"],

      summary: "Update category",

      operationId: "updateCategory",

      description: "Updates a category belonging to the authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",

          in: "path",

          required: true,

          description: "Category ID.",

          schema: {
            type: "integer",

            minimum: 1,

            example: 1,
          },
        },
      ],

      requestBody: {
        required: true,

        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UpdateCategoryRequest",
            },
          },
        },
      },

      responses: {
        "200": {
          description: "Category updated successfully.",

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
                        $ref: "#/components/schemas/Category",
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

        "404": {
          description: "Category not found.",

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

    /*
    =========================================
    DELETE CATEGORY
    =========================================
    */

    delete: {
      tags: ["Categories"],

      summary: "Delete category",

      operationId: "deleteCategory",

      description: "Deletes a category belonging to the authenticated user.",

      security: [
        {
          bearerAuth: [],
        },
      ],

      parameters: [
        {
          name: "id",

          in: "path",

          required: true,

          description: "Category ID.",

          schema: {
            type: "integer",

            minimum: 1,

            example: 1,
          },
        },
      ],

      responses: {
        "200": {
          description: "Category deleted successfully.",

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
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

        "404": {
          description: "Category not found.",

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
