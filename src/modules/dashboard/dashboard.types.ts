// DASHBOARD SUMMARY

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;

  monthlyIncome: number;
  monthlyExpense: number;
  monthlySavings: number;

  transactionCount: number;
}

export interface DashboardSummaryMetrics {
  totalIncome: number;
  totalExpense: number;
  monthlyIncome: number;
  monthlyExpense: number;
  transactionCount: number;
}

// MONTHLY TRENDS

export interface MonthlyTrendRaw {
  year: number;
  month: number;
  income: number;
  expense: number;
}

export interface MonthlyTrend {
  period: string;
  label: string;
  income: number;
  expense: number;
  balance: number;
}

// DASHBOARD INSIGHTS

export interface HighestExpenseCategory {
  id: number;
  name: string;
  amount: number;
}

export interface LargestExpense {
  id: number;
  amount: number;
  category: string | null;
  date: Date;
}

export interface DashboardInsightMetrics {
  totalIncome: number;
  totalExpense: number;
  transactionCount: number;
}

export interface DashboardInsights {
  highestExpenseCategory: HighestExpenseCategory | null;
  largestExpense: {
    id: number;
    amount: number;
    category: string | null;
    date: string;
  } | null;

  averageTransactionAmount: number;
  averageMonthlyIncome: number;
  averageMonthlyExpense: number;
  savingsRate: number;
}

export interface MonthlyTotals {
  income: number;
  expense: number;
}

// CATEGORY ANALYTICS

export interface CategoryAnalyticsRaw {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
  transactionCount: number;
}

export interface CategoryAnalytics {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
}
