export const dashboardSchemas = {
  DashboardSummary: {
    type: "object",
    required: [
      "totalIncome",
      "totalExpense",
      "currentBalance",
      "monthlyIncome",
      "monthlyExpense",
      "monthlySavings",
      "transactionCount",
    ],
    properties: {
      totalIncome: {
        type: "number",
        example: 12500.5,
      },
      totalExpense: {
        type: "number",
        example: 4200.75,
      },
      currentBalance: {
        type: "number",
        example: 8299.75,
      },
      monthlyIncome: {
        type: "number",
        example: 4500.0,
      },
      monthlyExpense: {
        type: "number",
        example: 1200.0,
      },
      monthlySavings: {
        type: "number",
        example: 3300.0,
      },
      transactionCount: {
        type: "integer",
        example: 145,
      },
    },
  },

  MonthlyTrend: {
    type: "object",
    required: ["period", "label", "income", "expense", "balance"],
    properties: {
      period: {
        type: "string",
        example: "2026-07",
      },
      label: {
        type: "string",
        example: "Jul 2026",
      },
      income: {
        type: "number",
        example: 4500,
      },
      expense: {
        type: "number",
        example: 3100,
      },
      balance: {
        type: "number",
        example: 1400,
      },
    },
  },

  DashboardInsights: {
    type: "object",
    required: [
      "highestExpenseCategory",
      "largestExpense",
      "averageTransactionAmount",
      "averageMonthlyIncome",
      "averageMonthlyExpense",
      "savingsRate",
    ],
    properties: {
      highestExpenseCategory: {
        type: ["object", "null"],
        properties: {
          id: {
            type: "integer",
            example: 2,
          },
          name: {
            type: "string",
            example: "Rent",
          },
          amount: {
            type: "number",
            example: 1500,
          },
        },
      },
      largestExpense: {
        type: ["object", "null"],
        properties: {
          id: {
            type: "integer",
            example: 104,
          },
          amount: {
            type: "number",
            example: 1200,
          },
          category: {
            type: ["string", "null"],
            example: "Electronics",
          },
          date: {
            type: "string",
            format: "date",
            example: "2026-07-10",
          },
        },
      },
      averageTransactionAmount: {
        type: "number",
        example: 120.5,
      },
      averageMonthlyIncome: {
        type: "number",
        example: 4500,
      },
      averageMonthlyExpense: {
        type: "number",
        example: 2800,
      },
      savingsRate: {
        type: "number",
        example: 37.78,
      },
    },
  },

  CategoryAnalytics: {
    type: "object",
    required: [
      "categoryId",
      "categoryName",
      "totalAmount",
      "transactionCount",
      "percentage",
    ],
    properties: {
      categoryId: {
        type: "integer",
        example: 3,
      },
      categoryName: {
        type: "string",
        example: "Groceries",
      },
      totalAmount: {
        type: "number",
        example: 450.5,
      },
      transactionCount: {
        type: "integer",
        example: 12,
      },
      percentage: {
        type: "number",
        example: 15.2,
      },
    },
  },

  RecentTransaction: {
    type: "object",
    required: [
      "id",
      "type",
      "amount",
      "categoryId",
      "categoryName",
      "description",
      "transactionDate",
    ],
    properties: {
      id: {
        type: "integer",
        example: 102,
      },
      type: {
        type: "string",
        enum: ["income", "expense"],
        example: "expense",
      },
      amount: {
        type: "number",
        example: 45.99,
      },
      categoryId: {
        type: ["integer", "null"],
        example: 5,
      },
      categoryName: {
        type: ["string", "null"],
        example: "Dining",
      },
      description: {
        type: ["string", "null"],
        example: "Dinner with friends",
      },
      transactionDate: {
        type: "string",
        format: "date",
        example: "2026-07-22",
      },
    },
  },
};
