export const dashboardPaths = {
  "/dashboard/summary": {
    get: {
      tags: ["Dashboard"],
      summary: "Get dashboard summary",
      operationId: "getDashboardSummary",
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
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",
                    required: ["data"],
                    properties: {
                      data: {
                        $ref: "#/components/schemas/DashboardSummary",
                      },
                    },
                  },
                ],
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

  "/dashboard/monthly": {
    get: {
      tags: ["Dashboard"],
      summary: "Get monthly trends",
      operationId: "getMonthlyTrends",
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
                          $ref: "#/components/schemas/MonthlyTrend",
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

  "/dashboard/insights": {
    get: {
      tags: ["Dashboard"],
      summary: "Get dashboard insights",
      operationId: "getDashboardInsights",
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
                allOf: [
                  {
                    $ref: "#/components/schemas/ApiResponse",
                  },
                  {
                    type: "object",
                    required: ["data"],
                    properties: {
                      data: {
                        $ref: "#/components/schemas/DashboardInsights",
                      },
                    },
                  },
                ],
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

  "/dashboard/category-analytics": {
    get: {
      tags: ["Dashboard"],
      summary: "Get category analytics",
      operationId: "getCategoryAnalytics",
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
                          $ref: "#/components/schemas/CategoryAnalytics",
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

  "/dashboard/recent": {
    get: {
      tags: ["Dashboard"],
      summary: "Get recent transactions",
      operationId: "getRecentTransactions",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: "limit",
          in: "query",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 50,
            default: 10,
          },
        },
      ],
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
                        type: "array",
                        items: {
                          $ref: "#/components/schemas/RecentTransaction",
                        },
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
};
